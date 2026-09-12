"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { sectionRevealVariants } from "@/lib/motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 40, scale: 0.98 };
      case "down":
        return { opacity: 0, y: -40, scale: 0.98 };
      case "left":
        return { opacity: 0, x: -40, scale: 0.98 };
      case "right":
        return { opacity: 0, x: 40, scale: 0.98 };
      case "none":
        return { opacity: 0, scale: 0.98 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 1.0,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
