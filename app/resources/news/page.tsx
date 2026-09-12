"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Newspaper, ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Carbon2Product Announces Automated Scope 3 Line-Item Parser",
    date: "September 10, 2026",
    summary: "Our updated engine supports automated unit conversion, currency translation, and GHG emission factor matching for enterprise supply chain manifests.",
  },
  {
    title: "Global Biogenic CO₂ Market Overview Q3 2026",
    date: "August 28, 2026",
    summary: "Biogas and fermentation point-source emissions surge as primary feedstocks for concrete mineralization across North America and Europe.",
  },
  {
    title: "Understanding EU CBAM Import Verification Requirements",
    date: "August 15, 2026",
    summary: "A practical guide for industrial exporters on providing transparent emission factor lineage for cross-border carbon border adjustments.",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" /> News & Insights
          </div>
          <h1 className="text-4xl font-display font-medium text-white">Carbon Intelligence News</h1>
          <p className="text-white/70 text-sm sm:text-base">
            Industry updates, regulatory compliance analysis, and engineering milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-4 hover:border-[#22c55e]/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs text-white/40">{item.date}</span>
                <h2 className="text-xl font-semibold text-white leading-snug">{item.title}</h2>
                <p className="text-xs text-white/70 leading-relaxed">{item.summary}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => alert(`Reading article: ${item.title}`)}
                  className="text-xs font-bold text-[#22c55e] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
