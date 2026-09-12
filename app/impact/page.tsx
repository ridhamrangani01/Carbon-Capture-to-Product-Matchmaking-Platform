"use client";

import React from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ImpactCalculator } from "@/components/landing/ImpactCalculator";
import { Calculator } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          <div className="border-b border-slate-800 pb-6">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <Calculator className="h-4 w-4" /> Climate Accounting Engine
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Carbon Utilization & Economic Impact Calculator</h1>
            <p className="text-slate-400 text-sm mt-1">
              Estimate annual CO₂ offsets, product market values, and equivalent environmental impacts for circular carbon pathways.
            </p>
          </div>

          <ImpactCalculator />
        </main>
      </div>
    </div>
  );
}
