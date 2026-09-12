"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Activity, ShieldCheck, Search, Filter } from "lucide-react";

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/audit-log");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
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
            <Activity className="w-3.5 h-3.5" /> Immutable Security Audit Record
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Platform System Audit Trail</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Append-only security log recording user authentication, document processing, role updates, and system operations.
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-white/50 text-xs">Loading audit trail entries...</div>
        ) : (
          <div className="rounded-2xl bg-[#06241a] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-white/70">
                <thead className="bg-black/30 border-b border-white/10 text-white/40 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Action</th>
                    <th className="p-4">Resource</th>
                    <th className="p-4">IP / Actor</th>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {logs.map((l) => (
                    <tr key={l.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-4 font-bold text-[#22c55e]">{l.action}</td>
                      <td className="p-4 text-white/80 font-sans">{l.resource || "System"}</td>
                      <td className="p-4 text-white/50">{l.ipAddress || "127.0.0.1"}</td>
                      <td className="p-4 text-white/40">{new Date(l.createdAt).toLocaleString()}</td>
                      <td className="p-4 text-right text-white/60 font-sans text-[11px] truncate max-w-xs">
                        {typeof l.details === "object" ? JSON.stringify(l.details) : l.details || "Action executed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
