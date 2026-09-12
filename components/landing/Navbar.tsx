"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Calendar, Rocket, ChevronDown, Building2, HardHat, Factory, Landmark, Users, Code } from "lucide-react";
import { BookDemoPanel } from "@/components/landing/BookDemoPanel";
import { motion, useScroll, useSpring } from "framer-motion";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#22c55e] origin-left z-[60] shadow-[0_0_8px_#22c55e]"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#083324]/95 backdrop-blur-xl border-b border-white/15 shadow-xl"
            : "bg-[#083324]/80 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-2xl font-display font-medium tracking-tight text-white">
              UpCarb<span className="text-[#22c55e] text-3xl leading-none">.</span>
            </span>
          </Link>

          {/* Navigation Links with Hover Dropdowns */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/80">
            <Link href="/how-it-works#step-by-step" className="hover:text-white transition-colors">
              Why UpCarb.
            </Link>

            {/* Solutions Dropdown */}
            <div
              className="relative group py-4"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="text-white/80 hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                Solutions
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50">
                <div className="w-[260px] rounded-xl border border-white/10 bg-[#06291d] shadow-2xl p-2 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    By Industry
                  </div>
                  <Link
                    href="/solutions/industrial"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Factory className="h-3.5 w-3.5 text-[#22c55e]" />
                    <span>For Industrial Emitters</span>
                  </Link>
                  <Link
                    href="/solutions/utilizers"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <HardHat className="h-3.5 w-3.5 text-[#22c55e]" />
                    <span>For Product Off-Takers</span>
                  </Link>
                  <Link
                    href="/solutions/emitters"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Building2 className="h-3.5 w-3.5 text-[#22c55e]" />
                    <span>For Capture Facilities</span>
                  </Link>

                  <div className="my-1.5 mx-2 h-px bg-white/10" />

                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    By Function
                  </div>
                  <Link
                    href="/solutions/researchers"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Landmark className="h-3.5 w-3.5 text-[#22c55e]" />
                    <span>For Climate Investors</span>
                  </Link>
                  <Link
                    href="/solutions/consultants"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Users className="h-3.5 w-3.5 text-[#22c55e]" />
                    <span>For ESG Consultants</span>
                  </Link>
                  <Link
                    href="/solutions"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Code className="h-3.5 w-3.5 text-[#22c55e]" />
                    <span>All Solutions Overview</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative group py-4"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="text-white/80 hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                Resources
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute left-0 top-full pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50">
                <div className="w-[200px] rounded-xl border border-white/10 bg-[#06291d] shadow-2xl p-2 text-xs">
                  <Link
                    href="/resources/studies"
                    className="block px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    Study Library
                  </Link>
                  <Link
                    href="/resources/news"
                    className="block px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    News & Insights
                  </Link>
                  <Link
                    href="/resources"
                    className="block px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    All Resources
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setBookDemoOpen(true)}
              className="h-9 px-4 rounded-lg bg-[#083324] text-white border border-white/20 hover:border-[#22c55e] text-xs font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105 cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-white" />
              <span>Book demo</span>
            </button>
            <Link href="/register">
              <button className="h-9 px-4 rounded-lg bg-white text-[#083324] hover:border-2 hover:border-[#22c55e] text-xs font-bold transition-all duration-300 flex items-center gap-2 shadow-md hover:scale-105 cursor-pointer">
                <Rocket className="h-4 w-4 text-[#22c55e]" />
                <span>Try it for free</span>
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#06291d] px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-200">
              <Link href="/how-it-works#step-by-step" onClick={() => setMobileOpen(false)} className="hover:text-white py-1">
                Why UpCarb.
              </Link>
              <Link href="/how-it-works#procurement" onClick={() => setMobileOpen(false)} className="hover:text-white py-1">
                Solutions
              </Link>
              <Link href="/how-it-works" onClick={() => setMobileOpen(false)} className="hover:text-white py-1">
                How It Works
              </Link>
              <Link href="/marketplace" onClick={() => setMobileOpen(false)} className="hover:text-white py-1">
                Marketplace
              </Link>
              <Link href="/impact" onClick={() => setMobileOpen(false)} className="hover:text-white py-1">
                Impact
              </Link>
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setBookDemoOpen(true);
                }}
                className="w-full py-2.5 rounded-lg border border-white/30 text-white text-xs font-semibold justify-center flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" /> Book demo
              </button>
              <Link href="/register" onClick={() => setMobileOpen(false)}>
                <button className="w-full py-2.5 rounded-lg bg-white text-[#083324] text-xs font-bold justify-center flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-[#22c55e]" /> Try it for free
                </button>
              </Link>
            </div>
          </div>
        )}
      </motion.header>

      {/* Book Demo Modal Overlay */}
      {bookDemoOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl my-8 relative">
            <BookDemoPanel isModal={true} onClose={() => setBookDemoOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
