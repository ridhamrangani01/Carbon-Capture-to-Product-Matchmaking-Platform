import React from "react";
import Link from "next/link";
import { Leaf, Github, Twitter, Linkedin, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 pt-16 pb-12 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Col 1: Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md">
              <Leaf className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-display font-medium tracking-tight text-white">
              UpCarb<span className="text-emerald-400">.</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            The UpCarb. Carbon Capture-to-Product Matchmaking Platform. Turning captured CO₂ from an industrial emission problem into circular valuable resources.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-emerald-400 transition-colors"><Github className="h-5 w-5" /></a>
            <a href="#" className="hover:text-emerald-400 transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-emerald-400 transition-colors"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Col 2: Product */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Product</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/marketplace" className="hover:text-emerald-400 transition-colors">Matchmaking Engine</Link></li>
            <li><Link href="/carbon-sources" className="hover:text-emerald-400 transition-colors">Carbon Sources</Link></li>
            <li><Link href="/products" className="hover:text-emerald-400 transition-colors">Product Marketplace</Link></li>
            <li><Link href="/impact" className="hover:text-emerald-400 transition-colors">Impact Calculator</Link></li>
          </ul>
        </div>

        {/* Col 3: Company */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Company</h5>
          <ul className="space-y-2 text-xs">
            <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
            <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
            <li><a href="#solutions" className="hover:text-emerald-400 transition-colors">Solutions</a></li>
            <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Partner Portal</Link></li>
          </ul>
        </div>

        {/* Col 4: Legal & Standards */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Legal & Compliance</h5>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Carbon Accounting Standard</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Security Overview</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 UpCarb. Network. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0 text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" /> ISO 14064 Carbon Verification Aligned
        </p>
      </div>
    </footer>
  );
}
