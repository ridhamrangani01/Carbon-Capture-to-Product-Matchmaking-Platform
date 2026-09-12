"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { cn } from "@/lib/utils";

export const carbonWebGLConfig = {
  colors: {
    background: "#083324",
    deep: "#06291D",
    emerald: "#0B5D3B",
    teal: "#0B4F46",
    mint: "#6EE7A0",
    white: "#F2F4F1",
    accent: "#22C55E",
  },
  intensity: {
    desktop: 1,
    tablet: 0.75,
    mobile: 0.5,
  },
  glow: {
    desktop: 1,
    tablet: 0.75,
    mobile: 0.55,
  },
};

const JOURNEY_STAGES = [
  {
    id: 1,
    triggerProgress: 0.25,
    xPercent: "25%",
    label: "01 / DOCUMENT INGEST",
    sub: "OCR Invoices & BOMs",
    detail: "High-resolution extraction of gas stream specs",
  },
  {
    id: 2,
    triggerProgress: 0.58,
    xPercent: "58%",
    label: "02 / CARBON MATCHING",
    sub: "Deterministic 8-Vector Engine",
    detail: "Instant algorithmic off-take compatibility scoring",
  },
  {
    id: 3,
    triggerProgress: 0.88,
    xPercent: "88%",
    label: "03 / PRODUCT INTELLIGENCE",
    sub: "Scope 3 & Off-Take Value",
    detail: "Commercial contracts & validated environmental ROI",
  },
];

interface CarbonWebGLJourneyProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function CarbonWebGLJourney({ containerRef, className }: CarbonWebGLJourneyProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const targetRef = containerRef || localRef;

  const [currentProgress, setCurrentProgress] = useState<number>(0.2);
  const [activeStageId, setActiveStageId] = useState<number>(1);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (p) => {
      // Map scroll 0 -> 1 to progress state
      const clamped = Math.max(0.08, Math.min(0.95, p));
      setCurrentProgress(clamped);

      if (clamped < 0.42) {
        setActiveStageId(1);
      } else if (clamped < 0.72) {
        setActiveStageId(2);
      } else {
        setActiveStageId(3);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <div
      ref={localRef}
      className={cn("relative w-full h-[420px] md:h-[460px] overflow-hidden bg-[#083324]", className)}
    >
      {/* 1. WebGL Flowing Luminous Carbon Ribbon Shader */}
      <div className="absolute inset-0 z-0">
        <WebGLShader
          scrollProgress={currentProgress}
          speed={0.8}
          primaryColor={carbonWebGLConfig.colors.white}
          accentColor={carbonWebGLConfig.colors.emerald}
          glowColor={carbonWebGLConfig.colors.accent}
          bgColor={carbonWebGLConfig.colors.background}
          interactive={true}
        />
      </div>

      {/* 2. Interactive Journey Stages Overlay */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-8">
        
        {/* Top Header Label */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#22c55e] font-medium">
              LIVE WEBGL CARBON DATA STREAM
            </span>
          </div>
          <span className="font-mono text-xs text-white/50 hidden sm:inline-block">
            8-VECTOR MATCHMAKING PIPELINE
          </span>
        </div>

        {/* 3-Stage Nodes Along the WebGL Flow Path */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-auto relative">
          {JOURNEY_STAGES.map((stage) => {
            const isActive = activeStageId === stage.id;
            const isPassed = activeStageId > stage.id;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stage.id * 0.15 }}
                className={cn(
                  "relative group rounded-xl p-5 md:p-6 transition-all duration-300",
                  "border backdrop-blur-md",
                  isActive
                    ? "bg-[#06291d]/90 border-[#22c55e]/60 shadow-[0_0_30px_rgba(34,197,94,0.25)]"
                    : isPassed
                    ? "bg-[#06291d]/60 border-white/20 text-white/80"
                    : "bg-[#06291d]/30 border-white/10 text-white/50 opacity-70"
                )}
              >
                {/* Stage Indicator Pill */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold px-2.5 py-1 rounded-md tracking-wider uppercase",
                      isActive
                        ? "bg-[#22c55e] text-[#083324]"
                        : "bg-white/10 text-white/70"
                    )}
                  >
                    0{stage.id} / STAGE
                  </span>

                  {/* Pulsing Target Dot */}
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <span
                      className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300",
                        isActive
                          ? "bg-[#22c55e] shadow-[0_0_12px_#22c55e] scale-125"
                          : "bg-white/30"
                      )}
                    />
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border border-[#22c55e] animate-ping opacity-75" />
                    )}
                  </div>
                </div>

                {/* Stage Title & Subtitle */}
                <h3 className="font-hero-display text-xl sm:text-2xl font-medium tracking-tight text-[#F2F4F1] mb-1">
                  {stage.label}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#22c55e] mb-2 font-normal">
                  {stage.sub}
                </p>

                {/* Expanded Stage Detail */}
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  {stage.detail}
                </p>

                {/* Connecting Path Accent Bar */}
                <div
                  className={cn(
                    "mt-4 h-0.5 w-full rounded-full transition-all duration-500",
                    isActive
                      ? "bg-gradient-to-r from-[#22c55e] via-[#6ee7a0] to-transparent"
                      : "bg-white/10"
                  )}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Technical Status Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-white/40 pt-3 border-t border-white/10">
          <span>PROGRESS: {Math.round(currentProgress * 100)}%</span>
          <span>GPU WEBGL SHADER: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
