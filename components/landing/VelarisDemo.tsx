"use client";

import React from "react";
import Velaris from "@/components/ui/velaris";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Link from "next/link";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";

export function VelarisDemo() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <Velaris height="520px" className="rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/40 bg-[#22c55e]/15 px-4 py-1.5 text-xs font-bold text-[#22c55e] backdrop-blur font-mono">
            <Sparkles className="h-3.5 w-3.5 text-[#22c55e]" />
            <span>Powered by Living WebGL Simplex Noise</span>
          </span>

          <h2 className="max-w-3xl text-4xl sm:text-6xl font-display font-normal text-white tracking-tight leading-[1.02]">
            Living gradients in motion<span className="text-[#22c55e]">.</span>
          </h2>

          <p className="max-w-xl text-base text-white/80 sm:text-lg font-normal leading-relaxed">
            An animated simplex-noise background with color blending, vignette glow, and film grain — bringing real-time carbon intelligence to life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/register">
              <LiquidButton variant="primary">
                <Rocket className="h-4 w-4 text-[#083324]" />
                <span>Explore Platform</span>
              </LiquidButton>
            </Link>
            <Link href="#demouploader">
              <LiquidButton variant="glass">
                <span>See Interactive Preview</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </LiquidButton>
            </Link>
          </div>
        </div>
      </Velaris>
    </section>
  );
}
