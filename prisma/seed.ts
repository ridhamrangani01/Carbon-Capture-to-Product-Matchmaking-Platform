import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { calculateMatch, normalizeToMonthlyTonnes } from "../lib/matching/engine";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Carbon2Product database...");

  // Reset database tables cleanly
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

  // 3. Create Products / Utilization Pathways
  const productsData = [
    {
      name: "Green Methanol (E-Methanol)",
      slug: "e-methanol",
      category: "E-Fuels",
      description: "Catalytic hydrogenation of captured CO₂ with green hydrogen to produce renewable e-methanol for maritime transport and chemical feedstocks.",
      minCO2Purity: 95.0,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 100.0,
      maxQuantityTonnesMonth: 10000.0,
      requiredState: "Gas",
      temperatureMin: 15.0,
      temperatureMax: 60.0,
      pressureMin: 2.0,
      pressureMax: 30.0,
      technologyReadinessLevel: 8,
      locationRequirements: "Proximity to green hydrogen generation or renewable grid",
      energyIntensity: "High",
      estimatedValuePerTon: 165.0,
      co2UtilizationPotential: "1.37 t CO2 / t Methanol",
      organizationId: orgUtilizer.id,
    },
    {
      name: "Synthetic Aviation Fuel (e-SAF)",
      slug: "e-saf-fuel",
      category: "E-Fuels",
      description: "Reverse Water Gas Shift (RWGS) combined with Fischer-Tropsch synthesis to create drop-in jet fuel replacing fossil kerosene.",
      minCO2Purity: 98.0,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 300.0,
      maxQuantityTonnesMonth: 15000.0,
      requiredState: "Gas",
      temperatureMin: 20.0,
      temperatureMax: 50.0,
      pressureMin: 5.0,
      pressureMax: 40.0,
      technologyReadinessLevel: 7,
      locationRequirements: "Industrial airport corridors and pipeline access",
      energyIntensity: "High",
      estimatedValuePerTon: 240.0,
      co2UtilizationPotential: "3.10 t CO2 / t SAF",
      organizationId: orgUtilizer.id,
    },
    {
      name: "Concrete Mineralization & CO₂ Curing",
      slug: "concrete-mineralization",
      category: "Building Materials",
      description: "Direct injection of captured gaseous CO₂ during concrete mixing, permanently trapping carbon as calcium carbonate while increasing compressive strength by 15%.",
      minCO2Purity: 85.0,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 20.0,
      maxQuantityTonnesMonth: 5000.0,
      requiredState: "Gas",
      temperatureMin: 10.0,
      temperatureMax: 80.0,
      pressureMin: 1.0,
      pressureMax: 10.0,
      technologyReadinessLevel: 9,
      locationRequirements: "Batching plants within 150km of urban construction zones",
      energyIntensity: "Low",
      estimatedValuePerTon: 95.0,
      co2UtilizationPotential: "0.05 t CO2 / m³ Concrete",
      organizationId: orgUtilizer.id,
    },
    {
      name: "Precipitated Calcium Carbonate (PCC)",
      slug: "precipitated-calcium-carbonate",
      category: "Chemicals",
      description: "Reaction of CO₂ stream with lime slurry to produce high-purity PCC filler for paper, paints, plastics, and pharmaceutical formulations.",
      minCO2Purity: 92.0,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 50.0,
      maxQuantityTonnesMonth: 3000.0,
      requiredState: "Gas",
      temperatureMin: 15.0,
      temperatureMax: 50.0,
      pressureMin: 1.5,
      pressureMax: 8.0,
      technologyReadinessLevel: 9,
      locationRequirements: "Paper and specialty chemical manufacturing hubs",
      energyIntensity: "Moderate",
      estimatedValuePerTon: 140.0,
      co2UtilizationPotential: "0.44 t CO2 / t PCC",
      organizationId: orgUtilizer.id,
    },
    {
      name: "Algae Biomass & High-Protein Feedstock",
      slug: "algae-biomass-cultivation",
      category: "Biomass & Agriculture",
      description: "Photobioreactor bubbling of flue-gas CO₂ to cultivate microalgae for bio-fertilizers, protein feeds, and sustainable cosmetics.",
      minCO2Purity: 80.0,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 30.0,
      maxQuantityTonnesMonth: 2000.0,
      requiredState: "Gas",
      temperatureMin: 20.0,
      temperatureMax: 45.0,
      pressureMin: 1.0,
      pressureMax: 3.0,
      technologyReadinessLevel: 8,
      locationRequirements: "High solar irradiance regions with water access",
      energyIntensity: "Low",
      estimatedValuePerTon: 110.0,
      co2UtilizationPotential: "1.80 t CO2 / t Dry Algae",
      organizationId: orgUtilizer.id,
    },
    {
      name: "Polycarbonates & Circular Polymers",
      slug: "polycarbonates-polymers",
      category: "Polymers",
      description: "Copolymerization of CO₂ with epoxides to synthesize bio-based polycarbonate polyols for rigid foams, adhesives, and electronics housing.",
      minCO2Purity: 99.0,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 80.0,
      maxQuantityTonnesMonth: 4000.0,
      requiredState: "Gas",
      temperatureMin: 20.0,
      temperatureMax: 40.0,
      pressureMin: 5.0,
      pressureMax: 25.0,
      technologyReadinessLevel: 7,
      locationRequirements: "Polymer resin blending plants",
      energyIntensity: "Moderate",
      estimatedValuePerTon: 210.0,
      co2UtilizationPotential: "0.30 t CO2 / t Polymer",
      organizationId: orgUtilizer.id,
    },
    {
      name: "Carbonated Building Aggregates",
      slug: "carbonated-building-aggregates",
      category: "Building Materials",
      description: "Accelerated carbonation of alkaline industrial slag and demolition waste to produce manufactured eco-gravel for sustainable road foundations.",
      minCO2Purity: 88.0,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 200.0,
      maxQuantityTonnesMonth: 12000.0,
      requiredState: "Gas",
      temperatureMin: 15.0,
      temperatureMax: 85.0,
      pressureMin: 1.0,
      pressureMax: 6.0,
      technologyReadinessLevel: 9,
      locationRequirements: "Steel slag processing sites or quarry hubs",
      energyIntensity: "Low",
      estimatedValuePerTon: 80.0,
      co2UtilizationPotential: "0.12 t CO2 / t Aggregate",
      organizationId: orgUtilizer.id,
    },
    {
      name: "Urea & Nitrogen Fertilizer Synthesis",
      slug: "urea-nitrogen-fertilizer",
      category: "Chemicals",
      description: "Reaction of high-purity CO₂ with synthetic ammonia under elevated pressure to produce agricultural urea fertilizer granules.",
      minCO2Purity: 98.5,
      maxCO2Purity: 100.0,
      minQuantityTonnesMonth: 500.0,
      maxQuantityTonnesMonth: 20000.0,
      requiredState: "Gas",
      temperatureMin: 30.0,
      temperatureMax: 60.0,
      pressureMin: 15.0,
      pressureMax: 50.0,
      technologyReadinessLevel: 9,
      locationRequirements: "Co-located fertilizer complexes",
      energyIntensity: "High",
      estimatedValuePerTon: 185.0,
      co2UtilizationPotential: "0.73 t CO2 / t Urea",
      organizationId: orgUtilizer.id,
    },
  ];

  const createdProducts = [];
  for (const p of productsData) {
    const prod = await prisma.product.create({ data: p });
    createdProducts.push(prod);
  }

  // 4. Create 10 Carbon Sources
  const sourcesData = [
    {
      title: "Jamnagar Refinery Off-Gas Capture Stream",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Jamnagar, Gujarat",
      quantityValue: 500.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 6000.0,
      purityPercent: 99.5,
      physicalState: "Gas",
      temperatureC: 25.0,
      pressureBar: 2.0,
      captureTechnology: "Amine Absorption Unit",
      availabilityFrequency: "Continuous 24/7",
      transportRadiusKm: 150.0,
      impuritiesNotes: "Trace N2 (0.3%), H2O vapor < 0.1%",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
    {
      title: "Hazira Fertilizer Synthesis Flue Stream",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Hazira, Gujarat",
      quantityValue: 1200.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 14400.0,
      purityPercent: 96.0,
      physicalState: "Gas",
      temperatureC: 40.0,
      pressureBar: 5.0,
      captureTechnology: "Pressure Swing Adsorption",
      availabilityFrequency: "Continuous 24/7",
      transportRadiusKm: 200.0,
      impuritiesNotes: "Ar (0.5%), O2 (1.2%)",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
    {
      title: "Mundra Thermal Power Auxiliary Capture",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Mundra, Gujarat",
      quantityValue: 2500.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 30000.0,
      purityPercent: 92.5,
      physicalState: "Gas",
      temperatureC: 45.0,
      pressureBar: 1.2,
      captureTechnology: "Chilled Ammonia Process",
      availabilityFrequency: "Continuous 24/7",
      transportRadiusKm: 300.0,
      impuritiesNotes: "NOx < 10 ppm, SOx < 5 ppm",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
    {
      title: "Dahej Petrochemical Liquid Cryo Stream",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Dahej, Gujarat",
      quantityValue: 800.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 9600.0,
      purityPercent: 98.8,
      physicalState: "Liquid",
      temperatureC: -15.0,
      pressureBar: 18.0,
      captureTechnology: "Cryogenic Distillation",
      availabilityFrequency: "Batch Daily",
      transportRadiusKm: 250.0,
      impuritiesNotes: "High-purity liquid phase",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
    {
      title: "Vadodara Bio-Ethanol Fermentation Off-Gas",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Vadodara, Gujarat",
      quantityValue: 350.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 4200.0,
      purityPercent: 99.9,
      physicalState: "Gas",
      temperatureC: 30.0,
      pressureBar: 1.5,
      captureTechnology: "Biogenic Scrubbing",
      availabilityFrequency: "Continuous 24/7",
      transportRadiusKm: 100.0,
      impuritiesNotes: "Biogenic pure CO2, zero heavy metals",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
    {
      title: "Surat Textile Boiler Flue Gas",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Surat, Gujarat",
      quantityValue: 200.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 2400.0,
      purityPercent: 88.0,
      physicalState: "Gas",
      temperatureC: 60.0,
      pressureBar: 1.0,
      captureTechnology: "Membrane Separation",
      availabilityFrequency: "Intermittent",
      transportRadiusKm: 80.0,
      impuritiesNotes: "Particulates < 15 mg/m3",
      certificationStatus: "Self-Reported",
      status: "ACTIVE",
    },
    {
      title: "Ankleshwar Specialty Chemical Stream",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Ankleshwar, Gujarat",
      quantityValue: 450.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 5400.0,
      purityPercent: 97.2,
      physicalState: "Gas",
      temperatureC: 35.0,
      pressureBar: 3.0,
      captureTechnology: "Vacuum Pressure Swing Adsorption",
      availabilityFrequency: "Continuous 24/7",
      transportRadiusKm: 120.0,
      impuritiesNotes: "Solvent traces < 0.05%",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
    {
      title: "Gandhinagar Cement Kiln Pre-Calciner Capture",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Gandhinagar, Gujarat",
      quantityValue: 1800.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 21600.0,
      purityPercent: 90.0,
      physicalState: "Gas",
      temperatureC: 70.0,
      pressureBar: 1.1,
      captureTechnology: "Oxy-Fuel Combustion",
      availabilityFrequency: "Continuous 24/7",
      transportRadiusKm: 180.0,
      impuritiesNotes: "Cement kiln dust < 5 mg/m3",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
    {
      title: "Vapi Pharma Fermentation CO₂ Vent",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Vapi, Gujarat",
      quantityValue: 150.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 1800.0,
      purityPercent: 99.1,
      physicalState: "Gas",
      temperatureC: 25.0,
      pressureBar: 2.0,
      captureTechnology: "Direct Water Wash",
      availabilityFrequency: "Batch Daily",
      transportRadiusKm: 90.0,
      impuritiesNotes: "Medical grade biogenic baseline",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
    {
      title: "Ahmedabad Waste-to-Energy Direct Stream",
      emitterId: userEmitter.id,
      organizationId: orgEmitter.id,
      location: "Ahmedabad, Gujarat",
      quantityValue: 600.0,
      quantityUnit: "tonnes/month",
      annualQuantityTonnes: 7200.0,
      purityPercent: 94.0,
      physicalState: "Gas",
      temperatureC: 50.0,
      pressureBar: 1.5,
      captureTechnology: "Amine Solvent Scrubbing",
      availabilityFrequency: "Continuous 24/7",
      transportRadiusKm: 100.0,
      impuritiesNotes: "CO < 50 ppm",
      certificationStatus: "Verified Third-Party",
      status: "ACTIVE",
    },
  ];

  const createdSources = [];
  for (const s of sourcesData) {
    const src = await prisma.carbonSource.create({ data: s });
    createdSources.push(src);
  }

  // 5. Generate Matches dynamically using 8-vector engine
  console.log("Calculating dynamic matches across carbon sources & pathways...");
  let matchCount = 0;

  for (const source of createdSources) {
    for (const product of createdProducts) {
      const matchRes = calculateMatch(source, product);

      if (matchRes.overallScore >= 40) {
        const match = await prisma.match.create({
          data: {
            carbonSourceId: source.id,
            productId: product.id,
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

        // Add sample Contact Request for top match
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

  // Add initial notifications
  await prisma.notification.create({
    data: {
      userId: userEmitter.id,
      title: "New High-Relevance Match Found",
      message: "Jamnagar Refinery Stream matched 94% with Green Methanol (E-Methanol).",
    },
  });

  await prisma.notification.create({
    data: {
      userId: userUtilizer.id,
      title: "New Off-take Offer Available",
      message: "Vadodara Bio-Ethanol stream (350 t/mo, 99.9% purity) is ready for matching.",
    },
  });

  console.log(`Successfully seeded database with ${createdSources.length} carbon sources, ${createdProducts.length} pathways, and ${matchCount} matches.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
