"use client";

import React from "react";
import { ShieldCheck, Award, Lock, Database } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { cardStaggerVariants } from "@/lib/motion";

export function TrustedStandards() {
  const standards = [
    {
      name: "GHG Protocol",
      icon: ShieldCheck,
      description: "Scope 1, 2 & 3 Compliance",
    },
    {
      name: "ISO 14044 LCA",
      icon: Award,
      description: "Life Cycle Assessment Standard",
    },
    {
      name: "ISO 27001 Certified",
      icon: Lock,
      description: "Enterprise Security & Privacy",
    },
    {
      name: "ecoinvent 3.10 Data",
      icon: Database,
      description: "Global Emission Factor Database",
    },
  ];

  return (
    <section className="py-16 bg-white text-gray-900 border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-normal text-gray-900 mb-2 tracking-tight leading-[1.08]">
            Trusted Standards
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Built on globally recognised standards, ensuring every calculation is defensible, transparent, and ready for audit. Underpinned by industry-leading datasets including GHG Protocol and ecoinvent — ensuring accuracy and trust in every calculation.
          </p>
        </ScrollReveal>

        {/* 4 Standards Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
          {standards.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardStaggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-emerald-500/50 hover:bg-emerald-50/50 transition-colors group cursor-default"
              >
                <IconComp className="h-8 w-8 text-[#083324] group-hover:text-[#22c55e] transition-colors mb-2 group-hover:scale-110 duration-300" />
                <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                <span className="text-xs text-gray-500 font-mono mt-0.5">{item.description}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
