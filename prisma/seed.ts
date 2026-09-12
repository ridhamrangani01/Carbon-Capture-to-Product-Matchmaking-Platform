import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { calculateMatch, normalizeToMonthlyTonnes } from "../lib/matching/engine";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Carbon2Product database...");

  // Reset database tables cleanly
  await prisma.auditLog.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.report.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.utilizationPathway.deleteMany();
  await prisma.documentLineItem.deleteMany();
  await prisma.document.deleteMany();
  await prisma.emissionFactor.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.contactRequest.deleteMany();
  await prisma.savedMatch.deleteMany();
  await prisma.match.deleteMany();
  await prisma.carbonSource.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  const passwordHash = await bcrypt.hash("Password123!", 10);

  // 1. Create Organizations
  const orgEmitter = await prisma.organization.create({
    data: {
      name: "Reliance Industrial Energy Hub",
      type: "Industrial Emitter",
      location: "Jamnagar, Gujarat, India",
      website: "https://reliance.example.com",
      verified: true,
    },
  });

  const orgUtilizer = await prisma.organization.create({
    data: {
      name: "Gujarat Methanol & Circular Chemicals",
      type: "Chemical Manufacturer",
      location: "Dahej, Gujarat, India",
      website: "https://gujaratmethanol.example.com",
      verified: true,
    },
  });

  const orgResearch = await prisma.organization.create({
    data: {
      name: "Indian Institute of Technology Decarbonization Lab",
      type: "Research Institute",
      location: "Gandhinagar, Gujarat, India",
      website: "https://iit.example.com",
      verified: true,
    },
  });

  const orgAdmin = await prisma.organization.create({
    data: {
      name: "Carbon2Product Global Governance",
      type: "Platform Admin",
      location: "Ahmedabad, Gujarat, India",
      website: "https://carbon2product.com",
      verified: true,
    },
  });

  // 2. Create Users
  const userAdmin = await prisma.user.create({
    data: {
      name: "Aarav Sharma (Admin)",
      email: "admin@carbon2product.com",
      passwordHash,
      role: "ADMIN",
      organizationId: orgAdmin.id,
    },
  });

  const userEmitter = await prisma.user.create({
    data: {
      name: "Ridham Rangani (Emitter Lead)",
      email: "emitter@carbon2product.com",
      passwordHash,
      role: "EMITTER",
      organizationId: orgEmitter.id,
    },
  });

  const userUtilizer = await prisma.user.create({
    data: {
      name: "Dhyey Shah (Utilizer Director)",
      email: "utilizer@carbon2product.com",
      passwordHash,
      role: "UTILIZER",
      organizationId: orgUtilizer.id,
    },
  });

  const userResearcher = await prisma.user.create({
    data: {
      name: "Dr. Pranshu Mehta (Lead Researcher)",
      email: "researcher@carbon2product.com",
      passwordHash,
      role: "RESEARCHER",
      organizationId: orgResearch.id,
    },
  });

  // 3. Create Emission Factors
  const ef1 = await prisma.emissionFactor.create({
    data: {
      name: "Industrial Natural Gas Combustion CO₂",
      category: "Fuel",
      subcategory: "Natural Gas",
      factorValue: 2.68,
      unit: "kg CO2e/kg",
      geography: "India",
      sourceDatabase: "GHG Protocol 2026.1",
    },
  });

  const ef2 = await prisma.emissionFactor.create({
    data: {
      name: "Grid Electricity India (Western Region)",
      category: "Electricity",
      subcategory: "Grid",
      factorValue: 0.79,
      unit: "kg CO2e/kWh",
      geography: "India",
      sourceDatabase: "CEA India Database",
    },
  });

  const ef3 = await prisma.emissionFactor.create({
    data: {
      name: "Pure CO₂ Gas Stream Capture",
      category: "Direct Emissions",
      subcategory: "Flue Gas",
      factorValue: 1.0,
      unit: "kg CO2e/kg",
      geography: "Global",
      sourceDatabase: "ecoinvent 3.10",
    },
  });

  // 4. Create Suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      organizationId: orgEmitter.id,
      name: "Gujarat Gas Grid Pipeline Corp",
      country: "India",
      category: "Gas Infrastructure",
      co2eScoreAvg: 94.2,
    },
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      organizationId: orgEmitter.id,
      name: "Adani Total Gas Systems",
      country: "India",
      category: "Fuel Supply",
      co2eScoreAvg: 88.5,
    },
  });

  // 5. Create Documents & Line Items
  const doc1 = await prisma.document.create({
    data: {
      organizationId: orgEmitter.id,
      uploadedBy: userEmitter.id,
      filename: "Jamnagar_Gas_Stream_Invoice_Jan2026.pdf",
      fileType: "PDF",
      fileSize: 1024500,
      storagePath: "/uploads/Jamnagar_Gas_Stream_Invoice_Jan2026.pdf",
      status: "COMPLETED",
      documentType: "INVOICE",
      supplierName: "Gujarat Gas Grid Pipeline Corp",
      invoiceNumber: "INV-2026-00891",
      issueDate: new Date("2026-01-15"),
      totalCO2eKg: 1340000,
      confidenceAvg: 96.5,
      processedAt: new Date(),
    },
  });

  await prisma.documentLineItem.create({
    data: {
      documentId: doc1.id,
      description: "High-Purity CO2 Flue Gas Intake (99.5% Purity)",
      quantity: 500000,
      unit: "kg",
      unitPrice: 0.055,
      category: "Direct Emissions Stream",
      supplier: "Gujarat Gas Grid Pipeline Corp",
      country: "India",
      matchedEmissionFactorId: ef3.id,
      co2eKg: 500000,
      confidence: 98.0,
      status: "MATCHED",
    },
  });

  await prisma.documentLineItem.create({
    data: {
      documentId: doc1.id,
      description: "Natural Gas Fuel Feedstock Consumption",
      quantity: 300000,
      unit: "kg",
      unitPrice: 0.85,
      category: "Energy Fuel",
      supplier: "Gujarat Gas Grid Pipeline Corp",
      country: "India",
      matchedEmissionFactorId: ef1.id,
      co2eKg: 804000,
      confidence: 95.0,
      status: "MATCHED",
    },
  });

  // 6. Create Utilization Pathways
  await prisma.utilizationPathway.createMany({
    data: [
      {
        name: "E-Methanol (Green Methanol Synthesis)",
        category: "E-METHANOL",
        requiredPurity: 95.0,
        minVolume: 100,
        maxVolume: 10000,
        requiredPressure: 2.0,
        conversionEfficiency: 0.94,
        estimatedValuePerTon: 165.0,
      },
      {
        name: "Pre-Cast Concrete Mineralization & Curing",
        category: "CONCRETE_MINERALIZATION",
        requiredPurity: 85.0,
        minVolume: 20,
        maxVolume: 5000,
        requiredPressure: 1.0,
        conversionEfficiency: 0.98,
        estimatedValuePerTon: 95.0,
      },
      {
        name: "Precipitated Calcium Carbonate (PCC)",
        category: "CHEMICAL_FEEDSTOCK",
        requiredPurity: 92.0,
        minVolume: 50,
        maxVolume: 3000,
        requiredPressure: 1.5,
        conversionEfficiency: 0.90,
        estimatedValuePerTon: 140.0,
      },
    ],
  });

  // 7. Seed Carbon Sources & Products
  const sourcesData = [
    {
      title: "Jamnagar Petrochemical High-Purity CO₂ Stream",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Jamnagar, Gujarat, India",
      quantityValue: 500,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 6000,
      purityPercent: 99.5,
      physicalState: "Gas",
      temperatureC: 25.0,
      pressureBar: 2.0,
      captureTechnology: "Amine Solvent Absorption",
      availabilityFrequency: "Continuous 24/7",
      transportRadiusKm: 150,
      impuritiesNotes: "Trace nitrogen < 0.3%, moisture < 0.1%, zero H2S.",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
    {
      title: "Dahej Fertilizer Ammonia Plant CO₂ Stream",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Dahej, Gujarat, India",
      quantityValue: 1200,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 14400,
      purityPercent: 98.8,
      physicalState: "Gas",
      temperatureC: 30.0,
      pressureBar: 5.0,
      captureTechnology: "Cryogenic Distillation",
      availabilityFrequency: "Continuous 24/7",
      transportRadiusKm: 200,
      impuritiesNotes: "Low moisture, trace methane < 0.2%.",
      certificationStatus: "ISO 14044 Certified",
      status: "ACTIVE",
    },
  ];

  const createdSources = [];
  for (const s of sourcesData) {
    const src = await prisma.carbonSource.create({ data: s });
    createdSources.push(src);
  }

  const productsData = [
    {
      name: "E-Methanol (Green Methanol)",
      slug: "e-methanol-green-fuel",
      category: "E-Fuels",
      description: "Synthetic liquid methanol produced via catalytic reduction of captured CO₂ and green hydrogen.",
      minCO2Purity: 95.0,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 100,
      maxQuantityTonnesMonth: 10000,
      requiredState: "Gas",
      temperatureMin: 15,
      temperatureMax: 60,
      pressureMin: 2,
      pressureMax: 30,
      technologyReadinessLevel: 8,
      locationRequirements: "Within 250 km of industrial gas pipeline connection",
      energyIntensity: "Moderate",
      estimatedValuePerTon: 165,
      co2UtilizationPotential: "1.37 t CO2 / t product",
      organizationId: orgUtilizer.id,
      active: true,
    },
    {
      name: "Concrete Mineralization & Curing",
      slug: "concrete-carbon-mineralization",
      category: "Building Materials",
      description: "Direct injection of CO₂ during ready-mix concrete batching for permanent carbon sequestration.",
      minCO2Purity: 85.0,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 20,
      maxQuantityTonnesMonth: 5000,
      requiredState: "Gas",
      temperatureMin: 10,
      temperatureMax: 80,
      pressureMin: 1,
      pressureMax: 10,
      technologyReadinessLevel: 9,
      locationRequirements: "Local batching plant proximity < 100 km",
      energyIntensity: "Low",
      estimatedValuePerTon: 95,
      co2UtilizationPotential: "0.05 t CO2 / t concrete",
      organizationId: orgUtilizer.id,
      active: true,
    },
  ];

  const createdProducts = [];
  for (const p of productsData) {
    const prod = await prisma.product.create({ data: p });
    createdProducts.push(prod);
  }

  // 8. Generate Matches
  let matchCount = 0;
  for (const src of createdSources) {
    for (const prod of createdProducts) {
      const matchRes = calculateMatch(src, prod);
      if (matchRes.overallScore >= 50) {
        const match = await prisma.match.create({
          data: {
            carbonSourceId: src.id,
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
        matchCount++;

        if (matchRes.overallScore >= 90 && matchCount === 1) {
          await prisma.contactRequest.create({
            data: {
              senderId: userUtilizer.id,
              receiverId: userEmitter.id,
              matchId: match.id,
              message: "Hello, we operate a 500 t/mo E-Methanol reactor in Dahej and would like to negotiate a long-term CO₂ off-take agreement for your Jamnagar stream.",
              status: "PENDING",
            },
          });
        }
      }
    }
  }

  // 9. Add Reports & Audit Logs
  await prisma.report.create({
    data: {
      organizationId: orgEmitter.id,
      title: "Jamnagar Facility Carbon Accounting Summary Q1 2026",
      type: "SUMMARY",
      format: "PDF",
      downloadUrl: "/reports/Jamnagar_Q1_2026_Carbon_Summary.pdf",
      totalCO2eTonnes: 1340.0,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: userAdmin.id,
      action: "SEED_DATABASE",
      resource: "SYSTEM",
      details: "Populated initial demo organizations, users, documents, emission factors, and matching entries.",
    },
  });

  console.log(`Successfully seeded database with ${createdSources.length} sources, ${createdProducts.length} pathways, and ${matchCount} matches.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
