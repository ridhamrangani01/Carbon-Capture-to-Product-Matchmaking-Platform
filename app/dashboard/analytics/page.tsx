"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BarChart2, TrendingUp, ShieldCheck, Flame, Cpu } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display font-semibold text-white">Carbon Intelligence Analytics</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Historical trend analysis, Scope 1-3 breakdowns, and off-take volume forecasting.
          </p>
        </div>

        {/* Analytics Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Scope 1 2 3 Card */}
          <div className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#22c55e]" /> Scope 1, 2 & 3 Emissions Distribution
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>Scope 1 (Direct Operations & Combustion)</span>
                  <span className="font-bold text-white">62,400 tCO₂e (34%)</span>
                </div>
                <div className="h-3 rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full bg-[#22c55e] w-[34%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>Scope 2 (Purchased Electricity & Heat)</span>
                  <span className="font-bold text-white">45,100 tCO₂e (25%)</span>
                </div>
                <div className="h-3 rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full bg-teal-400 w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>Scope 3 (Supply Chain & Purchased Materials)</span>
                  <span className="font-bold text-white">74,900 tCO₂e (41%)</span>
                </div>
                <div className="h-3 rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full bg-emerald-300 w-[41%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Ingestion Trend Card */}
          <div className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#22c55e]" /> Monthly Ingestion & Extraction Volume
            </h2>
            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4 bg-black/20 rounded-xl border border-white/5">
              {[
                { month: "Apr", val: 40 },
                { month: "May", val: 55 },
                { month: "Jun", val: 70 },
                { month: "Jul", val: 65 },
                { month: "Aug", val: 85 },
                { month: "Sep", val: 100 },
              ].map((b, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    style={{ height: `${b.val}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#0b5d3b] to-[#22c55e]"
                  />
                  <span className="text-[10px] text-white/50">{b.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
