"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Cpu,
  Database,
  Flame,
  Package,
  Sparkles,
  FileSpreadsheet,
  Building,
  BarChart2,
  Settings,
  User,
  LogOut,
  Shield,
  Bell,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Uploads", href: "/dashboard/uploads", icon: Upload },
  { name: "Processing", href: "/dashboard/processing", icon: Cpu },
  { name: "Carbon Data", href: "/dashboard/carbon-data", icon: Database },
  { name: "Sources", href: "/dashboard/sources", icon: Flame },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Matching", href: "/dashboard/matching", icon: Sparkles },
  { name: "Reports", href: "/dashboard/reports", icon: FileSpreadsheet },
  { name: "Suppliers", href: "/dashboard/suppliers", icon: Building },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>({
    name: "Demo Emitter",
    email: "emitter@demo.com",
    role: "CARBON_EMITTER",
    organization: "Global Steel Works",
  });

  useEffect(() => {
    const stored = localStorage.getItem("c2p_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUser(u);
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("c2p_user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col font-sans selection:bg-[#22c55e] selection:text-black">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 bg-[#083324] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/70 hover:text-white p-1"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-xl font-display font-semibold text-white tracking-tight">
              UpCarb<span className="text-[#22c55e] text-2xl leading-none">.</span>
            </span>
            <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30">
              Platform
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-bold hover:bg-[#22c55e] hover:text-black transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </Link>
          )}

          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-white">{user.name || "Demo User"}</span>
            <span className="text-[10px] text-white/50">{user.organization?.name || user.organization || "Acme Org"}</span>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#083324] border-r border-white/10 pt-16 md:pt-0 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col justify-between`}
        >
          <div className="p-4 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
              Main Dashboard
            </div>
            {navItems.map((item) => {
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

            <div className="pt-4 border-t border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
              Role Workspaces
            </div>
            <Link
              href="/dashboard/emitter"
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs ${
                pathname === "/dashboard/emitter" ? "bg-white/10 text-white font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span>Emitter View</span>
            </Link>
            <Link
              href="/dashboard/utilizer"
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs ${
                pathname === "/dashboard/utilizer" ? "bg-white/10 text-white font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Utilizer View</span>
            </Link>
            <Link
              href="/dashboard/researcher"
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs ${
                pathname === "/dashboard/researcher" ? "bg-white/10 text-white font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Researcher View</span>
            </Link>
          </div>

          <div className="p-4 border-t border-white/10 bg-black/20 text-xs space-y-2">
            <div className="flex items-center justify-between text-white/60">
              <span>Active Role:</span>
              <span className="font-bold text-[#22c55e] uppercase">{user.role || "EMITTER"}</span>
            </div>
            <div className="text-[10px] text-white/40 truncate">
              Org: {user.organization?.name || user.organization || "Global Carbon Inc"}
            </div>
          </div>
        </aside>

        {/* Main View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
