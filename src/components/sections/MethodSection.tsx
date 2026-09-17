"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Search, Construction, Rocket, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const METHOD_STEPS = [
  {
    num: "01",
    title: "Audit",
    icon: Search,
    summary:
      "Most brands are quietly leaking money. We map exactly where it goes, which campaigns and pages actually convert and which just look busy, before spending a penny more.",
    actionItem: "Full conversion leak & attribution audit",
  },
  {
    num: "02",
    title: "Foundation",
    icon: Construction,
    summary:
      "Then we lay the groundwork. A sharp offer, a clear audience, tracking that tells the truth and a creative system you can repeat. Get this right and every pound after it works harder.",
    actionItem: "Offer redesign & CAPI infrastructure lock",
  },
  {
    num: "03",
    title: "Scale",
    icon: Rocket,
    summary:
      "Only then do we grow. Paid, content and partnerships moving as one, reviewed against real numbers every week, so the brand never outgrows what holds it up.",
    actionItem: "Continuous compounding growth deployment",
  },
];

export function MethodSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".method-header-elem", {
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

      // Staggered card entrance
      gsap.from(".method-card", {
        opacity: 0,
        y: 36,
        duration: 0.8,
        stagger: 0.16,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".method-cards-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Background image scrub
      if (!prefersReducedMotion) {
        gsap.to(".construction-bg-img", {
          scale: 1.08,
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

  return (
    <section
      ref={containerRef}
      id="method"
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030303]"
    >
      {/* Background Architectural Visual with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25">
        <div className="construction-bg-img relative w-full h-full">
          <Image
            src="/assets/construction-image.jpg"
            alt="The Construction"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-[#030303]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="method-header-elem inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
              The Construction
            </span>
            <div className="h-[1px] w-8 bg-blue-500/40" />
          </div>
          <h2 className="method-header-elem text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.08] mb-6">
            We build brands <br />
            <span className="text-zinc-400">that hold weight.</span>
          </h2>
          <p className="method-header-elem text-base sm:text-lg text-zinc-400 font-sans font-light leading-relaxed">
            Anyone can run an ad. Very few build something that keeps working after
            the budget stops. That takes structure, and structure takes a plan.
          </p>
        </div>

        {/* 3 Step Method Cards */}
        <div className="method-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {METHOD_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="method-card glass-panel-elevated rounded-3xl p-8 border border-white/[0.09] hover:border-white/[0.2] transition-all duration-400 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-display font-semibold text-blue-400/80 group-hover:text-blue-400 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-semibold text-white tracking-tight mb-4">
                    {step.title}
                  </h3>

                  <p className="text-sm text-zinc-400 font-sans font-light leading-relaxed mb-8">
                    {step.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 tracking-wider">
                    {step.actionItem}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
