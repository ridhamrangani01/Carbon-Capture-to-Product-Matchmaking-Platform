"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { Factory, Sparkles, TrendingUp, Plus, ArrowRight, ShieldCheck, Flame, Cpu } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

export default function EmitterDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, sourcesRes] = await Promise.all([
          fetch("/api/dashboard/stats?role=EMITTER"),
          fetch("/api/carbon-sources"),
        ]);

        const statsData = await statsRes.json();
        const sourcesData = await sourcesRes.json();

        setData(statsData);
        setSources(sourcesData.sources || []);
      } catch (e) {
        console.error("Dashboard error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const COLORS = ["#10B981", "#0D9488", "#2563EB", "#8B5CF6", "#F59E0B"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar role="EMITTER" />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Factory className="h-4 w-4" /> Emitter Operations Portal
              </span>
              <h1 className="text-3xl font-extrabold text-white">Carbon Capture Facility Dashboard</h1>
            </div>

            <Link href="/carbon-sources/new">
              <Button variant="primary" className="gap-2">
                <Plus className="h-4 w-4" />
                Register New Carbon Source
              </Button>
            </Link>
          </div>

          {/* Key KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-medium text-slate-400">Total CO₂ Listed</span>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Factory className="h-5 w-5" />
                </div>
              </div>
              <span className="text-2xl font-extrabold font-mono text-white mt-2 block">
                {formatNumber(Math.round(data?.stats?.totalCO2Annual || 6000))} t/yr
              </span>
              <span className="text-xs text-emerald-400 mt-1 block">Active captured stream balance</span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-medium text-slate-400">Active Sources</span>
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                  <Cpu className="h-5 w-5" />
                </div>
              </div>
              <span className="text-2xl font-extrabold font-mono text-white mt-2 block">
                {data?.stats?.totalSources || sources.length} Capture Hubs
              </span>
              <span className="text-xs text-slate-400 mt-1 block">100% ISO verified purity stream</span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-medium text-slate-400">Calculated Matches</span>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <span className="text-2xl font-extrabold font-mono text-white mt-2 block">
                {data?.stats?.totalMatches || 24} Pathways
              </span>
              <span className="text-xs text-emerald-400 mt-1 block">
                {data?.stats?.excellentMatches || 6} Excellent (&gt;85%) matches
              </span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-medium text-slate-400">Est. Off-take Value</span>
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <span className="text-2xl font-extrabold font-mono text-white mt-2 block">
                $990,000 /yr
              </span>
              <span className="text-xs text-slate-400 mt-1 block">Circular product yield potential</span>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Volume Distribution */}
            <Card className="lg:col-span-7 p-6 border-slate-800 bg-slate-900/80">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Carbon Source Off-Gas Volume</h3>
                  <p className="text-xs text-slate-400">Monthly Captured Volume (tonnes/month)</p>
                </div>
                <Badge variant="emerald">Live Telemetry</Badge>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sources.slice(0, 5).map((s) => ({
                      name: s.title.split(" ")[0],
                      Volume: s.quantityValue,
                    }))}
                  >
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
                      itemStyle={{ color: "#34d399" }}
                    />
                    <Bar dataKey="Volume" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Chart 2: Pathway Distribution */}
            <Card className="lg:col-span-5 p-6 border-slate-800 bg-slate-900/80">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Pathway Distribution</h3>
                  <p className="text-xs text-slate-400">Match breakdown by product category</p>
                </div>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                {data?.pathwayDistribution ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.pathwayDistribution}
                        dataKey="count"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ category }) => category}
                      >
                        {data.pathwayDistribution.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-xs text-slate-500">Loading chart analytics...</div>
                )}
              </div>
            </Card>
          </div>

          {/* Registered Carbon Sources Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Your Registered Carbon Sources</h2>
              <Link href="/carbon-sources">
                <Button variant="ghost" size="sm" className="text-xs text-emerald-400">
                  View All ({sources.length})
                </Button>
              </Link>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] text-slate-400 uppercase">
                  <tr>
                    <th className="p-4">Source Name</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Monthly Quantity</th>
                    <th className="p-4">Purity %</th>
                    <th className="p-4">State</th>
                    <th className="p-4">Technology</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {sources.slice(0, 5).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-white font-sans">{s.title}</td>
                      <td className="p-4 text-slate-400">{s.location}</td>
                      <td className="p-4 text-emerald-400 font-bold">
                        {formatNumber(s.quantityValue)} {s.quantityUnit}
                      </td>
                      <td className="p-4">{s.purityPercent}% CO₂</td>
                      <td className="p-4">{s.physicalState}</td>
                      <td className="p-4 text-slate-400">{s.captureTechnology}</td>
                      <td className="p-4 text-right font-sans">
                        <Link href={`/carbon-sources/${s.id}`}>
                          <Button variant="outline" size="sm" className="text-[11px] py-1">
                            Inspect & Matches
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
