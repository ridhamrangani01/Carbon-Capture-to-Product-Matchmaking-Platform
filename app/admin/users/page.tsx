"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ShieldCheck, ChevronLeft } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([
    { id: "1", name: "Aarav Sharma", email: "admin@carbon2product.com", role: "ADMIN", organization: "Carbon2Product Governance" },
    { id: "2", name: "Ridham Rangani", email: "emitter@carbon2product.com", role: "EMITTER", organization: "Reliance Industrial Energy Hub" },
    { id: "3", name: "Dhyey Shah", email: "utilizer@carbon2product.com", role: "UTILIZER", organization: "Gujarat Methanol & Circular Chemicals" },
    { id: "4", name: "Dr. Pranshu Mehta", email: "researcher@carbon2product.com", role: "RESEARCHER", organization: "IIT Decarbonization Lab" },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar role="ADMIN" />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/admin">
              <Button variant="ghost" size="sm" className="gap-1 text-slate-400">
                <ChevronLeft className="h-4 w-4" /> Back to Admin Console
              </Button>
            </Link>
          </div>

          <div className="border-b border-slate-800 pb-6">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <Users className="h-4 w-4" /> Platform Security & Access
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">User & Role Management</h1>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono text-slate-400 uppercase">
                <tr>
                  <th className="p-4">User Name</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Organization</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-white font-sans">{u.name}</td>
                    <td className="p-4 text-slate-400">{u.email}</td>
                    <td className="p-4">
                      <Badge variant="emerald">{u.role}</Badge>
                    </td>
                    <td className="p-4 text-slate-300">{u.organization}</td>
                    <td className="p-4 text-right">
                      <span className="text-emerald-400 font-bold text-[11px] flex items-center justify-end gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
