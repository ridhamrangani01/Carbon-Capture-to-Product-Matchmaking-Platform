"use client";

import React, { useState, useEffect } from "react";
import { Check, CheckCircle2, Sparkles, X, Loader2, Calendar, Mail, Building, User, Phone, MapPin, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookDemoPanelProps {
  onClose?: () => void;
  isModal?: boolean;
}

interface SubmittedData {
  id: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  role: string;
  status: string;
  createdAt: string;
  emailDeliveryMode?: string;
}

export function BookDemoPanel({ onClose, isModal = false }: BookDemoPanelProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    role: "EMITTER",
    phone: "",
    jobTitle: "",
    companySize: "11-50 employees",
    industry: "Industrial Manufacturing",
    country: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  // Check if authenticated user session exists to prefill form
  useEffect(() => {
    async function loadUserSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setFormData((prev) => ({
              ...prev,
              fullName: data.user.name || prev.fullName,
              workEmail: data.user.email || prev.workEmail,
              companyName: data.user.organizationName || prev.companyName,
              role: data.user.role || prev.role,
            }));
          }
        }
      } catch (err) {
        // Guest mode fallback
      }
    }
    loadUserSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.workEmail.trim() || !formData.workEmail.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage("Please enter your company / organization name.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit demo request.");
      }

      setSubmittedData(result.data);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setSubmittedData(null);
    setErrorMessage(null);
    setFormData({
      fullName: "",
      workEmail: "",
      companyName: "",
      role: "EMITTER",
      phone: "",
      jobTitle: "",
      companySize: "11-50 employees",
      industry: "Industrial Manufacturing",
      country: "",
      message: "",
      preferredDate: "",
      preferredTime: "",
    });
  };

  const firstName = formData.fullName.split(" ")[0] || "there";

  return (
    <div className="w-full bg-[#050505] text-white py-10 px-4 sm:px-6 lg:px-8 min-h-screen relative font-sans">
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors z-50 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Main Header Title */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-1 text-xs font-semibold text-[#22c55e] mb-3 font-mono">
          <Sparkles className="w-3.5 h-3.5" /> Deterministic CCU Matchmaking Platform
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-normal text-white tracking-tight leading-[1.05]">
          Book A Demo
        </h1>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2 font-normal">
          Schedule a technical walkthrough of Carbon2Product / UpCarb with our carbon intelligence engineers.
        </p>
      </div>

      {/* 2-Column Split Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative">
        {/* Left Column: Value Prop & Media Box */}
        <div className="space-y-8 lg:pr-6">
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
            Discover how UpCarb. can help you map supply chain workflows, match carbon streams with product off-takers, and optimize CCU monetization:
          </p>

          {/* Bullet Points */}
          <ul className="space-y-3.5 text-sm text-zinc-200">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>
                Schedule a 1-on-1 session with a <strong className="text-white font-semibold">carbon capture & off-take expert</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>
                Map out supply chain workflows & <strong className="text-white font-semibold">monetization pathways</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>
                Access deterministic <strong className="text-white font-semibold">8-vector matching engine</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>Explore 60-day risk-free enterprise trial</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span>Inspect third-party verified EPD templates & IPCC/EPA carbon factors</span>
            </li>
          </ul>

          {/* Product Preview Card */}
          <div className="pt-2 space-y-3">
            <h2 className="text-xl font-display font-medium text-white tracking-tight">
              Platform Preview
            </h2>

            <div className="rounded-2xl border border-zinc-800 bg-[#0d0d0f] p-4 shadow-2xl overflow-hidden group">
              <div className="aspect-[16/10] relative rounded-xl overflow-hidden bg-[#06291d] flex flex-col justify-between p-6 border border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.15),transparent_70%)]" />

                <div className="relative z-10 text-center my-auto space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-700 mx-auto shadow-xl flex items-center justify-center border border-white/20">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white tracking-tight">UpCarb. AI</h3>
                  <span className="text-xs text-emerald-400 font-mono block">Deterministic CCU Matchmaking Engine v2.4</span>
                </div>

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

        {/* Right Column: Interactive Form & Real Success Panel */}
        <div className="lg:pl-6">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="demo-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-400 font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Work Email <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Company / Organization & Role Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Company / Organization <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Acme Clean Energy"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Primary Role <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-[#22c55e] focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="EMITTER">Industrial Emitter / Capture Facility</option>
                        <option value="UTILIZER">CO2 Off-Taker / Product Manufacturer</option>
                        <option value="RESEARCHER">Climate Researcher / ESG Investor</option>
                        <option value="ADMIN">Platform Admin / Executive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Phone & Job Title Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">Job Title</label>
                    <input
                      type="text"
                      placeholder="VP of Sustainability"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#22c55e] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">Preferred Time</label>
                    <input
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#22c55e] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">Project Notes / Message</label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your carbon capture volumes or off-take requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Consent Text */}
                <p className="text-[11px] text-zinc-500 leading-relaxed pt-1">
                  By submitting this request, you agree that Carbon2Product / UpCarb may store your details and send confirmation details to your work email.
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all duration-300 shadow-xl hover:shadow-emerald-500/20 text-sm cursor-pointer mt-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Submitting request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-black" />
                      <span>REQUEST DEMO</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* REAL Verified Success Card */
              <motion.div
                key="demo-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0d0d0f] border border-[#22c55e]/40 rounded-2xl p-8 space-y-6 shadow-2xl text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e] shrink-0">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Demo Request Received!</h3>
                    <p className="text-xs font-mono text-emerald-400 mt-0.5">Status: Pending Technical Review</p>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  Thank you, <strong className="text-white font-semibold">{firstName}</strong>. Our carbon off-take engineering team has received your request and will contact you at <strong className="text-white font-semibold">{submittedData?.workEmail}</strong>.
                </p>

                <div className="bg-[#06291d] border border-white/10 rounded-xl p-4 text-xs font-mono space-y-2">
                  <div className="flex justify-between text-zinc-400 border-b border-white/10 pb-2">
                    <span>Request ID:</span>
                    <span className="text-[#22c55e] font-bold">{submittedData?.id}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 pt-1">
                    <span>Company:</span>
                    <span className="text-white">{submittedData?.companyName}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Role:</span>
                    <span className="text-white">{submittedData?.role}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Email Delivery:</span>
                    <span className="text-emerald-400">{submittedData?.emailDeliveryMode === "PRODUCTION" ? "Confirmation Sent" : "Confirmation Queued (Dev Mode)"}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleResetForm}
                    className="flex-1 py-3 px-4 rounded-xl border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors text-center cursor-pointer"
                  >
                    Submit another request
                  </button>
                  {isModal && onClose && (
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 px-4 rounded-xl bg-white text-black text-xs font-bold hover:bg-emerald-400 transition-colors text-center cursor-pointer"
                    >
                      Done / Close
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
