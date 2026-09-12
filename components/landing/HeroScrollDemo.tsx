"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <section className="bg-black text-white py-12 flex flex-col overflow-hidden border-t border-b border-white/10">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <span className="inline-block text-xs font-mono font-bold tracking-widest text-[#22c55e] uppercase bg-[#22c55e]/10 border border-[#22c55e]/30 px-3 py-1 rounded-full">
              Real-Time Carbon Intelligence Dashboard
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-normal text-white tracking-tight leading-[1.05]">
              Unleash the power of <br />
              <span className="text-4xl md:text-[5rem] font-display font-normal text-[#22c55e] mt-1 leading-none block tracking-tight">
                Deterministic CCU Matching
              </span>
            </h2>
          </div>
        }
      >
        {/* Interactive Dashboard Mockup Card inside 3D Tilt Frame */}
        <div className="w-full h-full bg-[#06291d] p-6 text-left flex flex-col justify-between space-y-6 font-sans">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs font-mono text-white/50 ml-2">app.carbon2product.com/live-monitor</span>
            </div>
            <span className="text-xs font-mono text-[#22c55e] font-bold bg-[#22c55e]/20 px-3 py-1 rounded-full border border-[#22c55e]/30">
              ● 100% ONLINE · 8-VECTOR MATCHING
            </span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-xl border border-white/10">
              <span className="text-[11px] font-mono text-white/40 block">TOTAL CO₂ CAPTURED</span>
              <span className="text-2xl font-bold text-white">48,920 t/yr</span>
            </div>
            <div className="bg-black/60 p-4 rounded-xl border border-white/10">
              <span className="text-[11px] font-mono text-white/40 block">ACTIVE OFF-TAKE OFFERS</span>
              <span className="text-2xl font-bold text-[#22c55e]">14 Pathways</span>
            </div>
            <div className="bg-black/60 p-4 rounded-xl border border-white/10">
              <span className="text-[11px] font-mono text-white/40 block">AVG STREAM PURITY</span>
              <span className="text-2xl font-bold text-white">98.4% Food Grade</span>
            </div>
            <div className="bg-black/60 p-4 rounded-xl border border-white/10">
              <span className="text-[11px] font-mono text-white/40 block">MONETIZED VALUE</span>
              <span className="text-2xl font-bold text-emerald-400">$2,690,600 / yr</span>
            </div>
          </div>

          {/* Table Preview */}
          <div className="bg-black/40 rounded-xl border border-white/10 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-white/40 font-mono pb-2 border-b border-white/10">
              <span>CAPTURE SOURCE</span>
              <span>UTILIZATION PATHWAY</span>
              <span>MATCH SCORE</span>
              <span>COMMERCIAL VALUE</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">Refinery Gas Steam Reformer #04</span>
              <span className="text-emerald-400">Synthetic E-Methanol Fuel Feedstock</span>
              <span className="text-[#22c55e] font-bold">99.4% Match</span>
              <span className="text-white font-bold">$68.50 / t</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono border-t border-white/[0.05] pt-2">
              <span className="text-white font-bold">Biogas Upgrading Plant Facility B</span>
              <span className="text-blue-400">Concrete Mineralization Curing</span>
              <span className="text-[#22c55e] font-bold">96.8% Match</span>
              <span className="text-white font-bold">$42.00 / t</span>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
