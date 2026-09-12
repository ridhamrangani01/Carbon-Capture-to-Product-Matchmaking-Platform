import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const match = await db.match.findUnique({
      where: { id },
      include: {
        carbonSource: {
          include: {
            organization: true,
            emitter: { select: { id: true, name: true, email: true, role: true } },
          },
        },
        product: {
          include: { organization: true },
        },
        contactRequests: true,
      },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    return NextResponse.json({ match });
  } catch (error) {
    console.error("GET Match Detail Error:", error);
    return NextResponse.json({ error: "Failed to fetch match details" }, { status: 500 });
  }
}
