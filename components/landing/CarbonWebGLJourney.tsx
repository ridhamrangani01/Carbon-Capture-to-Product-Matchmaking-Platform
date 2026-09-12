"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { cn } from "@/lib/utils";
import { FileText, Sparkles, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

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
};

const JOURNEY_STAGES = [
  {
    id: 1,
    targetProgress: 0.25,
    stepNum: "01",
    title: "Document Ingestion",
    subtitle: "Automated OCR & Extraction",
    description: "High-resolution parsing of utility bills, invoices, and BOM manifests into structured line items.",
    icon: FileText,
    badge: "Input Stream",
  },
  {
    id: 2,
    targetProgress: 0.58,
    stepNum: "02",
    title: "Factor Matchmaking",
    subtitle: "8-Vector Algorithmic Ranking",
    description: "Instant candidate ranking against IPCC, EPA, and verified off-taker purity & volume parameters.",
    icon: Sparkles,
    badge: "Match Engine",
  },
  {
    id: 3,
    targetProgress: 0.88,
    stepNum: "03",
    title: "Product Intelligence",
    subtitle: "Scope 3 & Off-Take Value",
    description: "Commercial off-take contracts, verified CO₂e footprints, and audit-ready environmental ROI.",
    icon: TrendingUp,
    badge: "Commercial ROI",
  },
];

interface CarbonWebGLJourneyProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function CarbonWebGLJourney({ containerRef, className }: CarbonWebGLJourneyProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const targetRef = containerRef || localRef;

  const [currentProgress, setCurrentProgress] = useState<number>(0.25);
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [isManualOverride, setIsManualOverride] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (p) => {
      if (isManualOverride) return;
      const clamped = Math.max(0.1, Math.min(0.95, p));
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
  }, [smoothProgress, isManualOverride]);

  const handleStageClick = (stage: typeof JOURNEY_STAGES[0]) => {
    setIsManualOverride(true);
    setActiveStageId(stage.id);
    setCurrentProgress(stage.targetProgress);

    // Release override after 4 seconds to resume scroll tracking smoothly
    setTimeout(() => setIsManualOverride(false), 4000);
  };

  return (
    <div
      ref={localRef}
      className={cn("relative w-full h-[460px] md:h-[480px] overflow-hidden bg-[#083324] select-none", className)}
    >
      {/* 1. Luminous Carbon WebGL Shader Background Stream */}
      <div className="absolute inset-0 z-0">
        <WebGLShader
          scrollProgress={currentProgress}
          speed={0.75}
          primaryColor={carbonWebGLConfig.colors.white}
          accentColor={carbonWebGLConfig.colors.emerald}
          glowColor={carbonWebGLConfig.colors.accent}
          bgColor={carbonWebGLConfig.colors.background}
          interactive={true}
        />
      </div>

      {/* Subtle Dark Vignette Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#083324]/40 via-transparent to-[#083324]/80 pointer-events-none" />

      {/* 2. Interactive Animated Stage Overlays */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-6">
        
        {/* Stream Status Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#22c55e] font-semibold">
              WEBGL CARBON STREAM PIPELINE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-white/60">Click any stage to simulate flow</span>
            <div className="h-3 w-px bg-white/20 hidden sm:block" />
            <span className="font-mono text-xs text-[#6ee7a0] font-semibold hidden sm:inline-block">
              {Math.round(currentProgress * 100)}% ACTIVE
            </span>
          </div>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 my-auto relative">
          {JOURNEY_STAGES.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStageId === stage.id;

            return (
              <motion.div
                key={stage.id}
                onClick={() => handleStageClick(stage)}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative group rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden",
                  "backdrop-blur-xl border",
                  isActive
                    ? "bg-[#06291d]/90 border-[#22c55e] shadow-[0_0_40px_rgba(34,197,94,0.35)] ring-1 ring-[#22c55e]/50"
                    : "bg-[#06291d]/50 border-white/15 hover:border-white/40 hover:bg-[#06291d]/75"
                )}
              >
                {/* Active Neon Accent Top Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeAccentBar"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#22c55e] via-[#6ee7a0] to-[#22c55e]"
                  />
                )}

                {/* Card Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-colors",
                        isActive ? "bg-[#22c55e] text-black" : "bg-white/10 text-white/70 group-hover:bg-white/20"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-mono text-xs font-bold text-white/50 tracking-wider">
                      {stage.stepNum}
                    </span>
                  </div>

                  {/* Pulsing Status Badge */}
                  <span
                    className={cn(
                      "text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider transition-all",
                      isActive
                        ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/40 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                        : "bg-white/5 text-white/40 border border-white/10"
                    )}
                  >
                    {stage.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-display font-semibold text-white tracking-tight mb-1 group-hover:text-[#6ee7a0] transition-colors">
                  {stage.title}
                </h3>
                <p className="text-xs font-mono text-[#22c55e] font-medium mb-3">
                  {stage.subtitle}
                </p>

                {/* Detailed Description */}
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  {stage.description}
                </p>

                {/* Interactive Action Indicator */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className={cn("font-medium transition-colors", isActive ? "text-[#22c55e]" : "text-white/40")}>
                    {isActive ? "Active Stage" : "Select Stage"}
                  </span>
                  <ArrowRight
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300",
                      isActive ? "text-[#22c55e] translate-x-1" : "text-white/40 group-hover:translate-x-1"
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2 pt-2 border-t border-white/15">
          <div className="flex items-center justify-between text-xs font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" /> Stage {activeStageId} of 3 Processed
            </span>
            <span>GPU SHADER FPS: 60 • PIPELINE HEALTH: 100%</span>
          </div>

          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#0b5d3b] via-[#22c55e] to-[#6ee7a0] rounded-full shadow-[0_0_12px_#22c55e]"
              animate={{ width: `${Math.round(currentProgress * 100)}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
