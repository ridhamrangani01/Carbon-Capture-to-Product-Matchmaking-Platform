import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Globe, Target, Award, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | Carbon2Product Platform",
  description: "Learn about Carbon2Product's mission to make carbon emissions visible, verifiable, and commercially valuable.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            Our Mission
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-white leading-tight">
            Making Carbon Visible, Verifiable & Commercially Valuable
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Carbon2Product (UpCarb) was engineered to bridge the gap between industrial emitters producing waste CO₂ and climate-tech manufacturers seeking high-purity carbon feedstocks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <Target className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Document Ingestion</h3>
            <p className="text-sm text-white/70">Transform unstructured utility bills, invoices, and BOM manifests into normalized carbon line items with verifiable IPCC emission factors.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <Globe className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Utilization Matchmaking</h3>
            <p className="text-sm text-white/70">Empower biogenic and direct air capture facilities to match CO₂ streams with off-takers in concrete, synthetic fuels, and chemicals.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <ShieldCheck className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Scientific Rigor</h3>
            <p className="text-sm text-white/70">Never compromise on transparency. Every calculated value includes confidence scoring, factor lineage, and audit timestamps.</p>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-[#083324] via-[#0b5d3b] to-[#083324] border border-white/20 p-10 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-display font-bold text-white">Join the Decarbonization Ecosystem</h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto">
            Whether you manage an industrial facility, develop carbon utilization technology, or lead corporate ESG reporting, Carbon2Product is built for you.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-[#22c55e] text-black font-bold text-sm hover:bg-[#6ee7a0] transition-all shadow-lg flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
