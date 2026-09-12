"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { cardStaggerVariants } from "@/lib/motion";

export function CuratedResources() {
  const resourceColumns = [
    {
      tag: "FOR BANKS & FINANCE",
      color: "bg-purple-100 text-purple-800",
      articles: [
        {
          title: "LSEG Sustainable Finance Review FY25",
          desc: "LSEG annual report covering green economy market performance, Green Asset Ratio benchmarks...",
        },
        {
          title: "PCAF Global Standard for Financial Institutions",
          desc: "The foundational PCAF methodology document for all bank and financial institution emissions reporting...",
        },
        {
          title: "EBA Guidelines on ESG Risk Management",
          desc: "European Banking Authority guidelines on ESG risk management for financial institutions...",
        },
      ],
    },
    {
      tag: "FOR CORPORATES & INDUSTRY",
      color: "bg-blue-100 text-blue-800",
      articles: [
        {
          title: "State of Supply Chain Sustainability",
          desc: "MIT research report assessing global supply chain sustainability practices and CO₂ off-take markets...",
        },
        {
          title: "CSRD / CSDD Handbook",
          desc: "Comprehensive reference for all EU sustainability regulations including CSRD and ESRS E1 reporting...",
        },
        {
          title: "WEF: Emissions Measurement in Supply Chains",
          desc: "World Economic Forum reports on challenges and solutions for Scope 3 activity-based measurement...",
        },
      ],
    },
    {
      tag: "FOR SMES & SUPPLIERS",
      color: "bg-[#22c55e]/20 text-[#083324]",
      articles: [
        {
          title: "Sustainability Transformation Monitor 2026",
          desc: "Annual report tracking the progress of corporate sustainability and CCU product adoption...",
        },
        {
          title: "OECD Global Corporate Sustainability Report",
          desc: "OECD report deconstructing ESG ratings, corporate sustainability reporting, and carbon data quality...",
        },
        {
          title: "WEF: Sustainability for SMEs",
          desc: "World Economic Forum guidance on making sustainability measurement simple and automated for mid-market...",
        },
      ],
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-900 border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex justify-between items-start flex-wrap gap-5 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#083324] font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-[#22c55e]" />
              <span>Curated Resource Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-gray-900 tracking-tight leading-[1.08]">
              Read how the industry approaches CO₂ data.
            </h2>
          </div>
          <Link
            href="/resources"
            className="self-end text-sm font-semibold text-[#083324] hover:text-[#22c55e] flex items-center gap-1.5 mb-1 transition-colors group"
          >
            <span>View all resources</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resourceColumns.map((col, colIdx) => (
            <motion.div
              key={colIdx}
              custom={colIdx}
              variants={cardStaggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-4"
            >
              <span className={`inline-block text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider ${col.color}`}>
                {col.tag}
              </span>

              <div className="space-y-4 pt-2">
                {col.articles.map((art, artIdx) => (
                  <motion.div
                    key={artIdx}
                    whileHover={{ y: -3, x: 2 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl bg-gray-50 border border-gray-200 hover:border-emerald-500/40 hover:bg-emerald-50/40 transition-colors group cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-900 text-sm mb-1.5 group-hover:text-[#083324] transition-colors flex items-center justify-between">
                      <span>{art.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#22c55e] group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-normal">
                      {art.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
