"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Layers, Search, ArrowRight, FlaskConical, Filter } from "lucide-react";

export default function ProductsCatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (e) {
        console.error(e);
      }
    }
    fetchProducts();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Layers className="h-4 w-4" /> Commercial Utilization Catalog
              </span>
              <h1 className="text-3xl font-extrabold text-white">CO₂ Product Utilization Pathways</h1>
            </div>

            <Link href="/products/compare">
              <Button variant="outline" className="gap-2 text-xs">
                Compare Pathways Side-by-Side
              </Button>
            </Link>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pathways (E-Methanol, Concrete, SAF, Polymers...)"
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <Search className="h-4 w-4 text-slate-500 absolute left-3.5 top-3" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-slate-400 shrink-0" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs font-semibold focus:border-emerald-500 focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="E-Fuels">E-Fuels</option>
                <option value="Building Materials">Building Materials</option>
                <option value="Chemicals">Chemicals</option>
                <option value="Biomass & Agriculture">Biomass & Agriculture</option>
                <option value="Polymers">Polymers</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <Card key={p.id} className="p-6 border-slate-800 bg-slate-900/80 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="emerald">{p.category}</Badge>
                    <span className="text-xs font-mono text-emerald-400 font-bold">TRL {p.technologyReadinessLevel}/9</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{p.description}</p>

                  <div className="text-xs font-mono space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <p>• Min Purity: <strong className="text-emerald-400">{p.minCO2Purity}% CO₂</strong></p>
                    <p>• Scale: <strong>{p.minQuantityTonnesMonth}–{p.maxQuantityTonnesMonth} t/mo</strong></p>
                    <p>• Yield: <strong>{p.co2UtilizationPotential}</strong></p>
                    <p>• Est. Value: <strong className="text-white">{formatCurrency(p.estimatedValuePerTon)} / ton</strong></p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href={`/products/${p.id}`}>
                    <Button variant="outline" size="sm" className="w-full justify-between gap-2 text-xs">
                      <span>View Technical Specifications</span>
                      <ArrowRight className="h-4 w-4 text-emerald-400" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
