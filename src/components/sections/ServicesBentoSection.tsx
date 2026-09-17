"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICE_KEYS, SERVICES_DATA } from "@/data/servicesData";

interface ServicesBentoSectionProps {
  onSelectService: (serviceKey: string) => void;
}

export function ServicesBentoSection({ onSelectService }: ServicesBentoSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".svc-heading-elem", {
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

      gsap.from(".bento-card", {
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bento-grid",
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
      id="services"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="svc-heading-elem inline-flex items-center gap-2 mb-3">
          <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
            The Suite
          </span>
          <div className="h-[1px] w-8 bg-blue-500/40" />
        </div>

        <h2 className="svc-heading-elem text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.08] mb-4">
          Built to be used, <br />
          <span className="text-zinc-400">not admired.</span>
        </h2>

        <p className="svc-heading-elem text-base sm:text-lg text-zinc-400 font-sans max-w-2xl font-light leading-relaxed">
          Six surgical capabilities engineered to deploy independently or interlock
          into an unshakeable digital moat.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_KEYS.map((key) => {
          const item = SERVICES_DATA[key];
          return (
            <div
              key={item.id}
              onClick={() => onSelectService(item.id)}
              className="bento-card group glass-card-interactive rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Background Glow on Hover */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 blur-[60px] transition-colors duration-500 pointer-events-none" />

              <div>
                {/* Visual Thumbnail */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-white/[0.06]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Top Eyebrow Tag */}
                  <div className="absolute top-3 left-3 glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-300 border border-white/10">
                    {item.eyebrow}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-sans font-light leading-relaxed mb-6">
                  {item.tagline}
                </p>
              </div>

              {/* Card Footer with Stats & CTA */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-white">
                    {item.stats[0].value}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-light truncate max-w-[130px]">
                    {item.stats[0].label}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-blue-500/40 group-hover:bg-blue-500/20 transition-all">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
