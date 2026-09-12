"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FileSpreadsheet, Download, Plus, RefreshCw, FileText } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState("SUMMARY");
  const [format, setFormat] = useState("PDF");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports");
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${reportType} Report - ${new Date().toLocaleDateString()}`,
          type: reportType,
          format,
        }),
      });

      if (res.ok) {
        fetchReports();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display font-semibold text-white">Carbon Intelligence Reports</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Generate executive PDF summaries, Scope 1-3 audit reports, and raw CSV datasets.
          </p>
        </div>

        {/* Report Generator Box */}
        <div className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#22c55e]" /> Generate Custom Executive Report
          </h2>

          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-white/70 mb-1">Report Category</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
              >
                <option value="SUMMARY">Carbon Executive Summary</option>
                <option value="SCOPE_1_2_3">Scope 1, 2 & 3 Compliance Report</option>
                <option value="SUPPLIER">Supplier Carbon Footprint Report</option>
                <option value="MATCHING">Off-take Matchmaking Opportunity Report</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-white/70 mb-1">Output Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
              >
                <option value="PDF">Audit-Ready PDF</option>
                <option value="CSV">Raw Dataset CSV</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={generating}
                className="w-full py-2.5 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {generating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>Generate Report</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Reports List */}
        <div className="rounded-2xl bg-[#083324] border border-white/10 overflow-hidden shadow-xl">
          <div className="p-4 bg-black/20 border-b border-white/10 text-xs font-bold text-white uppercase tracking-wider">
            Generated Report Downloads
          </div>
          {loading ? (
            <div className="p-8 text-center text-white/50 text-xs">Loading report archives...</div>
          ) : reports.length === 0 ? (
            <div className="p-8 text-center text-white/40 text-xs">No reports generated yet.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {reports.map((rep) => (
                <div key={rep.id} className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#22c55e]" />
                    <div>
                      <p className="font-semibold text-white">{rep.title}</p>
                      <p className="text-[10px] text-white/40">{new Date(rep.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading report: ${rep.title}`)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#22c55e] font-bold transition-all flex items-center gap-1.5 cursor-pointer text-[10px]"
                  >
                    <Download className="w-3.5 h-3.5" /> Download {rep.format}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
