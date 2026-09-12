"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { Sparkles, ChevronLeft, ArrowRight, MessageSquare, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [contactMsg, setContactMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    async function fetchMatch() {
      try {
        const res = await fetch(`/api/matches/${id}`);
        const data = await res.json();
        setMatch(data.match);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchMatch();
  }, [id]);

  async function handleSendContact(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const stored = localStorage.getItem("c2p_user");
      let senderId = match.carbonSource.emitterId;
      if (stored) {
        try {
          const u = JSON.parse(stored);
          if (u.id) senderId = u.id;
        } catch (e) {}
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: match.id,
          receiverId: match.product.organization?.users?.[0]?.id || match.carbonSource.emitterId,
          senderId,
          message: contactMsg || "Hello, we are interested in discussing an off-take collaboration for this carbon match.",
        }),
      });

      if (res.ok) {
        setSendSuccess(true);
        setTimeout(() => setShowModal(false), 2000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-sm">
        Loading 8-vector compatibility radar matrix...
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Match Record Not Found</h2>
        <Link href="/matches">
          <Button variant="secondary">Back to Matches</Button>
        </Link>
      </div>
    );
  }

  const greenReasons = JSON.parse(match.greenReasonsJson || "[]");
  const concerns = JSON.parse(match.concernsJson || "[]");

  const radarData = [
    { subject: "Purity", score: match.purityScore },
    { subject: "Quantity", score: match.quantityScore },
    { subject: "State", score: match.stateScore },
    { subject: "Temp", score: match.tempScore },
    { subject: "Pressure", score: match.pressureScore },
    { subject: "Location", score: match.locationScore },
    { subject: "TRL", score: match.trlScore },
    { subject: "Supply", score: match.availabilityScore },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          <div className="flex items-center gap-3">
            <Link href="/matches">
              <Button variant="ghost" size="sm" className="gap-1 text-slate-400">
                <ChevronLeft className="h-4 w-4" /> Back to Matches
              </Button>
            </Link>
          </div>

          {/* Header Card */}
          <Card className="p-8 border-slate-800 bg-slate-900/90">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={match.overallScore >= 90 ? "excellent" : "strong"}>
                    {match.classification} MATCH ({match.overallScore}%)
                  </Badge>
                </div>
                <h1 className="text-3xl font-extrabold text-white">
                  {match.carbonSource.title} <span className="text-emerald-400">→</span> {match.product.name}
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Source: {match.carbonSource.location} • Target Pathway: {match.product.category}
                </p>
              </div>

              <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="gap-2 px-6"
              >
                <MessageSquare className="h-4 w-4" />
                Contact Partner for Off-take
              </Button>
            </div>

            {/* Radar & Sub-scores Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
              {/* Radar Chart */}
              <div className="lg:col-span-6 h-72 w-full flex items-center justify-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                    <PolarRadiusAxis domain={[0, 100]} stroke="#475569" fontSize={9} />
                    <Radar name="Compatibility" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Sub-scores Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">PURITY COMPATIBILITY</span>
                  <span className="text-emerald-400 text-lg font-bold">{match.purityScore}/100</span>
                  <span className="block text-[10px] text-slate-400">{match.carbonSource.purityPercent}% vs Min {match.product.minCO2Purity}%</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">QUANTITY SCALE</span>
                  <span className="text-emerald-400 text-lg font-bold">{match.quantityScore}/100</span>
                  <span className="block text-[10px] text-slate-400">{match.carbonSource.quantityValue} {match.carbonSource.quantityUnit}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">PHYSICAL STATE</span>
                  <span className="text-slate-100 text-lg font-bold">{match.stateScore}/100</span>
                  <span className="block text-[10px] text-slate-400">{match.carbonSource.physicalState} → {match.product.requiredState}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">OPERATING PRESSURE</span>
                  <span className="text-slate-100 text-lg font-bold">{match.pressureScore}/100</span>
                  <span className="block text-[10px] text-slate-400">{match.carbonSource.pressureBar} bar vs {match.product.pressureMin}-{match.product.pressureMax} bar</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">TECHNOLOGY READINESS</span>
                  <span className="text-slate-100 text-lg font-bold">{match.trlScore}/100</span>
                  <span className="block text-[10px] text-slate-400">TRL {match.product.technologyReadinessLevel}/9</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">SUPPLY AVAILABILITY</span>
                  <span className="text-slate-100 text-lg font-bold">{match.availabilityScore}/100</span>
                  <span className="block text-[10px] text-slate-400">{match.carbonSource.availabilityFrequency}</span>
                </div>
              </div>
            </div>

            {/* Explanations & Engine Guidance */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 font-mono">
                  Why This Match Works:
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {greenReasons.map((r: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {concerns.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                    Potential Limitations:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {concerns.map((c: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                <strong>Matchmaking Engine Recommendation:</strong> {match.recommendationText}
              </div>
            </div>
          </Card>
        </main>
      </div>

      {/* Contact Utilizer Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-lg w-full p-6 border-slate-800 bg-slate-900 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Contact Partner for Off-take Agreement</h3>
            <p className="text-xs text-slate-400">
              Send a direct interest request regarding: <strong className="text-emerald-400">{match.carbonSource.title} → {match.product.name}</strong>
            </p>

            {sendSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm text-center font-bold">
                ✓ Contact Request Sent Successfully!
              </div>
            ) : (
              <form onSubmit={handleSendContact} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Describe your off-take proposal, required timeline, and commercial terms..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={sending} variant="primary" className="gap-2">
                    <Send className="h-4 w-4" />
                    {sending ? "Sending..." : "Send Request"}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
