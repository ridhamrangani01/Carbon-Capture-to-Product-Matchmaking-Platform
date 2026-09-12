"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface WebGLShaderProps {
  scrollProgress?: number;
  speed?: number;
  intensity?: number;
  primaryColor?: string; // hex or rgb
  accentColor?: string;
  glowColor?: string;
  bgColor?: string;
  className?: string;
  interactive?: boolean;
}

// Convert hex color string to RGB normalized vec3 [r, g, b]
function hexToVec3(hex: string): [number, number, number] {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c, 16);
  return [(num >> 16 & 255) / 255, (num >> 8 & 255) / 255, (num & 255) / 255];
}

const VERTEX_SHADER_SOURCE = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_scroll;
uniform vec3 u_bgColor;
uniform vec3 u_primaryColor;
uniform vec3 u_accentColor;
uniform vec3 u_glowColor;
uniform vec2 u_mouse;
varying vec2 vUv;

// Smooth Simplex / Perlin-like 2D Noise helper
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  
  // Normalize UV coordinates centered
  vec2 uv = st;
  uv.x *= aspect;

  // Add subtle cursor displacement
  vec2 mouseNorm = (u_mouse / u_resolution.xy) * vec2(aspect, 1.0);
  float mouseDist = distance(uv, mouseNorm);
  float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * 0.05;

  // Flowing ribbon center curve equations
  float time = u_time * 0.4;
  float wave1 = sin(uv.x * 1.8 - time * 1.2 + mouseInfluence) * 0.16;
  float wave2 = cos(uv.x * 3.2 + time * 0.8) * 0.08;
  float wave3 = sin(uv.x * 5.0 - time * 1.5) * 0.04;
  
  float ribbonY = 0.50 + wave1 + wave2 + wave3;
  
  // Vertical distance from pixel to ribbon spine
  float distToRibbon = abs(st.y - ribbonY);

  // Core Luminous Ribbon (Sharp bright center)
  float ribbonCore = smoothstep(0.025, 0.0, distToRibbon);
  
  // Inner Soft Glow
  float ribbonGlow = smoothstep(0.12, 0.0, distToRibbon);
  
  // Outer Atmospheric Aura
  float ribbonAura = smoothstep(0.35, 0.0, distToRibbon);

  // Traveling Carbon Intelligence Energy Pulse driven by u_scroll
  float scrollPos = clamp(u_scroll, 0.05, 0.95);
  float pulseDist = abs(st.x - scrollPos);
  float energyPulse = exp(-pow(pulseDist * 3.5, 2.0));
  
  // Micro Noise Texture for organic fluid details
  float n = noise(uv * 6.0 + vec2(time * 0.5, time * 0.3));

  // Color Composition
  vec3 color = u_bgColor;

  // Layer 1: Outer Aura (Deep Emerald / Teal)
  color = mix(color, u_accentColor, ribbonAura * 0.35 * (0.8 + 0.2 * n));

  // Layer 2: Soft Inner Glow (Bright Green #22C55E)
  color = mix(color, u_glowColor, ribbonGlow * 0.65);

  // Layer 3: Traveling Energy Pulse (Mint #6EE7A0)
  color += u_glowColor * energyPulse * ribbonGlow * 0.8;

  // Layer 4: Luminous Spine Core (Off-White #F2F4F1)
  color = mix(color, u_primaryColor, ribbonCore * (0.85 + 0.4 * energyPulse));

  // Subtle vignette falloff at top and bottom edges
  float vignette = smoothstep(0.0, 0.2, st.y) * smoothstep(1.0, 0.8, st.y);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

export function WebGLShader({
  scrollProgress = 0,
  speed = 1.0,
  intensity = 1.0,
  primaryColor = "#F2F4F1",
  accentColor = "#0B5D3B",
  glowColor = "#22C55E",
  bgColor = "#083324",
  className,
  interactive = true,
}: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: false, alpha: false });
    if (!gl) {
      console.warn("WebGL not supported in browser context.");
      return;
    }

    // Helper to compile shader
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Buffer setup: Screen filling quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uScroll = gl.getUniformLocation(program, "u_scroll");
    const uBgColor = gl.getUniformLocation(program, "u_bgColor");
    const uPrimaryColor = gl.getUniformLocation(program, "u_primaryColor");
    const uAccentColor = gl.getUniformLocation(program, "u_accentColor");
    const uGlowColor = gl.getUniformLocation(program, "u_glowColor");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    // Set static color uniforms
    const bgVec = hexToVec3(bgColor);
    const primaryVec = hexToVec3(primaryColor);
    const accentVec = hexToVec3(accentColor);
    const glowVec = hexToVec3(glowColor);

    gl.uniform3f(uBgColor, bgVec[0], bgVec[1], bgVec[2]);
    gl.uniform3f(uPrimaryColor, primaryVec[0], primaryVec[1], primaryVec[2]);
    gl.uniform3f(uAccentColor, accentVec[0], accentVec[1], accentVec[2]);
    gl.uniform3f(uGlowColor, glowVec[0], glowVec[1], glowVec[2]);

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = mediaQuery.matches;

    // IntersectionObserver to pause rendering loop when canvas is hidden
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let startTime = performance.now();

    // Render loop
    const render = (now: number) => {
      if (isVisibleRef.current && !isReducedMotion) {
        const elapsedTime = (now - startTime) * 0.001 * speed;

        // Smooth mouse damping
        mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.05;
        mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.05;

        gl.useProgram(program);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, elapsedTime);
        gl.uniform1f(uScroll, scrollProgress);
        gl.uniform2f(uMouse, mousePos.current.x, mousePos.current.y);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else if (isReducedMotion) {
        // Render static frame
        gl.useProgram(program);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, 10.0);
        gl.uniform1f(uScroll, 0.5);
        gl.uniform2f(uMouse, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [bgColor, primaryColor, accentColor, glowColor, speed]);

  // Handle Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    targetMousePos.current = {
      x: (e.clientX - rect.left) * (window.devicePixelRatio || 1),
      y: (rect.height - (e.clientY - rect.top)) * (window.devicePixelRatio || 1),
    };
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className={cn("w-full h-full block pointer-events-none", className)}
    />
  );
}
