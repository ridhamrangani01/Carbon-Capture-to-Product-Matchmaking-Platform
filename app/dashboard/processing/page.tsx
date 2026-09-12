"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Cpu, CheckCircle2, RefreshCw, Layers, ArrowRight } from "lucide-react";

export default function ProcessingPipelinePage() {
  const [activeStep, setActiveStep] = useState(4);

  const steps = [
    { step: 1, label: "Document Ingestion & Validation", status: "COMPLETED" },
    { step: 2, label: "OCR & Line Item Extraction", status: "COMPLETED" },
    { step: 3, label: "Unit Normalization & Geography Tagging", status: "COMPLETED" },
    { step: 4, label: "IPCC Emission Factor Candidate Search", status: "IN_PROGRESS" },
    { step: 5, label: "CO₂e Calculation & Confidence Scoring", status: "QUEUED" },
    { step: 6, label: "Off-take Matchmaking Engine Search", status: "QUEUED" },
    { step: 7, label: "Audit Log & Report Storage", status: "QUEUED" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display font-semibold text-white">Document Processing Pipeline</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Real-time pipeline progression visualizer showing OCR parsing, factor matching, and confidence score calculation.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider">Active Batch #8902</span>
              <h2 className="text-lg font-bold text-white">SteelMill_Q3_Energy_Manifest.pdf</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold animate-pulse flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processing Line Items
            </span>
          </div>

          {/* Vertical Stepper */}
          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    s.status === "COMPLETED"
                      ? "bg-[#22c55e] text-black"
                      : s.status === "IN_PROGRESS"
                      ? "bg-amber-400 text-black animate-pulse"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {s.status === "COMPLETED" ? <CheckCircle2 className="w-5 h-5" /> : s.step}
                </div>
                <div className="pt-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${s.status === "QUEUED" ? "text-white/40" : "text-white"}`}>
                      {s.label}
                    </p>
                    <span className="text-[10px] font-mono text-white/50">{s.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-white/60">Extracted Line Items: 14 / 14</span>
            <span className="text-[#22c55e] font-bold">Matching Factor Confidence: 95.4%</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
