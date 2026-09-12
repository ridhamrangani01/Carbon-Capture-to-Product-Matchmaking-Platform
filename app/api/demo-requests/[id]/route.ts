import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const demoRequest = await prisma.demoRequest.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        organization: { select: { id: true, name: true } },
      },
    });

    if (!demoRequest) {
      return NextResponse.json({ error: "Demo request not found" }, { status: 404 });
    }

    const isAdmin = session.role === "ADMIN" || session.role === "PLATFORM_ADMIN";
    const isOwner = demoRequest.userId === session.userId;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: demoRequest });
  } catch (error) {
    console.error("[Demo Request Detail Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch demo request detail" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = session.role === "ADMIN" || session.role === "PLATFORM_ADMIN";
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Only platform admins can update demo request status" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { status, notes, scheduledAt, contactedAt } = body;

    const existing = await prisma.demoRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Demo request not found" }, { status: 404 });
    }

    const updatedData: any = {};
    if (status) updatedData.status = status;
    if (notes !== undefined) updatedData.notes = notes;
    if (scheduledAt !== undefined) updatedData.scheduledAt = scheduledAt ? new Date(scheduledAt) : null;
    if (contactedAt !== undefined) updatedData.contactedAt = contactedAt ? new Date(contactedAt) : null;

    if (status === "CONTACTED" && !existing.contactedAt) {
      updatedData.contactedAt = new Date();
    }

    const updated = await prisma.demoRequest.update({
      where: { id },
      data: updatedData,
    });

    // Log Audit Event
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "DEMO_REQUEST_STATUS_CHANGED",
        resource: `DemoRequest:${id}`,
        details: JSON.stringify({
          previousStatus: existing.status,
          newStatus: updated.status,
          notes: updated.notes,
        }),
      },
    });

    // Notify applicant if user is associated
    if (updated.userId) {
      await prisma.notification.create({
        data: {
          userId: updated.userId,
          title: "Demo Request Updated",
          message: `Your demo request (ID: ${id}) status was updated to ${updated.status}.`,
        },
      });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[Demo Request Update Error]:", error);
    return NextResponse.json(
      { error: "Failed to update demo request" },
      { status: 500 }
    );
  }
}
