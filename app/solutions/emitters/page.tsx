import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Building2, ArrowRight, CheckCircle2, Shield, Layers } from "lucide-react";

export const metadata = {
  title: "Capture Facilities & Emitters | Carbon2Product",
  description: "Monetize point-source biogenic and industrial carbon capture with Carbon2Product matching intelligence.",
};

export default function EmittersSolutionPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" /> For Capture Facilities
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-white leading-tight">
            Streamline Carbon Source Profiling & Off-taker Matchmaking
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            List your captured CO₂ streams, define purity and pressure parameters, and connect automatically with synthetic fuel, cement mineralization, and chemical manufacturers.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-[#22c55e] text-black font-bold text-sm hover:bg-[#6ee7a0] transition-all shadow-lg flex items-center gap-2"
            >
              <span>List Your Stream</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <Layers className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Stream Parameter Verification</h3>
            <p className="text-sm text-white/70">
              Publish exact volume (t/month), biogenic origin tag, purity level (95%-99.9%), and pipeline availability so off-takers can execute direct purchase agreements.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <Shield className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Verified Off-take Contracts</h3>
            <p className="text-sm text-white/70">
              Ensure compliance with global CBAM, IRA 45Q, and EU RED III directives with transparent calculation methodologies built into every contract request.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
