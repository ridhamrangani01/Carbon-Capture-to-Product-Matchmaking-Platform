"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight, Info } from "lucide-react";

export default function MatchmakingPage() {
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);

  const matches = [
    {
      id: 1,
      pathway: "Pre-Cast Concrete Mineralization",
      score: 94,
      purityReq: "95.0% - 99.0%",
      volReq: "500 - 5,000 t/mo",
      geography: "Regional (USA Midwest)",
      commercialValue: "$450,000 / yr",
      limitations: "Requires gas compression to 6 bar",
      rationale: "High biogenic CO₂ content minimizes curing time and enhances early-age compressive strength by 18%.",
    },
    {
      id: 2,
      pathway: "E-Methanol Marine Fuel Synthesis",
      score: 88,
      purityReq: "99.5%+ Purity",
      volReq: "2,000 - 20,000 t/mo",
      geography: "Coastal Port Facilities",
      commercialValue: "$780,000 / yr",
      limitations: "Requires green hydrogen coupling",
      rationale: "Point-source biogenic CO₂ direct stream eliminates atmospheric separation overhead.",
    },
    {
      id: 3,
      pathway: "Precipitated Calcium Carbonate (PCC)",
      score: 82,
      purityReq: "90.0%+ Purity",
      volReq: "300 - 2,000 t/mo",
      geography: "Global / Multi-Region",
      commercialValue: "$210,000 / yr",
      limitations: "Requires onsite lime slaking",
      rationale: "Suitable for lower-purity flue gas streams with minimal pre-scrubbing.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display font-semibold text-white">Carbon Matchmaking Engine</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Algorithmic ranking of carbon source streams against verified utilization pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Matches List */}
          <div className="lg:col-span-2 space-y-4">
            {matches.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMatch(m)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                  selectedMatch?.id === m.id
                    ? "bg-[#083324] border-[#22c55e] shadow-xl shadow-[#22c55e]/10"
                    : "bg-[#083324]/60 border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#22c55e]" />
                    <h3 className="text-xl font-bold text-white">{m.pathway}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e] font-extrabold text-xs">
                      {m.score}% Match
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                    <p className="text-white/40">Required Purity</p>
                    <p className="font-bold text-white mt-0.5">{m.purityReq}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                    <p className="text-white/40">Volume Window</p>
                    <p className="font-bold text-white mt-0.5">{m.volReq}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                    <p className="text-white/40">Est. Commercial Value</p>
                    <p className="font-bold text-[#22c55e] mt-0.5">{m.commercialValue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Match Rationale / Detail Sidebar */}
          <div className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-white/10 pb-4">Match Rationale & Specs</h2>

            {selectedMatch ? (
              <div className="space-y-4 text-xs">
                <div>
                  <p className="text-white/40 font-semibold uppercase text-[10px]">Pathway</p>
                  <p className="text-base font-bold text-[#22c55e] mt-1">{selectedMatch.pathway}</p>
                </div>
                <div>
                  <p className="text-white/40 font-semibold uppercase text-[10px]">Why This Match Works</p>
                  <p className="text-white/80 leading-relaxed mt-1">{selectedMatch.rationale}</p>
                </div>
                <div>
                  <p className="text-white/40 font-semibold uppercase text-[10px]">Potential Limitations</p>
                  <p className="text-amber-300 leading-relaxed mt-1 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 shrink-0" /> {selectedMatch.limitations}
                  </p>
                </div>
                <button
                  onClick={() => alert(`Off-take match agreement initiated for ${selectedMatch.pathway}`)}
                  className="w-full py-3 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all cursor-pointer"
                >
                  Initiate Off-take Match Request
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-white/40 text-xs">
                Select a pathway from the left to inspect match rationale and commercial terms.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
