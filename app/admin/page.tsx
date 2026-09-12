"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Users, Building, FileText, Flame, Activity, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminConsoleOverview() {
  const [stats, setStats] = useState({
    users: 4,
    orgs: 3,
    docs: 12,
    sources: 6,
    auditCount: 48,
    systemStatus: "OPTIMAL",
  });

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-4 h-4" /> Global Operations & Governance Console
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Platform Control Overview</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Monitor registered organizations, cross-tenant document processing status, and emission factor databases.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Platform Users</span>
              <Users className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.users}</p>
            <p className="text-[10px] text-white/40">Registered RBAC Accounts</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Organizations</span>
              <Building className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.orgs}</p>
            <p className="text-[10px] text-white/40">Isolated Multi-Tenant Orgs</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Processed Documents</span>
              <FileText className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.docs}</p>
            <p className="text-[10px] text-white/40">Invoices, BOMs & Manifests</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Audit Log Entries</span>
              <Activity className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-3xl font-bold text-[#22c55e]">{stats.auditCount}</p>
            <p className="text-[10px] text-white/40">Append-Only Audit Record</p>
          </div>
        </div>

        {/* Quick Admin Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/users"
            className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-3 hover:border-[#22c55e]/50 transition-all group"
          >
            <Users className="w-6 h-6 text-[#22c55e]" />
            <h3 className="text-lg font-bold text-white">User & Role Management</h3>
            <p className="text-xs text-white/60">View all platform users, update RBAC roles, and manage account statuses.</p>
            <span className="text-xs font-bold text-[#22c55e] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Manage Users <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/admin/audit-log"
            className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-3 hover:border-[#22c55e]/50 transition-all group"
          >
            <Activity className="w-6 h-6 text-[#22c55e]" />
            <h3 className="text-lg font-bold text-white">System Audit Log</h3>
            <p className="text-xs text-white/60">Inspect append-only security logs, login events, and document processing actions.</p>
            <span className="text-xs font-bold text-[#22c55e] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              View Audit Logs <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/admin/emission-factors"
            className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-3 hover:border-[#22c55e]/50 transition-all group"
          >
            <ShieldCheck className="w-6 h-6 text-[#22c55e]" />
            <h3 className="text-lg font-bold text-white">Emission Factors Engine</h3>
            <p className="text-xs text-white/60">Manage IPCC, EPA, and custom factor definitions, versions, and geographical rules.</p>
            <span className="text-xs font-bold text-[#22c55e] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Manage Factors <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
