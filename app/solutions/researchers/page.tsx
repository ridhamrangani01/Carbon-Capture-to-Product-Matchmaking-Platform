import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Landmark, ArrowRight, Database, Search, Download } from "lucide-react";

export const metadata = {
  title: "Climate Investors & Researchers | Carbon2Product",
  description: "Access verified carbon dataset intelligence, emission factor benchmarks, and market velocity analytics.",
};

export default function ResearchersSolutionPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5" /> For Climate Investors & Researchers
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-white leading-tight">
            High-Fidelity Climate Datasets & Decarbonization Benchmarks
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Inspect IPCC/EPA emission factor datasets, analyze regional carbon source availability, and evaluate commercial carbon utilization pathways with full scientific rigor.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-[#22c55e] text-black font-bold text-sm hover:bg-[#6ee7a0] transition-all shadow-lg flex items-center gap-2"
            >
              <span>Access Research Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <Database className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Anonymized Data Insights</h3>
            <p className="text-sm text-white/70">Aggregate trends across industrial sectors while respecting strict organization privacy boundaries.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <Search className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Factor Lineage Transparency</h3>
            <p className="text-sm text-white/70">Trace calculation math back to published emission factors, IPCC documentation, and regional standards.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <Download className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Standardized Dataset Export</h3>
            <p className="text-sm text-white/70">Export structured CSV/JSON datasets for financial modeling, due diligence, and academic research.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
