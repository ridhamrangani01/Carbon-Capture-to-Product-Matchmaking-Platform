import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;
    const role = searchParams.get("role") || "EMITTER";

    const totalSources = await db.carbonSource.count();
    const totalProducts = await db.product.count({ where: { active: true } });
    const totalMatches = await db.match.count();
    const totalUsers = await db.user.count();

    // Sum total CO2 available
    const sourcesSum = await db.carbonSource.aggregate({
      _sum: { annualQuantityTonnes: true },
    });
    const totalCO2Annual = sourcesSum._sum.annualQuantityTonnes || 0;

    // Excellent matches count
    const excellentMatches = await db.match.count({
      where: { overallScore: { gte: 85 } },
    });

    // Pathway category breakdown
    const categoryGroup = await db.product.groupBy({
      by: ["category"],
      _count: { id: true },
    });

    const pathwayDistribution = categoryGroup.map((g) => ({
      category: g.category,
      count: g._count.id,
    }));

    // Recent top matches
    const topMatches = await db.match.findMany({
      take: 5,
      orderBy: { overallScore: "desc" },
      include: {
        carbonSource: true,
        product: true,
      },
    });

    return NextResponse.json({
      stats: {
        totalSources,
        totalProducts,
        totalMatches,
        totalUsers,
        totalCO2Annual,
        excellentMatches,
      },
      pathwayDistribution,
      topMatches,
    });
  } catch (error) {
    console.error("GET Dashboard Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
