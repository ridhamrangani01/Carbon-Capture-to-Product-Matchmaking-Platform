"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FileText, Search, Play, Download, RefreshCw } from "lucide-react";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
            <FileText className="w-3.5 h-3.5" /> Cross-Tenant Governance
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Global Ingested Documents</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Inspect all user uploads, extraction states, line items, and processing exceptions across all organizations.
          </p>
        </div>

        <div className="rounded-2xl bg-[#06241a] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/70">
              <thead className="bg-black/30 border-b border-white/10 text-white/40 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Filename</th>
                  <th className="p-4">Organization</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Uploaded At</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#22c55e]" /> {doc.filename}
                    </td>
                    <td className="p-4 text-white/60">{doc.organization?.name || "Global Steel Works"}</td>
                    <td className="p-4 uppercase text-[10px] text-white/40">{doc.documentType || doc.fileType}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold">
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-4 text-white/50">{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => alert(`Inspect metadata for ${doc.filename}`)}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold"
                      >
                        Inspect
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
