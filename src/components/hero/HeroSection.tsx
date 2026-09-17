"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronRight, Activity, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";
import gsap from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);

  // GSAP Staggered Entrance & 3D Parallax Tilt
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Staggered entrance animation on load per spec (y: 40, opacity: 0, stagger: 0.15, ease: "power3.out")
        gsap.from(".hero-anim", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.1,
        });

        // Floating telemetry cards entrance with depth settle
        gsap.from(".hero-card-anim", {
          y: 60,
          opacity: 0,
          scale: 0.94,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Cursor-driven 3D Parallax Tilt across Depth Tiers (Desktop Only)
      if (!isTouch && !prefersReducedMotion && cardsContainerRef.current) {
        const stage = containerRef.current;
        const cardA = cardARef.current;
        const cardB = cardBRef.current;

        if (stage && cardA && cardB) {
          // Fast, liquid damping (<200ms reaction)
          const setRotX = gsap.quickTo(cardsContainerRef.current, "rotationX", {
            duration: 0.45,
            ease: "power2.out",
          });
          const setRotY = gsap.quickTo(cardsContainerRef.current, "rotationY", {
            duration: 0.45,
            ease: "power2.out",
          });

          // Parallax depth shifts
          const setAX = gsap.quickTo(cardA, "x", { duration: 0.5, ease: "power2.out" });
          const setAY = gsap.quickTo(cardA, "y", { duration: 0.5, ease: "power2.out" });
          const setBX = gsap.quickTo(cardB, "x", { duration: 0.4, ease: "power2.out" });
          const setBY = gsap.quickTo(cardB, "y", { duration: 0.4, ease: "power2.out" });

          const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const normX = (e.clientX / innerWidth) - 0.5;
            const normY = (e.clientY / innerHeight) - 0.5;

            // Subtle 3D perspective rotation
            setRotY(normX * 14);
            setRotX(-normY * 14);

            // Card A tier (Depth 1)
            setAX(normX * 22);
            setAY(normY * 18);

            // Card B tier (Depth 2 - moves faster for true optical parallax)
            setBX(-normX * 36);
            setBY(-normY * 30);
          };

          const handleMouseLeave = () => {
            setRotX(0);
            setRotY(0);
            setAX(0);
            setAY(0);
            setBX(0);
            setBY(0);
          };

          window.addEventListener("mousemove", handleMouseMove, { passive: true });
          stage.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            stage.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Dual Magnetic Buttons Interaction (<200ms reaction time)
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    const setupMagnetic = (btn: HTMLElement | null) => {
      if (!btn) return;
      const xTo = gsap.quickTo(btn, "x", { duration: 0.2, ease: "power2.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.2, ease: "power2.out" });

      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * 0.35);
        yTo(relY * 0.35);
      };

      const handleLeave = () => {
        xTo(0);
        yTo(0);
      };

      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);

      return () => {
        btn.removeEventListener("mousemove", handleMove);
        btn.removeEventListener("mouseleave", handleLeave);
      };
    };

    const cleanup1 = setupMagnetic(primaryBtnRef.current);
    const cleanup2 = setupMagnetic(secondaryBtnRef.current);

    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, []);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-between pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050505]"
      style={{ perspective: "1200px" }}
    >
      {/* 1. Focal Centerpiece & Atmospheric Lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Central Deep Radial Glow Emanating from Behind the Focal Point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full bloom-glow-blue opacity-50 blur-[130px] transform-gpu will-change-transform" />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bloom-glow-ember opacity-25 blur-[120px] transform-gpu will-change-transform" />

        {/* Integrated Cinematic 3D Native Focal Video */}
        <video
          ref={videoRef}
          src="/assets/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center opacity-40 scale-[1.03] transform-gpu will-change-transform"
        />

        {/* Seamless Vignette & Dark Obsidian Edge Fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-transparent to-[#050505]/95" />

        {/* Drifting Ambient Micro-Light Specs */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#00d4ff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* 2. Main Content & Punchy Typography */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center mt-4 mb-8">
        {/* Architectural Eyebrow Badge */}
        <div className="hero-anim inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-[#0055ff] shadow-[0_0_10px_#0055ff] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-300 uppercase">
            The Foundation Framework · London
          </span>
        </div>

        {/* Agency-Grade Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold text-white tracking-[-0.04em] leading-[1.04] max-w-5xl mb-6">
          <span className="hero-anim block">Engineering</span>
          <span className="hero-anim block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Scalable Growth
          </span>
          <span className="hero-anim block text-zinc-400 font-light">
            Architecture.
          </span>
        </h1>

        {/* Minimal, Sharp Subtext */}
        <p className="hero-anim text-base sm:text-lg md:text-xl text-zinc-400 font-sans max-w-2xl font-light leading-relaxed mb-10 tracking-tight">
          A pillar is only as strong as what it stands on. We engineer full-funnel
          paid acquisition, enduring brand presence, and strategic roadmaps that
          compound value month over month.
        </p>

        {/* 4. Dual Magnetic CTAs (<200ms Reaction Time) */}
        <div className="hero-anim flex flex-wrap items-center justify-center gap-4">
          <button
            ref={primaryBtnRef}
            onClick={() => scrollTo("#inquiry")}
            className="group relative px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 hover:bg-zinc-200 hover:scale-[1.02] shadow-[0_0_35px_rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer will-change-transform"
          >
            <span>Schedule Audit</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            ref={secondaryBtnRef}
            onClick={() => scrollTo("#services")}
            className="group px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-200 hover:text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 backdrop-blur-md flex items-center gap-2 cursor-pointer will-change-transform shadow-[0_0_20px_rgba(0,85,255,0.15)]"
          >
            <span>View Engine</span>
            <ChevronRight className="w-4 h-4 text-blue-400 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* 3. Floating Glassmorphic Telemetry Cards (Different Depths + 3D Tilt) */}
      <div
        ref={cardsContainerRef}
        className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card A (Revenue / Scale) - Depth Tier 1 */}
        <div
          ref={cardARef}
          className="hero-card-anim glass-panel-elevated rounded-3xl p-6 border border-white/[0.09] hover:border-white/[0.2] transition-colors duration-300 relative overflow-hidden will-change-transform shadow-[0_15px_45px_-10px_rgba(0,0,0,0.85)]"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-[#0055ff]" />
              Capital Efficiency · Scale
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
              4.8x ROAS
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight font-mono-telemetry mb-1">
                $14.2M+
              </div>
              <p className="text-xs text-zinc-400 font-light">
                Verified portfolio revenue generated under structured testing sprints.
              </p>
            </div>

            {/* Mini SVG Trend Graph with Glowing Area Gradient */}
            <div className="w-32 h-14 shrink-0 relative">
              <svg viewBox="0 0 100 45" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="revenueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0055ff" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#0055ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,38 Q 25,35 40,25 T 75,15 T 100,5 L 100,45 L 0,45 Z"
                  fill="url(#revenueGrad)"
                />
                <path
                  d="M 0,38 Q 25,35 40,25 T 75,15 T 100,5"
                  fill="none"
                  stroke="#0055ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="5" r="3.5" fill="#00d4ff" className="animate-ping" />
                <circle cx="100" cy="5" r="3" fill="#00d4ff" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card B (Real-time Analytics) - Depth Tier 2 */}
        <div
          ref={cardBRef}
          className="hero-card-anim glass-panel-elevated rounded-3xl p-6 border border-white/[0.09] hover:border-white/[0.2] transition-colors duration-300 relative overflow-hidden will-change-transform shadow-[0_15px_45px_-10px_rgba(0,0,0,0.85)]"
          style={{ transform: "translateZ(65px)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Real-Time Telemetry
            </span>
            {/* Live Engagement Tracking Pill */}
            <div className="glass-pill px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-300 tracking-wider">
                14 CAMPAIGNS ACTIVE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="border-r border-white/[0.06] pr-4">
              <div className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight font-mono-telemetry mb-0.5">
                +340%
              </div>
              <p className="text-[11px] text-zinc-400 font-light">
                Avg. Engagement Lift
              </p>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-display font-semibold text-cyan-400 tracking-tight font-mono-telemetry mb-0.5">
                99.4%
              </div>
              <p className="text-[11px] text-zinc-400 font-light">
                Attribution Signal Integrity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
