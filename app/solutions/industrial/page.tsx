import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Factory, CheckCircle2, ArrowRight, ShieldCheck, Zap, BarChart3, FileSpreadsheet } from "lucide-react";

export const metadata = {
  title: "Industrial Emitters Solution | Carbon2Product",
  description: "Transform Scope 1 & 2 carbon liabilities into verified monetization assets with Carbon2Product.",
};

export default function IndustrialSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-16">
        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
              <Factory className="w-3.5 h-3.5" /> For Industrial Emitters
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-white leading-tight">
              Turn Flue Gas & Industrial CO₂ into Commercial Assets
            </h1>
            <p className="text-white/70 text-base sm:text-lg">
              Carbon2Product automates document ingestion from energy bills, operational logs, and supply chain invoices to quantify Scope 1, 2, and 3 emissions while matching captured streams to verified off-takers.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl bg-[#22c55e] text-black font-bold text-sm hover:bg-[#6ee7a0] transition-all shadow-lg flex items-center gap-2"
              >
                <span>Get Started as Emitter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
              >
                Request Enterprise Demo
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-[#083324] border border-white/10 p-8 shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Flue Gas Stream #409</span>
              <span className="px-2.5 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-xs font-bold">99.2% Purity</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-white/50">Monthly Volume</p>
                <p className="text-xl font-bold text-white mt-1">12,500 t/mo</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-white/50">Calculated CO₂e</p>
                <p className="text-xl font-bold text-[#22c55e] mt-1">150,000 t/yr</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#0b5d3b]/30 border border-[#22c55e]/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Recommended Off-take Match</span>
                <span className="text-[#22c55e] font-bold">94% Confidence</span>
              </div>
              <p className="text-xs text-white/70">Concrete Mineralization & Sustainable Aviation Fuel Feedstock</p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#083324]/60 border border-white/10 space-y-4">
            <Zap className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Instant Ingestion & Extraction</h3>
            <p className="text-sm text-white/70">Upload PDF invoices, energy manifests, and XML receipts. Our extraction pipeline normalizes line items and matches IPCC emission factors automatically.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324]/60 border border-white/10 space-y-4">
            <ShieldCheck className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Audit-Grade Traceability</h3>
            <p className="text-sm text-white/70">Every calculated tCO₂e includes factor version, methodology reference, geography tag, and data quality confidence rating.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324]/60 border border-white/10 space-y-4">
            <BarChart3 className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Monetization Matchmaking</h3>
            <p className="text-sm text-white/70">Connect biogenic or industrial point-source emissions directly to commercial utilizers purchasing raw carbon feedstocks.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
