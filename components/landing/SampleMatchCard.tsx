"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { AnimatedMetric } from "@/components/landing/AnimatedMetric";

export function SampleMatchCard() {
  const [selectedProduct, setSelectedProduct] = useState<number>(0);

  const matches = [
    {
      name: "E-Methanol (Green Methanol)",
      category: "E-Fuels",
      score: 94,
      classification: "EXCELLENT",
      purityMatch: "99.5% → Required ≥ 95.0%",
      quantityMatch: "500 t/mo → Range 100–10,000 t/mo",
      stateMatch: "Gas → Gas (Compatible)",
      tempMatch: "25°C → Range 15–60°C",
      pressureMatch: "2.0 bar → Required 2–30 bar",
      greenReasons: [
        "✓ CO₂ purity (99.5%) satisfies catalyst specification (≥ 95.0%)",
        "✓ Volume (500 t/mo) fits optimal commercial intake window",
        "✓ Physical gas state matches direct synthesis reactor inlet",
      ],
      concerns: [
        "⚠ Booster compression from 2 bar to 20 bar required prior to synthesis",
      ],
      recommendation: "Excellent technical fit! Integrating a two-stage compressor will yield 96% conversion efficiency.",
    },
    {
      name: "Concrete Mineralization & Curing",
      category: "Building Materials",
      score: 88,
      classification: "STRONG",
      purityMatch: "99.5% → Required ≥ 85.0%",
      quantityMatch: "500 t/mo → Range 20–5,000 t/mo",
      stateMatch: "Gas → Gas (Compatible)",
      tempMatch: "25°C → Range 10–80°C",
      pressureMatch: "2.0 bar → Required 1–10 bar",
      greenReasons: [
        "✓ Exceeds minimum purity requirements for concrete batching",
        "✓ Pressure (2 bar) is directly compatible without booster compression",
        "✓ Permanent mineral trapping in building infrastructure",
      ],
      concerns: [
        "⚠ Requires distributed logistics across local ready-mix concrete plants",
      ],
      recommendation: "Strong commercial match. Ideal for immediate zero-capital off-take deployment.",
    },
    {
      name: "Precipitated Calcium Carbonate (PCC)",
      category: "Chemicals",
      score: 82,
      classification: "STRONG",
      purityMatch: "99.5% → Required ≥ 92.0%",
      quantityMatch: "500 t/mo → Range 50–3,000 t/mo",
      stateMatch: "Gas → Gas (Compatible)",
      tempMatch: "25°C → Range 15–50°C",
      pressureMatch: "2.0 bar → Required 1.5–8 bar",
      greenReasons: [
        "✓ Satisfies high purity standards for paper and pharmaceutical grade PCC",
        "✓ Flow rate matches medium-scale carbonation reactor loops",
        "✓ Direct gas injection compatible",
      ],
      concerns: [
        "⚠ Trace sulfur impurities must remain below 5 ppm",
      ],
      recommendation: "Solid technical compatibility. Perform trace gas chromatography prior to off-take agreement.",
    },
  ];

  const currentMatch = matches[selectedProduct];

  return (
    <ScrollReveal className="max-w-6xl mx-auto px-4">
      <div className="rounded-3xl border border-[#22c55e]/30 bg-[#06291d]/90 backdrop-blur-xl p-6 md:p-10 shadow-2xl text-left">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e]">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#22c55e] uppercase tracking-wider block font-semibold">
                Matchmaking Engine Inspection
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Live 8-Vector Stream Evaluation Matrix
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#22c55e]" />
            <span className="text-xs font-mono text-white/70">ISO 14044 & GHG Protocol Validated</span>
          </div>
        </div>

        {/* Product Pathway Selector Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto mb-8">
          {matches.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedProduct(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                selectedProduct === idx
                  ? "bg-[#22c55e] text-[#083324] font-bold shadow-md"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{item.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                selectedProduct === idx ? "bg-[#083324]/20 text-[#083324]" : "bg-white/10 text-white/60"
              }`}>
                {item.score}%
              </span>
            </button>
          ))}
        </div>

        {/* Selected Product Evaluation Matrix */}
        <div className="space-y-8">
          {/* Score Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-black/40 border border-white/10">
            <div>
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider block mb-1">
                Evaluated Target Pathway
              </span>
              <h4 className="text-2xl font-bold text-white flex items-center gap-3">
                <span>{currentMatch.name}</span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                  {currentMatch.category}
                </span>
              </h4>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-mono text-white/50 block">Compatibility Score</span>
                <div className="text-3xl font-extrabold text-[#22c55e]">
                  <AnimatedMetric value={currentMatch.score} suffix="%" />
                </div>
              </div>
              <Badge variant="emerald" className="px-3 py-1.5 text-xs font-bold bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/40 font-mono">
                {currentMatch.classification}
              </Badge>
            </div>
          </div>

          {/* 5 Physical Vectors Match Grid */}
          <div>
            <h5 className="text-xs font-semibold text-white/50 uppercase tracking-wider font-mono mb-3">
              Technical & Vector Parameters
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="bg-black/30 p-3.5 rounded-xl border border-white/10">
                <span className="text-[11px] text-white/50 font-mono block">CO₂ Purity</span>
                <span className="text-xs font-semibold text-white font-mono mt-1 block">{currentMatch.purityMatch}</span>
              </div>
              <div className="bg-black/30 p-3.5 rounded-xl border border-white/10">
                <span className="text-[11px] text-white/50 font-mono block">Volume Intake</span>
                <span className="text-xs font-semibold text-white font-mono mt-1 block">{currentMatch.quantityMatch}</span>
              </div>
              <div className="bg-black/30 p-3.5 rounded-xl border border-white/10">
                <span className="text-[11px] text-white/50 font-mono block">Physical State</span>
                <span className="text-xs font-semibold text-white font-mono mt-1 block">{currentMatch.stateMatch}</span>
              </div>
              <div className="bg-black/30 p-3.5 rounded-xl border border-white/10">
                <span className="text-[11px] text-white/50 font-mono block">Temperature</span>
                <span className="text-xs font-semibold text-white font-mono mt-1 block">{currentMatch.tempMatch}</span>
              </div>
              <div className="bg-black/30 p-3.5 rounded-xl border border-white/10">
                <span className="text-[11px] text-white/50 font-mono block">Inlet Pressure</span>
                <span className="text-xs font-semibold text-white font-mono mt-1 block">{currentMatch.pressureMatch}</span>
              </div>
            </div>
          </div>

          {/* Positive Match Reasons & Concerns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-[#22c55e]/30 space-y-2">
              <span className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Key Positive Fit Drivers
              </span>
              <ul className="space-y-2 text-xs text-white/80 pt-1 font-normal">
                {currentMatch.greenReasons.map((reason, i) => (
                  <li key={i} className="leading-relaxed">{reason}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Technical & Operational Considerations
              </span>
              <ul className="space-y-2 text-xs text-white/80 pt-1 font-normal">
                {currentMatch.concerns.map((concern, i) => (
                  <li key={i} className="leading-relaxed">{concern}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendation & CTA Footer */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#22c55e] block font-semibold">Engine Recommendation</span>
              <p className="text-xs text-white/80 font-normal mt-0.5">{currentMatch.recommendation}</p>
            </div>

            <a href="/register" className="shrink-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#22c55e] text-[#083324] text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#22c55e]/90 transition-all cursor-pointer shadow-md"
              >
                <span>Run Matching Engine</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
