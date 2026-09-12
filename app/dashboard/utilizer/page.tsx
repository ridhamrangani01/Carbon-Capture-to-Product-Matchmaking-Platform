"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Sparkles, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function UtilizerDashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, matchRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/matches?minScore=75"),
        ]);
        const pData = await prodRes.json();
        const mData = await matchRes.json();

        setProducts(pData.products || []);
        setMatches(mData.matches || []);
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
        <DashboardSidebar role="UTILIZER" />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Layers className="h-4 w-4" /> Utilizer Off-Take Portal
              </span>
              <h1 className="text-3xl font-extrabold text-white">CO₂ Utilization Pathways & Off-Take Demand</h1>
            </div>

            <Link href="/marketplace">
              <Button variant="primary" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Browse CO₂ Supply Marketplace
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">Active Utilization Pathways</span>
              <span className="text-3xl font-extrabold font-mono text-white mt-1 block">{products.length} Pathways</span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">High Relevance Sources</span>
              <span className="text-3xl font-extrabold font-mono text-emerald-400 mt-1 block">{matches.length} Matches</span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">Off-Take Demand Status</span>
              <span className="text-3xl font-extrabold font-mono text-white mt-1 block">Active Purchasing</span>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Top Compatible Supply Streams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.slice(0, 4).map((m) => (
                <Card key={m.id} className="p-6 border-slate-800 bg-slate-900/80 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant={m.overallScore >= 90 ? "excellent" : "strong"}>
                        {m.classification} MATCH ({m.overallScore}%)
                      </Badge>
                      <h3 className="text-lg font-bold text-white mt-2">{m.carbonSource.title}</h3>
                      <p className="text-xs text-slate-400">{m.carbonSource.location} • {m.carbonSource.organization.name}</p>
                    </div>
                  </div>

                  <div className="text-xs font-mono space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <p>• Supply: <strong>{m.carbonSource.quantityValue} {m.carbonSource.quantityUnit}</strong></p>
                    <p>• Purity: <strong className="text-emerald-400">{m.carbonSource.purityPercent}% CO₂</strong></p>
                    <p>• Target Pathway: <strong>{m.product.name}</strong></p>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/matches/${m.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        Inspect Technical Radar
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
