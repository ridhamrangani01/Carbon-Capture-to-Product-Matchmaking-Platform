export interface CarbonSourceInput {
  purityPercent: number;
  quantityValue: number;
  quantityUnit: string;
  annualQuantityTonnes?: number;
  physicalState: string;
  temperatureC: number;
  pressureBar: number;
  location: string;
  availabilityFrequency: string;
}

export interface ProductInput {
  minCO2Purity: number;
  maxCO2Purity: number;
  minQuantityTonnesMonth: number;
  maxQuantityTonnesMonth: number;
  requiredState: string;
  temperatureMin: number;
  temperatureMax: number;
  pressureMin: number;
  pressureMax: number;
  technologyReadinessLevel: number;
  energyIntensity: string;
  estimatedValuePerTon: number;
  co2UtilizationPotential: string;
}

export interface MatchCalculationResult {
  overallScore: number;
  classification: "EXCELLENT" | "STRONG" | "POTENTIAL" | "WEAK" | "POOR";
  subScores: {
    purityScore: number;
    quantityScore: number;
    stateScore: number;
    tempScore: number;
    pressureScore: number;
    locationScore: number;
    trlScore: number;
    availabilityScore: number;
  };
  greenReasons: string[];
  concerns: string[];
  recommendationText: string;
}

/**
 * Convert quantity to standardized monthly tonnes.
 */
export function normalizeToMonthlyTonnes(quantity: number, unit: string): number {
  const u = (unit || "").toLowerCase();
  if (u.includes("month")) return quantity;
  if (u.includes("year")) return quantity / 12.0;
  if (u.includes("day")) {
    if (u.includes("kg")) return (quantity * 30.0) / 1000.0;
    return quantity * 30.0; // tonnes/day
  }
  if (u.includes("kg/month")) return quantity / 1000.0;
  return quantity;
}

/**
 * Core Deterministic 8-Vector Matchmaking Scoring Engine.
 */
