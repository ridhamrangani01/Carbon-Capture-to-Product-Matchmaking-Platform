"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Layers, ChevronLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data.product);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-sm">
        Loading product pathway specification...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Pathway Not Found</h2>
        <Link href="/products">
          <Button variant="secondary">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          <div className="flex items-center gap-3">
            <Link href="/products">
              <Button variant="ghost" size="sm" className="gap-1 text-slate-400">
                <ChevronLeft className="h-4 w-4" /> Back to Catalog
              </Button>
            </Link>
          </div>

          <Card className="p-8 border-slate-800 bg-slate-900/90 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="emerald">{product.category}</Badge>
                  <span className="text-xs font-mono text-emerald-400 font-bold">TRL {product.technologyReadinessLevel}/9</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white">{product.name}</h1>
                <p className="text-sm text-slate-400 mt-1">{product.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-right">
                <span className="text-xs font-mono text-slate-400 block">Estimated Market Value</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">
                  {formatCurrency(product.estimatedValuePerTon)} / ton
                </span>
                <span className="text-[11px] text-slate-400 block font-mono">({product.co2UtilizationPotential})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-1">MIN PURITY REQ</span>
                <span className="text-emerald-400 text-base font-bold">≥ {product.minCO2Purity}% CO₂</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-1">INTAKE SCALE</span>
                <span className="text-slate-100 text-sm font-bold">{product.minQuantityTonnesMonth}–{product.maxQuantityTonnesMonth} t/mo</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-1">REQUIRED STATE</span>
                <span className="text-slate-100 text-base font-bold">{product.requiredState}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-1">ENERGY INTENSITY</span>
                <span className="text-slate-100 text-base font-bold">{product.energyIntensity}</span>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              Compatible Carbon Sources ({product.matches?.length || 0})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.matches?.map((m: any) => (
                <Card key={m.id} className="p-6 border-slate-800 bg-slate-900/90 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant={m.overallScore >= 90 ? "excellent" : "strong"}>
                        {m.classification} MATCH ({m.overallScore}%)
                      </Badge>
                      <h3 className="text-lg font-bold text-white mt-2">{m.carbonSource.title}</h3>
                      <p className="text-xs text-slate-400">{m.carbonSource.location} • {m.carbonSource.organization?.name}</p>
                    </div>
                  </div>

                  <div className="text-xs font-mono space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <p>• Supply: <strong>{m.carbonSource.quantityValue} {m.carbonSource.quantityUnit}</strong></p>
                    <p>• Purity: <strong className="text-emerald-400">{m.carbonSource.purityPercent}% CO₂</strong></p>
                  </div>

                  <Link href={`/matches/${m.id}`}>
                    <Button variant="primary" size="sm" className="w-full justify-between gap-2">
                      <span>Inspect Match Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
