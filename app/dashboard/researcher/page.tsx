"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Layers, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ResearcherDashboardPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar role="RESEARCHER" />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <FlaskConical className="h-4 w-4" /> Climate R&D & Academic Portal
              </span>
              <h1 className="text-3xl font-extrabold text-white">Carbon Utilization Pathway Analytics</h1>
            </div>

            <Link href="/products/compare">
              <Button variant="primary" className="gap-2">
                <Layers className="h-4 w-4" />
                Launch Side-by-Side Pathway Comparator
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">Benchmarked Pathways</span>
              <span className="text-3xl font-extrabold font-mono text-white mt-1 block">{products.length} CCU Tech</span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">Commercial TRL Range</span>
              <span className="text-3xl font-extrabold font-mono text-emerald-400 mt-1 block">TRL 7 - TRL 9</span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">Carbon Conversion Potential</span>
              <span className="text-3xl font-extrabold font-mono text-white mt-1 block">Up to 3.1 t CO₂/t</span>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Technical Pathways Matrix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <Card key={p.id} className="p-6 border-slate-800 bg-slate-900/80 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <Badge variant="emerald">TRL {p.technologyReadinessLevel}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                  <div className="text-xs font-mono space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <p>• Min Purity: <strong className="text-emerald-400">{p.minCO2Purity}% CO₂</strong></p>
                    <p>• Yield: <strong>{p.co2UtilizationPotential}</strong></p>
                    <p>• Energy Intensity: <strong>{p.energyIntensity}</strong></p>
                  </div>
                  <Link href={`/products/${p.id}`}>
                    <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                      Inspect Detailed Specification
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
