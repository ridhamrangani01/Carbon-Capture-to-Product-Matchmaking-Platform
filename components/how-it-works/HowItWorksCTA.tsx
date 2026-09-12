"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Calendar } from "lucide-react";
import { HOW_IT_WORKS_DATA } from "@/data/how-it-works";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export function HowItWorksCTA() {
  const { ctaSection } = HOW_IT_WORKS_DATA;

  return (
    <section className="py-20 bg-[#22c55e] text-[#083324]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-normal text-[#083324] tracking-tight leading-[1.08]">
            {ctaSection.title}
          </h2>
          
          <p className="text-lg sm:text-xl text-[#083324]/80 font-medium max-w-xl mx-auto leading-relaxed">
            {ctaSection.subtitle}
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-4">
            <Link href="/register">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold bg-[#083324] text-white hover:bg-[#06241c] h-12 px-8 transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer">
                <Rocket className="w-5 h-5 text-[#22c55e]" />
                <span>{ctaSection.primaryButtonText}</span>
              </button>
            </Link>

            <Link href="/book-demo">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold bg-white text-[#083324] hover:border-2 hover:border-[#083324] h-12 px-8 transition-all duration-300 hover:scale-105 shadow-md cursor-pointer">
                <Calendar className="w-5 h-5 text-[#083324]" />
                <span>{ctaSection.secondaryButtonText}</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
