"use client";

import React, { useEffect, useState } from "react";
import { motion, MotionValue, useTransform, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThreeDTextProps {
  text: string;
  className?: string;
  scrollYProgress?: MotionValue<number>;
  depth?: number;
  highlight?: boolean;
}

export function ThreeDText({
  text,
  className = "",
  scrollYProgress,
  depth = 8,
  highlight = true,
}: ThreeDTextProps) {
  const fallbackProgress = useMotionValue(0.5);
  const progress = scrollYProgress || fallbackProgress;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3D Scroll Transforms
  const rawScale = useTransform(
    progress,
    [0, 0.4, 0.7, 1],
    isMobile ? [0.92, 1, 1.02, 1] : [0.88, 1, 1.03, 1]
  );
  const rawOpacity = useTransform(
    progress,
    [0, 0.25, 0.8],
    [0.65, 1, 1]
  );
  const rawRotateX = useTransform(
    progress,
    [0, 0.45],
    isMobile ? [6, 0] : [18, 0]
  );
  const rawRotateY = useTransform(
    progress,
    [0, 0.45],
    isMobile ? [-1, 0] : [-4, 0]
  );
  const rawTranslateY = useTransform(
    progress,
    [0, 0.45],
    [40, 0]
  );

  // Smooth springs to prevent any robotic jumps
  const scale = useSpring(rawScale, { stiffness: 90, damping: 22 });
  const opacity = useSpring(rawOpacity, { stiffness: 90, damping: 22 });
  const rotateX = useSpring(rawRotateX, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 80, damping: 20 });
  const translateY = useSpring(rawTranslateY, { stiffness: 80, damping: 20 });

  return (
    <div className="relative inline-block perspective-[1400px] select-none">
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          rotateY,
          translateY,
          transformStyle: "preserve-3d",
        }}
        className={cn("relative z-10 inline-block font-display font-semibold tracking-tight uppercase", className)}
      >
        {/* Layered Extrusion Shadow Effects Behind Text */}
        <span
          aria-hidden="true"
          className="absolute inset-0 text-[#06291d] blur-[1px] pointer-events-none select-none"
          style={{
            transform: "translateZ(-8px) translateY(4px)",
            opacity: 0.9,
          }}
        >
          {text}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 text-[#083324] pointer-events-none select-none"
          style={{
            transform: "translateZ(-6px) translateY(3px)",
            opacity: 0.85,
          }}
        >
          {text}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 text-[#0b5d3b] pointer-events-none select-none"
          style={{
            transform: "translateZ(-3px) translateY(1.5px)",
            opacity: 0.8,
          }}
        >
          {text}
        </span>

        {/* Primary Foreground 3D Text Element */}
        <span className="relative z-10 block bg-gradient-to-b from-[#ffffff] via-[#6ee7a0] to-[#22c55e] bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(34,197,94,0.35)]">
          {text}
        </span>

        {/* Soft Green Reflection Light Sweep Pass across "MATCHING" */}
        {highlight && (
          <motion.span
            aria-hidden="true"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 4.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 bg-clip-text text-transparent"
          >
            {text}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
