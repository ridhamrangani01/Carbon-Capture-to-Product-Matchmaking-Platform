"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Building, Plus, Search, ShieldCheck } from "lucide-react";

const mockOrgs = [
  { id: 1, name: "Reliance Industrial Energy Hub", region: "India", usersCount: 14, docsCount: 42, status: "ACTIVE" },
  { id: 2, name: "Gujarat Methanol & Circular Chemicals", region: "India", usersCount: 8, docsCount: 19, status: "ACTIVE" },
  { id: 3, name: "IIT Decarbonization Lab", region: "India", usersCount: 5, docsCount: 8, status: "ACTIVE" },
];

export default function AdminOrganizationsPage() {
  const [search, setSearch] = useState("");

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
              <Building className="w-3.5 h-3.5" /> Multi-Tenant Data Isolation
            </span>
            <h1 className="text-3xl font-display font-bold text-white">Registered Organizations</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Manage organization boundaries, client subscriptions, and security isolation.
            </p>
          </div>
          <button
            onClick={() => alert("Creating new organization modal...")}
            className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Organization
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockOrgs.map((org) => (
            <div key={org.id} className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-4 hover:border-[#22c55e]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#22c55e]/10 text-[#22c55e] text-[10px] font-bold">
                  {org.status}
                </span>
                <span className="text-xs text-white/40">{org.region}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{org.name}</h3>
                <p className="text-xs text-white/50 mt-1">{org.usersCount} Active Users • {org.docsCount} Ingested Documents</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/60">Data Isolation Active</span>
                <span className="text-[#22c55e] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure Boundary
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
