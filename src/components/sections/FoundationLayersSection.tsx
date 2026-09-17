"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Building2, Layers, CheckCircle2, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TIERS = [
  {
    tier: "05",
    name: "Social Consultations",
    summary: "Audits · calendars · organic growth",
    description:
      "Platform audits, content calendars, and organic growth strategy. We turn a scattered social presence into a system that compounds, so your reach grows without paying for every impression.",
  },
  {
    tier: "04",
    name: "Business Consultations",
    summary: "Roadmaps · KPIs · planning",
    description:
      "Strategic planning, growth roadmaps, and KPI analysis. We sit on your side of the table, translate ambition into a quarter-by-quarter plan, and hold the numbers accountable.",
  },
  {
    tier: "03",
    name: "Influencer Talent",
    summary: "Scouting · negotiation · matchmaking",
    description:
      "Scouting, negotiation, and brand-influencer matchmaking. We find creators whose audience genuinely overlaps yours, handle the deal, and make sure the partnership pays for itself.",
  },
  {
    tier: "02",
    name: "Social Presence",
    summary: "Content · community · engagement",
    description:
      "Content, community, and engagement management. The day-to-day voice of the brand: consistent posting, real conversations, and a feed people choose to follow.",
  },
  {
    tier: "01",
    name: "Brand Strategy",
    summary: "Positioning · identity · market fit",
    description:
      "Positioning, identity, and market evaluation. Before anything scales, we work out what you stand for and where you win, so every campaign points the same direction.",
  },
  {
    tier: "00",
    name: "Performance Ads",
    summary: "Meta · paid social · ROI",
    description:
      "Meta and paid social, run on data and obsessed with ROI. The ground floor everything else stands on: creative tested, spend defended, results reported in numbers you can act on.",
  },
];

export function FoundationLayersSection() {
  const [activeTier, setActiveTier] = useState(TIERS[5]); // Default ground floor (Performance Ads)
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".foundation-header-elem", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".tier-item", {
        opacity: 0,
        x: 30,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tiers-list",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="foundation"
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030303]"
    >
      {/* Background Graphic with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="relative w-full h-full">
          <Image
            src="/assets/foundation-image.jpg"
            alt="Foundation Framework"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-[#030303]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Live Layer Inspector */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="foundation-header-elem inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
                The Infrastructure
              </span>
              <div className="h-[1px] w-8 bg-blue-500/40" />
            </div>

            <h2 className="foundation-header-elem text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.08] mb-6">
              Your Foundation. <br />
              <span className="text-blue-400 italic">Our Framework.</span>
            </h2>

            <p className="foundation-header-elem text-base text-zinc-400 font-sans font-light leading-relaxed mb-8">
              Every lasting enterprise is built in calculated vertical strata.
              Hover any tier to inspect how each operational layer supports the one
              above it.
            </p>

            {/* Active Tier Inspector Card */}
            <div className="glass-panel-elevated rounded-2xl p-6 sm:p-7 border border-blue-500/30 shadow-[0_10px_35px_rgba(37,99,235,0.15)] relative overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                  Tier {activeTier.tier} · Architecture
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              </div>

              <h3 className="text-2xl font-display font-semibold text-white mb-2">
                {activeTier.name}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mb-4">
                {activeTier.summary}
              </p>
              <p className="text-sm text-zinc-300 font-sans font-light leading-relaxed">
                {activeTier.description}
              </p>
            </div>
          </div>

          {/* Right Column: 6 Stacked Tiers */}
          <div className="lg:col-span-6 tiers-list space-y-3 pt-4">
            {TIERS.map((t) => {
              const isSelected = activeTier.tier === t.tier;
              return (
                <div
                  key={t.tier}
                  onMouseEnter={() => setActiveTier(t)}
                  onClick={() => setActiveTier(t)}
                  className={`tier-item group rounded-2xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-600/15 border-blue-500/50 shadow-[0_0_24px_rgba(59,130,246,0.2)]"
                      : "glass-panel border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-mono transition-colors ${
                        isSelected ? "text-blue-400 font-bold" : "text-zinc-500"
                      }`}
                    >
                      {t.tier}
                    </span>
                    <div>
                      <h4
                        className={`text-base font-semibold tracking-wide transition-colors ${
                          isSelected ? "text-white" : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {t.name}
                      </h4>
                      <p className="text-xs text-zinc-500 font-light hidden sm:block">
                        {t.summary}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-all ${
                      isSelected
                        ? "text-blue-400 translate-x-1"
                        : "text-zinc-600 group-hover:text-zinc-400"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
