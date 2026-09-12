import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await db.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        organization: true,
        matches: {
          orderBy: { overallScore: "desc" },
          include: { carbonSource: { include: { organization: true } } },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product pathway not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("GET Product Detail Error:", error);
    return NextResponse.json({ error: "Failed to fetch product pathway" }, { status: 500 });
  }
}
