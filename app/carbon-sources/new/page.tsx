"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Factory, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

export default function NewCarbonSourcePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "Jamnagar Industrial Off-Gas Stream",
    location: "Jamnagar, Gujarat, India",
    quantityValue: 500,
    quantityUnit: "tonnes/month",
    purityPercent: 99.5,
    physicalState: "Gas",
    temperatureC: 25,
    pressureBar: 2.0,
    captureTechnology: "Amine Solvent Absorption",
    availabilityFrequency: "Continuous 24/7",
    transportRadiusKm: 200,
    impuritiesNotes: "Traces of N2 (0.3%), H2O vapor < 0.1%",
    certificationStatus: "Verified Third-Party",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get stored user or use demo emitter user
      const stored = localStorage.getItem("c2p_user");
      let emitterId = "cm4demoemitteruser";
      if (stored) {
        try {
          const u = JSON.parse(stored);
          if (u.id) emitterId = u.id;
        } catch (e) {}
      }

      const res = await fetch("/api/carbon-sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, emitterId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create carbon source");
      }

      router.push(`/carbon-sources/${data.carbonSource.id}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar role="EMITTER" />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto max-w-4xl mx-auto">
          <div className="border-b border-slate-800 pb-6">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <Factory className="h-4 w-4" /> Source Registration Wizard
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Register New Captured CO₂ Source</h1>
            <p className="text-slate-400 text-sm mt-1">
              Specify technical parameters to trigger the 8-vector matchmaking algorithm against commercial pathway buyers.
            </p>
          </div>

          <Card className="p-8 border-slate-800 bg-slate-900/90">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                  Source Title / Stream Designation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Jamnagar Refinery Flue Gas Stream #4"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    Location / Industrial Hub *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Jamnagar, Gujarat"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    Capture Technology *
                  </label>
                  <select
                    value={formData.captureTechnology}
                    onChange={(e) => setFormData({ ...formData, captureTechnology: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Amine Solvent Absorption">Amine Solvent Absorption</option>
                    <option value="Direct Air Capture (DAC)">Direct Air Capture (DAC)</option>
                    <option value="Pressure Swing Adsorption (PSA)">Pressure Swing Adsorption (PSA)</option>
                    <option value="Membrane Separation">Membrane Separation</option>
                    <option value="Cryogenic Distillation">Cryogenic Distillation</option>
                    <option value="Oxy-Fuel Combustion">Oxy-Fuel Combustion</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    Volume Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.quantityValue}
                    onChange={(e) => setFormData({ ...formData, quantityValue: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    Quantity Unit *
                  </label>
                  <select
                    value={formData.quantityUnit}
                    onChange={(e) => setFormData({ ...formData, quantityUnit: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none font-mono"
                  >
                    <option value="tonnes/month">tonnes/month</option>
                    <option value="tonnes/year">tonnes/year</option>
                    <option value="tonnes/day">tonnes/day</option>
                    <option value="kg/day">kg/day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    CO₂ Purity (%) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.1"
                    min="50"
                    max="100"
                    value={formData.purityPercent}
                    onChange={(e) => setFormData({ ...formData, purityPercent: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold text-sm focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    Physical State *
                  </label>
                  <select
                    value={formData.physicalState}
                    onChange={(e) => setFormData({ ...formData, physicalState: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Gas">Gas</option>
                    <option value="Liquid">Liquid</option>
                    <option value="Supercritical">Supercritical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    Temperature (°C) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.temperatureC}
                    onChange={(e) => setFormData({ ...formData, temperatureC: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    Pressure (bar) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.1"
                    min="0.1"
                    value={formData.pressureBar}
                    onChange={(e) => setFormData({ ...formData, pressureBar: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    Supply Frequency *
                  </label>
                  <select
                    value={formData.availabilityFrequency}
                    onChange={(e) => setFormData({ ...formData, availabilityFrequency: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Continuous 24/7">Continuous 24/7</option>
                    <option value="Batch Daily">Batch Daily</option>
                    <option value="Intermittent">Intermittent</option>
                    <option value="Seasonal">Seasonal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                    Transport Radius Limit (km)
                  </label>
                  <input
                    type="number"
                    value={formData.transportRadiusKm}
                    onChange={(e) => setFormData({ ...formData, transportRadiusKm: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                  Impurities & Secondary Gases Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.impuritiesNotes}
                  onChange={(e) => setFormData({ ...formData, impuritiesNotes: e.target.value })}
                  placeholder="e.g. Traces of N2 (0.3%), H2O vapor < 0.1%"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <Link href="/dashboard">
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={loading} variant="primary" className="gap-2 px-8">
                  <Sparkles className="h-4 w-4" />
                  {loading ? "Calculating Matches..." : "Submit & Run Matchmaking Engine"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
}
