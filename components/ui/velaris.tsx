"use client";

import React, { useEffect, useRef } from "react";

interface VelarisProps {
  children?: React.ReactNode;
  height?: string;
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function Velaris({
  children,
  height = "500px",
  className = "",
  color1 = "#083324",
  color2 = "#22c55e",
  color3 = "#06291d",
}: VelarisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.008;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Gradient 1 - Deep Forest Green Base
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, "#041b13");
      bgGrad.addColorStop(0.5, color1);
      bgGrad.addColorStop(1, "#020f0a");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Living Fluid Plasma Orbs
      const orb1X = w * (0.3 + 0.2 * Math.sin(time * 0.8));
      const orb1Y = h * (0.4 + 0.25 * Math.cos(time * 0.6));
      const orb1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, w * 0.45);
      orb1.addColorStop(0, "rgba(34, 197, 94, 0.45)");
      orb1.addColorStop(0.5, "rgba(8, 51, 36, 0.25)");
      orb1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = orb1;
      ctx.fillRect(0, 0, w, h);

      const orb2X = w * (0.7 + 0.2 * Math.cos(time * 0.7));
      const orb2Y = h * (0.6 + 0.2 * Math.sin(time * 0.9));
      const orb2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, w * 0.5);
      orb2.addColorStop(0, "rgba(16, 185, 129, 0.35)");
      orb2.addColorStop(0.6, "rgba(6, 41, 29, 0.2)");
      orb2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = orb2;
      ctx.fillRect(0, 0, w, h);

      // Vignette Overlay
      const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.8);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color1, color2, color3]);

  return (
    <div
      style={{ height }}
      className={`relative w-full overflow-hidden bg-black ${className}`}
    >
      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Film Grain Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
