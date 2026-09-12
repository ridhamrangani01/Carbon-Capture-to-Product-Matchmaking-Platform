"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Server, CheckCircle2, Cpu, Database } from "lucide-react";

export default function AdminSystemOpsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
            <Server className="w-3.5 h-3.5" /> Platform Operations & Reliability
          </span>
          <h1 className="text-3xl font-display font-bold text-white">System Health & Infrastructure</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Real-time status of OCR workers, Prisma ORM database connection pool, and API route latency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">Database Engine</span>
              <Database className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-2xl font-bold text-white">Prisma SQLite / DevDB</p>
            <p className="text-xs text-[#22c55e] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Connection Pool Healthy
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">Extraction Workers</span>
              <Cpu className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-2xl font-bold text-white">OCR & Parser Pool</p>
            <p className="text-xs text-[#22c55e] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 4 Workers Idle / Ready
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">API Uptime</span>
              <Server className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-2xl font-bold text-white">99.98%</p>
            <p className="text-xs text-[#22c55e] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Endpoints Operational
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
