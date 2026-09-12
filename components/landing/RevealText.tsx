"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionConfig } from "@/lib/motion";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  mode?: "word" | "character";
}

export function RevealText({
  children,
  className,
  delay = 0,
  mode = "word",
}: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (mode === "character") {
    const chars = children.split("");
    return (
      <span ref={ref} className={cn("inline-block overflow-hidden", className)}>
        {chars.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: "100%" }}
            animate={isInView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "100%" }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.03,
              ease: motionConfig.slowReveal.ease,
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    );
  }

  const words = children.split(" ");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <motion.span
            initial={{ opacity: 0, y: "110%", filter: "blur(4px)" }}
            animate={
              isInView
                ? { opacity: 1, y: "0%", filter: "blur(0px)" }
                : { opacity: 0, y: "110%", filter: "blur(4px)" }
            }
            transition={{
              duration: 1.1,
              delay: delay + index * 0.08,
              ease: motionConfig.slowReveal.ease,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
