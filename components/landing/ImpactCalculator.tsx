"use client";

import React, { useState } from "react";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { Calculator, ArrowRight, TreePine, Car, DollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { AnimatedMetric } from "@/components/landing/AnimatedMetric";

export function ImpactCalculator() {
  const [capturedMonthly, setCapturedMonthly] = useState<number>(500);
  const [utilizationPct, setUtilizationPct] = useState<number>(85);
  const [selectedPathway, setSelectedPathway] = useState<string>("e-methanol");

  const pathways: Record<string, { name: string; valPerTon: number; co2PerTonProduct: number }> = {
    "e-methanol": { name: "E-Methanol", valPerTon: 165, co2PerTonProduct: 1.37 },
    "e-saf": { name: "Synthetic Aviation Fuel (e-SAF)", valPerTon: 240, co2PerTonProduct: 3.10 },
    "concrete": { name: "Concrete Mineralization", valPerTon: 95, co2PerTonProduct: 0.05 },
    "pcc": { name: "Precipitated Calcium Carbonate", valPerTon: 140, co2PerTonProduct: 0.44 },
    "algae": { name: "Algae Biomass Feedstock", valPerTon: 110, co2PerTonProduct: 1.80 },
  };

  const currentPathway = pathways[selectedPathway] || pathways["e-methanol"];

  const monthlyUtilized = (capturedMonthly * utilizationPct) / 100.0;
  const annualUtilized = monthlyUtilized * 12.0;
  const estimatedProductTonnage = annualUtilized / currentPathway.co2PerTonProduct;
  const estimatedAnnualValue = estimatedProductTonnage * currentPathway.valPerTon;
  const carsRemovedEquivalent = Math.round(annualUtilized * 0.22);
  const treesPlantedEquivalent = Math.round(annualUtilized * 45);

  return (
    <ScrollReveal className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 md:p-10 shadow-[0_0_50px_rgba(16,185,129,0.08)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
            Interactive Model
          </span>
          <h3 className="text-2xl font-bold text-white">Carbon Utilization & Circular Value Calculator</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Inputs Column */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-300">
                Monthly Captured CO₂ Volume
              </label>
              <span className="text-sm font-bold font-mono text-emerald-400">
                {formatNumber(capturedMonthly)} tonnes/month
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={capturedMonthly}
              onChange={(e) => setCapturedMonthly(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-300">
                Off-Take Match Efficiency
              </label>
              <span className="text-sm font-bold font-mono text-emerald-400">
                {utilizationPct}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={utilizationPct}
              onChange={(e) => setUtilizationPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 block mb-2">
              Target Product Utilization Pathway
            </label>
            <select
              value={selectedPathway}
              onChange={(e) => setSelectedPathway(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              {Object.entries(pathways).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.name} (~${item.valPerTon}/t CO₂ equivalent)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Output Results Box */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1">
              Estimated Circular Economic Off-Take Value
            </span>
            <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 tracking-tight">
              <AnimatedMetric value={estimatedAnnualValue} prefix="$" decimals={0} /> / year
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-800 py-4">
            <div>
              <span className="text-xs font-mono text-slate-400 block">Annual CO₂ Utilized</span>
              <span className="text-lg font-bold text-slate-200">
                <AnimatedMetric value={annualUtilized} decimals={0} /> t/yr
              </span>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 block">Product Yield</span>
              <span className="text-lg font-bold text-slate-200">
                <AnimatedMetric value={estimatedProductTonnage} decimals={0} /> t/yr
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Car className="h-4 w-4 text-emerald-400" />
              <span>Equivalent to removing <strong>{carsRemovedEquivalent.toLocaleString()}</strong> passenger cars/yr</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <TreePine className="h-4 w-4 text-emerald-400" />
              <span>Equivalent to <strong>{treesPlantedEquivalent.toLocaleString()}</strong> tree seedlings grown for 10 yrs</span>
            </div>
          </div>

          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg cursor-pointer"
            >
              <span>Connect Your Stream Report</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