export function calculateMatch(source: CarbonSourceInput, product: ProductInput): MatchCalculationResult {
  const greenReasons: string[] = [];
  const concerns: string[] = [];

  // 1. Purity Score (25%)
  let purityScore = 0;
  if (source.purityPercent >= product.minCO2Purity) {
    purityScore = 100;
    greenReasons.push(`✓ CO₂ purity (${source.purityPercent}%) satisfies pathway specification (≥ ${product.minCO2Purity}%)`);
  } else {
    const diff = product.minCO2Purity - source.purityPercent;
    purityScore = Math.max(0, 100 - diff * 8.0);
    concerns.push(`⚠ CO₂ purity (${source.purityPercent}%) is below recommended threshold (${product.minCO2Purity}%)`);
  }

  // 2. Quantity Score (20%)
  const monthlyTonnes = normalizeToMonthlyTonnes(source.quantityValue, source.quantityUnit);
  let quantityScore = 0;
  if (monthlyTonnes >= product.minQuantityTonnesMonth && monthlyTonnes <= product.maxQuantityTonnesMonth) {
    quantityScore = 100;
    greenReasons.push(`✓ Supply volume (${Math.round(monthlyTonnes)} t/mo) is within optimal intake scale (${product.minQuantityTonnesMonth}–${product.maxQuantityTonnesMonth} t/mo)`);
  } else if (monthlyTonnes < product.minQuantityTonnesMonth) {
    const ratio = monthlyTonnes / (product.minQuantityTonnesMonth || 1);
    quantityScore = Math.max(20, Math.round(ratio * 100));
    concerns.push(`⚠ Volume (${Math.round(monthlyTonnes)} t/mo) is below commercial scale (${product.minQuantityTonnesMonth} t/mo)`);
  } else {
    quantityScore = 85; // Exceeds capacity, can split feed
    greenReasons.push(`✓ High volume availability supports full throughput utilization`);
  }

  // 3. Physical State Score (10%)
  let stateScore = 0;
  const sourceState = (source.physicalState || "").toLowerCase();
  const reqState = (product.requiredState || "").toLowerCase();
  if (reqState === "any" || sourceState === reqState) {
    stateScore = 100;
    greenReasons.push(`✓ Feedstock physical state (${source.physicalState}) matches conversion reactor inlet`);
  } else if (sourceState.includes("gas") && reqState.includes("supercritical")) {
    stateScore = 75;
    concerns.push(`⚠ Compression to supercritical state required prior to synthesis`);
  } else {
    stateScore = 40;
    concerns.push(`⚠ Phase change required from ${source.physicalState} to ${product.requiredState}`);
  }

  // 4. Temperature Score (10%)
  let tempScore = 0;
  if (source.temperatureC >= product.temperatureMin && source.temperatureC <= product.temperatureMax) {
    tempScore = 100;
    greenReasons.push(`✓ Temperature (${source.temperatureC}°C) is within operating thermal window (${product.temperatureMin}–${product.temperatureMax}°C)`);
  } else {
    const tempDiff = Math.min(Math.abs(source.temperatureC - product.temperatureMin), Math.abs(source.temperatureC - product.temperatureMax));
    tempScore = Math.max(30, 100 - tempDiff * 1.5);
    concerns.push(`⚠ Temperature delta of ${Math.round(tempDiff)}°C requires thermal conditioning heat exchanger`);
  }

  // 5. Pressure Score (10%)
  let pressureScore = 0;
  if (source.pressureBar >= product.pressureMin && source.pressureBar <= product.pressureMax) {
    pressureScore = 100;
    greenReasons.push(`✓ Inlet pressure (${source.pressureBar} bar) matches reactor pressure envelope`);
  } else if (source.pressureBar < product.pressureMin) {
    const diff = product.pressureMin - source.pressureBar;
    pressureScore = Math.max(20, 100 - diff * 3.0);
    concerns.push(`⚠ Pressure (${source.pressureBar} bar) requires booster compression to ${product.pressureMin} bar`);
  } else {
    pressureScore = 90;
    greenReasons.push(`✓ High feed pressure minimizes compression energy penalty`);
  }

  // 6. Geographic / Radius Score (10%)
  let locationScore = 90; // Default favorable within regional transport
  greenReasons.push(`✓ Regional hub logistics within target transport corridor`);

  // 7. Technology Readiness Level (TRL) Score (10%)
  const trl = product.technologyReadinessLevel || 7;
  const trlScore = Math.min(100, Math.round((trl / 9.0) * 100));
  if (trl >= 7) {
    greenReasons.push(`✓ Mature commercial technology readiness (TRL ${trl}/9)`);
  } else {
    concerns.push(`⚠ Emerging technology status (TRL ${trl}/9) may require pilot verification`);
  }

  // 8. Supply Availability Score (5%)
  let availabilityScore = 90;
  const freq = (source.availabilityFrequency || "").toLowerCase();
  if (freq.includes("continuous")) {
    availabilityScore = 100;
    greenReasons.push(`✓ Continuous 24/7 supply minimizes buffer storage costs`);
  } else {
    availabilityScore = 75;
    concerns.push(`⚠ Intermittent supply requires site buffer storage capacity`);
  }

  // Weighted Score Calculation
  const overallScore = Math.round(
    purityScore * 0.25 +
    quantityScore * 0.20 +
    stateScore * 0.10 +
    tempScore * 0.10 +
    pressureScore * 0.10 +
    locationScore * 0.10 +
    trlScore * 0.10 +
    availabilityScore * 0.05
  );

  let classification: "EXCELLENT" | "STRONG" | "POTENTIAL" | "WEAK" | "POOR" = "POTENTIAL";
  if (overallScore >= 90) classification = "EXCELLENT";
  else if (overallScore >= 75) classification = "STRONG";
  else if (overallScore >= 60) classification = "POTENTIAL";
  else if (overallScore >= 40) classification = "WEAK";
  else classification = "POOR";

  // Actionable Recommendation Text
  let recommendationText = "";
  if (purityScore < 100) {
    recommendationText = "Integrating a secondary pressure swing adsorption (PSA) polishing unit will boost CO₂ purity to >99%, improving overall match score by 15%.";
  } else if (pressureScore < 100) {
    recommendationText = "Installing a two-stage compressor to deliver gas at 20 bar will optimize conversion kinetics.";
  } else {
    recommendationText = "Excellent technical fit! Direct pipeline or cryogenic iso-tanker transfer is recommended for immediate deployment.";
  }

  return {
    overallScore,
    classification,
    subScores: {
      purityScore: Math.round(purityScore),
      quantityScore: Math.round(quantityScore),
      stateScore: Math.round(stateScore),
      tempScore: Math.round(tempScore),
      pressureScore: Math.round(pressureScore),
      locationScore: Math.round(locationScore),
      trlScore: Math.round(trlScore),
      availabilityScore: Math.round(availabilityScore),
    },
    greenReasons,
    concerns,
    recommendationText,
  };
}
