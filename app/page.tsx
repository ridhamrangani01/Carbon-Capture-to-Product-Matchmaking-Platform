import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HeroScrollDemo } from "@/components/landing/HeroScrollDemo";
import { VelarisDemo } from "@/components/landing/VelarisDemo";
import { TrustedStandards } from "@/components/landing/TrustedStandards";
import { InteractiveSamplePreview } from "@/components/landing/InteractiveSamplePreview";
import { PersonaSelector } from "@/components/landing/PersonaSelector";
import { ThreeStepMethodology } from "@/components/landing/ThreeStepMethodology";
import { RegulatorySolutions } from "@/components/landing/RegulatorySolutions";
import { SampleMatchCard } from "@/components/landing/SampleMatchCard";
import { CuratedResources } from "@/components/landing/CuratedResources";
import { ImpactCalculator } from "@/components/landing/ImpactCalculator";
import { GetStartedFooter } from "@/components/landing/GetStartedFooter";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#083324] text-slate-100 font-sans selection:bg-[#22c55e] selection:text-slate-950">
      {/* 1. Top Navbar */}
      <Navbar />

      {/* 2. Forest Green Hero Section */}
      <HeroSection />

      {/* 3. Container Scroll Animation Section (Aceternity UI) */}
      <HeroScrollDemo />

      {/* 4. Living WebGL Noise Simplex Gradient Section (Velaris UI) */}
      <VelarisDemo />

      {/* 5. Trusted Standards Bar */}
      <TrustedStandards />

      {/* 6. Dark Section: Interactive Sample Data Preview */}
      <InteractiveSamplePreview />

      {/* 7. Light Section: Profile Persona Selector */}
      <PersonaSelector />

      {/* 8. Three Step Methodology & Bright Green CTA Bar */}
      <ThreeStepMethodology />

      {/* 9. Regulatory & Operational Solutions Grid */}
      <RegulatorySolutions />

      {/* 10. Matchmaking Engine Live Interactive Inspector */}
      <section id="how-it-works" className="py-24 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 text-center mb-12">
          <Badge variant="emerald" className="mb-3 px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/40 font-mono">
            DETERMINISTIC 8-VECTOR ENGINE
          </Badge>
          <h2 className="text-3xl md:text-5xl font-display font-normal text-white tracking-tight leading-[1.08]">
            See the Matchmaking Engine in Action
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl mx-auto">
            Test how our 8-vector algorithm evaluates real carbon streams against commercial intake windows.
          </p>
        </div>

        <SampleMatchCard />
      </section>

      {/* 11. Curated Resources Library */}
      <CuratedResources />

      {/* 12. Circular Value & Impact Calculator */}
      <section id="impact" className="py-24 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 text-center mb-12">
          <Badge variant="emerald" className="mb-3 px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/40 font-mono">
            ENVIRONMENTAL & ECONOMIC IMPACT
          </Badge>
          <h2 className="text-3xl md:text-5xl font-display font-normal text-white tracking-tight leading-[1.08]">
            Calculate Your Circular Carbon Value
          </h2>
        </div>

        <ImpactCalculator />
      </section>

      {/* 13. Get Started & Deep Forest Green Footer */}
      <GetStartedFooter />
    </div>
  );
}
