"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Flame, Plus, Search, Filter, RefreshCw, CheckCircle2, Shield } from "lucide-react";

export default function SourcesPage() {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    sourceName: "",
    facilityName: "",
    country: "USA",
    sourceType: "BIOGAS",
    co2Purity: 99.5,
    volumePerMonth: 500,
    state: "Gas",
  });

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/carbon-sources");
      if (res.ok) {
        const data = await res.json();
        setSources(data.sources || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/carbon-sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        fetchSources();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-display font-semibold text-white">Carbon Stream Sources</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Registered biogenic & industrial point-source carbon capture facilities.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Register New Stream
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-white/50 text-xs space-y-2">
            <div className="w-6 h-6 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Loading carbon stream records...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.map((src) => (
              <div key={src.id} className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-4 hover:border-[#22c55e]/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#22c55e]/10 text-[#22c55e] text-[10px] font-bold uppercase">
                    {src.sourceType}
                  </span>
                  <span className="text-xs font-mono text-white/40">{src.country}</span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">{src.sourceName}</h3>
                  <p className="text-xs text-white/50">{src.facilityName}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                    <p className="text-white/40">CO₂ Purity</p>
                    <p className="text-lg font-bold text-[#22c55e]">{src.co2Purity}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                    <p className="text-white/40">Volume</p>
                    <p className="text-lg font-bold text-white">{src.volumePerMonth.toLocaleString()} t/mo</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs border-t border-white/10">
                  <span className="text-white/60">State: {src.state}</span>
                  <span className="text-[#22c55e] font-semibold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> Verified Stream
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Source Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#083324] border border-white/20 rounded-2xl p-6 space-y-4 shadow-2xl">
              <h2 className="text-xl font-bold text-white">Register Carbon Source Stream</h2>
              <form onSubmit={handleCreate} className="space-y-3">
                <div>
                  <label className="block text-xs text-white/70 mb-1">Source Name</label>
                  <input
                    type="text"
                    required
                    value={formData.sourceName}
                    onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
                    placeholder="Ethanol Fermentation Unit 1"
                    className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">Facility Name</label>
                  <input
                    type="text"
                    required
                    value={formData.facilityName}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                    placeholder="Midwest Biofuels Facility"
                    className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Purity (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.co2Purity}
                      onChange={(e) => setFormData({ ...formData, co2Purity: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Vol (t/mo)</label>
                    <input
                      type="number"
                      required
                      value={formData.volumePerMonth}
                      onChange={(e) => setFormData({ ...formData, volumePerMonth: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0]"
                  >
                    Save Stream
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
