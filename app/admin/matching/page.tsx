"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Sparkles, Settings2 } from "lucide-react";

export default function AdminMatchingRulesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Algorithmic Rules Governance
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Matchmaking Rules Engine</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Configure purity weighting, volume proximity thresholds, and geographical distance parameters for utilization matchmaking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#22c55e]" /> Purity Threshold Weight
            </h2>
            <p className="text-xs text-white/60">Controls how strictly off-taker purity specs penalize lower-grade carbon stream candidates.</p>
            <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-xs flex items-center justify-between font-bold text-[#22c55e]">
              <span>Current Weight Multiplier</span>
              <span>1.5x (Strict Compliance)</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#22c55e]" /> Proximity & Logistics Weight
            </h2>
            <p className="text-xs text-white/60">Controls the impact of pipeline vs road/rail transport distance on overall match confidence score.</p>
            <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-xs flex items-center justify-between font-bold text-[#22c55e]">
              <span>Radius Threshold</span>
              <span>500 km Max Pipeline Proximity</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
