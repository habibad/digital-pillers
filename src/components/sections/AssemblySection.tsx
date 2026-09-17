"use client";

import React, { useRef, useEffect } from "react";
import { Layers, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TICKER_ITEMS = [
  { name: "Campaign Assets", detail: "Ads built to convert, not just impress" },
  { name: "Brand Guidelines", detail: "One consistent voice across every channel" },
  { name: "Strategy Documents", detail: "The plan the whole system answers to" },
  { name: "Social Content", detail: "A feed that earns attention daily" },
  { name: "Influencer Roster", detail: "The right partners, properly matched" },
  { name: "Consultation Notes", detail: "Decisions captured, direction kept" },
];

export function AssemblySection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".asm-text-elem", {
        opacity: 0,
        x: -30,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".ticker-item", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ticker-list",
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
      id="assembly"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative & Asset Ticker */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="asm-text-elem inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
              Chapter III — The Assembly
            </span>
            <div className="h-[1px] w-12 bg-blue-500/40" />
          </div>

          <h2 className="asm-text-elem text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.08] mb-6">
            Six services. <br />
            <span className="text-zinc-400">One ecosystem.</span>
          </h2>

          <p className="asm-text-elem text-base sm:text-lg text-zinc-400 font-sans font-light leading-relaxed mb-8">
            When agency services are disconnected, messages clash and budget is
            diluted. We assemble every asset, strategy document, and campaign into
            a synchronized engine.
          </p>

          {/* Assembly Deliverables Ticker */}
          <div className="ticker-list space-y-3">
            {TICKER_ITEMS.map((item, idx) => (
              <div
                key={item.name}
                className="ticker-item glass-panel rounded-xl p-3.5 border border-white/[0.07] flex items-center justify-between hover:border-white/[0.15] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-blue-400">0{idx + 1}</span>
                  <span className="text-sm font-medium text-white">{item.name}</span>
                </div>
                <span className="text-xs text-zinc-400 font-light hidden sm:inline">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Assembly Cinematic Video Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden glass-panel-elevated p-2 border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#09090d]">
              <video
                ref={videoRef}
                src="/assets/assembly-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Status HUD */}
              <div className="absolute top-4 left-4 glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] font-mono text-white tracking-wider uppercase">
                  Assembly Pipeline Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
