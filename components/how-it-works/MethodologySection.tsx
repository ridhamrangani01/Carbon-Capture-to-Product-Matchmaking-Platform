"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, MapPin, Building2, Network, ArrowRight } from "lucide-react";
import { HOW_IT_WORKS_DATA } from "@/data/how-it-works";

export function MethodologySection() {
  const { methodologySection } = HOW_IT_WORKS_DATA;

  const iconMap: Record<string, React.ElementType> = {
    Layers,
    MapPin,
    Building2,
    Network,
  };

  const traceabilityChain = [
    { title: "Business Document", sub: "Invoice / Quote / BOM" },
    { title: "Extracted Line Item", sub: "AI OCR Parsing" },
    { title: "Classification", sub: "UNSPSC / HS Code" },
    { title: "Emission Factor Tier", sub: "ecoinvent 3.10 / EPD" },
    { title: "Calculation", sub: "Activity × Factor" },
    { title: "Audit-Ready CO₂e", sub: "CSRD & CBAM Ready" },
  ];

  return (
    <section id="science" className="py-24 bg-[#083324] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-normal text-white mb-3 tracking-tight leading-[1.08]">
            {methodologySection.title}
          </h2>
          <p className="text-lg text-white/60 max-w-xl font-normal">
            {methodologySection.subtitle}
          </p>
        </motion.div>

        {/* 4 Methodology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {methodologySection.cards.map((card, index) => {
            const IconComponent = iconMap[card.iconName] || Layers;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/[0.05] border border-white/10 hover:border-[#22c55e]/50 hover:bg-white/[0.08] transition-all duration-300 rounded-2xl p-8 shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="h-6 w-6 text-[#22c55e]" />
                </div>
                <h3 className="text-xl font-display font-medium text-white mb-3 tracking-tight group-hover:text-[#22c55e] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-normal">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Traceability Audit Chain Flow */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-inner">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#22c55e] mb-6 block">
            CRYPTOGRAPHIC TRACEABILITY CHAIN
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {traceabilityChain.map((step, idx) => (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-black/40 border border-white/10 rounded-xl p-3.5 text-center space-y-1"
                >
                  <span className="text-[10px] font-mono text-[#22c55e] block font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-white block">
                    {step.title}
                  </span>
                  <span className="text-[10px] text-white/50 block font-mono">
                    {step.sub}
                  </span>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
