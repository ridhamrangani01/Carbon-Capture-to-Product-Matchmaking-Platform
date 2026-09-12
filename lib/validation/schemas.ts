import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  organizationName: z.string().min(2, "Organization name is required"),
  role: z.enum(["EMITTER", "UTILIZER", "RESEARCHER", "ADMIN"]),
  location: z.string().min(2, "Location is required"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const CarbonSourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  location: z.string().min(2, "Location is required"),
  quantityValue: z.number({ invalid_type_error: "Quantity must be a positive number" }).positive("Quantity must be greater than 0"),
  quantityUnit: z.string().min(1, "Unit is required"),
  purityPercent: z.number().min(50, "Purity must be between 50% and 100%").max(100, "Purity cannot exceed 100%"),
  physicalState: z.enum(["Gas", "Liquid", "Supercritical", "Solid"]),
  temperatureC: z.number({ invalid_type_error: "Temperature is required" }),
  pressureBar: z.number({ invalid_type_error: "Pressure is required" }).positive("Pressure must be positive"),
  captureTechnology: z.string().min(2, "Capture technology is required"),
  availabilityFrequency: z.string().min(2, "Availability frequency is required"),
  transportRadiusKm: z.number().default(200),
  impuritiesNotes: z.string().optional(),
  certificationStatus: z.string().default("Verified Third-Party"),
});

export const ProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  minCO2Purity: z.number().min(50).max(100),
  maxCO2Purity: z.number().min(50).max(100).default(100),
  minQuantityTonnesMonth: z.number().positive(),
  maxQuantityTonnesMonth: z.number().positive(),
  requiredState: z.string().min(1),
  temperatureMin: z.number(),
  temperatureMax: z.number(),
  pressureMin: z.number(),
  pressureMax: z.number(),
  technologyReadinessLevel: z.number().int().min(1).max(9),
  locationRequirements: z.string().min(2),
  energyIntensity: z.enum(["High", "Moderate", "Low"]),
  estimatedValuePerTon: z.number().positive(),
  co2UtilizationPotential: z.string().min(2),
});

export const ContactRequestSchema = z.object({
  matchId: z.string().min(1),
  receiverId: z.string().min(1),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});
