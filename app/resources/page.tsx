import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { BookOpen, Newspaper, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Resources & Knowledge Hub | Carbon2Product",
  description: "Explore whitepapers, case studies, methodology standards, and climate technology news.",
};

const studies = [
  {
    id: 1,
    title: "Techno-Economic Analysis of Concrete Mineralization with Biogenic CO₂",
    category: "Case Study",
    readTime: "8 min read",
    summary: "How point-source capture from ethanol fermentation lowers net embodied carbon in pre-cast structural concrete by up to 34%.",
    link: "/resources/studies",
  },
  {
    id: 2,
    title: "Standardization of IPCC Emission Factor Matchmaking in Scope 3 Supply Chains",
    category: "Methodology",
    readTime: "12 min read",
    summary: "A breakdown of confidence scoring algorithms for fuzzy-matching invoice line items to global GHG protocol databases.",
    link: "/resources/studies",
  },
  {
    id: 3,
    title: "E-Methanol Commercial Off-Take Dynamics in Maritime Transport",
    category: "Market Report",
    readTime: "10 min read",
    summary: "Evaluating purity thresholds and price elasticity for synthetic fuel production facilities in North America.",
    link: "/resources/studies",
  },
];

const news = [
  {
    id: 1,
    title: "Carbon2Product Launches Automated Multi-Format Extraction Pipeline",
    date: "September 2026",
    summary: "New OCR parser supports XML, CSV, XLSX, and multi-page PDF documents for instantaneous carbon calculations.",
    link: "/resources/news",
  },
  {
    id: 2,
    title: "CBAM Compliance Mandates Accelerate Industrial Data Traceability Requirements",
    date: "August 2026",
    summary: "How European border adjustments are forcing global manufacturers to verify Scope 1-3 line items at product level.",
    link: "/resources/news",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#06291d] text-white flex flex-col selection:bg-[#22c55e] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
            Knowledge Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-white">
            Research, Methodology & Insights
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Stay informed on carbon capture utilization, decarbonization methodologies, and product off-take economics.
          </p>
        </div>

        {/* Section 1: Case Studies */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-display font-semibold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#22c55e]" /> Featured Case Studies & Methodology
            </h2>
            <Link href="/resources/studies" className="text-xs font-semibold text-[#22c55e] hover:underline flex items-center gap-1">
              View All Studies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studies.map((item) => (
              <div key={item.id} className="p-6 rounded-2xl bg-[#083324] border border-white/10 flex flex-col justify-between hover:border-[#22c55e]/50 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-[#22c55e]/10 text-[#22c55e] font-semibold">{item.category}</span>
                    <span className="text-white/40">{item.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white leading-snug">{item.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed">{item.summary}</p>
                </div>
                <div className="pt-6">
                  <Link href={item.link} className="text-xs font-bold text-[#22c55e] hover:text-white flex items-center gap-1">
                    Read Report <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: News */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-display font-semibold text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#22c55e]" /> News & Platform Updates
            </h2>
            <Link href="/resources/news" className="text-xs font-semibold text-[#22c55e] hover:underline flex items-center gap-1">
              View All News <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item) => (
              <div key={item.id} className="p-6 rounded-2xl bg-[#083324] border border-white/10 space-y-4 hover:border-[#22c55e]/50 transition-all">
                <span className="text-xs text-white/40">{item.date}</span>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.summary}</p>
                <div>
                  <Link href={item.link} className="text-xs font-bold text-[#22c55e] hover:text-white flex items-center gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
