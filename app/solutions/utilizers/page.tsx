import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HardHat, ArrowRight, Filter, Cpu, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Product Off-Takers & Utilizers | Carbon2Product",
  description: "Source high-purity industrial & biogenic CO₂ feedstocks for concrete, e-fuels, and chemicals.",
};

export default function UtilizersSolutionPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            <HardHat className="w-3.5 h-3.5" /> For Product Off-Takers
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-white leading-tight">
            Discover Verified CO₂ Feedstocks Tailored to Your Process Specs
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Filter available carbon streams by geographic proximity, purity grade, state (gas/liquid), and volume stability to accelerate product mineralization and synthetic fuel conversion.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-[#22c55e] text-black font-bold text-sm hover:bg-[#6ee7a0] transition-all shadow-lg flex items-center gap-2"
            >
              <span>Explore Carbon Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <Filter className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Granular Filtering</h3>
            <p className="text-sm text-white/70">Filter biogenic vs industrial streams, 99.5%+ purity for food/chem vs 90%+ for concrete mineralization.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <Cpu className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Pathway Conversion Scoring</h3>
            <p className="text-sm text-white/70">Algorithmically match temperature, pressure, and energy requirement thresholds to optimize yield.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <CheckCircle className="w-8 h-8 text-[#22c55e]" />
            <h3 className="text-xl font-semibold text-white">Verified Off-Take Security</h3>
            <p className="text-sm text-white/70">Execute long-term supply agreements backed by real-time stream status and automated audit trail generation.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
