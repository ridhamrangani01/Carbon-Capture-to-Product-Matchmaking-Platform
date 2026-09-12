"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Settings, Shield, Save, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display font-semibold text-white">Organization Settings</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Manage organization data isolation, API webhooks, and default calculation methodologies.
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Settings updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <h2 className="text-lg font-bold text-white">Organization Profile</h2>

            <div>
              <label className="block text-xs text-white/70 mb-1">Organization Name</label>
              <input
                type="text"
                defaultValue="Global Carbon Emitters Inc"
                className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/70 mb-1">Country / Region</label>
                <input
                  type="text"
                  defaultValue="United States"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Default Emission Factor Standard</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none">
                  <option>IPCC 2021 AR6 Standard</option>
                  <option>EPA eGRID 2023</option>
                  <option>DEFRA 2023 Standard</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Save className="w-4 h-4" /> Save Organization Settings
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
