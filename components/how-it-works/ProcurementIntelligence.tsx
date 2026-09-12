"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Check, AlertCircle, Sparkles } from "lucide-react";
import { HOW_IT_WORKS_DATA } from "@/data/how-it-works";

export function ProcurementIntelligence() {
  const { procurementSection } = HOW_IT_WORKS_DATA;
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>("s1");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const selectedSupplier =
    procurementSection.suppliers.find((s) => s.id === selectedSupplierId) ||
    procurementSection.suppliers[0];

  // Highest emitting baseline (Zement Nord KG)
  const baselineSupplier = procurementSection.suppliers[2];

  // Dynamic decision insight calculation
  const getDynamicInsight = () => {
    if (selectedSupplier.id === baselineSupplier.id) {
      return {
        text: `Currently selected: ${selectedSupplier.name} (Highest emissions baseline).`,
        savedCo2: "0.0 t CO₂e",
        extraCost: "Baseline price",
        costNote: "Switch to Maier Beton GmbH to reduce emissions by 10.8 t CO₂e (36.7% reduction).",
      };
    }
    return {
      text: `Choosing ${selectedSupplier.name} vs. ${baselineSupplier.name}:`,
      savedCo2: selectedSupplier.id === "s1" ? "10.8 t CO₂e" : "4.8 t CO₂e",
      extraCost: selectedSupplier.id === "s1" ? "₹750/m³ more" : "₹320/m³ more",
      costNote: `Carbon advantage: ${selectedSupplier.id === "s1" ? "36.7%" : "16.3%"} CO₂ reduction. Saved on ETS exposure.`,
    };
  };

  const dynamicInsight = getDynamicInsight();

  return (
    <section id="procurement" className="py-24 bg-[#F2F4F1] text-gray-900 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#083324] bg-[#22c55e]/20 px-3 py-1 rounded-full border border-[#22c55e]/30">
              {procurementSection.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-gray-900 tracking-tight leading-[1.08]">
              {procurementSection.title}
            </h2>

            <p className="text-gray-700 leading-relaxed font-normal text-base sm:text-lg">
              {procurementSection.subtitle}
            </p>

            {/* Bullets List */}
            <ul className="space-y-3 pt-2">
              {procurementSection.bullets.map((bullet, idx) => (
                <li key={idx} className="flex gap-3 items-start text-sm text-gray-800">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#083324] shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-gray-500 italic pt-2">
              {procurementSection.footnote}
            </p>
          </motion.div>

          {/* Right Column: Premium Interactive Supplier Comparison Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl font-sans">
              
              {/* Tender Header Bar */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-sm font-bold text-gray-900">
                    {procurementSection.tenderTitle}
                  </span>
                </div>
                <span className="text-xs text-gray-600 bg-emerald-100 font-bold px-3 py-1 rounded-full font-mono">
                  {procurementSection.bidsReceived} · Click row to evaluate
                </span>
              </div>

              {/* Desktop Table Header */}
              <div className="hidden sm:grid grid-cols-5 gap-2 px-6 py-3 bg-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                <span>Supplier</span>
                <span className="text-right">Price/m³</span>
                <span className="text-right">CO₂e/m³</span>
                <span className="text-right">Total CO₂e</span>
                <span className="text-right">CO₂e/₹</span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {procurementSection.suppliers.map((supplier) => {
                  const isSelected = selectedSupplierId === supplier.id;
                  return (
                    <div
                      key={supplier.id}
                      onClick={() => setSelectedSupplierId(supplier.id)}
                      onMouseEnter={() => setHoveredRow(supplier.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`p-4 sm:px-6 sm:py-4 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 border-l-4 border-l-[#22c55e] shadow-sm"
                          : hoveredRow === supplier.id
                          ? "bg-gray-50/90"
                          : "bg-white"
                      }`}
                    >
                      {/* Desktop View */}
                      <div className="hidden sm:grid grid-cols-5 gap-2 items-center">
                        <div>
                          <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                            <span>{supplier.name}</span>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                            )}
                          </div>
                          {supplier.isRecommended && (
                            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                              {supplier.highlightText}
                            </span>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-900 font-medium">
                          {supplier.pricePerUnit}
                        </div>
                        <div
                          className={`text-right text-sm font-bold ${
                            supplier.isRecommended ? "text-emerald-700" : "text-gray-800"
                          }`}
                        >
                          {supplier.co2PerUnit}
                        </div>
                        <div className="text-right text-sm text-gray-900 font-bold">
                          {supplier.totalCo2}
                        </div>
                        <div
                          className={`text-right text-sm font-bold ${
                            supplier.isRecommended ? "text-emerald-700" : "text-gray-500"
                          }`}
                        >
                          {supplier.co2PerCurrency}
                        </div>
                      </div>

                      {/* Mobile Stacked Card View */}
                      <div className="sm:hidden space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-900">{supplier.name}</span>
                          {supplier.isRecommended && (
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                              RECOMMENDED
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div>Price: <strong className="text-gray-900">{supplier.pricePerUnit}</strong></div>
                          <div>CO₂e/m³: <strong className="text-emerald-700">{supplier.co2PerUnit}</strong></div>
                          <div>Total: <strong className="text-gray-900">{supplier.totalCo2}</strong></div>
                          <div>Efficiency: <strong className="text-gray-700">{supplier.co2PerCurrency}</strong></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Dynamic Decision Insight Banner */}
              <div className="px-6 py-4 bg-[#083324]/[0.05] border-t border-[#083324]/10 transition-all">
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans">
                  <strong className="text-gray-900">{dynamicInsight.text}</strong> save{" "}
                  <span className="text-emerald-700 font-bold">
                    {dynamicInsight.savedCo2}
                  </span>{" "}
                  ({dynamicInsight.extraCost}).{" "}
                  <span className="text-gray-600">
                    {dynamicInsight.costNote}
                  </span>
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
