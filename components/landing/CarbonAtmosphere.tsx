"use client";

import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export const carbonAtmosphere = {
  colors: {
    base: "#083324",
    dark: "#06291d",
    emerald: "#0b5d3b",
    accent: "#22c55e",
    teal: "#0b4f46",
    mint: "#6ee7a0",
    pale: "#b7f7ce",
  },
  animation: {
    minDuration: 18,
    maxDuration: 35,
  },
  intensity: {
    desktop: 1,
    tablet: 0.75,
    mobile: 0.55,
  },
};

interface CarbonAtmosphereProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  interactive?: boolean;
}

export function CarbonAtmosphere({
  children,
  className,
  containerClassName,
  interactive = true,
}: CarbonAtmosphereProps) {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart={carbonAtmosphere.colors.base}
      gradientBackgroundEnd={carbonAtmosphere.colors.dark}
      firstColor="11, 93, 59"      // Deep Emerald #0b5d3b
      secondColor="34, 197, 94"    // Soft Green #22c55e
      thirdColor="11, 79, 70"      // Deep Teal #0b4f46
      fourthColor="110, 231, 160"  // Mint #6ee7a0
      fifthColor="183, 247, 206"   // Pale Green #b7f7ce
      pointerColor="34, 197, 94"   // Soft Green
      blendingMode="screen"
      interactive={interactive}
      className={className}
      containerClassName={containerClassName}
      showGrain={true}
    >
      {children}
    </BackgroundGradientAnimation>
  );
}
