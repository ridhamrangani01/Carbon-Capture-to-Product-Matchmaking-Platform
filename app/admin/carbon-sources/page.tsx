"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Flame, Plus, ShieldCheck } from "lucide-react";

export default function AdminCarbonSourcesPage() {
  const [sources, setSources] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/carbon-sources")
      .then((res) => res.json())
      .then((d) => setSources(d.sources || []));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
            <Flame className="w-3.5 h-3.5" /> Platform Registry
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Global Carbon Sources</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Review all point-source biogenic and industrial carbon streams submitted by platform emitters.
          </p>
        </div>

        <div className="rounded-2xl bg-[#06241a] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/70">
              <thead className="bg-black/30 border-b border-white/10 text-white/40 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Stream Name</th>
                  <th className="p-4">Facility</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">CO₂ Purity</th>
                  <th className="p-4">Monthly Vol</th>
                  <th className="p-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sources.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#22c55e]" /> {s.sourceName}
                    </td>
                    <td className="p-4 text-white/60">{s.facilityName}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-[#22c55e]">{s.sourceType}</td>
                    <td className="p-4 font-bold text-white">{s.co2Purity}%</td>
                    <td className="p-4 font-mono text-white/80">{s.volumePerMonth.toLocaleString()} t/mo</td>
                    <td className="p-4 text-right">
                      <span className="px-2.5 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold">
                        VERIFIED
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
