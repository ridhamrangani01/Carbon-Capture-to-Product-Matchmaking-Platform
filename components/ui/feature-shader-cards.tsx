"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export interface FeatureCardItem {
  category: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  description: string;
  highlightText: string;
  highlightBorderColor?: string;
  href: string;
  linkText: string;
  isMostRequested?: boolean;
  shaderColors?: [string, string, string];
}

interface FeatureShaderCardProps {
  item: FeatureCardItem;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export function FeatureShaderCard({
  item,
  isSelected,
  onSelect,
  index,
}: FeatureShaderCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Shader radial mask position
  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(34, 197, 94, 0.15), transparent 80%)`;
  const borderMaskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(34, 197, 94, 0.8), transparent 80%)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      className={`group relative p-8 transition-all duration-300 cursor-pointer bg-white text-gray-900 overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 ${
        isSelected ? "ring-2 ring-[#22c55e] border-transparent" : ""
      }`}
    >
      {/* Animated Mouse-Following Radial Shader Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{
          background: maskImage,
        }}
      />

      {/* Animated Glowing Border Shimmer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          border: "2px solid rgba(34, 197, 94, 0.5)",
          maskImage: borderMaskImage,
          WebkitMaskImage: borderMaskImage,
        }}
      />

      {item.isMostRequested && (
        <div className="absolute top-0 right-6 bg-[#083324] text-[#22c55e] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-b-lg shadow-sm border-x border-b border-[#22c55e]/30 font-mono z-20">
          Most requested
        </div>
      )}

      {/* Header Tag & Radio Circle */}
      <div className="flex items-center justify-between mb-4 relative z-20">
        <span
          className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${item.badgeBg} ${item.badgeText}`}
        >
          {item.category}
        </span>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isSelected
              ? "border-[#22c55e] bg-[#22c55e] scale-110 shadow-md"
              : "border-gray-300 bg-white group-hover:border-[#22c55e]"
          }`}
        >
          {isSelected && (
            <svg
              className="w-3.5 h-3.5 text-[#083324]"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-display font-medium text-gray-900 mb-3 leading-snug tracking-tight relative z-20 group-hover:text-[#083324] transition-colors">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-5 font-normal relative z-20">
        {item.description}
      </p>

      {/* Highlight Box with Left Accent Line */}
      <div
        className={`bg-[#F2F4F1] rounded-xl p-4 text-sm text-gray-700 leading-relaxed border-l-4 ${
          item.highlightBorderColor || "border-[#083324]"
        } relative z-20 shadow-inner`}
      >
        {item.highlightText}
      </div>

      {/* Active "This is me" pill */}
      <div
        className={`mt-4 transition-all duration-300 relative z-20 ${
          isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#22c55e] text-[#083324] text-xs font-semibold shadow-md">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          This is me — click to personalise
        </span>
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-4 border-t border-gray-100 relative z-20 flex items-center justify-between">
        <a
          href={item.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#083324] group-hover:text-[#22c55e] transition-colors"
        >
          <span>{item.linkText}</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function FeaturesCards() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const personaItems: FeatureCardItem[] = [
    {
      category: "SMEs & Industrial Emitters",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
      title: "Product-level CO₂e data for all your activities, generated automatically from your business data.",
      description: "UpCarb. turns your existing facility documents into audit-ready CO₂e data — no Excel, no manual work, no specialist knowledge required. Answer your customer emission data requests or monetize your CO₂ stream.",
      highlightText: "No supplier surveys. No complex ERP integration necessary. Upload stream reports, get GHG Protocol-compliant output the same day.",
      href: "/solutions/smes",
      linkText: "Explore for Emitters & SMEs",
    },
    {
      category: "Industrial Feedstock Buyers",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-800",
      title: "Every supplier. Every stream line item. Every commercial off-take decision.",
      description: "UpCarb. gives you Scope 1, 2, and 3 data directly from the capture documents you already have — and turns supplier quotations into forward-looking feedstock value.",
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
      description: "Your carbon project clients want to provide emissions & capture data but lack the resources. UpCarb. makes it fully automated — operators upload existing documents, you get verified carbon data.",
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
      description: "Carbon procurement is different: the carbon decision happens at the quotation stage, not after the invoice arrives. UpCarb. processes supplier quotes and BOMs to give indicative CO₂ values.",
      highlightText: "EPD integration for product-specific emission factors. LEED, BREEAM, and EU Taxonomy alignment for sustainable building products.",
      highlightBorderColor: "border-amber-500",
      href: "/solutions/construction",
      linkText: "Explore for Construction",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-3xl overflow-hidden p-1 bg-gray-200 border border-gray-300 shadow-xl">
      {personaItems.map((item, idx) => (
        <FeatureShaderCard
          key={idx}
          item={item}
          index={idx}
          isSelected={selectedIdx === idx}
          onSelect={() => setSelectedIdx(idx)}
        />
      ))}
    </div>
  );
}
