"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { ShoppingBag, Search, Filter, Sparkles, ArrowRight, Factory } from "lucide-react";

export default function MarketplacePage() {
  const [sources, setSources] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSources() {
      try {
        let url = `/api/carbon-sources?search=${encodeURIComponent(search)}`;
        if (stateFilter !== "ALL") url += `&state=${stateFilter}`;
        const res = await fetch(url);
        const data = await res.json();
        setSources(data.sources || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchSources();
  }, [search, stateFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <ShoppingBag className="h-4 w-4" /> Circular Economy Exchange
              </span>
              <h1 className="text-3xl font-extrabold text-white">Carbon Supply Marketplace</h1>
            </div>

            <Link href="/carbon-sources/new">
              <Button variant="primary" className="gap-2">
                List CO₂ Stream
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
                placeholder="Search by location, capture tech, or emitter name..."
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <Search className="h-4 w-4 text-slate-500 absolute left-3.5 top-3" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-slate-400 shrink-0" />
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs font-semibold focus:border-emerald-500 focus:outline-none"
              >
                <option value="ALL">All Physical States</option>
                <option value="Gas">Gas Phase</option>
                <option value="Liquid">Liquid Phase</option>
                <option value="Supercritical">Supercritical Phase</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.map((s) => (
              <Card key={s.id} className="p-6 border-slate-800 bg-slate-900/80 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="emerald">{s.physicalState}</Badge>
                    <span className="text-xs font-bold font-mono text-emerald-400">{s.purityPercent}% CO₂</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-400 mb-3">{s.location} • {s.organization?.name}</p>

                  <div className="text-xs font-mono space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <p>• Off-take Supply: <strong>{formatNumber(s.quantityValue)} {s.quantityUnit}</strong></p>
                    <p>• Technology: <strong>{s.captureTechnology}</strong></p>
                    <p>• Pressure: <strong>{s.pressureBar} bar ({s.temperatureC}°C)</strong></p>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Link href={`/carbon-sources/${s.id}`} className="w-full">
                    <Button variant="primary" size="sm" className="w-full justify-between gap-2 text-xs">
                      <span>View Specifications & Matches</span>
                      <ArrowRight className="h-4 w-4" />
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
