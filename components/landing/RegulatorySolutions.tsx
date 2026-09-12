"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, FileCheck, Landmark, Globe, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { cardStaggerVariants } from "@/lib/motion";

export function RegulatorySolutions() {
  const solutions = [
    {
      icon: ShieldCheck,
      title: "EU CBAM & Scope 1/2/3 Verification",
      subtitle: "Import Compliance & Audit Readiness",
      description: "Generate compliant, line-item verified CO₂ data for carbon border adjustment mechanisms and international climate reporting standards.",
      tag: "EU CBAM & CSRD Ready",
      href: "/solutions/cbam",
    },
    {
      icon: FileCheck,
      title: "GHG Protocol & ISO 14044 Standards",
      subtitle: "Defensible Environmental Accounting",
      description: "Built on recognized international frameworks, ensuring every stream calculation is defensible, transparent, and ready for third-party audit.",
      tag: "ISO 14044 & 27001",
      href: "/solutions/standards",
    },
    {
      icon: Landmark,
      title: "Financed Emissions & Green Finance",
      subtitle: "Bank Portfolio Carbon Intelligence",
      description: "Automated carbon reporting for commercial loans, sustainability-linked covenant monitoring, and climate-aligned investment portfolios.",
      tag: "EBA GL 2025/01",
      href: "/solutions/finance",
    },
    {
      icon: Globe,
      title: "EPD & Building Materials Alignment",
      subtitle: "Sustainable Procurement Benchmarking",
      description: "Match raw capture streams directly into Environmental Product Declarations (EPDs) for LEED, BREEAM, and EU Taxonomy compliance.",
      tag: "EPD & BREEAM",
      href: "/solutions/epd",
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-[#083324] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-white mb-3 tracking-tight leading-[1.08]">
            Built for your reality — regulatory and operational.
          </h2>
          <p className="text-lg text-white/60 max-w-xl font-normal">
            Compliance reporting from past stream documents. Carbon exposure forecasting from quotations. Both, from the same platform.
          </p>
        </ScrollReveal>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link key={index} href={item.href} className="group">
                <motion.div
                  custom={index}
                  variants={cardStaggerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  whileHover={{ y: -4, borderColor: "rgba(34, 197, 94, 0.6)" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#06291d] border border-white/10 rounded-2xl p-8 transition-all hover:bg-[#06291d]/90 relative flex flex-col justify-between h-full shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-medium text-white mb-1 tracking-tight flex items-center gap-2">
                      <span>{item.title}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#22c55e]" />
                    </h3>
                    <div className="text-xs font-mono text-[#22c55e] mb-3 font-normal">
                      {item.subtitle}
                    </div>

                    <p className="text-sm text-white/70 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-semibold text-[#22c55e] gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Learn more about {item.tag}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
