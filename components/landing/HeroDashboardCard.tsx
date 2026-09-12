"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, MotionValue, useTransform, useSpring, useMotionValue } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

interface HeroDashboardCardProps {
  scrollYProgress?: MotionValue<number>;
  children?: React.ReactNode;
}

export function HeroDashboardCard({ scrollYProgress, children }: HeroDashboardCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Desktop Mouse Position 3D Tilt Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateYMouse = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const rotateXMouse = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Constrain rotation to max ±3deg rotateY and ±2deg rotateX
    const rY = (x / (rect.width / 2)) * 3;
    const rX = -(y / (rect.height / 2)) * 2;

    mouseX.set(rY);
    mouseY.set(rX);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll 3D Transforms
  const fallbackProgress = useMotionValue(0.5);
  const progress = scrollYProgress || fallbackProgress;

  const rawRotateX = useTransform(
    progress,
    [0, 0.6],
    isMobile || prefersReducedMotion ? [4, 0] : [18, 0]
  );
  const rawRotateY = useTransform(
    progress,
    [0, 0.6],
    isMobile || prefersReducedMotion ? [0, 0] : [-2, 0]
  );
  const rawScale = useTransform(progress, [0, 0.6, 1], [0.88, 1, 1.02]);
  const rawTranslateY = useTransform(progress, [0, 0.6, 1], [100, 0, -50]);
  const rawTranslateZ = useTransform(
    progress,
    [0, 0.6, 1],
    isMobile ? [0, 0, 0] : [-150, 0, 30]
  );

  // Smooth springs
  const rotateXScroll = useSpring(rawRotateX, { stiffness: 80, damping: 24 });
  const rotateYScroll = useSpring(rawRotateY, { stiffness: 80, damping: 24 });
  const scale = useSpring(rawScale, { stiffness: 80, damping: 24 });
  const translateYCard = useSpring(rawTranslateY, { stiffness: 80, damping: 24 });
  const translateZCard = useSpring(rawTranslateZ, { stiffness: 80, damping: 24 });

  // Parallax Layer Transforms
  const rawInnerY = useTransform(progress, [0, 0.6, 1], [30, 0, -25]);
  const rawKpiY = useTransform(progress, [0, 0.6, 1], [15, 0, -10]);
  const rawGlowY = useTransform(progress, [0, 0.6, 1], [0, 0, 40]);

  const translateYInner = useSpring(rawInnerY, { stiffness: 90, damping: 26 });
  const translateYKpi = useSpring(rawKpiY, { stiffness: 90, damping: 26 });
  const translateYGlow = useSpring(rawGlowY, { stiffness: 70, damping: 30 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto perspective-[1400px] select-none py-6 px-2 sm:px-4"
    >
      {/* Background Emerald Ambient Glow Field */}
      <motion.div
        style={{ translateY: translateYGlow }}
        className="absolute inset-x-12 top-12 bottom-12 rounded-[40px] bg-gradient-to-r from-[#083324] via-[#22c55e]/30 to-[#0b5d3b] blur-3xl opacity-40 pointer-events-none"
      />

      {/* Main 3D Card Container */}
      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateXScroll,
          rotateY: prefersReducedMotion ? 0 : rotateYScroll,
          scale,
          translateY: translateYCard,
          translateZ: translateZCard,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative w-full rounded-[28px] border border-[#22c55e]/40 p-2 sm:p-4 bg-[#06291d] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(34,197,94,0.2)] transition-shadow duration-300"
        )}
      >
        {/* BorderBeam Integration */}
        <BorderBeam duration={8} size={350} colorFrom="#22c55e" colorTo="#083324" />

        {/* Green Energy Light Pass (Horizontal Beam Sweep) */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 4,
              ease: "linear",
            }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#22c55e]/15 to-transparent -skew-x-12 blur-md z-20"
          />
        )}

        {/* Inner Card Screen Container */}
        <motion.div
          style={{ translateY: translateYInner }}
          className="relative z-10 w-full h-full rounded-2xl bg-black/90 p-4 sm:p-6 border border-white/10 overflow-hidden space-y-6"
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-xs font-mono text-white/60 ml-2 hidden sm:inline-block">
                app.carbon2product.com/live-monitor
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
              <span className="text-[11px] font-mono text-[#22c55e] font-bold bg-[#22c55e]/15 px-3 py-1 rounded-full border border-[#22c55e]/30">
                ● 100% ONLINE · 8-VECTOR MATCHING
              </span>
            </div>
          </div>

          {/* KPI Cards Grid with 3D Depth */}
          <motion.div
            style={{ translateY: translateYKpi }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {[
              { label: "TOTAL CO₂ CAPTURED", val: "48,920 t/yr", sub: "Verified Source Log", color: "text-white" },
              { label: "ACTIVE OFF-TAKE OFFERS", val: "14 Pathways", sub: "Concrete & E-Fuels", color: "text-[#22c55e]" },
              { label: "AVG STREAM PURITY", val: "98.4%", sub: "Biogenic Food Grade", color: "text-white" },
              { label: "MONETIZED VALUE", val: "$2,690,600", sub: "Est. Annual Revenue", color: "text-emerald-400" },
            ].map((kpi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.75, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-[#06291d]/80 p-4 rounded-xl border border-white/10 hover:border-[#22c55e]/40 transition-all shadow-md group"
                style={{ transform: "translateZ(8px)" }}
              >
                <span className="text-[10px] font-mono text-white/40 block tracking-wider uppercase mb-1">
                  {kpi.label}
                </span>
                <span className={cn("text-xl sm:text-2xl font-bold font-mono tracking-tight block", kpi.color)}>
                  {kpi.val}
                </span>
                <span className="text-[10px] text-white/50 block mt-1">{kpi.sub}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Table Preview */}
          <div className="bg-black/60 rounded-xl border border-white/10 p-4 space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-white/40 font-mono pb-2 border-b border-white/10 uppercase tracking-wider">
              <span>Capture Source</span>
              <span className="hidden sm:inline">Utilization Pathway</span>
              <span>Match Score</span>
              <span>Commercial Value</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono py-1.5 hover:bg-white/[0.03] rounded-lg px-2 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span className="text-white font-bold truncate max-w-[140px] sm:max-w-none">
                  Refinery Gas Steam Reformer #04
                </span>
              </div>
              <span className="text-emerald-400 font-semibold hidden sm:inline">Synthetic E-Methanol Fuel Feedstock</span>
              <span className="text-[#22c55e] font-extrabold bg-[#22c55e]/15 px-2 py-0.5 rounded text-[11px]">
                99.4% Match
              </span>
              <span className="text-white font-bold">$68.50 / t</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono py-1.5 border-t border-white/5 hover:bg-white/[0.03] rounded-lg px-2 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-white font-bold truncate max-w-[140px] sm:max-w-none">
                  Biogas Upgrading Facility B
                </span>
              </div>
              <span className="text-blue-400 font-semibold hidden sm:inline">Concrete Mineralization Curing</span>
              <span className="text-[#22c55e] font-extrabold bg-[#22c55e]/15 px-2 py-0.5 rounded text-[11px]">
                96.8% Match
              </span>
              <span className="text-white font-bold">$42.00 / t</span>
            </div>
          </div>

          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
