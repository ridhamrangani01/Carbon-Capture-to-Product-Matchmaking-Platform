"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Upload, FileText, RefreshCw, CheckCircle2 } from "lucide-react";

export default function AdminUploadsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
            <Upload className="w-3.5 h-3.5" /> File Storage Administration
          </span>
          <h1 className="text-3xl font-display font-bold text-white">System Upload Manifests</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Monitor raw storage paths, file type validation logs, and total uploaded payload bytes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-2">
            <p className="text-xs text-white/50">Total Uploaded Files</p>
            <p className="text-3xl font-bold text-white">28 Files</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-2">
            <p className="text-xs text-white/50">Storage Utilization</p>
            <p className="text-3xl font-bold text-[#22c55e]">142.8 MB</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-2">
            <p className="text-xs text-white/50">Upload Validation Status</p>
            <p className="text-3xl font-bold text-emerald-400">100% Passed</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
