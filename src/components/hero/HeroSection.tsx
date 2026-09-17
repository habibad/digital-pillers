"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, TrendingUp, Activity, Layers, Sparkles } from "lucide-react";
import gsap from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Cinematic Entrance sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -16,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 36,
            duration: 1.1,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ".hero-cta-group",
          {
            opacity: 0,
            y: 18,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-telemetry-card",
          {
            opacity: 0,
            y: 28,
            scale: 0.96,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Cinematic 3D Native Focal Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/assets/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center opacity-45 scale-[1.02] transform-gpu will-change-transform"
        />
        {/* Seamless Vignette & Obsidian Fade Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-[#030303]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/90 via-transparent to-[#030303]/90" />
        <div className="absolute inset-0 radial-vignette opacity-80" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center mt-6 mb-12">
        {/* Architectural Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
            The Foundation Framework · London
          </span>
        </div>

        {/* Master Heading */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tight text-white max-w-5xl leading-[1.06] mb-6"
        >
          <span className="hero-title-line block">Architecting</span>
          <span className="hero-title-line block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Unshakable Growth.
          </span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="hero-desc text-base sm:text-lg md:text-xl text-zinc-400 font-sans max-w-2xl font-light leading-relaxed mb-10 tracking-tight">
          A pillar is only as strong as what it stands on. We engineer full-funnel
          paid acquisition, enduring brand presence, and strategic roadmaps built
          to compound, not crash.
        </p>

        {/* Magnetic Action Group */}
        <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("#groundwork")}
            className="group relative px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Architecture</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => scrollTo("#inquiry")}
            className="px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-200 hover:text-white font-medium text-sm transition-all duration-300 backdrop-blur-md flex items-center gap-2 cursor-pointer"
          >
            <span>Initiate Brief</span>
            <ArrowUpRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>

      {/* Floating 1px Glass Telemetry Cards */}
      <div
        ref={telemetryRef}
        className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-4"
      >
        {/* Telemetry 1: Capital Efficiency */}
        <div className="hero-telemetry-card glass-panel rounded-2xl p-5 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              Efficiency Index
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              +382% LIFT
            </span>
          </div>
          <div>
            <div className="text-3xl font-display font-semibold text-white tracking-tight mb-1">
              4.2x ROAS
            </div>
            <p className="text-xs text-zinc-400 font-light">
              Average tracked return on ad spend across client portfolio.
            </p>
          </div>
        </div>

        {/* Telemetry 2: Managed Volume */}
        <div className="hero-telemetry-card glass-panel rounded-2xl p-5 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              Capital Defended
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              LIVE
            </span>
          </div>
          <div>
            <div className="text-3xl font-display font-semibold text-white tracking-tight mb-1">
              £42.8M+
            </div>
            <p className="text-xs text-zinc-400 font-light">
              Deployment volume managed through structured creative testing.
            </p>
          </div>
        </div>

        {/* Telemetry 3: Framework Integrity */}
        <div className="hero-telemetry-card glass-panel rounded-2xl p-5 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Infrastructure
            </span>
            <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              3 TIERS
            </span>
          </div>
          <div>
            <div className="text-3xl font-display font-semibold text-white tracking-tight mb-1">
              100% Attributed
            </div>
            <p className="text-xs text-zinc-400 font-light">
              Performance, Presence, and Strategy compounding in unison.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
