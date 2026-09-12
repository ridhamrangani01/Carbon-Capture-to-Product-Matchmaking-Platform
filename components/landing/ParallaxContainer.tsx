"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.05 to 0.05 for subtle parallax
  className?: string;
}

export function ParallaxContainer({
  children,
  speed = 0.05,
  className,
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed * 200, speed * 200]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
