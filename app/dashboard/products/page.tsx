"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Package, Plus, Sparkles, CheckCircle2 } from "lucide-react";

const mockProducts = [
  { id: 1, name: "Pre-Cast Concrete Mineral Blocks", category: "Construction Materials", CO2Embodied: "180 kg CO₂e/m³", netAvoidance: "34%", purityReq: "95.0%" },
  { id: 2, name: "E-Methanol Synthetic Marine Fuel", category: "Synthetic Fuels", CO2Embodied: "0.12 kg CO₂e/MJ", netAvoidance: "88%", purityReq: "99.5%" },
  { id: 3, name: "Precipitated Calcium Carbonate (PCC)", category: "Chemical Feedstock", CO2Embodied: "420 kg CO₂e/tonne", netAvoidance: "52%", purityReq: "98.0%" },
];

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-display font-semibold text-white">Carbon-Utilized Products</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Registered commercial products created from captured industrial carbon streams.
            </p>
          </div>
          <button
            onClick={() => alert("Opening product registration modal...")}
            className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Register Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockProducts.map((p) => (
            <div key={p.id} className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-4 hover:border-[#22c55e]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold">
                  {p.category}
                </span>
                <span className="text-[#22c55e] text-xs font-bold">{p.netAvoidance} Net Avoidance</span>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                <p className="text-xs text-white/50 mt-1">Embodied Footprint: {p.CO2Embodied}</p>
              </div>

              <div className="p-3 rounded-xl bg-black/20 border border-white/5 text-xs flex items-center justify-between">
                <span className="text-white/60">Required Off-take Purity:</span>
                <span className="font-bold text-white">{p.purityReq}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
