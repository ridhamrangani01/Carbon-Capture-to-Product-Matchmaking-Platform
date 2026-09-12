"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, CheckCircle2, Sparkles, X } from "lucide-react";

interface BookDemoPanelProps {
  onClose?: () => void;
  isModal?: boolean;
}

export function BookDemoPanel({ onClose, isModal = false }: BookDemoPanelProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    company: "",
    source: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-[#050505] text-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen relative font-sans">
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors z-50 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Main Header Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-display font-normal text-white tracking-tight leading-[1.02]">
          Book A Demo
        </h1>
      </div>

      {/* 2-Column Split Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative">
        {/* Left Column: Value Prop & Media Box */}
        <div className="space-y-8 lg:pr-8">
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
            Discover how UpCarb. can help you build faster, optimize carbon pathways, and monetize capture streams with ease:
          </p>

          {/* Bullet Points */}
          <ul className="space-y-4 text-sm text-zinc-200">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>
                Schedule a consultation with a <strong className="text-white font-semibold">carbon capture & off-take expert</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>
                Map out your supply chain workflows and <strong className="text-white font-semibold">monetization opportunities</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>
                Start with a <strong className="text-white font-semibold">risk-free 60-day platform trial</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>Explore 8-vector deterministic matching tools</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>Collaborate in real-time with your team and off-take buyers</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>Access premium LCA datasets and verified EPD templates</span>
            </li>
          </ul>

          {/* Get a demo today! & Product Preview Card */}
          <div className="pt-4 space-y-4">
            <h2 className="text-2xl font-display font-medium text-white tracking-tight">
              Get a demo today!
            </h2>

            <div className="rounded-2xl border border-zinc-800 bg-[#0d0d0f] p-4 shadow-2xl overflow-hidden group">
              <div className="aspect-[16/10] relative rounded-xl overflow-hidden bg-[#06291d] flex flex-col justify-between p-6 border border-white/10">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.15),transparent_70%)]" />

                {/* Floating AI Icons Mockup Overlay */}
                <div className="relative z-10 text-center my-auto space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-500 mx-auto shadow-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white tracking-tight">UpCarb. AI</h3>
                  <span className="text-xs text-emerald-400 font-mono block">Matchmaking Platform Engine v2.4</span>
                </div>

                {/* Bottom UI Bar Mockup */}
                <div className="relative z-10 bg-black/60 backdrop-blur rounded-xl p-3 border border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                  <span>● 14 Pathways Matched</span>
                  <span className="text-[#22c55e] font-bold">98.4% Purity Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider Line for Large Screens */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800/80 -translate-x-1/2" />

        {/* Right Column: Form Panel */}
        <div className="lg:pl-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ali Imam"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@aliimam.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                />
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  Role
                </label>
                <input
                  type="text"
                  placeholder="Creative Director"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                />
              </div>

              {/* Studio / Company */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  Studio
                </label>
                <input
                  type="text"
                  placeholder="Your Design Studio"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                />
              </div>

              {/* How did you hear about us? */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  placeholder="LinkedIn, Friends etc"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                />
              </div>

              {/* Consent Text */}
              <p className="text-[11px] text-zinc-500 leading-relaxed pt-1">
                By submitting this form, I confirm that I have read the privacy policy and agree that my name and email address will be collected and used by UpCarb. for the purposes of sending design insights, promotions and updates. You can withdraw your consent at any time by unsubscribing or contacting us via privacy@upcarb.com
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all duration-300 shadow-xl hover:shadow-emerald-500/20 text-sm cursor-pointer mt-4"
              >
                Book Demo
              </button>
            </form>
          ) : (
            /* Success Feedback State */
            <div className="bg-[#0d0d0f] border border-[#22c55e]/40 rounded-2xl p-8 text-center space-y-4 shadow-2xl my-auto">
              <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto text-[#22c55e]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Demo Request Received!</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Our carbon off-take technical team will reach out to <strong className="text-white">{formData.email}</strong> within 24 hours to schedule your personalized demo.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                Submit another response
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
