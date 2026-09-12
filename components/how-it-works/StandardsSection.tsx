"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOW_IT_WORKS_DATA } from "@/data/how-it-works";

export function StandardsSection() {
  const { standardsSection } = HOW_IT_WORKS_DATA;

  return (
    <section className="py-12 bg-[#06241a] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="shrink-0">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 block">
              {standardsSection.label}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {standardsSection.standards.map((std, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/[0.06] border border-white/10 text-white/80 text-xs px-3.5 py-1.5 rounded-full font-mono font-medium hover:border-[#22c55e]/50 hover:text-white transition-all cursor-default"
              >
                {std}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
