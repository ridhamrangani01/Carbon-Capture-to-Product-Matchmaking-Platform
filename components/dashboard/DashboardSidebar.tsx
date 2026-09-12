"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Factory,
  Layers,
  Sparkles,
  ShoppingBag,
  Calculator,
  ShieldCheck,
  User,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role?: string;
}

export function DashboardSidebar({ role = "EMITTER" }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/carbon-sources", label: "Carbon Sources", icon: Factory },
    { href: "/products", label: "Product Pathways", icon: Layers },
    { href: "/matches", label: "Matched Opportunities", icon: Sparkles },
    { href: "/marketplace", label: "Marketplace Search", icon: ShoppingBag },
    { href: "/impact", label: "Impact Calculator", icon: Calculator },
    { href: "/products/compare", label: "Pathway Compare", icon: ShieldCheck },
    { href: "/profile", label: "Profile & Org", icon: User },
  ];

  if (role === "ADMIN" || pathname.startsWith("/admin")) {
    links.push({ href: "/admin/users", label: "Admin Console", icon: Users });
  }

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 p-4 min-h-[calc(100vh-61px)] hidden md:block shrink-0">
      <nav className="space-y-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 block mb-2">
          Navigation Menu
        </span>
        {links.map((link) => {
          const IconComp = link.icon;
          const active = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                active
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              )}
            >
              <IconComp className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
