import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Users, ArrowRight, FileText, CheckCircle, BarChart } from "lucide-react";

export const metadata = {
  title: "ESG Consultants Solution | Carbon2Product",
  description: "Empower ESG & sustainability advisors with automated document processing and client carbon reports.",
};

export default function ConsultantsSolutionPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> For ESG Consultants
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-white leading-tight">
            Accelerate Client Carbon Accounting & Decarbonization Advisory
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Replace manual spreadsheet data entry with automated OCR extraction, multi-tenant organization management, and instant executive PDF carbon summaries.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-[#22c55e] text-black font-bold text-sm hover:bg-[#6ee7a0] transition-all shadow-lg flex items-center gap-2"
            >
              <span>Start Consulting Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <FileText className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Batch Document Processing</h3>
            <p className="text-sm text-white/70">Upload hundreds of client utility bills and supply chain invoices simultaneously.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <CheckCircle className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Multi-Client Isolation</h3>
            <p className="text-sm text-white/70">Ensure strict data segregation per organization while managing engagement workflows from one dashboard.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <BarChart className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">White-Label PDF Reports</h3>
            <p className="text-sm text-white/70">Generate audit-proof Scope 1, 2, and 3 report exports ready for board presentations.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
