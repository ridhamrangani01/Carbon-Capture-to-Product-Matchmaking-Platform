"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { Play, ArrowDown, X, Sparkles } from "lucide-react";
import { HOW_IT_WORKS_DATA } from "@/data/how-it-works";

export function HowItWorksHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { hero } = HOW_IT_WORKS_DATA;

  return (
    <section id="how-it-works" className="relative w-full pt-28 pb-16 bg-white overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Editorial Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-5 space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-[#22c55e] leading-[1.02] tracking-tight">
              {hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-800 font-normal leading-relaxed">
              {hero.subtitle}
            </p>
          </motion.div>

          {/* Right Column: Embedded YouTube Video Player Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-7"
          >
            <div
              onClick={() => setIsPlaying(true)}
              className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-[#06291d] cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
            >
              <BorderBeam duration={7} size={300} colorFrom="#22c55e" colorTo="#083324" />

              {!isPlaying ? (
                /* Interactive Video Thumbnail Cover */
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#083324]/80 via-[#06291d] to-[#041d14] text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#22c55e] text-[#083324] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 mb-4 border-4 border-white/20">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e] font-bold mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> UpCarb Product Demo
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-medium text-white max-w-md">
                    {hero.videoTitle}
                  </h3>
                  <span className="text-xs text-white/50 mt-3 font-mono">
                    Click to play demo (100% Automated Scope 1-3 Engine)
                  </span>
                </div>
              ) : (
                /* Playing iFrame Embed */
                <iframe
                  src={`${hero.videoUrl}&autoplay=1`}
                  title={hero.videoTitle}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Green Arrow Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="flex justify-center mt-12"
        >
          <a href="#step-by-step" aria-label="Scroll to step by step section">
            <ArrowDown className="h-6 w-6 text-[#22c55e] cursor-pointer hover:scale-125 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <iframe
                src={`${hero.videoUrl}&autoplay=1`}
                title={hero.videoTitle}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
