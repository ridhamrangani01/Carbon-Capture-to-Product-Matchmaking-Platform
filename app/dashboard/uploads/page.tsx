"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Upload, FileText, CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from "lucide-react";

export default function UploadsPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("INVOICE");
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          fileType: file.name.split(".").pop() || "pdf",
          fileSize: file.size,
          documentType: docType,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessMsg(`Document "${file.name}" uploaded successfully! Document ID: ${data.document.id}`);
        setTimeout(() => {
          router.push("/dashboard/documents");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display font-semibold text-white">Upload Carbon Documents</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Support for PDF, XLSX, CSV, PNG, JPG, and XML formats. Automatic extraction & factor matching.
          </p>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] text-xs font-semibold flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Select Document Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "INVOICE", label: "Supplier Invoice" },
                { id: "ENERGY_BILL", label: "Utility / Energy Bill" },
                { id: "BOM", label: "Bill of Materials (BOM)" },
                { id: "MANIFEST", label: "Shipping Manifest" },
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setDocType(t.id)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                    docType === t.id
                      ? "bg-[#22c55e] text-black border-[#22c55e] font-bold shadow-md shadow-[#22c55e]/20"
                      : "bg-[#083324] text-white/70 border-white/10 hover:border-white/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="p-10 rounded-2xl bg-[#083324] border-2 border-dashed border-white/20 hover:border-[#22c55e]/60 transition-all text-center space-y-4 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] mx-auto">
              <Upload className="w-6 h-6" />
            </div>

            {file ? (
              <div className="space-y-1">
                <p className="text-sm font-bold text-white flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4 text-[#22c55e]" /> {file.name}
                </p>
                <p className="text-xs text-white/50">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">Drag & Drop your invoice or manifest file here</p>
                <p className="text-xs text-white/50">Supports PDF, XLSX, CSV, XML, PNG, JPG (Max 50MB)</p>
              </div>
            )}

            <input
              type="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
              className="hidden"
              id="file-upload-input"
            />
            <label
              htmlFor="file-upload-input"
              className="inline-block px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              Browse Local Files
            </label>
          </div>

          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full py-3.5 rounded-xl bg-[#22c55e] text-black font-bold text-sm hover:bg-[#6ee7a0] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {uploading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Uploading & Registering Document...
              </>
            ) : (
              <>
                <span>Submit & Trigger Extraction Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
