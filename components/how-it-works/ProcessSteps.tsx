"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Cpu, BarChart3, Check, ArrowRight, FileText, Plus, RefreshCw } from "lucide-react";
import { HOW_IT_WORKS_DATA, StepTabItem } from "@/data/how-it-works";
import { BorderBeam } from "@/components/ui/border-beam";

export function ProcessSteps() {
  const { stepsSection } = HOW_IT_WORKS_DATA;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [extraDocs, setExtraDocs] = useState<{ name: string; status: string; statusColor: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const currentStep = stepsSection.tabs[activeTab];
  const tabIcons = [Upload, Cpu, BarChart3];

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const sampleNames = [
        "Quote_CarbonOfftake_April2026.pdf",
        "BOM_Cement_Facility_v3.xlsx",
        "Invoice_GasTransport_EU_2026.pdf",
      ];
      const randomDoc = sampleNames[extraDocs.length % sampleNames.length];
      setExtraDocs((prev) => [
        { name: randomDoc, status: "✓ parsed · 99.1% matched", statusColor: "text-[#22c55e]" },
        ...prev,
      ]);
      setIsUploading(false);
    }, 800);
  };

  return (
    <section id="step-by-step" className="py-24 bg-[#083324] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-normal text-white mb-3 tracking-tight leading-[1.08]">
            {stepsSection.title}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl font-normal">
            {stepsSection.subtitle}
          </p>
        </motion.div>

        {/* 3 Step Interactive Navigation Tabs */}
        <div className="flex gap-3 mb-14 flex-wrap">
          {stepsSection.tabs.map((tab, index) => {
            const IconComponent = tabIcons[index] || Upload;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#22c55e] text-[#083324] font-semibold shadow-lg scale-105"
                    : "bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-mono text-xs opacity-75">{tab.short}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Detail Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left Column: Details & Bullets */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-6xl sm:text-7xl font-display font-normal text-[#22c55e]/30 leading-none font-mono">
                {currentStep.stepNum}
              </div>

              <h3 className="text-3xl font-display font-medium text-white tracking-tight">
                {currentStep.title}
              </h3>

              <p className="text-white/70 text-base leading-relaxed font-normal">
                {currentStep.desc}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-4 pt-2">
                {currentStep.bullets.map((bullet, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#22c55e] shrink-0" />
                    <div>
                      <span className="text-white font-semibold text-sm block">
                        {bullet.title}
                      </span>
                      <span className="text-white/60 text-xs">{bullet.text}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Formats Badges */}
              <div className="flex flex-wrap gap-2 pt-4">
                {currentStep.formats.map((fmt, idx) => (
                  <span
                    key={idx}
                    className="bg-white/[0.08] border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-lg font-mono"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Simulated Interactive Document Card */}
            <div className="lg:col-span-6">
              <div className="relative bg-[#06291d] border border-white/15 rounded-2xl p-6 shadow-2xl overflow-hidden">
                <BorderBeam duration={8} size={280} colorFrom="#22c55e" colorTo="#083324" />

                {activeTab === 0 && (
                  <div className="space-y-3 font-sans">
                    <div className="px-4 py-2 border-b border-white/10 text-white/40 text-xs font-mono uppercase tracking-wider flex items-center justify-between">
                      <span>UPLOADED DOCUMENTS</span>
                      <button
                        onClick={handleSimulateUpload}
                        disabled={isUploading}
                        className="text-[#22c55e] hover:underline text-xs flex items-center gap-1 cursor-pointer"
                      >
                        {isUploading ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Plus className="w-3 h-3" />
                        )}
                        <span>{isUploading ? "Uploading..." : "+ Upload Sample Doc"}</span>
                      </button>
                    </div>

                    {/* Extra User Uploaded Docs */}
                    {extraDocs.map((doc, idx) => (
                      <motion.div
                        key={`extra-${idx}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between px-4 py-3 bg-[#22c55e]/15 border border-[#22c55e]/30 rounded-xl text-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate mr-2">
                          <FileText className="h-4 w-4 text-[#22c55e] shrink-0" />
                          <span className="text-white font-mono truncate">{doc.name}</span>
                        </div>
                        <span className="text-[11px] shrink-0 font-semibold text-[#22c55e]">
                          {doc.status}
                        </span>
                      </motion.div>
                    ))}

                    {currentStep.documents.map((doc, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.15 }}
                        className="flex items-center justify-between px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate mr-2">
                          <FileText className="h-4 w-4 text-[#22c55e] shrink-0" />
                          <span className="text-white/90 font-mono truncate">{doc.name}</span>
                        </div>
                        <span className={`text-[11px] shrink-0 font-semibold ${doc.statusColor}`}>
                          {doc.status}
                        </span>
                      </motion.div>
                    ))}

                    {currentStep.compareHighlight && (
                      <div className="p-4 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl text-xs text-white/80 mt-4">
                        <span className="font-semibold text-white mr-1">
                          {currentStep.compareHighlight.label}
                        </span>{" "}
                        <span className="text-[#22c55e] font-bold">
                          {currentStep.compareHighlight.valA}
                        </span>{" "}
                        vs{" "}
                        <span className="text-white font-bold">
                          {currentStep.compareHighlight.valB}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="space-y-3">
                    <div className="text-white/40 text-xs font-mono uppercase tracking-wider pb-2 border-b border-white/10 flex items-center justify-between">
                      <span>AI Classification & Factor Matching</span>
                      <span className="text-[#22c55e] text-[10px]">Deterministic Engine Active</span>
                    </div>
                    {currentStep.matchedItems?.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.15 }}
                        className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between hover:border-[#22c55e]/40 transition-colors"
                      >
                        <div>
                          <span className="text-white font-semibold text-sm block">
                            {item.title}
                          </span>
                          <span className="text-white/50 text-xs font-mono">{item.sub}</span>
                        </div>
                        <span className={`font-mono font-bold text-xs px-3 py-1 rounded-md ${item.badgeColor}`}>
                          {item.score}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-white font-semibold text-sm">
                        Corporate Scope 3 Summary Report
                      </span>
                      <span className="text-[#22c55e] font-mono text-xs">
                        ✓ GHG Protocol Verified
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentStep.outputStats?.map((stat, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-black/50 border border-white/10 hover:border-[#22c55e]/40 transition-colors">
                          <span className="text-white/40 block text-[10px] font-mono">
                            {stat.label}
                          </span>
                          <span className={`text-xl font-bold font-mono ${stat.color || "text-white"}`}>
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
