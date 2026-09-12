"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Database, Plus, Search, ShieldCheck } from "lucide-react";

const mockFactors = [
  { id: 1, name: "Electricity Grid Average Factor", category: "Scope 2", factor: "0.450 kg CO₂e/kWh", source: "EPA eGRID 2023", region: "USA Midwest", status: "ACTIVE" },
  { id: 2, name: "Natural Gas Stationary Combustion", category: "Scope 1", factor: "2.020 kg CO₂e/m³", source: "IPCC 2021 AR6", region: "Global", status: "ACTIVE" },
  { id: 3, name: "Ordinary Portland Cement (OPC)", category: "Scope 3", factor: "820.00 kg CO₂e/tonne", source: "Ecoinvent 3.9", region: "Global", status: "ACTIVE" },
  { id: 4, name: "Diesel Commercial Transport", category: "Scope 3", factor: "2.680 kg CO₂e/liter", source: "DEFRA 2023", region: "UK / Europe", status: "ACTIVE" },
];

export default function AdminEmissionFactorsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockFactors.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.source.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
              <Database className="w-3.5 h-3.5" /> Scientific Database Governance
            </span>
            <h1 className="text-3xl font-display font-bold text-white">Emission Factor Library</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Create, version, and manage global IPCC, EPA, DEFRA, and custom industry emission factors.
            </p>
          </div>
          <button
            onClick={() => alert("Creating new emission factor modal...")}
            className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Emission Factor
          </button>
        </div>

        <div className="flex items-center gap-4 bg-[#06241a] p-4 rounded-2xl border border-white/10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search factor name, database source, or scope category..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/30 text-xs focus:border-[#22c55e] focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-[#06241a] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/70">
              <thead className="bg-black/30 border-b border-white/10 text-white/40 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Factor Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Factor Value</th>
                  <th className="p-4">Source Standard</th>
                  <th className="p-4">Geography</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((f) => (
                  <tr key={f.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#22c55e]" /> {f.name}
                    </td>
                    <td className="p-4 font-bold text-white/80">{f.category}</td>
                    <td className="p-4 font-mono font-bold text-[#22c55e]">{f.factor}</td>
                    <td className="p-4 text-white/60">{f.source}</td>
                    <td className="p-4 text-white/50">{f.region}</td>
                    <td className="p-4 text-right">
                      <span className="px-2.5 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold">
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
