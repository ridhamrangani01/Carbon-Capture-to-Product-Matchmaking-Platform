import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { GetStartedFooter } from "@/components/landing/GetStartedFooter";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { ShieldCheck, Cpu, Factory, Award } from "lucide-react";
import Link from "next/link";

export default function WhyCarbon2ProductPage() {
  return (
    <div className="min-h-screen bg-[#083324] text-slate-100 font-sans selection:bg-[#22c55e] selection:text-slate-950">
      <Navbar />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#22c55e] uppercase tracking-widest font-semibold block mb-3">
            THE CARBON2PRODUCT DIFFERENCE
          </span>
          <h1 className="text-4xl sm:text-6xl font-hero-display font-normal text-[#F2F4F1] tracking-tight leading-[0.95] mb-6">
            Why Carbon2Product.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed font-normal">
            Legacy Scope 3 solutions rely on slow annual surveys and static spreadsheet averages. Carbon2Product extracts high-resolution activity data directly from real gas streams, BOMs, and stream reports in hours, not months.
          </p>
        </ScrollReveal>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="p-8 rounded-3xl bg-[#06291d] border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-medium text-white">Automated Document Ingestion</h3>
            <p className="text-sm text-white/70 leading-relaxed font-normal">
              No manual data entry or complex ERP integrations required. Simply upload your PDF, CSV, or XLSX stream reports and our multi-format parser extracts line-item stream parameters automatically.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#06291d] border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-medium text-white">Deterministic 8-Vector Engine</h3>
            <p className="text-sm text-white/70 leading-relaxed font-normal">
              Our 8-vector algorithm evaluates CO₂ purity, volume, physical state, pressure, temperature, TRL, availability, and geographic radius against real commercial off-take intake windows.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#06291d] border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e]">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-medium text-white">Commercial Off-Take Monetization</h3>
            <p className="text-sm text-white/70 leading-relaxed font-normal">
              Transform captured emissions from a regulatory liability into a profitable commercial feedstock opportunity for e-methanol, concrete mineralization, and green chemical synthesis.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#06291d] border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-medium text-white">Audit-Ready GHG Protocol Compliance</h3>
            <p className="text-sm text-white/70 leading-relaxed font-normal">
              Every matched line item contains factor provenance, calculation timestamp, quality grade, and geography metadata — fully audit-ready for EU CBAM, CSRD ESRS E1, and ISO 14044 LCA verification.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8">
          <Link href="/register">
            <button className="bg-[#22c55e] text-[#083324] font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-[#22c55e]/90 transition-all cursor-pointer shadow-lg">
              Start Free Trial Now
            </button>
          </Link>
        </div>
      </main>

      <GetStartedFooter />
    </div>
  );
}
