import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
    
    const variants = {
      primary: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]",
      secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700",
      outline: "border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:bg-emerald-500/10",
      ghost: "hover:bg-slate-800/60 text-slate-300 hover:text-white",
      danger: "bg-red-600 hover:bg-red-500 text-white shadow-md",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3.5 text-base font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
