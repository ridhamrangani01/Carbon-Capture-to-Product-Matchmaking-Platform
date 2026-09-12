"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    role: "Industrial Emitter",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-white">
            Get in Touch with Carbon Intelligence Experts
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Have questions about document extraction pipelines, off-taker matchmaking, or enterprise API integrations? Our team is standing by.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info Column */}
          <div className="space-y-8 p-8 rounded-2xl bg-[#083324] border border-white/10">
            <h2 className="text-2xl font-display font-semibold text-white">Global Headquarters</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              We work with industrial facilities, carbon utilization technology providers, and ESG consulting firms worldwide.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Email Inquiry</p>
                  <p className="font-medium text-white">contact@carbon2product.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Direct Support</p>
                  <p className="font-medium text-white">+1 (800) 555-CARBON</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Office</p>
                  <p className="font-medium text-white">Climate Tech Innovation Hub, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="p-8 rounded-2xl bg-[#083324] border border-white/10">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#22c55e] mx-auto" />
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully</h3>
                <p className="text-sm text-white/70">Thank you for reaching out. A climate intelligence specialist will respond within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-display font-semibold text-white mb-6">Send Us a Message</h2>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:border-[#22c55e] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:border-[#22c55e] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">Organization Name</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Acme Industrial Captures"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:border-[#22c55e] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">Organization Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#22c55e] focus:outline-none text-sm"
                  >
                    <option value="Industrial Emitter">Industrial Emitter</option>
                    <option value="Product Off-Taker">Product Off-Taker / CO₂ Utilizer</option>
                    <option value="Climate Investor">Climate Investor / Researcher</option>
                    <option value="ESG Consultant">ESG Consultant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, document volume, or off-take requirements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:border-[#22c55e] focus:outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#22c55e] text-black font-bold text-sm hover:bg-[#6ee7a0] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
