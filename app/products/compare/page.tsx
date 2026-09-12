"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Layers, ChevronLeft, Check, Sparkles } from "lucide-react";

export default function PathwayComparisonPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const prods = data.products || [];
        setProducts(prods);
        if (prods.length >= 3) {
          setSelectedIds([prods[0].id, prods[1].id, prods[2].id]);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchProducts();
  }, []);

  function toggleProduct(id: string) {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((i) => i !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  }

  const selectedProducts = products.filter((p) => selectedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar role="RESEARCHER" />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          <div className="flex items-center gap-3">
            <Link href="/products">
              <Button variant="ghost" size="sm" className="gap-1 text-slate-400">
                <ChevronLeft className="h-4 w-4" /> Back to Products
              </Button>
            </Link>
          </div>

          <div className="border-b border-slate-800 pb-6">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <Layers className="h-4 w-4" /> Technical Benchmark Matrix
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Side-by-Side Pathway Comparator</h1>
            <p className="text-slate-400 text-sm mt-1">
              Select 2 to 4 utilization pathways below to compare technical specifications, purity requirements, scale, and economics.
            </p>
          </div>

          {/* Selector Selector Buttons */}
          <div className="flex flex-wrap gap-2 pb-4">
            {products.map((p) => {
              const isSelected = selectedIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleProduct(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>

          {/* Comparison Matrix Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono text-slate-400 uppercase">
                <tr>
                  <th className="p-4 w-48">Specification Parameter</th>
                  {selectedProducts.map((p) => (
                    <th key={p.id} className="p-4 min-w-[220px]">
                      <span className="text-emerald-400 font-bold block">{p.name}</span>
                      <span className="text-[10px] text-slate-500 font-normal lowercase">{p.category}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="p-4 font-bold text-white font-sans">Tech Readiness (TRL)</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      <Badge variant="emerald">TRL {p.technologyReadinessLevel} / 9</Badge>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white font-sans">Minimum CO₂ Purity</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-emerald-400 font-bold">
                      ≥ {p.minCO2Purity}% CO₂
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white font-sans">Optimal Volume Scale</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.minQuantityTonnesMonth} – {p.maxQuantityTonnesMonth} t/mo
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white font-sans">Physical State Req.</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.requiredState}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white font-sans">Operating Temperature</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.temperatureMin}°C to {p.temperatureMax}°C
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white font-sans">Operating Pressure</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.pressureMin} to {p.pressureMax} bar
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white font-sans">Energy Intensity</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-slate-200">
                      {p.energyIntensity}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white font-sans">CO₂ Yield Potential</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-emerald-300 font-semibold">
                      {p.co2UtilizationPotential}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white font-sans">Est. Product Value</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 font-bold text-white">
                      {formatCurrency(p.estimatedValuePerTon)} / ton
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
