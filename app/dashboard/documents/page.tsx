"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FileText, Search, Filter, RefreshCw, Upload, Download, Trash2, CheckCircle2, Play } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/documents");
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.documents || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = async (id: string) => {
    try {
      const res = await fetch(`/api/documents/${id}/process`, { method: "POST" });
      if (res.ok) {
        fetchDocuments();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.filename.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-display font-semibold text-white">Document Repository</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Manage uploaded utility bills, invoices, manifests, and line-item extraction results.
            </p>
          </div>
          <Link
            href="/dashboard/uploads"
            className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center gap-2"
          >
            <Upload className="w-4 h-4" /> Upload New Document
          </Link>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#083324] p-4 rounded-2xl border border-white/10">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents by filename or supplier..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/30 text-xs focus:border-[#22c55e] focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="UPLOADED">Uploaded</option>
              <option value="PROCESSING">Processing</option>
              <option value="EXTRACTED">Extracted</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <button
              onClick={fetchDocuments}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table / Empty State */}
        {loading ? (
          <div className="p-12 text-center text-white/50 text-xs space-y-2">
            <div className="w-6 h-6 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Loading document records...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#083324] border border-white/10 text-center space-y-4">
            <FileText className="w-12 h-12 text-white/20 mx-auto" />
            <h3 className="text-lg font-semibold text-white">No Documents Found</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              Upload your first utility bill, purchase invoice, or BOM manifest to trigger line-item extraction.
            </p>
            <Link
              href="/dashboard/uploads"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all"
            >
              <Upload className="w-4 h-4" /> Upload Document Now
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#083324] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-white/70">
                <thead className="bg-black/30 border-b border-white/10 text-white/40 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Filename</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Size</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Uploaded</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-4 font-semibold text-white flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[#22c55e] shrink-0" />
                        <span className="truncate max-w-xs">{doc.filename}</span>
                      </td>
                      <td className="p-4 uppercase text-[10px] font-bold text-white/60">{doc.documentType || doc.fileType}</td>
                      <td className="p-4">{(doc.fileSize / 1024).toFixed(1)} KB</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            doc.status === "COMPLETED"
                              ? "bg-[#22c55e]/20 text-[#22c55e]"
                              : doc.status === "PROCESSING"
                              ? "bg-amber-500/20 text-amber-300 animate-pulse"
                              : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="p-4 text-white/50">{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right space-x-2">
                        {doc.status !== "COMPLETED" && (
                          <button
                            onClick={() => handleProcess(doc.id)}
                            className="px-2.5 py-1 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] hover:bg-[#22c55e] hover:text-black font-bold transition-all text-[10px] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Play className="w-3 h-3" /> Process
                          </button>
                        )}
                        <button
                          onClick={() => alert(`Downloading document: ${doc.filename}`)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer inline-flex"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
