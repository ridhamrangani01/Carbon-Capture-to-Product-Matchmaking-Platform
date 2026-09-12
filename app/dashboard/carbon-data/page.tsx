"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Database, Search, ShieldCheck, Download, Filter } from "lucide-react";

const mockLineItems = [
  { id: 1, item: "Grid Electricity Purchase", qty: 45000, unit: "kWh", factor: "0.450 kg CO₂e/kWh", CO2e: "20.25 tCO₂e", conf: "98%", source: "EPA eGRID 2023", category: "Scope 2" },
  { id: 2, item: "Natural Gas Combustion", qty: 12000, unit: "m³", factor: "2.020 kg CO₂e/m³", CO2e: "24.24 tCO₂e", conf: "96%", source: "IPCC 2021", category: "Scope 1" },
  { id: 3, item: "Ordinary Portland Cement (BOM)", qty: 250, unit: "tonnes", factor: "820.00 kg CO₂e/tonne", CO2e: "205.00 tCO₂e", conf: "94%", source: "Ecoinvent v3.9", category: "Scope 3" },
  { id: 4, item: "Diesel Transport Trucking", qty: 3400, unit: "liters", factor: "2.680 kg CO₂e/liter", CO2e: "9.11 tCO₂e", conf: "95%", source: "DEFRA 2023", category: "Scope 3" },
];

export default function CarbonDataPage() {
  const [search, setSearch] = useState("");

  const filtered = mockLineItems.filter((i) =>
    i.item.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-display font-semibold text-white">Extracted Carbon Intelligence</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Normalized line items, verified IPCC emission factors, and Scope 1-3 categorization.
            </p>
          </div>
          <button
            onClick={() => alert("Exporting Carbon Intelligence CSV...")}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#22c55e]" /> Export CSV Dataset
          </button>
        </div>

        <div className="flex items-center gap-4 bg-[#083324] p-4 rounded-2xl border border-white/10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search extracted line items, categories, or factors..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/30 text-xs focus:border-[#22c55e] focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-[#083324] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/70">
              <thead className="bg-black/30 border-b border-white/10 text-white/40 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Line Item Description</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Scope</th>
                  <th className="p-4">Matched Emission Factor</th>
                  <th className="p-4">Calculated CO₂e</th>
                  <th className="p-4">Confidence</th>
                  <th className="p-4">Factor Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 font-semibold text-white">{row.item}</td>
                    <td className="p-4 font-mono">{row.qty.toLocaleString()} {row.unit}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-bold">
                        {row.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-white/80">{row.factor}</td>
                    <td className="p-4 font-bold text-[#22c55e]">{row.CO2e}</td>
                    <td className="p-4 text-amber-300 font-bold">{row.conf}</td>
                    <td className="p-4 text-white/50">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
