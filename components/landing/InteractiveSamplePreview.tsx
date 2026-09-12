"use client";

import React, { useState } from "react";
import { Upload, ArrowRight, FileText } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { AnimatedMetric } from "@/components/landing/AnimatedMetric";

export function InteractiveSamplePreview() {
  const [showResults, setShowResults] = useState(false);

  return (
    <section
      id="demouploader"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-24 px-4 text-white"
    >
      {/* Subtle Radial Green Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(34,197,94,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <ScrollReveal>
          {/* Instant Preview Badge */}
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-[#22c55e] mb-8">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
            <span>Instant preview · Sample carbon stream report data</span>
          </div>
          {/* Section Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-white tracking-tight leading-[1.05] mb-6">
            See what UpCarb. does — in seconds.
          </h2>

          {/* Subheading */}
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-12 leading-relaxed font-normal">
            This is an interactive preview using sample carbon stream report data — showing exactly what UpCarb. produces on a real facility document. Sign up to process your own streams.
          </p>
        </ScrollReveal>

        {/* Interactive Uploader Dropzone Box */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="uploader"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div
                onClick={() => setShowResults(true)}
                className="relative border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all bg-white/[0.04] border-[#22c55e]/40 hover:bg-white/[0.06] hover:border-[#22c55e]/80 shadow-2xl group overflow-hidden"
              >
                <BorderBeam duration={6} size={250} colorFrom="#22c55e" colorTo="#000000" />

                {/* Upload Icon Box */}
                <div className="w-16 h-16 bg-[#22c55e]/15 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-[#22c55e]/30">
                  <Upload className="w-8 h-8 text-[#22c55e]" />
                </div>

                <h3 className="text-white font-display font-medium text-2xl mb-2 tracking-tight">
                  See what UpCarb. does with a sample carbon stream report
                </h3>
                <p className="text-white/50 text-sm mb-6 font-normal">
                  Preview uses sample data — not your real facility documents
                </p>

                <div className="flex justify-center">
                  <LiquidButton variant="primary">
                    See instant preview
                  </LiquidButton>
                </div>

                <p className="text-white/30 text-xs mt-4 font-mono">
                  Preview only — no file is uploaded or processed
                </p>
              </div>
            </motion.div>
          ) : (
            /* Preview Results Output Card */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl mx-auto bg-[#06291d] border border-[#22c55e]/40 rounded-3xl p-8 shadow-2xl text-left space-y-6 overflow-hidden"
            >
              <BorderBeam duration={8} size={300} colorFrom="#22c55e" colorTo="#083324" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-[#22c55e]" />
                  <div>
                    <h4 className="text-lg font-semibold text-white">Facility_Stream_Report_2026_Sample.pdf</h4>
                    <span className="text-xs text-white/60 font-mono">Extracted 14 Stream Line Items · GHG Protocol Standard</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-xs text-[#22c55e] border border-[#22c55e]/40 px-3 py-1.5 rounded-xl hover:bg-[#22c55e]/10 transition-colors cursor-pointer font-semibold"
                >
                  Reset Preview
                </button>
              </div>

              {/* Stats Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-black/50 rounded-2xl p-4 border border-white/10">
                  <span className="text-xs text-white/50 block font-mono">Captured CO₂ Purity</span>
                  <div className="text-2xl font-bold text-[#22c55e]">
                    <AnimatedMetric value={98.4} decimals={1} suffix="%" /> High Purity
                  </div>
                  <span className="text-[11px] text-emerald-400 block mt-1">✓ Food & Chemical Grade</span>
                </div>
                <div className="bg-black/50 rounded-2xl p-4 border border-white/10">
                  <span className="text-xs text-white/50 block font-mono">Annual Supply Vol</span>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedMetric value={12500} suffix=" t/year" />
                  </div>
                  <span className="text-[11px] text-white/60 block mt-1">Continuous Gas Stream</span>
                </div>
                <div className="bg-black/50 rounded-2xl p-4 border border-white/10">
                  <span className="text-xs text-white/50 block font-mono">Off-Take Value Potential</span>
                  <div className="text-2xl font-bold text-emerald-400">
                    <AnimatedMetric value={687500} prefix="$" suffix=" / yr" />
                  </div>
                  <span className="text-[11px] text-white/60 block mt-1">Based on $55/t CO₂ price</span>
                </div>
              </div>

              {/* Matched Product Pathways List */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-semibold text-white/60 uppercase tracking-wider font-mono">
                  Top Matched Commercial Pathways
                </h5>
                
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-[#22c55e]/30 transition-all">
                  <div>
                    <span className="text-sm font-semibold text-white block">Sustainable Synthetic Methanol Feedstock</span>
                    <span className="text-xs text-white/60 font-mono">Match Score: 98% · Distance: 42 km · Buyer: GreenFuel Industries</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30">
                    Ready Off-Take
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-blue-500/30 transition-all">
                  <div>
                    <span className="text-sm font-semibold text-white block">Pre-Cast Concrete Carbon Mineralization</span>
                    <span className="text-xs text-white/60 font-mono">Match Score: 94% · Distance: 18 km · Buyer: EcoCem Materials</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    High Volume
                  </span>
                </div>
              </div>

              {/* Bottom Call to action inside preview card */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/60 font-medium">Want to process your own facility streams?</span>
                <a href="/register">
                  <button className="bg-[#22c55e] text-[#083324] text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#22c55e]/90 transition-all hover:scale-105 cursor-pointer shadow-md">
                    <span>Sign up to upload real documents</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
