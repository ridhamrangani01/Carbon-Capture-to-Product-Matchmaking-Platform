import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CarbonSourceSchema } from "@/lib/validation/schemas";
import { calculateMatch, normalizeToMonthlyTonnes } from "@/lib/matching/engine";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const emitterId = searchParams.get("emitterId") || undefined;
    const state = searchParams.get("state") || undefined;

    const where: any = {};
    if (emitterId) where.emitterId = emitterId;
    if (state) where.physicalState = state;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
        { captureTechnology: { contains: search } },
      ];
    }

    const sources = await db.carbonSource.findMany({
      where,
      include: {
        organization: true,
        emitter: {
          select: { id: true, name: true, email: true, role: true },
        },
        matches: {
          orderBy: { overallScore: "desc" },
          take: 3,
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ sources });
  } catch (error) {
    console.error("GET Carbon Sources Error:", error);
    return NextResponse.json({ error: "Failed to fetch carbon sources" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CarbonSourceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const emitterId = body.emitterId;

    if (!emitterId) {
      return NextResponse.json({ error: "emitterId is required" }, { status: 400 });
    }

    const emitter = await db.user.findUnique({
      where: { id: emitterId },
      include: { organization: true },
    });

    if (!emitter || !emitter.organizationId) {
      return NextResponse.json({ error: "Valid emitter user and organization required" }, { status: 400 });
    }

    const monthlyTonnes = normalizeToMonthlyTonnes(data.quantityValue, data.quantityUnit);
    const annualQuantityTonnes = monthlyTonnes * 12.0;

    const carbonSource = await db.carbonSource.create({
      data: {
        title: data.title,
        emitterId: emitter.id,
        organizationId: emitter.organizationId,
        location: data.location,
        quantityValue: data.quantityValue,
        quantityUnit: data.quantityUnit,
        annualQuantityTonnes,
        purityPercent: data.purityPercent,
        physicalState: data.physicalState,
        temperatureC: data.temperatureC,
        pressureBar: data.pressureBar,
        captureTechnology: data.captureTechnology,
        availabilityFrequency: data.availabilityFrequency,
        transportRadiusKm: data.transportRadiusKm || 200,
        impuritiesNotes: data.impuritiesNotes || null,
        certificationStatus: data.certificationStatus || "Verified Third-Party",
        status: "ACTIVE",
      },
    });

    // Run dynamic matchmaking against all active product pathways in database
    const products = await db.product.findMany({ where: { active: true } });
    let createdMatchesCount = 0;

    for (const prod of products) {
      const matchRes = calculateMatch(
        {
          purityPercent: carbonSource.purityPercent,
          quantityValue: carbonSource.quantityValue,
          quantityUnit: carbonSource.quantityUnit,
          annualQuantityTonnes: carbonSource.annualQuantityTonnes,
          physicalState: carbonSource.physicalState,
          temperatureC: carbonSource.temperatureC,
          pressureBar: carbonSource.pressureBar,
          location: carbonSource.location,
          availabilityFrequency: carbonSource.availabilityFrequency,
        },
        {
          minCO2Purity: prod.minCO2Purity,
          maxCO2Purity: prod.maxCO2Purity,
          minQuantityTonnesMonth: prod.minQuantityTonnesMonth,
          maxQuantityTonnesMonth: prod.maxQuantityTonnesMonth,
          requiredState: prod.requiredState,
          temperatureMin: prod.temperatureMin,
          temperatureMax: prod.temperatureMax,
          pressureMin: prod.pressureMin,
          pressureMax: prod.pressureMax,
          technologyReadinessLevel: prod.technologyReadinessLevel,
          energyIntensity: prod.energyIntensity,
          estimatedValuePerTon: prod.estimatedValuePerTon,
          co2UtilizationPotential: prod.co2UtilizationPotential,
        }
      );

      if (matchRes.overallScore >= 40) {
        await db.match.create({
          data: {
            carbonSourceId: carbonSource.id,
            productId: prod.id,
            overallScore: matchRes.overallScore,
            classification: matchRes.classification,
            purityScore: matchRes.subScores.purityScore,
            quantityScore: matchRes.subScores.quantityScore,
            stateScore: matchRes.subScores.stateScore,
            tempScore: matchRes.subScores.tempScore,
            pressureScore: matchRes.subScores.pressureScore,
            locationScore: matchRes.subScores.locationScore,
            trlScore: matchRes.subScores.trlScore,
            availabilityScore: matchRes.subScores.availabilityScore,
            greenReasonsJson: JSON.stringify(matchRes.greenReasons),
            concernsJson: JSON.stringify(matchRes.concerns),
            recommendationText: matchRes.recommendationText,
          },
        });
        createdMatchesCount++;
      }
    }

    return NextResponse.json({
      success: true,
      carbonSource,
      matchesGenerated: createdMatchesCount,
    });
  } catch (error) {
    console.error("POST Carbon Source Error:", error);
    return NextResponse.json({ error: "Failed to create carbon source" }, { status: 500 });
  }
}
