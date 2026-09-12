/**
 * Indian Phone Number Validation & Normalization Utility
 * Validates 10-digit Indian mobile numbers (starts with 6, 7, 8, 9)
 * Normalizes input to +91XXXXXXXXXX format.
 */

export function normalizeIndianPhone(phoneInput: string): string | null {
  if (!phoneInput) return null;

  // Remove spaces, hyphens, parentheses, and leading plus
  let cleaned = phoneInput.replace(/[\s\-\(\)]/g, "");

  // If starts with +91 or 91, strip country code to inspect digits
  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }

  // Validate: exactly 10 digits starting with 6, 7, 8, 9
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!indianMobileRegex.test(cleaned)) {
    return null; // Invalid Indian mobile number
  }

  return `+91${cleaned}`;
}

export function isValidIndianPhone(phoneInput: string): boolean {
  return normalizeIndianPhone(phoneInput) !== null;
}

export function isValidIndianPinCode(pincode: string): boolean {
  if (!pincode) return false;
  const cleanPin = pincode.trim();
  // 6 digits, first digit cannot be 0
  return /^[1-9][0-9]{5}$/.test(cleanPin);
}

export function isValidGSTIN(gstin: string): boolean {
  if (!gstin) return true; // GSTIN is optional
  const cleanGstin = gstin.trim().toUpperCase();
  // 15 chars: 2 digits state code, 10 char PAN, 1 entity num, 1 'Z', 1 checksum
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(cleanGstin);
}

export const INDIAN_STATES_AND_UTS = [
  // States (28)
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // Union Territories (8)
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const INDIAN_INDUSTRIES = [
  "Cement & Building Materials",
  "Steel & Metals",
  "Chemicals & Petrochemicals",
  "Oil & Gas",
  "Refineries",
  "Power & Utilities",
  "Industrial Manufacturing",
  "Food & Beverage",
  "Fertilizers & Agriculture",
  "Waste Management & Bioenergy",
  "Construction & Infrastructure",
  "Transportation & Logistics",
  "Renewable Energy & Solar",
  "Carbon Capture & Direct Air Capture",
  "Carbon Utilization & E-Fuels",
  "Technology / SaaS",
  "Financial Services & ESG Investing",
  "Research / Academia",
  "Consulting",
  "Other",
];

/**
 * Generate human-readable Request ID e.g. C2P-2026-000124
 */
export function generateReadableRequestId(seqNumber?: number): string {
  const year = new Date().getFullYear();
  const randomNum = seqNumber || Math.floor(100000 + Math.random() * 900000);
  const pad = String(randomNum).padStart(6, "0");
  return `C2P-${year}-${pad}`;
}

/**
 * Format currency in Indian Rupees (₹) e.g., ₹26,90,600
 */
export function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}
