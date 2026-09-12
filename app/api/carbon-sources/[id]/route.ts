import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const carbonSource = await db.carbonSource.findUnique({
      where: { id },
      include: {
        organization: true,
        emitter: {
          select: { id: true, name: true, email: true, role: true },
        },
        matches: {
          orderBy: { overallScore: "desc" },
          include: { product: true },
        },
      },
    });

    if (!carbonSource) {
      return NextResponse.json({ error: "Carbon source not found" }, { status: 404 });
    }

    return NextResponse.json({ carbonSource });
  } catch (error) {
    console.error("GET Carbon Source Detail Error:", error);
    return NextResponse.json({ error: "Failed to fetch carbon source" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.carbonSource.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Carbon Source Error:", error);
    return NextResponse.json({ error: "Failed to delete carbon source" }, { status: 500 });
  }
}
