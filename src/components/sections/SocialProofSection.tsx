"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Star, ShieldCheck, ArrowLeft, ArrowRight, Quote, TrendingUp, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Testimonial {
  id: string;
  metric: string;
  subMetric: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  sector: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    metric: "+480% ROAS",
    subMetric: "£6.2M Revenue Scaled",
    quote:
      "Digital Pillars dismantled our previous agency's guesswork. Within 45 days, their server-side CAPI architecture and creative testing sprints reduced our blended CPA by 41% while multiplying revenue.",
    author: "Marcus Vance",
    role: "Founder & Chief Executive",
    company: "Vanguard Commerce",
    sector: "D2C Luxury Lifestyle · London & New York",
  },
  {
    id: "2",
    metric: "£14.2M ARR",
    subMetric: "3.2x LTV/CAC Ratio",
    quote:
      "Transitioning from sluggish Shopify templates to their bespoke Next.js flagship immediately boosted our conversion rate by 48%. Their strategic advisory sits in our quarterly board reviews.",
    author: "Dr. Elena Rostova",
    role: "Chief Commercial Officer",
    company: "Aura Health & Biotech",
    sector: "Subscription Healthtech · Zurich & London",
  },
  {
    id: "3",
    metric: "sub-0.6s Load",
    subMetric: "+320% Enterprise Pipeline",
    quote:
      "They delivered our 3D spatial flagship on time and on budget. Our sales cycle shortened by two weeks because the platform articulates complex technical value instantly to enterprise buyers.",
    author: "Liam Henderson",
    role: "VP of Product Marketing",
    company: "Kestrel Spatial Technologies",
    sector: "Enterprise Infrastructure · London",
  },
  {
    id: "4",
    metric: "100% Attributed",
    subMetric: "Daily Cultural Reach",
    quote:
      "Their creator matchmaking and organic presence engine gave us cultural traction that ad spend alone could never purchase. When paid ad costs spiked in Q4, our organic moat kept expanding.",
    author: "Sophia Chen",
    role: "Brand Director",
    company: "Novus Spirits Collective",
    sector: "Luxury Direct-to-Consumer · Paris & London",
  },
];

export function SocialProofSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);

  // Auto slide when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // GSAP ScrollTrigger Entrance
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".proof-anim", {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Drag & Swipe Interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    if (diff > 80) {
      handlePrev();
      isDragging.current = false;
    } else if (diff < -80) {
      handleNext();
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch Swipe Interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientX - startX.current;
    if (diff > 60) {
      handlePrev();
      startX.current = e.touches[0].clientX;
    } else if (diff < -60) {
      handleNext();
      startX.current = e.touches[0].clientX;
    }
  };

  return (
    <section
      ref={containerRef}
      id="proof"
      className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-[#050505]"
      style={{ contentVisibility: "auto" }}
    >
      {/* Subtle Ambient Light Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bloom-glow-blue opacity-25 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <div className="proof-anim inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-300 uppercase">
            Proven Impact · Client Ledger
          </span>
        </div>

        <h2 className="proof-anim text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-[-0.03em] leading-[1.06] mb-4">
          Capital Defended. <br />
          <span className="text-zinc-400 font-light">Growth Unlocked.</span>
        </h2>

        <p className="proof-anim text-base sm:text-lg text-zinc-400 font-sans max-w-2xl font-light leading-relaxed">
          We don't bill hours or deliver shelf-ware presentations. We engineer
          performance infrastructure benchmarked to audited balance sheet returns.
        </p>
      </div>

      {/* Interactive Glass Carousel */}
      <div
        className="relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handleMouseUp();
        }}
      >
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="relative glass-panel-elevated rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/[0.1] shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          {/* Ambient Inner Accent Light */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#0055ff]/10 blur-[90px] pointer-events-none" />

          {/* Active Card Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Metric Callout */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Verified Impact</span>
              </div>

              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight font-mono-telemetry mb-2">
                {TESTIMONIALS[activeIndex].metric}
              </div>

              <div className="text-sm font-mono text-zinc-400 font-light mb-6">
                {TESTIMONIALS[activeIndex].subMetric}
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#00d4ff] text-[#00d4ff]" />
                ))}
                <span className="text-[11px] font-mono text-zinc-400 ml-2">
                  Audited Partnership
                </span>
              </div>
            </div>

            {/* Right: Testimonial Statement & Credentials */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <Quote className="w-8 h-8 text-white/15 mb-4 shrink-0" />

              <p className="text-lg sm:text-2xl text-zinc-200 font-sans font-light leading-relaxed mb-8 italic">
                "{TESTIMONIALS[activeIndex].quote}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-semibold text-white">
                      {TESTIMONIALS[activeIndex].author}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-xs text-zinc-400">
                    {TESTIMONIALS[activeIndex].role} ·{" "}
                    <span className="text-zinc-300 font-medium">
                      {TESTIMONIALS[activeIndex].company}
                    </span>
                  </p>
                  <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                    {TESTIMONIALS[activeIndex].sector}
                  </p>
                </div>

                {/* Next/Prev Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex
                  ? "w-8 bg-[#0055ff] shadow-[0_0_12px_#0055ff]"
                  : "w-2 bg-white/[0.15] hover:bg-white/[0.3]"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
