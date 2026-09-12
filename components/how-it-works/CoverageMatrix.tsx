"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOW_IT_WORKS_DATA } from "@/data/how-it-works";

export function CoverageMatrix() {
  const { coverageSection } = HOW_IT_WORKS_DATA;

  return (
    <section id="coverage" className="py-24 bg-[#F2F4F1] text-gray-900 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Metric Processing Rate Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-gray-900 tracking-tight leading-[1.08]">
              {coverageSection.title}
            </h2>
            <p className="text-gray-700 leading-relaxed font-normal text-base">
              {coverageSection.subtitle}
            </p>

            {/* 90%+ Metric Highlight Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
              <div className="text-5xl font-bold font-mono text-[#083324] mb-1">
                {coverageSection.metricValue}
              </div>
              <div className="text-sm font-bold text-gray-900 mb-2">
                {coverageSection.metricTitle}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {coverageSection.metricDesc}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Structured Coverage Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg text-xs font-sans"
          >
            {/* Desktop Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-3.5 bg-gray-100 border-b border-gray-200 font-bold text-gray-500 uppercase tracking-wider font-mono">
              <div className="col-span-5">Scope / Type</div>
              <div className="col-span-4">Category</div>
              <div className="col-span-3 text-right">Document Source</div>
            </div>

            <div className="p-6 space-y-4">
              
              {/* Group 1: FULL COVERAGE */}
              <div className="space-y-2">
                <div className="pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] inline-block" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                    FULL COVERAGE
                  </span>
                </div>
                {coverageSection.rows
                  .filter((r) => r.status === "SUPPORTED")
                  .map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 py-2.5 border-b border-gray-50 items-center hover:bg-gray-50/80 px-2 rounded-lg transition-colors"
                    >
                      <div className="sm:col-span-5 font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                        <span>{row.scope}</span>
                      </div>
                      <div className="sm:col-span-4 text-gray-700">{row.category}</div>
                      <div className="sm:col-span-3 text-right text-gray-400 font-mono text-[11px]">
                        {row.source}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Group 2: SUPPORTED (INDICATIVE) */}
              <div className="space-y-2 pt-2">
                <div className="pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                    SUPPORTED (INDICATIVE)
                  </span>
                </div>
                {coverageSection.rows
                  .filter((r) => r.status === "INDICATIVE" || r.status === "PLANNED")
                  .map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 py-2.5 border-b border-gray-50 items-center hover:bg-gray-50/80 px-2 rounded-lg transition-colors"
                    >
                      <div className="sm:col-span-5 font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>{row.scope}</span>
                      </div>
                      <div className="sm:col-span-4 text-gray-700">{row.category}</div>
                      <div className="sm:col-span-3 text-right text-gray-400 font-mono text-[11px]">
                        {row.source}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Group 3: OUTSIDE SCOPE */}
              <div className="space-y-2 pt-2">
                <div className="pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                    OUTSIDE SCOPE
                  </span>
                </div>
                {coverageSection.rows
                  .filter((r) => r.status === "OUTSIDE_SCOPE")
                  .map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 py-2.5 items-center hover:bg-gray-50/80 px-2 rounded-lg transition-colors"
                    >
                      <div className="sm:col-span-5 font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                        <span>{row.scope}</span>
                      </div>
                      <div className="sm:col-span-4 text-gray-500">{row.category}</div>
                      <div className="sm:col-span-3 text-right text-gray-400 font-mono text-[11px]">
                        {row.source}
                      </div>
                    </div>
                  ))}
              </div>

            </div>

            {/* Matrix Footnote */}
            <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-500 italic">
              {coverageSection.footnote}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
