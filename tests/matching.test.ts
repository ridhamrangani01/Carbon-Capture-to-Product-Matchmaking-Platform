/**
 * Test suite for Carbon2Product core algorithms, validation, and calculations.
 */

import { calculateMatch, normalizeToMonthlyTonnes, CarbonSourceInput, ProductInput } from "../lib/matching/engine";
import { CarbonSourceSchema, LoginSchema, RegisterSchema } from "../lib/validation/schemas";

describe("Matchmaking Engine Scoring System", () => {
  const sampleSource: CarbonSourceInput = {
    purityPercent: 99.5,
    quantityValue: 500,
    quantityUnit: "tonnes/month",
    physicalState: "Gas",
    temperatureC: 25,
    pressureBar: 2,
    location: "Gujarat, India",
    availabilityFrequency: "Continuous 24/7",
  };

  const sampleProduct: ProductInput = {
    minCO2Purity: 95.0,
    maxCO2Purity: 100.0,
    minQuantityTonnesMonth: 100,
    maxQuantityTonnesMonth: 1000,
    requiredState: "Gas",
    temperatureMin: 20,
    temperatureMax: 50,
    pressureMin: 1.5,
    pressureMax: 10,
    technologyReadinessLevel: 8,
    energyIntensity: "Moderate",
    estimatedValuePerTon: 350,
    co2UtilizationPotential: "1.37 t CO2 / t product",
  };

  test("should calculate high match score for highly compatible parameters", () => {
    const result = calculateMatch(sampleSource, sampleProduct);
    expect(result.overallScore).toBeGreaterThanOrEqual(85);
    expect(result.classification).toBe("EXCELLENT");
    expect(result.subScores.purityScore).toBe(100);
    expect(result.subScores.quantityScore).toBe(100);
    expect(result.subScores.stateScore).toBe(100);
  });

  test("should penalize match score when CO2 purity is insufficient", () => {
    const lowPuritySource: CarbonSourceInput = { ...sampleSource, purityPercent: 80.0 }; // Product requires 95%+
    const result = calculateMatch(lowPuritySource, sampleProduct);
    expect(result.subScores.purityScore).toBeLessThan(50);
    expect(result.overallScore).toBeLessThan(80);
  });

  test("should normalize units to monthly tonnes correctly", () => {
    expect(normalizeToMonthlyTonnes(1200, "tonnes/year")).toBe(100);
    expect(normalizeToMonthlyTonnes(10, "tonnes/day")).toBe(300);
    expect(normalizeToMonthlyTonnes(500, "tonnes/month")).toBe(500);
  });

  test("should generate actionable concerns and recommendations for low purity", () => {
    const lowPuritySource: CarbonSourceInput = { ...sampleSource, purityPercent: 85.0 };
    const result = calculateMatch(lowPuritySource, sampleProduct);
    expect(result.concerns.some((c) => c.includes("purity"))).toBe(true);
    expect(result.recommendationText.length).toBeGreaterThan(0);
  });
});

describe("Zod Validation Schemas", () => {
  test("should pass validation for valid registration input", () => {
    const input = {
      name: "Dr. Anita Roy",
      email: "anita@cleantech.org",
      password: "SecurePassword123!",
      organizationName: "CleanTech Research Inst",
      role: "RESEARCHER",
      location: "Mumbai, India",
    };
    const result = RegisterSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("should reject invalid emails in login schema", () => {
    const input = { email: "invalid-email", password: "password" };
    const result = LoginSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("should reject negative CO2 quantities in CarbonSourceSchema", () => {
    const input = {
      title: "Flue Gas Stream A",
      location: "Vadodara",
      quantityValue: -50,
      quantityUnit: "tonnes/month",
      purityPercent: 98,
      physicalState: "Gas",
      temperatureC: 25,
      pressureBar: 2,
      captureTechnology: "Amine",
      availabilityFrequency: "Continuous 24/7",
    };
    const result = CarbonSourceSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("should reject purity higher than 100%", () => {
    const input = {
      title: "Pure Stream",
      location: "Mumbai",
      quantityValue: 100,
      quantityUnit: "tonnes/month",
      purityPercent: 105, // invalid
      physicalState: "Gas",
      temperatureC: 25,
      pressureBar: 2,
      captureTechnology: "Direct Air Capture",
      availabilityFrequency: "Continuous 24/7",
    };
    const result = CarbonSourceSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});
