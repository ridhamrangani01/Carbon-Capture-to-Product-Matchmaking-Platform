"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { User, Mail, Shield, Save, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>({
    name: "Demo Emitter",
    email: "emitter@demo.com",
    role: "CARBON_EMITTER",
    organization: "Global Steel Works",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("c2p_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("c2p_user", JSON.stringify(user));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display font-semibold text-white">User Profile</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Manage your personal profile, authenticated session settings, and role credentials.
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-4">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/20 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] text-2xl font-bold">
                {user.name ? user.name[0] : "U"}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-xs text-[#22c55e] font-semibold">{user.role}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/70 mb-1">Full Name</label>
              <input
                type="text"
                value={user.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-white/70 mb-1">Work Email</label>
              <input
                type="email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#22c55e] text-black font-bold text-xs hover:bg-[#6ee7a0] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Save className="w-4 h-4" /> Save Profile Details
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
