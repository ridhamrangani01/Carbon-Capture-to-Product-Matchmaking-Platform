"use client";

import React from "react";
import { CarbonWebGLJourney } from "@/components/landing/CarbonWebGLJourney";

interface CarbonJourneyWaveProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CarbonJourneyWave({ containerRef }: CarbonJourneyWaveProps) {
  return (
    <div className="w-full relative mt-8 pointer-events-auto">
      <CarbonWebGLJourney containerRef={containerRef} />
    </div>
  );
}
