"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, ArrowRight, Lock, Mail, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store demo session in localStorage
      localStorage.setItem("c2p_user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (data.user.role === "UTILIZER") {
        router.push("/dashboard/utilizer");
      } else if (data.user.role === "RESEARCHER") {
        router.push("/dashboard/researcher");
      } else {
        router.push("/dashboard/emitter");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  function applyPreset(presetEmail: string) {
    setEmail(presetEmail);
    setPassword("Password123!");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md">
            <Leaf className="h-6 w-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-display font-medium tracking-tight text-white">
            UpCarb<span className="text-emerald-400">.</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold text-white">Sign in to your account</h2>
        <p className="mt-1 text-sm text-slate-400">Access the Carbon Utilization Matchmaking Network</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        {/* Quick Demo Credentials Preset Bar */}
        <div className="mb-6 p-4 rounded-xl border border-emerald-500/30 bg-slate-900/90 text-xs">
          <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Hackathon Demo Credentials
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => applyPreset("emitter@carbon2product.com")}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-left hover:border-emerald-500 transition-colors"
            >
              <span className="font-bold text-white block">Carbon Emitter</span>
              <span className="text-[10px] text-slate-400">emitter@carbon2product.com</span>
            </button>
            <button
              onClick={() => applyPreset("utilizer@carbon2product.com")}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-left hover:border-emerald-500 transition-colors"
            >
              <span className="font-bold text-white block">CO₂ Utilizer</span>
              <span className="text-[10px] text-slate-400">utilizer@carbon2product.com</span>
            </button>
            <button
              onClick={() => applyPreset("researcher@carbon2product.com")}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-left hover:border-emerald-500 transition-colors"
            >
              <span className="font-bold text-white block">Researcher</span>
              <span className="text-[10px] text-slate-400">researcher@carbon2product.com</span>
            </button>
            <button
              onClick={() => applyPreset("admin@carbon2product.com")}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-left hover:border-emerald-500 transition-colors"
            >
              <span className="font-bold text-white block">Platform Admin</span>
              <span className="text-[10px] text-slate-400">admin@carbon2product.com</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-900/90 py-8 px-6 shadow-2xl border border-slate-800 rounded-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                />
                <Mail className="h-4 w-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-medium text-slate-300 uppercase">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-emerald-400 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                />
                <Lock className="h-4 w-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full justify-center gap-2 py-3">
              {loading ? "Authenticating..." : "Sign In to Network"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-emerald-400 font-semibold hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
