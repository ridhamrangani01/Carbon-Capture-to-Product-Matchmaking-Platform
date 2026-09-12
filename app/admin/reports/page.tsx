"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileSpreadsheet, Download } from "lucide-react";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((d) => setReports(d.reports || []));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Platform Report Archives
          </span>
          <h1 className="text-3xl font-display font-bold text-white">System Reports Governance</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Inspect all executive PDF and raw CSV reports generated across the platform.
          </p>
        </div>

        <div className="rounded-2xl bg-[#06241a] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/70">
              <thead className="bg-black/30 border-b border-white/10 text-white/40 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Report Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Format</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {reports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-[#22c55e]" /> {rep.title}
                    </td>
                    <td className="p-4 font-semibold text-white/80">{rep.type}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-[#22c55e]">{rep.format}</td>
                    <td className="p-4 text-white/50">{new Date(rep.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => alert(`Admin downloading report: ${rep.title}`)}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold"
                      >
                        Download
                      </button>
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
