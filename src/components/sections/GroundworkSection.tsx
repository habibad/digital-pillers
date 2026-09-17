"use client";

import React, { useRef, useEffect } from "react";
import { CheckCircle2, ShieldAlert, Cpu, Database } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GroundworkSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const ctx = gsap.context(() => {
      // Scroll-triggered narrative entrance
      gsap.from(".groundwork-text-elem", {
        opacity: 0,
        x: -30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Card entrance
      gsap.from(cardRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Interactive 3D Cursor Tilt with GSAP quickTo (Disabled on touch)
      if (!isTouch && !prefersReducedMotion && cardRef.current) {
        const card = cardRef.current;
        const setRotX = gsap.quickTo(card, "rotationX", {
          duration: 0.5,
          ease: "power3.out",
        });
        const setRotY = gsap.quickTo(card, "rotationY", {
          duration: 0.5,
          ease: "power3.out",
        });
        const setScale = gsap.quickTo(card, "scale", {
          duration: 0.4,
          ease: "power3.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          // Tilting limits
          setRotY(x * 16);
          setRotX(-y * 16);
        };

        const handleMouseEnter = () => {
          setScale(1.02);
        };

        const handleMouseLeave = () => {
          setRotX(0);
          setRotY(0);
          setScale(1);
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="groundwork"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="groundwork-text-elem inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
              Chapter I — The Desk
            </span>
            <div className="h-[1px] w-12 bg-blue-500/40" />
          </div>

          <h2 className="groundwork-text-elem text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.08] mb-6">
            Everything begins <br />
            <span className="text-zinc-400">on solid ground.</span>
          </h2>

          <p className="groundwork-text-elem text-base sm:text-lg text-zinc-400 font-sans font-light leading-relaxed mb-8">
            A pillar is only as strong as what it stands on, and so is a brand.
            Before a single ad runs, we lay the groundwork: a clear offer, a
            defined audience, clean tracking, and the right mindset from the
            client. Growth that lasts is poured from the ground up, never propped
            up.
          </p>

          {/* Core Groundwork Checkpoints */}
          <div className="groundwork-text-elem space-y-4">
            <div className="glass-panel rounded-xl p-4 border border-white/[0.08] flex items-start gap-3.5 hover:border-white/[0.15] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Cpu className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide mb-1">
                  Offer & Unit Economics
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We stress-test margins, churn rates, and lifetime value before
                  deploying growth capital.
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4 border border-white/[0.08] flex items-start gap-3.5 hover:border-white/[0.15] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Database className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide mb-1">
                  CAPI & Attribution Hygiene
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Server-side Meta Conversions API setup so every pound of spend
                  is traceable to verified revenue.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Video Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            ref={cardRef}
            className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden glass-panel-elevated p-2 border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-grab transform-gpu will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Video Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#09090d]">
              <video
                ref={videoRef}
                src="/assets/desk-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Status Pill */}
              <div
                className="absolute top-4 left-4 glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg pointer-events-none"
                style={{ transform: "translateZ(30px)" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-white tracking-wider uppercase">
                  Groundwork Stage Active
                </span>
              </div>

              {/* Interactive Telemetry Overlay Footer */}
              <div
                className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-3 border border-white/10 backdrop-blur-md flex items-center justify-between pointer-events-none"
                style={{ transform: "translateZ(40px)" }}
              >
                <div>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase">
                    Attribution Precision
                  </p>
                  <p className="text-sm font-semibold text-white font-mono-telemetry">
                    99.4% Signal Integrity
                  </p>
                </div>
                <div className="h-6 w-16 bg-white/[0.04] rounded flex items-center justify-center border border-white/[0.08]">
                  <span className="text-[9px] font-mono text-blue-400">DEFENDED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
