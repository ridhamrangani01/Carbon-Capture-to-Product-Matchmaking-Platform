"use client";

import React, { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { ThreeDText } from "@/components/landing/ThreeDText";
import { HeroDashboardCard } from "@/components/landing/HeroDashboardCard";

export function HeroScrollDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0.5, 1]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#000000] text-white py-16 md:py-24 flex flex-col overflow-hidden border-t border-b border-white/10 relative select-none"
    >
      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.08)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-10 relative z-10">
        
        {/* Title Component with 3D Hierarchy */}
        <motion.div style={{ opacity: headingOpacity }} className="space-y-4 max-w-4xl mx-auto">
          <span className="inline-block text-xs font-mono font-bold tracking-widest text-[#22c55e] uppercase bg-[#22c55e]/10 border border-[#22c55e]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.2)]">
            Real-Time Carbon Intelligence Dashboard
          </span>

          <div className="space-y-2">
            <p className="text-2xl sm:text-4xl font-display font-normal text-white/90 tracking-tight leading-tight">
              Unleash the power of
            </p>

            <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
              <span className="text-3xl sm:text-5xl md:text-6xl font-display font-normal text-white tracking-tight leading-none block">
                Deterministic CCU
              </span>

              {/* 3D Centerpiece Text: "MATCHING" */}
              <div className="pt-2">
                <ThreeDText
                  text="MATCHING"
                  scrollYProgress={scrollYProgress}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
                  highlight={true}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3D Dashboard Floating Card */}
        <HeroDashboardCard scrollYProgress={scrollYProgress} />

      </div>
    </section>
  );
}
