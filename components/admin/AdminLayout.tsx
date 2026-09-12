"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Users,
  Building,
  FileText,
  Upload,
  Flame,
  Database,
  Sparkles,
  FileSpreadsheet,
  Activity,
  Server,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const adminNavItems = [
  { name: "Admin Console Overview", href: "/admin", icon: ShieldCheck },
  { name: "User Governance", href: "/admin/users", icon: Users },
  { name: "Organizations", href: "/admin/organizations", icon: Building },
  { name: "System Documents", href: "/admin/documents", icon: FileText },
  { name: "All Uploads", href: "/admin/uploads", icon: Upload },
  { name: "Carbon Stream Sources", href: "/admin/carbon-sources", icon: Flame },
  { name: "Emission Factors Engine", href: "/admin/emission-factors", icon: Database },
  { name: "Matching Logic & Rules", href: "/admin/matching", icon: Sparkles },
  { name: "Generated Reports", href: "/admin/reports", icon: FileSpreadsheet },
  { name: "Audit Trail & Logs", href: "/admin/audit-log", icon: Activity },
  { name: "System Health & Ops", href: "/admin/system", icon: Server },
  { name: "Global Admin Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>({ name: "Platform Admin", role: "ADMIN" });

  useEffect(() => {
    const stored = localStorage.getItem("c2p_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUser(u);
      } catch (e) {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#041a12] text-white flex flex-col font-sans selection:bg-[#22c55e] selection:text-black">
      {/* Top Admin Header */}
      <header className="h-16 border-b border-white/10 bg-[#06241a] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/70 hover:text-white p-1"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-xl font-display font-semibold text-white tracking-tight">
                UpCarb<span className="text-[#22c55e] text-2xl leading-none">.</span>
              </span>
            </Link>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Admin Console
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to User Dashboard
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#06241a] border-r border-white/10 pt-16 md:pt-0 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col justify-between`}
        >
          <div className="p-4 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
              Governance & Admin
            </div>
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#22c55e] text-black font-bold shadow-md shadow-[#22c55e]/20"
                      : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/10 bg-black/30 text-xs">
            <div className="flex items-center justify-between text-white/60">
              <span>Admin Context:</span>
              <span className="font-bold text-[#22c55e]">SUPERADMIN</span>
            </div>
          </div>
        </aside>

        {/* Main Admin View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
