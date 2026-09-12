"use client";

import React from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className = "",
  size = 250,
  duration = 8,
  borderWidth = 2,
  colorFrom = "#22c55e",
  colorTo = "#000000",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width))_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size))] after:animate-border-beam after:bg-[radial-gradient(ellipse_at_center,var(--color-from),var(--color-to)_70%)] after:[offset-anchor:100%_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)))] ${className}`}
    />
  );
}
