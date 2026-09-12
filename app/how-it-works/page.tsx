"use client";

import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HowItWorksHero } from "@/components/how-it-works/HowItWorksHero";
import { ProcessSteps } from "@/components/how-it-works/ProcessSteps";
import { ProcurementIntelligence } from "@/components/how-it-works/ProcurementIntelligence";
import { MethodologySection } from "@/components/how-it-works/MethodologySection";
import { StandardsSection } from "@/components/how-it-works/StandardsSection";
import { CoverageMatrix } from "@/components/how-it-works/CoverageMatrix";
import { HowItWorksCTA } from "@/components/how-it-works/HowItWorksCTA";
import { FAQSection } from "@/components/how-it-works/FAQSection";
import { GetStartedFooter } from "@/components/landing/GetStartedFooter";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#22c55e] selection:text-slate-950">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Hero Section with Video/Media Player (Ref Screenshot 1) */}
      <HowItWorksHero />

      {/* 3. Step-by-Step Interactive Process Section (Ref Screenshot 2) */}
      <ProcessSteps />

      {/* 4. Procurement Intelligence & Supplier Comparison Table (Ref Screenshot 3) */}
      <ProcurementIntelligence />

      {/* 5. Science & Traceability Methodology Section (Ref Screenshot 4) */}
      <MethodologySection />

      {/* 6. Built on Recognised Standards Strip */}
      <StandardsSection />

      {/* 7. Coverage & Capabilities Matrix (Ref Screenshot 5) */}
      <CoverageMatrix />

      {/* 8. Call To Action Bar */}
      <HowItWorksCTA />

      {/* 9. Interactive FAQ Accordion */}
      <FAQSection />

      {/* 10. Global Footer */}
      <GetStartedFooter />
    </div>
  );
}
