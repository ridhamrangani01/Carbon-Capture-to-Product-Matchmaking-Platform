"use client";

import React, { useState } from "react";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "glass";
}

export function LiquidButton({
  children,
  className = "",
  variant = "glass",
  ...props
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95 ${
        variant === "primary"
          ? "bg-[#22c55e] text-[#083324] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
          : "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:border-[#22c55e]/60 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      } ${className}`}
      {...props}
    >
      {/* Liquid Glass Fluid Reflection Shader Layer */}
      <span
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ${
          isHovered ? "translate-x-full" : "-translate-x-full"
        }`}
      />

      {/* Radial Lens Highlight Distortion */}
      <span className="pointer-events-none absolute -inset-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_60%)] opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Inner Metallic Border Shimmer */}
      <span className="pointer-events-none absolute inset-0 rounded-full border border-white/20 group-hover:border-emerald-400/50 transition-colors" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
