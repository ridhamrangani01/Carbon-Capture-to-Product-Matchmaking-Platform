"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingMode?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
  showGrain?: boolean;
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(8, 51, 36)",
  gradientBackgroundEnd = "rgb(6, 41, 29)",
  firstColor = "11, 93, 59",      // Deep Emerald #0b5d3b
  secondColor = "34, 197, 94",    // Soft Green #22c55e
  thirdColor = "11, 79, 70",      // Deep Teal #0b4f46
  fourthColor = "110, 231, 160",  // Mint #6ee7a0
  fifthColor = "183, 247, 206",   // Pale Green #b7f7ce
  pointerColor = "34, 197, 94",   // Soft Green
  size = "80%",
  blendingMode = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
  showGrain = true,
}: BackgroundGradientAnimationProps) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  // IntersectionObserver to pause animation when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle mouse tracking interpolation (max 15px drift)
  useEffect(() => {
    if (!interactive || isTouchDevice || !isVisible || shouldReduceMotion) return;

    let animationFrameId: number;

    const followMouse = () => {
      setCurX((prev) => prev + (tgX - prev) * 0.05);
      setCurY((prev) => prev + (tgY - prev) * 0.05);
      animationFrameId = requestAnimationFrame(followMouse);
    };

    followMouse();
    return () => cancelAnimationFrame(animationFrameId);
  }, [tgX, tgY, interactive, isTouchDevice, isVisible, shouldReduceMotion]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current || isTouchDevice) return;
    const rect = interactiveRef.current.getBoundingClientRect();
    // Bounded subtle offset (-15px to 15px)
    const rawX = event.clientX - rect.left - rect.width / 2;
    const rawY = event.clientY - rect.top - rect.height / 2;
    const maxOffset = 15;
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, rawX * 0.03));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, rawY * 0.03));
    setTgX(clampedX);
    setTgY(clampedY);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#083324]",
        containerClassName
      )}
      style={{
        background: `linear-gradient(135deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
      }}
    >
      {/* SVG Noise Filter to prevent banding */}
      <svg className="hidden">
        <defs>
          <filter id="carbon-blur">
            <feGaussianBlur stdDeviation="80" result="blur" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="carbon"
            />
            <feBlend in="SourceGraphic" in2="carbon" />
          </filter>
        </defs>
      </svg>

      {/* Atmospheric Radial Gradient Fields */}
      <div className={cn("absolute inset-0 pointer-events-none z-0", className)}>
        {/* Blob 1: Large Dark Emerald - Top Left */}
        <motion.div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.22)_0,_rgba(var(--first-color),_0)_50%)]",
            "w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] -top-[20%] -left-[15%]",
            "rounded-full blur-[140px] md:blur-[180px]",
            "mix-blend-screen opacity-90"
          )}
          style={
            {
              "--first-color": firstColor,
              willChange: "transform",
            } as React.CSSProperties
          }
          animate={
            shouldReduceMotion || !isVisible
              ? {}
              : {
                  x: ["-5%", "12%", "-5%"],
                  y: ["0%", "8%", "0%"],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{
            duration: 26,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2: Soft Green Accent - Center Right */}
        <motion.div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.11)_0,_rgba(var(--second-color),_0)_50%)]",
            "w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] top-[10%] right-[-10%]",
            "rounded-full blur-[160px] md:blur-[220px]",
            "mix-blend-screen opacity-85"
          )}
          style={
            {
              "--second-color": secondColor,
              willChange: "transform",
            } as React.CSSProperties
          }
          animate={
            shouldReduceMotion || !isVisible
              ? {}
              : {
                  x: ["0%", "-14%", "0%"],
                  y: ["0%", "12%", "0%"],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            duration: 32,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Blob 3: Deep Teal - Bottom Left */}
        <motion.div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.20)_0,_rgba(var(--third-color),_0)_50%)]",
            "w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bottom-[-15%] left-[10%]",
            "rounded-full blur-[140px] md:blur-[180px]",
            "mix-blend-screen opacity-80"
          )}
          style={
            {
              "--third-color": thirdColor,
              willChange: "transform",
            } as React.CSSProperties
          }
          animate={
            shouldReduceMotion || !isVisible
              ? {}
              : {
                  x: ["0%", "15%", "0%"],
                  y: ["0%", "-10%", "0%"],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 28,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Blob 4: Mint Glow - Center Behind Hero Content */}
        <motion.div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.06)_0,_rgba(var(--fourth-color),_0)_50%)]",
            "w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] top-[25%] left-[25%]",
            "rounded-full blur-[180px] md:blur-[240px]",
            "mix-blend-screen opacity-90"
          )}
          style={
            {
              "--fourth-color": fourthColor,
              willChange: "transform",
            } as React.CSSProperties
          }
          animate={
            shouldReduceMotion || !isVisible
              ? {}
              : {
                  x: ["-8%", "8%", "-8%"],
                  y: ["-5%", "10%", "-5%"],
                  scale: [1, 1.2, 1],
                }
          }
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Blob 5: Faint Pale Green Accent */}
        <motion.div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.03)_0,_rgba(var(--fifth-color),_0)_50%)]",
            "w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bottom-[20%] right-[15%]",
            "rounded-full blur-[150px] md:blur-[200px]",
            "mix-blend-screen opacity-70"
          )}
          style={
            {
              "--fifth-color": fifthColor,
              willChange: "transform",
            } as React.CSSProperties
          }
          animate={
            shouldReduceMotion || !isVisible
              ? {}
              : {
                  x: ["5%", "-10%", "5%"],
                  y: ["8%", "-6%", "8%"],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{
            duration: 24,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Interactive Pointer Blob */}
        {interactive && !isTouchDevice && (
          <div
            ref={interactiveRef}
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.08)_0,_rgba(var(--pointer-color),_0)_50%)]",
              "w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] -top-[25%] -left-[25%]",
              "rounded-full blur-[120px] pointer-events-none opacity-80"
            )}
            style={{
              "--pointer-color": pointerColor,
              transform: `translate3d(${curX}px, ${curY}px, 0)`,
              willChange: "transform",
            } as React.CSSProperties}
          />
        )}

        {/* Subtle Climate-Tech Grain Texture Overlay (0.025 opacity) */}
        {showGrain && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
      </div>

      {/* Content Children */}
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
};
