import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { RegisterSchema } from "@/lib/validation/schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password, organizationName, role, location } = parsed.data;

    // Check if user exists
    const existing = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Find or create Organization
    let org = await db.organization.findFirst({
      where: { name: { equals: organizationName } },
    });

    if (!org) {
      org = await db.organization.create({
        data: {
          name: organizationName,
          type: role === "EMITTER" ? "Industrial Emitter" : (role === "UTILIZER" ? "Chemical Manufacturer" : "Research Institute"),
          location: location || "Global",
          verified: true,
        },
      });
    }

    const passwordHash = await hashPassword(password);

    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        passwordHash,
        role,
        organizationId: org.id,
      },
    });

    // Create welcome notification
    await db.notification.create({
      data: {
        userId: user.id,
        title: "Welcome to Carbon2Product!",
        message: "Your profile has been created. Start registering carbon sources or exploring utilization pathways.",
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
        organizationName: org.name,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration" },
      { status: 500 }
    );
  }
}
