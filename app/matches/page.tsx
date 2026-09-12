"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Filter, Search } from "lucide-react";

export default function MatchesListPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [classification, setClassification] = useState("ALL");

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(`/api/matches?classification=${classification}`);
        const data = await res.json();
        setMatches(data.matches || []);
      } catch (e) {
        console.error(e);
      }
    }
    fetchMatches();
  }, [classification]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Sparkles className="h-4 w-4" /> Calculated Intelligence
              </span>
              <h1 className="text-3xl font-extrabold text-white">Matched Opportunities</h1>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs font-semibold focus:border-emerald-500 focus:outline-none"
              >
                <option value="ALL">All Match Classifications</option>
                <option value="EXCELLENT">Excellent Matches (&gt;90%)</option>
                <option value="STRONG">Strong Matches (75-89%)</option>
                <option value="POTENTIAL">Potential Matches (60-74%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((m) => (
              <Card key={m.id} className="p-6 border-slate-800 bg-slate-900/80 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant={m.overallScore >= 90 ? "excellent" : "strong"}>
                      {m.classification} MATCH ({m.overallScore}%)
                    </Badge>
                    <h3 className="text-lg font-bold text-white mt-2">
                      {m.carbonSource.title} → {m.product.name}
                    </h3>
                    <p className="text-xs text-slate-400">{m.carbonSource.location} • {m.product.category}</p>
                  </div>
                </div>

                <div className="text-xs font-mono space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>• Purity Score: <strong className="text-emerald-400">{m.purityScore}/100</strong></p>
                  <p>• Volume Score: <strong>{m.quantityScore}/100</strong> ({m.carbonSource.quantityValue} {m.carbonSource.quantityUnit})</p>
                  <p>• Tech Readiness: <strong>TRL {m.product.technologyReadinessLevel}/9</strong></p>
                </div>

                <Link href={`/matches/${m.id}`}>
                  <Button variant="primary" size="sm" className="w-full justify-between gap-2">
                    <span>Inspect Match Details & Contact</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
