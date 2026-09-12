"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PasswordStrengthInput } from "@/components/ui/password-strength-input";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organizationName: "",
    role: "EMITTER",
    location: "Jamnagar, Gujarat",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      localStorage.setItem("c2p_user", JSON.stringify(data.user));

      if (data.user.role === "UTILIZER") {
        router.push("/dashboard/utilizer");
      } else if (data.user.role === "RESEARCHER") {
        router.push("/dashboard/researcher");
      } else {
        router.push("/dashboard/emitter");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md">
            <Leaf className="h-6 w-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-display font-medium tracking-tight text-white">
            UpCarb<span className="text-emerald-400">.</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold text-white">Join the Carbon Utilization Network</h2>
        <p className="mt-1 text-sm text-slate-400">Register your organization as an Emitter, Utilizer, or Researcher</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-slate-900/90 py-8 px-6 shadow-2xl border border-slate-800 rounded-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Maya Patel"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="maya@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Password Validation Component with 4-bar indicator & requirement checkboxes */}
            <PasswordStrengthInput
              value={formData.password}
              onChange={(newPassword) => setFormData({ ...formData, password: newPassword })}
              label="New password"
              placeholder="••••••••••••"
            />

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1">
                Organization Name
              </label>
              <input
                type="text"
                required
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                placeholder="Clean Energy Synthetics Hub"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1">
                  Primary Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-medium focus:border-emerald-500 focus:outline-none"
                >
                  <option value="EMITTER">Carbon Emitter</option>
                  <option value="UTILIZER">CO₂ Utilizer</option>
                  <option value="RESEARCHER">Researcher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1">
                  Location / Hub
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Gujarat, India"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full justify-center gap-2 py-3 mt-4">
              {loading ? "Registering..." : "Create Account & Profile"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Already registered?{" "}
            <Link href="/login" className="text-emerald-400 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
