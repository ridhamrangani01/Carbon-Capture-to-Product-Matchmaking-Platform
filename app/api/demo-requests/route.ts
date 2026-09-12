import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { sendDemoConfirmationEmail, sendAdminDemoNotificationEmail } from "@/lib/email/service";
import {
  normalizeIndianPhone,
  isValidIndianPinCode,
  isValidGSTIN,
  generateReadableRequestId,
} from "@/lib/validation/indian-phone";
import { z } from "zod";

const createDemoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  workEmail: z.string().email("Enter a valid work email address"),
  companyName: z.string().min(2, "Company / Organization is required"),
  role: z.string().min(2, "Please select your primary role"),
  phone: z.string().optional().nullable(),
  jobTitle: z.string().optional().nullable(),
  companySize: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
  country: z.string().optional().default("India"),
  state: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  pincode: z.string().optional().nullable(),
  gstin: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  preferredDate: z.string().optional().nullable(),
  preferredTime: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = createDemoSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      workEmail,
      companyName,
      role,
      phone,
      jobTitle,
      companySize,
      industry,
      country,
      state,
      city,
      pincode,
      gstin,
      message,
      preferredDate,
      preferredTime,
    } = validation.data;

    // Validate & Normalize Indian Mobile Number if provided
    let normalizedPhone: string | null = null;
    if (phone && phone.trim()) {
      normalizedPhone = normalizeIndianPhone(phone);
      if (!normalizedPhone) {
        return NextResponse.json(
          { error: "Enter a valid 10-digit Indian mobile number." },
          { status: 400 }
        );
      }
    }

    // Validate Indian PIN Code if provided
    if (pincode && pincode.trim()) {
      if (!isValidIndianPinCode(pincode)) {
        return NextResponse.json(
          { error: "Enter a valid 6-digit PIN Code." },
          { status: 400 }
        );
      }
    }

    // Validate GSTIN if provided
    if (gstin && gstin.trim()) {
      if (!isValidGSTIN(gstin)) {
        return NextResponse.json(
          { error: "Enter a valid 15-character Indian GSTIN format." },
          { status: 400 }
        );
      }
    }

    // Rate Limiting / Duplicate Check: Prevent duplicate submissions for same email within 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existingRecent = await prisma.demoRequest.findFirst({
      where: {
        workEmail: workEmail.toLowerCase(),
        createdAt: { gte: fiveMinutesAgo },
      },
    });

    if (existingRecent) {
      return NextResponse.json(
        {
          error: "A demo request with this email was submitted recently. Please wait a few minutes before submitting another.",
        },
        { status: 429 }
      );
    }

    // Check if submitting user is authenticated
    const session = await getSession();
    let userId: string | null = null;
    let organizationId: string | null = null;

    if (session) {
      const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { id: true, organizationId: true },
      });
      if (user) {
        userId = user.id;
        organizationId = user.organizationId;
      }
    }

    // Generate human-friendly Readable Request ID (e.g. C2P-2026-000124)
    const count = await prisma.demoRequest.count();
    const readableId = generateReadableRequestId(count + 1);

    // Persist DemoRequest in database
    const demoRequest = await prisma.demoRequest.create({
      data: {
        readableId,
        userId,
        organizationId,
        fullName,
        workEmail: workEmail.toLowerCase(),
        phone: normalizedPhone,
        companyName,
        jobTitle: jobTitle || null,
        companySize: companySize || null,
        industry: industry || null,
        country: country || "India",
        state: state || null,
        city: city || null,
        pincode: pincode ? pincode.trim() : null,
        gstin: gstin ? gstin.trim().toUpperCase() : null,
        timezone: "Asia/Kolkata",
        role,
        message: message || null,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        status: "PENDING",
        source: "WEBSITE",
      },
    });

    // Create Audit Log entry
    await prisma.auditLog.create({
      data: {
        userId: userId || null,
        action: "DEMO_REQUEST_CREATED",
        resource: `DemoRequest:${readableId}`,
        details: JSON.stringify({
          readableId,
          fullName,
          workEmail,
          companyName,
          city,
          state,
          country: "India",
        }),
      },
    });

    // Create User Notification if authenticated
    if (userId) {
      await prisma.notification.create({
        data: {
          userId,
          title: "Demo Request Submitted",
          message: `Your demo request (ID: ${readableId}) has been received. Our team will contact you shortly.`,
        },
      });
    }

    // Format location string for email
    const locationStr = [city, state, country || "India"].filter(Boolean).join(", ");

    // Dispatch Confirmation Email & Admin Notification
    const userEmailResult = await sendDemoConfirmationEmail({
      toEmail: workEmail,
      fullName,
      requestId: readableId,
      companyName,
      role,
      location: locationStr,
      preferredDate: preferredDate || undefined,
      preferredTime: preferredTime || undefined,
    });

    await sendAdminDemoNotificationEmail({
      toAdminEmail: process.env.DEMO_NOTIFICATION_EMAIL || "admin@upcarb.com",
      requestId: readableId,
      fullName,
      workEmail,
      phone: normalizedPhone,
      companyName,
      role,
      industry,
      country: country || "India",
      state,
      city,
      pincode,
      message,
      preferredDate,
      preferredTime,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Demo request created successfully",
        data: {
          id: demoRequest.id,
          readableId: demoRequest.readableId,
          fullName: demoRequest.fullName,
          workEmail: demoRequest.workEmail,
          companyName: demoRequest.companyName,
          role: demoRequest.role,
          city: demoRequest.city,
          state: demoRequest.state,
          country: demoRequest.country,
          status: demoRequest.status,
          createdAt: demoRequest.createdAt,
          emailDeliveryMode: userEmailResult.mode,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[Demo Request API Error]:", error);
    return NextResponse.json(
      { error: "Internal server error while processing demo request" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If Platform Admin, list all demo requests. If regular user, list user's own demo requests.
    let demoRequests;
    if (session.role === "ADMIN" || session.role === "PLATFORM_ADMIN") {
      demoRequests = await prisma.demoRequest.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, email: true } },
          organization: { select: { id: true, name: true } },
        },
      });
    } else {
      demoRequests = await prisma.demoRequest.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ success: true, data: demoRequests });
  } catch (error) {
    console.error("[Demo Request GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch demo requests" },
      { status: 500 }
    );
  }
}
