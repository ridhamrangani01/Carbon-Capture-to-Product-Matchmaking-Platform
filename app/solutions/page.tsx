import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Factory, HardHat, Building2, Landmark, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Solutions | Carbon2Product Intelligence Platform",
  description: "Explore tailored carbon intelligence solutions for industrial emitters, product off-takers, capture facilities, investors, and consultants.",
};

const solutions = [
  {
    slug: "industrial",
    title: "For Industrial Emitters",
    icon: Factory,
    tagline: "Transform Scope 1 & 2 liabilities into verified utilization assets.",
    description:
      "Extract line-item carbon footprints from energy bills, operational receipts, and supply chain invoices. Match your waste CO₂ streams with verified off-takers.",
    features: ["Automated Document Processing", "Scope 1, 2 & 3 Emission Calculation", "Purity & Volume Matching", "Audit-Ready Verification"],
  },
  {
    slug: "utilizers",
    title: "For Product Off-Takers",
    icon: HardHat,
    tagline: "Secure high-purity industrial CO₂ streams for value-added utilization.",
    description:
      "Search available biogenic and industrial carbon sources by purity, pressure, location, and volume to feed concrete mineralization, e-fuels, and chemicals.",
    features: ["Real-time Source Marketplace", "Purity & Temperature Specs Filter", "Pathway Compatibility Engine", "Direct Match Requests"],
  },
  {
    slug: "emitters",
    title: "For Capture Facilities",
    icon: Building2,
    tagline: "Maximize commercial monetization of captured carbon streams.",
    description:
      "List, manage, and monetize captured biogenic CO₂ or direct air capture outputs with guaranteed compliance tracking and verified buyer matchmaking.",
    features: ["Facility Stream Profiling", "Dynamic Off-taker Match Ranking", "Contract & Verification Hub", "Real-time Off-take Analytics"],
  },
  {
    slug: "researchers",
    title: "For Climate Investors",
    icon: Landmark,
    tagline: "Data-driven carbon intelligence for investment due diligence.",
    description:
      "Access high-fidelity emission factor benchmarks, historical off-taker pricing, and regulatory compliance metrics across global supply chains.",
    features: ["Anonymized Carbon Benchmarks", "Methodology Transparency", "Market Velocity Tracking", "Exportable Dataset Reports"],
  },
  {
    slug: "consultants",
    title: "For ESG Consultants",
    icon: Users,
    tagline: "Accelerate client carbon accounting and decarbonization roadmaps.",
    description:
      "Provide clients with instant document-to-factor matching, verifiable Scope 3 analysis, and actionable carbon-to-product monetization strategies.",
    features: ["Multi-Tenant Organization Management", "Automated CSV/PDF Export", "Standardized Factor Libraries", "Custom Report Builder"],
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            Tailored Carbon Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-white leading-tight">
            End-to-End Solutions Across the Carbon Value Chain
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Whether you generate waste CO₂, utilize captured carbon for sustainable products, or analyze climate investments, Carbon2Product provides the verification infrastructure you need.
          </p>
        </div>

        {/* Grid of solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.slug}
                className="group relative rounded-2xl bg-[#083324]/80 border border-white/10 p-8 flex flex-col justify-between hover:border-[#22c55e]/50 hover:bg-[#083324] transition-all duration-300 shadow-xl"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e] group-hover:bg-[#22c55e] group-hover:text-black transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-white mb-2">{sol.title}</h2>
                    <p className="text-[#22c55e] text-xs font-medium mb-3">{sol.tagline}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{sol.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    {sol.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#22c55e] group-hover:text-white transition-colors"
                  >
                    <span>Explore Solution</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#083324] via-[#0b5d3b] to-[#083324] border border-white/20 p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl font-display font-bold text-white">Ready to Transform Your Carbon Data?</h3>
            <p className="text-white/80 text-sm">
              Join leading industrial emitters, off-takers, and climate researchers operating on Carbon2Product.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl bg-white text-[#083324] font-bold text-sm hover:bg-[#22c55e] hover:text-black transition-all duration-300 shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
