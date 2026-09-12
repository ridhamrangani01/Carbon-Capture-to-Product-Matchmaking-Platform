"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Factory, Cpu, Flame, Building2, FlaskConical, Sprout, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

export function AnimatedFlowVisualization() {
  const [activeNode, setActiveNode] = useState<string>("engine");

  const products = [
    { id: "fuel", name: "E-Methanol & SAF", icon: Flame, match: "96%", color: "text-amber-400" },
    { id: "concrete", name: "Concrete Curing", icon: Building2, match: "91%", color: "text-blue-400" },
    { id: "chemicals", name: "PCC & Polymers", icon: FlaskConical, match: "88%", color: "text-purple-400" },
    { id: "biomass", name: "Algae Biomass", icon: Sprout, match: "82%", color: "text-emerald-400" },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto my-8 p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.08)] overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        
        {/* Node 1: CO2 Capture Source */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => setActiveNode("source")}
          className={`flex-1 w-full md:w-auto p-5 rounded-xl border cursor-pointer transition-all ${
            activeNode === "source"
              ? "border-emerald-500/80 bg-emerald-950/30 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
              : "border-slate-800 bg-slate-950/70 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400">
              <Factory className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">Emitter Site</span>
              <h4 className="text-base font-bold text-white">Refinery Flue Gas</h4>
            </div>
          </div>
          <div className="space-y-1 text-xs text-slate-400 font-mono">
            <p>• Volume: 500 t/month</p>
            <p>• Purity: 99.5% CO₂</p>
            <p>• Pressure: 2.0 bar</p>
          </div>
        </motion.div>

        {/* Flow Connector Line 1 */}
        <div className="hidden md:flex flex-col items-center justify-center px-2">
          <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500/80 to-teal-400 relative">
            <motion.div
              animate={{ x: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"
            />
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-1">Raw CO₂</span>
        </div>

        {/* Node 2: Carbon2Product Matchmaking Engine */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => setActiveNode("engine")}
          className={`flex-1 w-full md:w-auto p-5 rounded-xl border cursor-pointer transition-all ${
            activeNode === "engine"
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_35px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/50"
              : "border-emerald-500/40 bg-slate-950/80 hover:border-emerald-500/60"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 animate-pulse">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Core Engine
              </span>
              <h4 className="text-base font-bold text-white">Deterministic Match</h4>
            </div>
          </div>
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-emerald-400 font-semibold">• 8-Vector Compatibility</p>
            <p>• Purity & Scale Scoring</p>
            <p>• TRL & Logistics Check</p>
          </div>
        </motion.div>

        {/* Flow Connector Line 2 */}
        <div className="hidden md:flex flex-col items-center justify-center px-2">
          <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-500 relative">
            <motion.div
              animate={{ x: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
              className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-teal-300 shadow-[0_0_10px_#2dd4bf]"
            />
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-1">Matched</span>
        </div>

        {/* Node 3: Product Pathways */}
        <div className="flex-1 w-full md:w-auto grid grid-cols-2 gap-2">
          {products.map((p) => {
            const IconComp = p.icon;
            return (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.04 }}
                onClick={() => setActiveNode(p.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeNode === p.id
                    ? "border-emerald-400 bg-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "border-slate-800 bg-slate-950/70 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <IconComp className={`h-4 w-4 ${p.color}`} />
                  <span className="text-[10px] font-bold font-mono text-emerald-400">{p.match}</span>
                </div>
                <span className="block text-xs font-semibold text-white leading-tight">{p.name}</span>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Helper Banner */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
          <CheckCircle2 className="h-4 w-4" /> Live Match Engine Active: 8 Utilization Pathways Evaluated
        </span>
        <span className="hidden sm:block text-slate-400 italic">Click any node to inspect parameters</span>
      </div>
    </div>
  );
}
