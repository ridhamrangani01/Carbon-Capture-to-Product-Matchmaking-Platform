"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Rocket, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { cardStaggerVariants } from "@/lib/motion";

export function ThreeStepMethodology() {
  const steps = [
    {
      num: "01",
      title: "Upload any business document",
      desc: "Facility stream logs, BOMs, quotations, energy bills — past capture for compliance reporting, open offers for forward planning.",
    },
    {
      num: "02",
      title: "AI matches to best available pathway",
      desc: "Each line item is classified and matched to the most specific utilization pathway available — manufacturer PCF, EPD, or recognised background database. Geography-specific & auditable.",
    },
    {
      num: "03",
      title: "Get instant audit-ready carbon outputs",
      desc: "Download GHG Protocol-compliant product footprints for your clients, CSV exports for your ESG system, or CBAM & ESRS E1 reporting packages.",
    },
  ];

  return (
    <>
      {/* Three Steps Section */}
      <section id="how-it-works" className="py-20 bg-[#F2F4F1] text-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <ScrollReveal className="flex justify-between items-start flex-wrap gap-5 mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-gray-900 mb-3 tracking-tight leading-[1.08]">
                Three steps. Zero guesswork.
              </h2>
              <p className="text-lg text-gray-600 max-w-lg font-normal">
                From raw facility streams & quotations to carbon intelligence — report the past, see the now, plan the future.
              </p>
            </div>
            <Link
              href="/methodology"
              className="self-end text-sm font-semibold text-[#083324] hover:text-[#22c55e] flex items-center gap-1.5 mb-1 transition-colors group"
            >
              <span>Full methodology</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardStaggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4, boxShadow: "0 12px 30px -5px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border border-gray-200 rounded-2xl p-8 relative shadow-sm transition-colors group"
              >
                <div className="text-6xl font-bold text-[#083324]/10 group-hover:text-[#22c55e]/20 transition-colors leading-none mb-4 font-mono">
                  {step.num}
                </div>
                <h3 className="text-xl font-display font-medium text-gray-900 mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
                {/* Arrow circle connector */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#F2F4F1] border border-gray-300 rounded-full items-center justify-center z-10">
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bright Green CTA Banner Bar */}
      <section className="bg-[#22c55e] py-14 text-[#083324] overflow-hidden">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight leading-[1.08]">
              Try it with your own document. Right now.
            </h3>
            <p className="text-sm sm:text-base opacity-80 max-w-xl font-normal">
              No credit card required. Upload any PDF, CSV or Excel document and see UpCarb. generate product-level CO₂ data in seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#083324] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#06291d] transition-all cursor-pointer shadow-lg"
              >
                <Rocket className="w-4 h-4 text-[#22c55e]" />
                <span>Try it for free</span>
              </motion.button>
            </Link>
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border border-[#083324]/40 text-[#083324] px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#083324]/10 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a demo</span>
              </motion.button>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
