import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "excellent" | "strong" | "potential" | "weak" | "poor" | "emerald" | "slate" | "amber";
}

export function Badge({ className, variant = "emerald", children, ...props }: BadgeProps) {
  const variants = {
    excellent: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    strong: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    potential: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    weak: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    poor: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    slate: "bg-slate-800 text-slate-300 border-slate-700",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
