import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const classification = searchParams.get("classification");
    const minScore = searchParams.get("minScore") ? parseFloat(searchParams.get("minScore")!) : 0;
    const carbonSourceId = searchParams.get("carbonSourceId") || undefined;
    const productId = searchParams.get("productId") || undefined;

    const where: any = {
      overallScore: { gte: minScore },
    };

    if (classification && classification !== "ALL") where.classification = classification;
    if (carbonSourceId) where.carbonSourceId = carbonSourceId;
    if (productId) where.productId = productId;

    const matches = await db.match.findMany({
      where,
      orderBy: { overallScore: "desc" },
      include: {
        carbonSource: {
          include: { organization: true, emitter: { select: { name: true, email: true } } },
        },
        product: {
          include: { organization: true },
        },
      },
    });

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("GET Matches Error:", error);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}
