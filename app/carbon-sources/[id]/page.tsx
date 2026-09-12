"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { Factory, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, ChevronLeft } from "lucide-react";

export default function CarbonSourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [source, setSource] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSource() {
      try {
        const res = await fetch(`/api/carbon-sources/${id}`);
        const data = await res.json();
        setSource(data.carbonSource);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchSource();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-sm">
        Loading carbon source specifications & calculating match scores...
      </div>
    );
  }

  if (!source) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Carbon Source Not Found</h2>
        <Link href="/carbon-sources">
          <Button variant="secondary">Back to Carbon Sources</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          <div className="flex items-center gap-3">
            <Link href="/carbon-sources">
              <Button variant="ghost" size="sm" className="gap-1 text-slate-400">
                <ChevronLeft className="h-4 w-4" /> Back to List
              </Button>
            </Link>
          </div>

          {/* Header Card */}
          <Card className="p-8 border-slate-800 bg-slate-900/90">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="emerald">{source.physicalState}</Badge>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{source.certificationStatus}</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white">{source.title}</h1>
                <p className="text-sm text-slate-400 mt-1">{source.location} • {source.organization?.name}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-right">
                <span className="text-xs font-mono text-slate-400 block">Monthly Quantity</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">
                  {formatNumber(source.quantityValue)} {source.quantityUnit}
                </span>
                <span className="text-[11px] text-slate-400 block font-mono">({formatNumber(Math.round(source.annualQuantityTonnes))} t/yr)</span>
              </div>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-1">CO₂ PURITY</span>
                <span className="text-emerald-400 text-base font-bold">{source.purityPercent}%</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-1">TEMPERATURE</span>
                <span className="text-slate-100 text-base font-bold">{source.temperatureC}°C</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-1">PRESSURE</span>
                <span className="text-slate-100 text-base font-bold">{source.pressureBar} bar</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-1">CAPTURE TECH</span>
                <span className="text-slate-100 text-xs font-semibold">{source.captureTechnology}</span>
              </div>
            </div>

            {source.impuritiesNotes && (
              <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-400 font-mono">
                <strong>Impurities & Secondary Gas Composition:</strong> {source.impuritiesNotes}
              </div>
            )}
          </Card>

          {/* Matches List Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  Calculated Pathway Matches ({source.matches?.length || 0})
                </h2>
                <p className="text-xs text-slate-400">Ranked compatibility determined by 8-vector deterministic engine</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {source.matches?.map((m: any) => {
                const greenReasons = JSON.parse(m.greenReasonsJson || "[]");
                const concerns = JSON.parse(m.concernsJson || "[]");

                return (
                  <Card key={m.id} className="p-6 border-slate-800 bg-slate-900/90 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Badge variant={m.overallScore >= 90 ? "excellent" : "strong"}>
                            {m.classification} MATCH ({m.overallScore}%)
                          </Badge>
                          <h3 className="text-xl font-bold text-white mt-2">{m.product.name}</h3>
                          <span className="text-xs text-slate-400 font-mono">{m.product.category} • TRL {m.product.technologyReadinessLevel}</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="font-semibold text-emerald-400">Green Reasons:</div>
                        <ul className="space-y-1">
                          {greenReasons.slice(0, 2).map((r: string, i: number) => (
                            <li key={i} className="text-slate-300">{r}</li>
                          ))}
                        </ul>

                        {concerns.length > 0 && (
                          <>
                            <div className="font-semibold text-amber-400 pt-1">Potential Concerns:</div>
                            <ul className="space-y-1 text-slate-400">
                              {concerns.slice(0, 1).map((c: string, i: number) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800">
                      <Link href={`/matches/${m.id}`}>
                        <Button variant="primary" size="sm" className="w-full justify-between gap-2">
                          <span>Inspect Match Radar & Contact</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
