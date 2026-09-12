"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Newspaper, Rocket, Play, X } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { CarbonAtmosphere } from "@/components/landing/CarbonAtmosphere";
import { CarbonJourneyWave } from "@/components/landing/CarbonJourneyWave";
import { heroEntranceVariants } from "@/lib/motion";

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle Mouse Parallax Tracking (Section 10)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current || window.innerWidth < 1024) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.015; // Max ~3px drift
    const y = (e.clientY - rect.top - rect.height / 2) * 0.015;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#083324] pt-28 pb-4 text-white select-none"
    >
      {/* Living Atmospheric Carbon Gradient Background (21st.dev inspired) */}
      <motion.div
        style={{ x: smoothMouseX, y: smoothMouseY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <CarbonAtmosphere interactive={true} />
      </motion.div>

      {/* Background Floating Paths SVG Animation Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 z-0">
        <svg className="w-full h-full text-[#22c55e]" viewBox="0 0 696 316" fill="none">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M-${380 - i * 8} -${189 + i * 8}C-${380 - i * 8} -${189 + i * 8} -${312 - i * 8} ${216 - i * 8} ${152 - i * 8} ${343 - i * 8}C${616 - i * 8} ${470 - i * 8} ${684 - i * 8} ${875 - i * 8} ${684 - i * 8} ${875 - i * 8}`}
              stroke="currentColor"
              strokeWidth={0.6 + i * 0.04}
              strokeOpacity={0.12 + i * 0.02}
              initial={{ pathLength: 0.2, opacity: 0.4 }}
              animate={{
                pathLength: [0.2, 0.9, 0.2],
                opacity: [0.3, 0.8, 0.3],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: 18 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Column: Brand Title & Value Prop */}
          <div className="flex flex-col flex-1 space-y-6">
            <div>
              {/* Masked Upward Reveal for Title (Section 6 & 7) */}
              <Link href="/" className="inline-block hover:opacity-100 transition-opacity overflow-hidden">
                <h1 className="font-hero-display text-7xl sm:text-8xl md:text-[9rem] lg:text-[10rem] xl:text-[11.5rem] font-normal tracking-[-0.035em] text-[#F2F4F1] leading-[0.85] flex items-baseline">
                  {"UpCarb.".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 1.1,
                        delay: 0.4 + index * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`inline-block ${
                        char === "." ? "text-[#22c55e] text-[1.1em] ml-0.5" : ""
                      }`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>
              </Link>

              {/* Tagline Slow Reveal (Section 8) */}
              <motion.div
                custom={3}
                variants={heroEntranceVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-start mt-2 sm:mt-3 overflow-hidden"
              >
                <p className="font-hero-display text-2xl sm:text-3xl md:text-4xl lg:text-[3.2rem] font-normal text-[#22c55e] flex items-center tracking-[-0.015em] leading-[0.98]">
                  <span>Making carbon visible & valuable</span>
                  <span
                    className="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-[#22c55e] ml-1.5 rounded-full animate-hero-cursor align-middle shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                    aria-hidden="true"
                  />
                </p>
              </motion.div>
            </div>

            {/* Paragraph 1 Reveal */}
            <motion.p
              custom={4}
              variants={heroEntranceVariants}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-normal"
            >
              Reveal the emissions your supply chain keeps hidden — UpCarb. automatically extracts high-resolution, product-level carbon data directly from your gas streams, in hours, not months.
            </motion.p>

            {/* Paragraph 2 Reveal */}
            <motion.p
              custom={5}
              variants={heroEntranceVariants}
              initial="hidden"
              animate="visible"
              className="text-base text-white/70 leading-relaxed max-w-xl font-normal"
            >
              Discover how UpCarb. turns raw capture facility data into world-class carbon intelligence and commercial off-take agreements.
            </motion.p>

            {/* CTAs featuring Liquid Glass Effect (Section 12) */}
            <motion.div
              custom={6}
              variants={heroEntranceVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-start gap-4 pt-4"
            >
              <Link href="#how-it-works">
                <LiquidButton variant="glass">
                  <Newspaper className="w-5 h-5 text-white" />
                  <span>Learn How</span>
                </LiquidButton>
              </Link>
              <Link href="/register">
                <LiquidButton variant="primary">
                  <Rocket className="w-5 h-5 text-[#083324]" />
                  <span>Try it for free</span>
                </LiquidButton>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Interactive Video Player Card with 3D Tilt (Section 11) */}
          <motion.div
            custom={7}
            variants={heroEntranceVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full max-w-xl"
          >
            <motion.div
              whileHover={{
                y: -4,
                scale: 1.01,
                rotateX: 1.2,
                rotateY: -1.2,
                boxShadow: "0 20px 40px -15px rgba(34, 197, 94, 0.25)",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block overflow-hidden rounded-xl border border-white/20 shadow-2xl bg-[#06291d] aspect-video"
            >
              <BorderBeam duration={7} size={300} colorFrom="#22c55e" colorTo="#083324" />
              {!isPlaying ? (
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#06291d] via-[#0b4231] to-[#041d14]">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.15),transparent_70%)]" />

                  {/* Center Play Button Overlay */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    aria-label="Play video"
                    className="relative z-20 flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white transition-transform duration-300 group-hover:scale-110 border border-white/30 cursor-pointer shadow-lg"
                  >
                    <Play className="h-7 w-7 translate-x-0.5 fill-current text-white" />
                  </button>

                  {/* Floating Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-lg bg-black/70 backdrop-blur border border-white/10 text-xs text-white/90">
                    <span className="font-semibold text-[#22c55e] block">Carbon2Product AI Overview</span>
                    <span className="text-white/70">Automated CO₂ Capture & Market Matching Platform</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/80 text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Lw9vAAAINAc?autoplay=1"
                    title="Carbon2Product Overview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Cinematic Scroll-Driven Carbon Journey Wave */}
      <CarbonJourneyWave containerRef={heroRef} />
    </section>
  );
}
