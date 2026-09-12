"use client";

import React, { useState } from "react";
import { MousePointerClick } from "lucide-react";
import { FeatureShaderCard, FeatureCardItem } from "@/components/ui/feature-shader-cards";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

export function PersonaSelector() {
  const [selectedPersona, setSelectedPersona] = useState<number>(0);

  const personas: FeatureCardItem[] = [
    {
      category: "SMEs & Industrial Emitters",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
      title: "Product-level CO₂e data for all your activities, generated automatically from your business data.",
      description: "Carbon2Product turns your existing facility documents into audit-ready CO₂e data — no Excel, no manual work, no specialist knowledge required. Answer your customer emission data requests or monetize your CO₂ stream.",
      highlightText: "No supplier surveys. No complex ERP integration necessary. Upload stream reports, get GHG Protocol-compliant output the same day.",
      highlightBorderColor: "border-[#083324]",
      href: "/solutions/smes",
      linkText: "Explore for Emitters & SMEs",
    },
    {
      category: "Industrial Feedstock Buyers",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-800",
      title: "Every supplier. Every stream line item. Every commercial off-take decision.",
      description: "Carbon2Product gives you Scope 1, 2, and 3 data directly from the capture documents you already have — and turns supplier quotations into forward-looking feedstock value.",
      highlightText: "Supplier benchmarking by CO₂ purity and purity grade. Automated vendor consolidation across your raw material base.",
      highlightBorderColor: "border-blue-500",
      href: "/solutions/industrial",
      linkText: "Explore for Industry",
    },
    {
      category: "Financial & Carbon Investors",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-800",
      title: "Enable your carbon project investments. Without burdening facility operators.",
      description: "Your carbon project clients want to provide emissions & capture data but lack the resources. Carbon2Product makes it fully automated — operators upload existing documents, you get verified carbon data.",
      highlightText: "Relevant for EU CBAM, CSRD ESRS E1, Green Asset Ratio, and Sustainability-Linked Loan structuring. High data quality at zero additional burden.",
      highlightBorderColor: "border-purple-500",
      isMostRequested: true,
      href: "/solutions/banks",
      linkText: "Explore for Financial Institutions",
    },
    {
      category: "Construction & Utilization Innovators",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-800",
      title: "CO₂e in every tender. Before you commit commercial contracts.",
      description: "Carbon procurement is different: the carbon decision happens at the quotation stage, not after the invoice arrives. Carbon2Product processes supplier quotes and BOMs to give indicative CO₂ values.",
      highlightText: "EPD integration for product-specific emission factors. LEED, BREEAM, and EU Taxonomy alignment for sustainable building products.",
      highlightBorderColor: "border-amber-500",
      href: "/solutions/construction",
      linkText: "Explore for Construction",
    },
  ];

  return (
    <section className="py-20 bg-[#F2F4F1] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Label Bar */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">
              Who uses UpCarb.
            </span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Pointer Subheader */}
          <div className="flex items-center gap-2 mb-8">
            <MousePointerClick className="w-4 h-4 text-[#083324] flex-shrink-0 animate-pulse" />
            <p className="text-sm font-semibold text-gray-700">
              Select your profile to personalise this page for you
            </p>
          </div>
        </ScrollReveal>

        {/* Feature Shader Cards Grid with Interactive Mouse Shader Effect */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-3xl overflow-hidden p-1.5 bg-gray-200 border border-gray-300 shadow-xl">
            {personas.map((persona, index) => (
              <FeatureShaderCard
                key={index}
                item={persona}
                index={index}
                isSelected={selectedPersona === index}
                onSelect={() => setSelectedPersona(index)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
