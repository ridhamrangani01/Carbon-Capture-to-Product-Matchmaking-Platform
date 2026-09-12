"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Users, ShieldCheck, Search, Filter } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([
    { id: "1", name: "Aarav Sharma", email: "admin@carbon2product.com", role: "ADMIN", organization: "Carbon2Product Governance", status: "ACTIVE" },
    { id: "2", name: "Ridham Rangani", email: "emitter@carbon2product.com", role: "EMITTER", organization: "Reliance Industrial Energy Hub", status: "ACTIVE" },
    { id: "3", name: "Dhyey Shah", email: "utilizer@carbon2product.com", role: "UTILIZER", organization: "Gujarat Methanol & Circular Chemicals", status: "ACTIVE" },
    { id: "4", name: "Dr. Pranshu Mehta", email: "researcher@carbon2product.com", role: "RESEARCHER", organization: "IIT Decarbonization Lab", status: "ACTIVE" },
  ]);

  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleRoleChange = async (id: string, newRole: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, role: newRole }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6">
          <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1 mb-1">
            <Users className="w-3.5 h-3.5" /> Platform Security & Access
          </span>
          <h1 className="text-3xl font-display font-bold text-white">User & Role Management</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Assign RBAC roles (ADMIN, EMITTER, UTILIZER, RESEARCHER), manage multi-tenant access, and suspend or activate accounts.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#06241a] p-4 rounded-2xl border border-white/10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user name or email address..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/30 text-xs focus:border-[#22c55e] focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-[#06241a] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/70">
              <thead className="bg-black/30 border-b border-white/10 text-white/40 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">User Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Organization</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4 text-right">Account Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 font-bold text-white">{u.name}</td>
                    <td className="p-4 text-white/60">{u.email}</td>
                    <td className="p-4 text-white/80">{u.organization}</td>
                    <td className="p-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/20 text-[#22c55e] font-bold text-xs focus:outline-none"
                      >
                        <option value="CARBON_EMITTER">CARBON_EMITTER</option>
                        <option value="CO2_UTILIZER">CO2_UTILIZER</option>
                        <option value="RESEARCHER">RESEARCHER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => alert(`Account state toggled for ${u.name}`)}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold transition-all"
                      >
                        {u.status === "ACTIVE" ? "Suspend Account" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
