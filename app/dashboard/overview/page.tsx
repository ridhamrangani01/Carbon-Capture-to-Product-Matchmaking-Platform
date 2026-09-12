"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  FileText,
  Flame,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Upload,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState({
    totalProcessedCO2: 148500,
    calculatedCO2e: 182400,
    documentsProcessed: 28,
    activeSources: 6,
    activeMatches: 12,
    avgConfidence: 94.2,
    pendingReviews: 2,
    potentialValue: "$1.4M",
  });

  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-display font-semibold text-white">Platform Dashboard Overview</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Real-time carbon intelligence, active matching candidates, and document processing statistics.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/uploads"
              className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all shadow-md flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Upload Document
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[#083324] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Total CO₂ Processed</span>
              <Flame className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">
              {stats.totalProcessedCO2.toLocaleString()} <span className="text-xs text-[#22c55e]">t/yr</span>
            </p>
            <p className="text-[10px] text-white/40">+14.2% from last month</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#083324] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Scope 1-3 CO₂e</span>
              <TrendingUp className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">
              {stats.calculatedCO2e.toLocaleString()} <span className="text-xs text-[#22c55e]">tCO₂e</span>
            </p>
            <p className="text-[10px] text-white/40">Verified IPCC Factor Lineage</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#083324] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Documents Ingested</span>
              <FileText className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">{stats.documentsProcessed}</p>
            <p className="text-[10px] text-white/40">Invoices, BOMs & Manifests</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#083324] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Matching Off-takes</span>
              <Sparkles className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#22c55e]">{stats.activeMatches}</p>
            <p className="text-[10px] text-white/40">{stats.potentialValue} Potential Off-take Value</p>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-semibold text-white">Recent Document Processing Pipeline</h2>
              <Link href="/dashboard/documents" className="text-xs font-semibold text-[#22c55e] hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { name: "Inv_2026_SteelMill_Scope1.pdf", status: "COMPLETED", date: "10 mins ago", CO2: "1,450 tCO₂e", conf: "96%" },
                { name: "FlueGas_Biogas_Analysis.xlsx", status: "PROCESSING", date: "Just now", CO2: "Pending", conf: "--" },
                { name: "Energy_Bill_August_2026.pdf", status: "COMPLETED", date: "2 hours ago", CO2: "320 tCO₂e", conf: "92%" },
                { name: "Supplier_BOM_Concrete_Mix.csv", status: "MATCHING", date: "5 hours ago", CO2: "8,900 tCO₂e", conf: "95%" },
              ].map((doc, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#22c55e]" />
                    <div>
                      <p className="font-semibold text-white">{doc.name}</p>
                      <p className="text-[10px] text-white/40">{doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="font-bold text-white">{doc.CO2}</p>
                      <p className="text-[10px] text-white/50">Conf: {doc.conf}</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        doc.status === "COMPLETED"
                          ? "bg-[#22c55e]/20 text-[#22c55e]"
                          : doc.status === "PROCESSING"
                          ? "bg-amber-500/20 text-amber-300 animate-pulse"
                          : "bg-teal-500/20 text-teal-300"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-6">
            <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-4">Top Utilization Matches</h2>

            <div className="space-y-4">
              {[
                { title: "Pre-Cast Concrete Mineralization", score: "94%", value: "$450,000", req: "95%+ Purity" },
                { title: "E-Methanol Fuel Synthesis", score: "88%", value: "$780,000", req: "99.5%+ Purity" },
                { title: "Precipitated Calcium Carbonate", score: "82%", value: "$210,000", req: "90%+ Purity" },
              ].map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{m.title}</span>
                    <span className="text-[#22c55e] font-extrabold">{m.score} Match</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white/60">
                    <span>Est. Value: {m.value}</span>
                    <span>Spec: {m.req}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard/matching"
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore All Off-take Pathways</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Demo Requests Widget */}
        <UserDemoRequestsWidget />
      </div>
    </DashboardLayout>
  );
}

function UserDemoRequestsWidget() {
  const [demoRequests, setDemoRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserDemos() {
      try {
        const res = await fetch("/api/demo-requests");
        if (res.ok) {
          const json = await res.json();
          setDemoRequests(json.data || []);
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    fetchUserDemos();
  }, []);

  if (loading || demoRequests.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl bg-[#083324] border border-emerald-500/30 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#22c55e]" />
          <h3 className="text-sm font-bold text-white">Your Technical Demo Requests</h3>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-semibold">{demoRequests.length} Active Request(s)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoRequests.map((req) => (
          <div key={req.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{req.companyName}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {req.status}
              </span>
            </div>
            <p className="text-white/60 text-[11px]">Request ID: <span className="font-mono text-emerald-400">{req.id}</span></p>
            <p className="text-white/40 text-[10px]">Submitted: {new Date(req.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

