"use client";

import React, { useState } from "react";
import { CheckSquare, Square, Eye, EyeOff } from "lucide-react";

interface PasswordStrengthInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function PasswordStrengthInput({
  value,
  onChange,
  label = "New password",
  placeholder = "••••••••••••",
  className = "",
}: PasswordStrengthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Criteria checks
  const isMinLength = value.length >= 12;
  const hasUpperLower = /[a-z]/.test(value) && /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

  // Score count (0 to 4)
  const score = [isMinLength, hasUpperLower, hasNumber, hasSymbol].filter(Boolean).length;

  const getStrengthInfo = () => {
    if (!value) return { label: "", color: "bg-[#22c55e]", textColor: "text-zinc-400" };
    if (score <= 1) return { label: "Weak", color: "bg-red-500", textColor: "text-red-500" };
    if (score === 2) return { label: "Fair", color: "bg-amber-500", textColor: "text-amber-500" };
    if (score === 3) return { label: "Good", color: "bg-emerald-500", textColor: "text-emerald-500" };
    return { label: "Strong", color: "bg-[#22c55e]", textColor: "text-[#22c55e]" };
  };

  const strengthInfo = getStrengthInfo();

  return (
    <div className={`space-y-3 font-sans ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-zinc-200">
          {label}
        </label>
      )}

      {/* Input Box */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-2xl px-4 py-3.5 pr-12 text-sm text-white placeholder-zinc-600 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 transition-all font-mono tracking-wider"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* 4 Strength Progress Bars */}
      {value && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((barIndex) => (
              <div
                key={barIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  barIndex <= score
                    ? strengthInfo.color
                    : "bg-zinc-800"
                }`}
              />
            ))}
          </div>

          {/* Strength Label Text */}
          <div className={`text-xs font-bold transition-colors ${strengthInfo.textColor}`}>
            {strengthInfo.label}
          </div>
        </div>
      )}

      {/* Requirement Checklist Items */}
      <div className="space-y-2 pt-1 text-xs text-zinc-300 font-medium">
        {/* Requirement 1: 12 chars */}
        <div className="flex items-center gap-2">
          {isMinLength ? (
            <div className="w-4 h-4 rounded bg-[#22c55e] flex items-center justify-center text-[#083324]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-4 h-4 rounded border border-zinc-700 bg-zinc-900" />
          )}
          <span className={isMinLength ? "text-white font-semibold" : "text-zinc-400"}>
            12 characters or more
          </span>
        </div>

        {/* Requirement 2: Upper and lower case */}
        <div className="flex items-center gap-2">
          {hasUpperLower ? (
            <div className="w-4 h-4 rounded bg-[#22c55e] flex items-center justify-center text-[#083324]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-4 h-4 rounded border border-zinc-700 bg-zinc-900" />
          )}
          <span className={hasUpperLower ? "text-white font-semibold" : "text-zinc-400"}>
            Upper and lower case
          </span>
        </div>

        {/* Requirement 3: A number */}
        <div className="flex items-center gap-2">
          {hasNumber ? (
            <div className="w-4 h-4 rounded bg-[#22c55e] flex items-center justify-center text-[#083324]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-4 h-4 rounded border border-zinc-700 bg-zinc-900" />
          )}
          <span className={hasNumber ? "text-white font-semibold" : "text-zinc-400"}>
            A number
          </span>
        </div>

        {/* Requirement 4: A symbol */}
        <div className="flex items-center gap-2">
          {hasSymbol ? (
            <div className="w-4 h-4 rounded bg-[#22c55e] flex items-center justify-center text-[#083324]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-4 h-4 rounded border border-zinc-700 bg-zinc-900" />
          )}
          <span className={hasSymbol ? "text-white font-semibold" : "text-zinc-400"}>
            A symbol
          </span>
        </div>
      </div>
    </div>
  );
}
