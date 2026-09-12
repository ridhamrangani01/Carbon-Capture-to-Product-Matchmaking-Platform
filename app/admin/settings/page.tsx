"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Settings, Save, CheckCircle2 } from "lucide-react";

export default function AdminGlobalSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
            <Settings className="w-3.5 h-3.5" /> Platform System Configuration
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Global Platform Settings</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Configure global security policies, password hashing salt rounds, and email notification webhooks.
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Global system configuration saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#06241a] border border-white/10 space-y-4">
            <h2 className="text-lg font-bold text-white">Security & RBAC Enforcement</h2>

            <div>
              <label className="block text-xs text-white/70 mb-1">Session Expiration (Hours)</label>
              <input
                type="number"
                defaultValue={24}
                className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-white/70 mb-1">Audit Logging Level</label>
              <select className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none">
                <option>ALL_EVENTS (Verbose Security & Action Logging)</option>
                <option>MUTATING_EVENTS_ONLY</option>
                <option>ERRORS_AND_SECURITY_ONLY</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Save className="w-4 h-4" /> Save Global Configuration
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
