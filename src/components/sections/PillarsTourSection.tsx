"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Check, ArrowUpRight, Zap, Radio, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PILLARS_DATA = [
  {
    id: "performance",
    number: "PILLAR I",
    title: "Performance",
    headline: "Ads that pay for themselves.",
    description:
      "We run your Meta and paid social end to end: building the campaigns, testing the creative, and reporting exactly what every pound brought back. You get a paid channel that scales on proof, not guesswork.",
    features: [
      "Full-funnel Meta & Instagram campaigns, built and managed",
      "Structured creative testing sprints so winners are found fast",
      "Server-side CAPI tracking, live dashboards, and weekly ROI reporting",
    ],
    tags: ["Meta Ads", "Analytics", "ROI Guarantee"],
    icon: Zap,
    metrics: [
      { label: "Portfolio ROAS", value: "4.2x" },
      { label: "CPA Reduction", value: "-38%" },
      { label: "First Live Audit", value: "7 Days" },
    ],
  },
  {
    id: "presence",
    number: "PILLAR II",
    title: "Presence",
    headline: "A brand that stays switched on.",
    description:
      "We run the day-to-day presence: a content calendar, community management, and the right creator partnerships. Your brand keeps showing up and staying relevant even when the ad budget isn't running.",
    features: [
      "Monthly content calendars, copywritten and designed",
      "Community and comment management in your authentic voice",
      "Influencer sourcing, outreach, and verified partnership handling",
    ],
    tags: ["Social Architecture", "Content Engine", "Influence"],
    icon: Radio,
    metrics: [
      { label: "Cadence", value: "Daily" },
      { label: "Engagement Lift", value: "+120%" },
      { label: "Brand Voice", value: "1 Unified" },
    ],
  },
  {
    id: "strategy",
    number: "PILLAR III",
    title: "Strategy",
    headline: "A plan the whole business runs on.",
    description:
      "We work out your positioning, map the market, and hand you a growth roadmap with numbers attached. Every campaign and post then points in the same direction, so effort compounds instead of scattering.",
    features: [
      "Positioning and brand messaging architecture you can act on",
      "Quarter-by-quarter growth roadmap with verified KPIs",
      "Ongoing executive consultation as the business scales",
    ],
    tags: ["Market Fit", "Advisory", "Growth Roadmap"],
    icon: Target,
    metrics: [
      { label: "Execution Sprints", value: "90 Days" },
      { label: "Positioning Fit", value: "100%" },
      { label: "Strategy Horizon", value: "Multi-Year" },
    ],
  },
];

export function PillarsTourSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activePillar = PILLARS_DATA[activeIdx];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".pillars-header-elem", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Subtle parallax on the background architectural image
      if (!prefersReducedMotion) {
        gsap.to(".pillars-bg-img", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Quick tab switch animation
  const handleTabChange = (idx: number) => {
    if (idx === activeIdx) return;
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }
    setActiveIdx(idx);
  };

  const scrollToInquiry = () => {
    const el = document.querySelector("#inquiry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="pillars"
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030303]"
    >
      {/* Background Architectural Canvas Image with Parallax & Dark Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="pillars-bg-img relative w-full h-[120%] -top-[10%]">
          <Image
            src="/assets/pillars-image.jpg"
            alt="Digital Pillars Architecture"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/70 to-[#030303]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="pillars-header-elem inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
              Built on Pillars
            </span>
            <div className="h-[1px] w-8 bg-blue-500/40" />
          </div>
          <h2 className="pillars-header-elem text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.08] mb-4">
            Three pillars. One framework.
          </h2>
          <p className="pillars-header-elem text-base sm:text-lg text-zinc-400 font-sans max-w-2xl font-light leading-relaxed">
            Eliminating guesswork across every growth channel. Each pillar
            reinforces the other, creating a defensible digital moat.
          </p>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
            {PILLARS_DATA.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = idx === activeIdx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => handleTabChange(idx)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pillar.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pillar Showcase Panel */}
        <div
          ref={contentRef}
          className="glass-panel-elevated rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/[0.1] relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Highlight inside card */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Narrative & Deliverables */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">
                    {activePillar.number}
                  </span>
                  <div className="flex gap-2">
                    {activePillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight mb-4">
                  {activePillar.headline}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 font-sans font-light leading-relaxed mb-6">
                  {activePillar.description}
                </p>

                {/* Bullet Highlights */}
                <div className="space-y-3 mb-8">
                  {activePillar.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-blue-400" />
                      </div>
                      <span className="text-xs sm:text-sm text-zinc-300 font-light">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={scrollToInquiry}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-blue-400 tracking-wider uppercase group transition-colors cursor-pointer"
                >
                  <span>Inquire for {activePillar.title} Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

            {/* Right: Metrics & Telemetry Grid */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-6">
                  Pillar Telemetry
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                  {activePillar.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="border-b border-white/[0.06] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="text-3xl font-display font-semibold text-white font-mono-telemetry mb-1">
                        {m.value}
                      </div>
                      <div className="text-xs text-zinc-400 font-light">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
