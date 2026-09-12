import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ContactRequestSchema } from "@/lib/validation/schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { matchId, receiverId, message } = parsed.data;
    const senderId = body.senderId;

    if (!senderId) {
      return NextResponse.json({ error: "senderId is required" }, { status: 400 });
    }

    const contactReq = await db.contactRequest.create({
      data: {
        senderId,
        receiverId,
        matchId,
        message,
        status: "PENDING",
      },
      include: {
        sender: { select: { name: true, email: true } },
        match: { include: { carbonSource: true, product: true } },
      },
    });

    // Create notification for receiver
    await db.notification.create({
      data: {
        userId: receiverId,
        title: "New Match Interest Request",
        message: `${contactReq.sender.name} expressed interest in match: ${contactReq.match.carbonSource.title} → ${contactReq.match.product.name}.`,
      },
    });

    return NextResponse.json({ success: true, contactRequest: contactReq });
  } catch (error) {
    console.error("POST Contact Request Error:", error);
    return NextResponse.json({ error: "Failed to send contact request" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const requests = await db.contactRequest.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: { createdAt: "desc" },
      include: {
        sender: { select: { id: true, name: true, email: true, role: true } },
        receiver: { select: { id: true, name: true, email: true, role: true } },
        match: {
          include: {
            carbonSource: true,
            product: true,
          },
        },
      },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("GET Contact Requests Error:", error);
    return NextResponse.json({ error: "Failed to fetch contact requests" }, { status: 500 });
  }
}
