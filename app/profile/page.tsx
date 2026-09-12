"use client";

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Building2, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("c2p_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {}
    } else {
      setUser({
        name: "Ridham Rangani",
        email: "emitter@carbon2product.com",
        role: "EMITTER",
        organizationName: "Reliance Industrial Energy Hub",
        location: "Jamnagar, Gujarat",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto max-w-4xl mx-auto">
          <div className="border-b border-slate-800 pb-6">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <User className="h-4 w-4" /> Account Governance
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Profile & Organization Settings</h1>
          </div>

          {user && (
            <Card className="p-8 border-slate-800 bg-slate-900/90 space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-2xl flex items-center justify-center font-mono">
                  {user.name?.[0] || "U"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="emerald">{user.role}</Badge>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Verified Member
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-mono">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-xs block mb-1">EMAIL ADDRESS</span>
                  <span className="text-slate-100 font-bold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-400" /> {user.email}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-xs block mb-1">ORGANIZATION</span>
                  <span className="text-slate-100 font-bold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-emerald-400" /> {user.organizationName || "Industrial Hub"}
                  </span>
                </div>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
