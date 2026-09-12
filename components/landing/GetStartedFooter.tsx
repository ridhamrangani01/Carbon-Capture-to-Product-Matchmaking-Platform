"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Mail, ArrowRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

export function GetStartedFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubscribed(true);
  }

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      {/* Get Started Section */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-6xl font-display font-normal text-slate-900 tracking-tight leading-[1.02] mb-3">
              Get started
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Don't believe we've unlocked Scope 3 with activity-based data in real-time? <br className="hidden sm:block" />
              Too good to be true?
            </p>
          </ScrollReveal>

          {/* Split Contact Container Card */}
          <ScrollReveal delay={0.2} className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Column: Meeting & Offices */}
            <div className="space-y-8 border-b md:border-b-0 md:border-r border-slate-200 pb-8 md:pb-0 md:pr-12">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-[#22c55e]" />
                  <h3 className="text-base font-bold text-slate-900">Schedule a Meeting</h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Book a technical demo meeting with one of our carbon off-take experts.
                </p>
                <Link href="/register" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#083324] hover:text-[#22c55e] transition-colors group">
                  <span>Open Calendar</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <MapPin className="h-4 w-4 text-[#22c55e]" />
                    <span>Austrian office</span>
                  </div>
                  <p className="text-xs text-slate-500">Postgasse 8b, 1010 Vienna, Austria</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <MapPin className="h-4 w-4 text-[#22c55e]" />
                    <span>Swiss office</span>
                  </div>
                  <p className="text-xs text-slate-500">Limmatquai 122, 8001 Zürich, Switzerland</p>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <Mail className="h-4 w-4 text-[#22c55e]" />
                  <span>Reach us directly</span>
                </div>
                <a href="mailto:office@carbon2product.com" className="text-xs font-mono text-[#22c55e] hover:underline">
                  office@carbon2product.com
                </a>
              </div>
            </div>

            {/* Right Column: Instant Demo Call-To-Action Box */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22c55e] bg-[#22c55e]/10 px-3 py-1 rounded-full border border-[#22c55e]/30">
                  Instant Access
                </span>
                <h3 className="text-2xl font-display font-medium text-slate-900 mt-3 mb-2 tracking-tight">
                  Try UpCarb. right now
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Experience automated CO₂ stream extraction on sample reports or connect your own facility parameters in our sandbox environment.
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/register" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl bg-[#083324] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#06291d] transition-all cursor-pointer shadow-lg"
                  >
                    <Rocket className="h-4 w-4 text-[#22c55e]" />
                    <span>Start free trial (No credit card)</span>
                  </motion.button>
                </Link>

                <Link href="/book-demo" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 text-[#083324]" />
                    <span>Book a guided 1-on-1 demo</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Deep Forest Green Footer Section */}
      <footer className="bg-[#083324] text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 border-b border-white/10 pb-12">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <span className="text-3xl font-display font-medium tracking-tight text-white">
                  UpCarb<span className="text-[#22c55e]">.</span>
                </span>
              </Link>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                Carbon Capture-to-Product Matchmaking Platform connecting industrial CO₂ emitters with commercial off-takers & utilization pathways.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/40 block">
                Platform
              </span>
              <ul className="space-y-2 text-xs text-white/70">
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/marketplace" className="hover:text-white transition-colors">CO₂ Streams Marketplace</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Product Directory</Link></li>
                <li><Link href="/impact" className="hover:text-white transition-colors">Impact Calculator</Link></li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/40 block">
                Solutions
              </span>
              <ul className="space-y-2 text-xs text-white/70">
                <li><Link href="/solutions/industrial" className="hover:text-white transition-colors">For Emitters</Link></li>
                <li><Link href="/solutions/construction" className="hover:text-white transition-colors">For Off-Takers</Link></li>
                <li><Link href="/solutions/banks" className="hover:text-white transition-colors">For Investors</Link></li>
                <li><Link href="/solutions/cbam" className="hover:text-white transition-colors">EU CBAM & CSRD</Link></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/40 block">
                Newsletter
              </span>
              <p className="text-xs text-white/60">
                Monthly carbon off-take market benchmarks & policy updates.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:border-[#22c55e] focus:outline-none"
                  />
                  <button type="submit" className="rounded-xl bg-[#22c55e] p-2 text-[#083324] font-bold hover:bg-[#22c55e]/90 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <span className="text-xs text-[#22c55e] font-mono block">✓ Thank you for subscribing!</span>
              )}
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
            <span>© 2026 UpCarb. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/security" className="hover:text-white transition-colors">ISO 27001 Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
