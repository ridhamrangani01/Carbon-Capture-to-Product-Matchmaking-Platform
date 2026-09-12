"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Building, Search, Plus, ShieldCheck } from "lucide-react";

const mockSuppliers = [
  { id: 1, name: "Midwest Energy & Utility Co.", country: "USA", category: "Electricity & Grid", status: "VERIFIED", totalInvoices: 12, avgCO2Factor: "0.45 kg/kWh" },
  { id: 2, name: "Global Cement Materials Ltd", country: "Germany", category: "Raw Materials", status: "VERIFIED", totalInvoices: 8, avgCO2Factor: "820 kg/tonne" },
  { id: 3, name: "Apex Logistics Freight", country: "Canada", category: "Transportation", status: "PENDING", totalInvoices: 4, avgCO2Factor: "2.68 kg/liter" },
];

export default function SuppliersPage() {
  const [search, setSearch] = useState("");

  const filtered = mockSuppliers.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-display font-semibold text-white">Supply Chain Vendors & Suppliers</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Scope 3 Category 1 vendor carbon footprints and verified emission factor records.
            </p>
          </div>
          <button
            onClick={() => alert("Opening supplier registration modal...")}
            className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Vendor
          </button>
        </div>

        <div className="flex items-center gap-4 bg-[#083324] p-4 rounded-2xl border border-white/10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vendor name, category, or country..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/30 text-xs focus:border-[#22c55e] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <div key={s.id} className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-4 hover:border-[#22c55e]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold">
                  {s.category}
                </span>
                <span className="text-xs text-white/40">{s.country}</span>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">{s.name}</h3>
                <p className="text-xs text-white/50 mt-1">{s.totalInvoices} Processed Invoices</p>
              </div>

              <div className="p-3 rounded-xl bg-black/20 border border-white/5 text-xs flex items-center justify-between">
                <span className="text-white/60">Avg Carbon Intensity:</span>
                <span className="font-bold text-[#22c55e]">{s.avgCO2Factor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
