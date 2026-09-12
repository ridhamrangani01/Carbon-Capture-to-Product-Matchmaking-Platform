"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMetricProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function AnimatedMetric({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
  decimals = 0,
}: AnimatedMetricProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(easedProgress * value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  const formattedNumber =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className={cn("font-mono font-bold inline-block", className)}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
