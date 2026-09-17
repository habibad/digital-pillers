"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { BarChart3, LineChart, Activity, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SignalSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".signal-text-elem", {
        opacity: 0,
        x: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(mediaRef.current, {
        opacity: 0,
        x: -30,
        scale: 0.96,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="signal"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Visual Media & Telemetry HUD */}
        <div ref={mediaRef} className="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden glass-panel-elevated p-2 border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0a0a0e]">
              <Image
                src="/assets/signal-image.jpg"
                alt="The Signal Telemetry"
                fill
                className="object-cover object-center"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Signal HUD */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-white tracking-wider uppercase">
                    Signal Stream · Online
                  </span>
                </div>
                <div className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-300 border border-white/10">
                  CAPI 100%
                </div>
              </div>

              {/* Live Telemetry Data Widget at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-4 border border-white/10 backdrop-blur-md pointer-events-none">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-cyan-400" />
                    Live Conversion Stream
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    MATCH CONFIRMED
                  </span>
                </div>
                <div className="text-xs text-zinc-200 font-mono flex items-center justify-between">
                  <span>£840.00 Order Attributed</span>
                  <span className="text-zinc-500 font-light">Meta Ads · 12s ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
          <div className="signal-text-elem inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase">
              Chapter II — The Signal
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/40" />
          </div>

          <h2 className="signal-text-elem text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.08] mb-6">
            Data that drives <br />
            <span className="text-zinc-400">decisions.</span>
          </h2>

          <p className="signal-text-elem text-base sm:text-lg text-zinc-400 font-sans font-light leading-relaxed mb-8">
            Gut feeling has no place in high-growth capital deployment. We engineer
            attribution models that tell the truth: isolating organic lift from paid
            cannibalization and pinpointing exactly which dollar generated what
            return.
          </p>

          <div className="signal-text-elem grid grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-5 border border-white/[0.08]">
              <BarChart3 className="w-5 h-5 text-blue-400 mb-3" />
              <div className="text-2xl font-display font-semibold text-white mb-1">
                Zero Waste
              </div>
              <p className="text-xs text-zinc-400 font-light">
                Underperforming ad sets and creator deals cut without sentiment.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/[0.08]">
              <LineChart className="w-5 h-5 text-cyan-400 mb-3" />
              <div className="text-2xl font-display font-semibold text-white mb-1">
                True North
              </div>
              <p className="text-xs text-zinc-400 font-light">
                Direct integration with Stripe & Shopify for reconciled P&L data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
