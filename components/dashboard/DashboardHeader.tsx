"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, LogOut, User, Bell, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("c2p_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {}
    } else {
      // Fallback default demo user for instant explore
      setUser({
        name: "Ridham Rangani",
        email: "emitter@carbon2product.com",
        role: "EMITTER",
        organizationName: "Reliance Industrial Energy Hub",
      });
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("c2p_user");
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md">
            <Leaf className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-xl font-display font-medium text-white hidden sm:inline">
            UpCarb<span className="text-emerald-400">.</span>
          </span>
        </Link>

        {user && (
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 border-l border-slate-800 pl-4">
            <span className="font-semibold text-slate-200">{user.organizationName || "Network Member"}</span>
            <Badge variant="emerald">{user.role}</Badge>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link href="/carbon-sources/new">
          <Button size="sm" variant="primary" className="gap-1.5 text-xs">
            <Plus className="h-4 w-4" />
            Add Carbon Source
          </Button>
        </Link>

        {user && (
          <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
            <div className="hidden sm:block text-right">
              <span className="block text-xs font-bold text-white">{user.name}</span>
              <span className="block text-[10px] text-slate-400 font-mono">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
