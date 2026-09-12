"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { BookOpen, Download, ArrowRight, ShieldCheck } from "lucide-react";

const studiesList = [
  {
    title: "Techno-Economic Analysis of Concrete Mineralization with Biogenic CO₂",
    date: "August 2026",
    pages: "24 pages PDF",
    summary: "Detailed engineering and economic assessment comparing pre-cast mineralization off-take efficiency across 12 ethanol plants in North America.",
  },
  {
    title: "GHG Protocol Scope 3 Category 1 Calculation Standards",
    date: "July 2026",
    pages: "18 pages PDF",
    summary: "Step-by-step methodology for fuzzy text matching invoice line items against IPCC 2023 and EPA eGRID database factors.",
  },
  {
    title: "Synthetic Aviation Fuel (SAF) Purity & Off-take Specification Guide",
    date: "June 2026",
    pages: "32 pages PDF",
    summary: "Technical benchmarks for CO₂ gas stream temperature, pressure, and catalyst sensitivity in Fischer-Tropsch conversion processes.",
  },
];

export default function StudiesPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Technical Study Library
          </div>
          <h1 className="text-4xl font-display font-medium text-white">Peer-Reviewed & Technical Reports</h1>
          <p className="text-white/70 text-sm sm:text-base">
            Transparent methodology, empirical calculations, and techno-economic research for carbon capture and product utilization.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {studiesList.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-[#083324] border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#22c55e]/50 transition-all">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.pages}</span>
                </div>
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                <p className="text-xs text-white/70 max-w-2xl">{item.summary}</p>
              </div>
              <button
                onClick={() => alert("Downloading technical study PDF preview...")}
                className="px-4 py-2.5 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] hover:bg-[#22c55e] hover:text-black text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
