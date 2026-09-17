"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Zap, Radio, Globe, Target, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICE_KEYS, SERVICES_DATA, ServiceItem } from "@/data/servicesData";

interface ServicesBentoSectionProps {
  onSelectService: (serviceKey: string) => void;
}

const PILLAR_ICONS = {
  "paid-acquisition": Zap,
  "brand-organic": Radio,
  "web-architecture": Globe,
  "growth-strategy": Target,
};

export function ServicesBentoSection({ onSelectService }: ServicesBentoSectionProps) {
  const [activeKey, setActiveKey] = useState<string>("paid-acquisition");
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  const activePillar: ServiceItem = SERVICES_DATA[activeKey] || SERVICES_DATA["paid-acquisition"];
  const ActiveIcon = PILLAR_ICONS[activeKey as keyof typeof PILLAR_ICONS] || Zap;

  // GSAP ScrollTrigger & Stage Light Sweep
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".services-header-anim", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Stage elevation & light sweep on entrance
      if (!prefersReducedMotion && stageRef.current) {
        gsap.from(stageRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.97,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        if (sweepRef.current) {
          gsap.fromTo(
            sweepRef.current,
            { x: "-100%" },
            {
              x: "200%",
              duration: 1.6,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: stageRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // Stacked Deck Cards Entrance
      gsap.from(".deck-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-deck-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth Tab Switch Animation with light sweep
  const handlePillarSelect = (key: string) => {
    if (key === activeKey) return;

    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0.75, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }

    if (sweepRef.current) {
      gsap.fromTo(
        sweepRef.current,
        { x: "-100%" },
        { x: "200%", duration: 0.8, ease: "power2.inOut" }
      );
    }

    setActiveKey(key);
  };

  const scrollToInquiry = () => {
    const el = document.querySelector("#inquiry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-[#050505]"
    >
      {/* Background Ambient Light Beams (Zero Unnecessary Box Borders) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bloom-glow-blue opacity-35 blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 right-0 w-[700px] h-[450px] bloom-glow-ember opacity-20 blur-[150px] pointer-events-none" />

      {/* 1. Header Section */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <div className="services-header-anim inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-4">
          <span className="w-2 h-2 rounded-full bg-[#0055ff] shadow-[0_0_8px_#0055ff] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-300 uppercase">
            Core Services Architecture
          </span>
        </div>

        <h2 className="services-header-anim text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-[-0.03em] leading-[1.06] mb-4">
          Four Pillars. <br />
          <span className="text-zinc-400 font-light">Zero Corporate Fluff.</span>
        </h2>

        <p className="services-header-anim text-base sm:text-lg text-zinc-400 font-sans max-w-2xl font-light leading-relaxed">
          Surgical growth infrastructure engineered for execution speed, deliverable
          prestige, and audited ROI.
        </p>
      </div>

      {/* 2. Interactive Pillar Navigation Tabs */}
      <div className="flex justify-center mb-12 relative z-10">
        <div className="inline-flex flex-wrap justify-center p-1.5 rounded-full bg-[#0d0d0d]/80 border border-white/[0.07] backdrop-blur-2xl gap-1">
          {SERVICE_KEYS.map((key) => {
            const item = SERVICES_DATA[key];
            const Icon = PILLAR_ICONS[key as keyof typeof PILLAR_ICONS] || Zap;
            const isActive = key === activeKey;
            return (
              <button
                key={key}
                onClick={() => handlePillarSelect(key)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#0055ff] text-white shadow-[0_0_25px_rgba(0,85,255,0.45)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. The Active Pillar Showcase Stage (Stacked 3D Glass Stage with Client Visual Texture) */}
      <div
        ref={stageRef}
        className="relative z-10 glass-panel-elevated rounded-3xl p-6 sm:p-10 lg:p-14 border border-white/[0.1] overflow-hidden mb-12 shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
      >
        {/* Visual Texture Background (Using Client Asset Image or Video Loop) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 transition-opacity duration-700">
          {activePillar.video ? (
            <video
              key={activePillar.video}
              src={activePillar.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              key={activePillar.image}
              src={activePillar.image}
              alt={activePillar.title}
              fill
              className="object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-[#0d0d0d]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent" />
        </div>

        {/* Ambient Light Sweep Beam */}
        <div
          ref={sweepRef}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none transform -skew-x-12 will-change-transform"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative, Execution Thesis & Deliverable Matrix */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-[#0055ff] tracking-widest uppercase">
                  {activePillar.eyebrow}
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                  {activePillar.velocity}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-display font-semibold text-white tracking-tight leading-[1.08] mb-4">
                {activePillar.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 font-sans font-light leading-relaxed mb-6">
                {activePillar.lead}
              </p>

              {/* 4 Core Deliverables */}
              <div className="space-y-3 mb-8">
                {activePillar.deliverables.slice(0, 4).map((d) => (
                  <div key={d} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0055ff]/15 border border-[#0055ff]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#00d4ff]" />
                    </div>
                    <span className="text-xs sm:text-sm text-zinc-300 font-light">
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Modal Breakdown Navigation & Audit Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.06]">
              <button
                onClick={() => onSelectService(activePillar.id)}
                className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <span>Inspect Architecture Breakdown</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={scrollToInquiry}
                className="px-5 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-zinc-300 hover:text-white font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Pillar Audit</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Telemetry & Speed/ROI Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#00d4ff]" />
                  Execution Velocity
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  GUARANTEED SLA
                </span>
              </div>

              {/* 3 Prominent Stat Tiles */}
              <div className="space-y-5">
                {activePillar.stats.map((st) => (
                  <div key={st.label} className="flex items-baseline justify-between border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                    <span className="text-xs text-zinc-400 font-light max-w-[160px]">
                      {st.label}
                    </span>
                    <span className="text-2xl sm:text-3xl font-display font-semibold text-white font-mono-telemetry">
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitability Capsule */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                <span className="text-white font-medium">Target Fit: </span>
                {activePillar.forWho}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive 3D Stacked Deck Navigation Cards */}
      <div className="services-deck-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {SERVICE_KEYS.map((key) => {
          const item = SERVICES_DATA[key];
          const isSelected = key === activeKey;
          const Icon = PILLAR_ICONS[key as keyof typeof PILLAR_ICONS] || Zap;

          return (
            <div
              key={key}
              onClick={() => handlePillarSelect(key)}
              className={`deck-card group rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-[#0d0d0d] border-[#0055ff]/50 shadow-[0_0_25px_rgba(0,85,255,0.25)] scale-[1.02]"
                  : "glass-panel border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.03]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-blue-400 transition-colors">
                    {item.pillarNum}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#0055ff]/20 text-[#00d4ff] border border-[#0055ff]/40"
                        : "bg-white/[0.04] text-zinc-400 group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="text-base font-semibold text-white tracking-tight mb-1">
                  {item.shortTitle}
                </h4>

                <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-4">
                  {item.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-xs font-mono text-white font-semibold">
                  {item.stats[0].value}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(item.id);
                  }}
                  className="text-[11px] font-mono text-zinc-400 group-hover:text-[#00d4ff] flex items-center gap-1 transition-colors"
                >
                  <span>Breakdown</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
