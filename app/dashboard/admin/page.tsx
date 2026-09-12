"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, Factory, Layers, Sparkles } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();
        setStats(data.stats);
      } catch (e) {
        console.error(e);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar role="ADMIN" />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <ShieldCheck className="h-4 w-4" /> Global Platform Administration
              </span>
              <h1 className="text-3xl font-extrabold text-white">System Governance & Operations</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">Total Registered Users</span>
              <span className="text-3xl font-extrabold font-mono text-white mt-1 block">{stats?.totalUsers || 4} Users</span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">Carbon Sources Listed</span>
              <span className="text-3xl font-extrabold font-mono text-emerald-400 mt-1 block">{stats?.totalSources || 10} Sources</span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">Active Product Pathways</span>
              <span className="text-3xl font-extrabold font-mono text-white mt-1 block">{stats?.totalProducts || 8} Pathways</span>
            </Card>

            <Card className="p-5 border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-400">Calculated Matches</span>
              <span className="text-3xl font-extrabold font-mono text-emerald-400 mt-1 block">{stats?.totalMatches || 24} Matches</span>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Admin Management Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border-slate-800 bg-slate-900/80 space-y-3">
                <Users className="h-6 w-6 text-emerald-400" />
                <h3 className="text-base font-bold text-white">User & Role Management</h3>
                <p className="text-xs text-slate-400">Review registered Emitter, Utilizer, and Researcher accounts.</p>
                <Link href="/admin/users">
                  <Button variant="outline" size="sm" className="w-full justify-center">Manage Users</Button>
                </Link>
              </Card>

              <Card className="p-6 border-slate-800 bg-slate-900/80 space-y-3">
                <Factory className="h-6 w-6 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Carbon Sources Verification</h3>
                <p className="text-xs text-slate-400">Inspect submitted carbon capture streams and purity certifications.</p>
                <Link href="/carbon-sources">
                  <Button variant="outline" size="sm" className="w-full justify-center">Inspect Sources</Button>
                </Link>
              </Card>

              <Card className="p-6 border-slate-800 bg-slate-900/80 space-y-3">
                <Layers className="h-6 w-6 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Product Catalog Management</h3>
                <p className="text-xs text-slate-400">Manage commercial TRL values and energy intensity profiles.</p>
                <Link href="/products">
                  <Button variant="outline" size="sm" className="w-full justify-center">Manage Products</Button>
                </Link>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
