import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || undefined;
    const trl = searchParams.get("trl") ? parseInt(searchParams.get("trl")!) : undefined;

    const where: any = { active: true };
    if (category && category !== "All") where.category = category;
    if (trl) where.technologyReadinessLevel = { gte: trl };
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const products = await db.product.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        matches: {
          take: 3,
          include: { carbonSource: true },
        },
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET Products Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
