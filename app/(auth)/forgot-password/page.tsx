"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md">
            <Leaf className="h-6 w-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-sans">
            Carbon<span className="text-emerald-400">2</span>Product
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold text-white">Reset Password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-slate-900/90 py-8 px-6 shadow-2xl border border-slate-800 rounded-2xl">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Reset Link Sent</h3>
              <p className="text-xs text-slate-400">
                If an account exists for <strong className="text-emerald-400">{email}</strong>, password reset instructions have been sent.
              </p>
              <Link href="/login">
                <Button variant="secondary" className="w-full justify-center mt-4">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase mb-1">
                  Enter Your Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <Button type="submit" className="w-full justify-center gap-2 py-3 mt-4">
                Send Instructions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}

          {!submitted && (
            <div className="mt-6 text-center text-xs text-slate-400">
              Remembered password?{" "}
              <Link href="/login" className="text-emerald-400 font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
