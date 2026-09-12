"use client";

import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { BookDemoPanel } from "@/components/landing/BookDemoPanel";
import { GetStartedFooter } from "@/components/landing/GetStartedFooter";

export default function BookDemoPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <div className="pt-16">
        <BookDemoPanel />
      </div>
      <GetStartedFooter />
    </div>
  );
}
