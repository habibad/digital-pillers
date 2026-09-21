"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import gsap from "gsap";
import HeroVideoBackground from "@/components/home/HeroVideoBackground";
import HeroContent from "@/components/home/HeroContent";
import HeroMetricCard from "@/components/home/HeroMetricCard";
import TrustedBrands from "@/components/home/TrustedBrands";
import ScrollIndicator from "@/components/home/ScrollIndicator";
import ShowreelModal from "@/components/home/ShowreelModal";
import { METRIC_CARDS } from "@/lib/constants/hero";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Staged entrance animation sequence with GSAP
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-bg-container",
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      )
        .fromTo(
          ".site-floating-header",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          ".hero-eyebrow-wrapper",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          ".hero-heading-inner",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          "-=0.4"
        )
        .fromTo(
          ".hero-subheadline",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta-group",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-metric-card-wrapper",
          { scale: 0.88, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "back.out(1.15)",
          },
          "-=0.6"
        )
        .fromTo(
          [".hero-trusted-strip", ".hero-side-tagline", ".hero-scroll-indicator"],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Desktop mouse parallax coordinates
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setParallaxOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  return (
    <>
      <section
        ref={heroRef}
        className="cinematic-hero"
        id="top"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Digital Pillars Hero Section"
      >
        {/* Full-bleed video background with atmospheric volumetric lighting & particles */}
        <HeroVideoBackground parallaxOffset={parallaxOffset} />

        {/* Central Hero Shell Container */}
        <div className="hero-viewport-shell">
          {/* Main Left Copy Block */}
          <div className="hero-left-column">
            <HeroContent onOpenShowreel={() => setShowreelOpen(true)} />
            <TrustedBrands />
          </div>

          {/* Floating Metric Cards Composition */}
          <div className="hero-metrics-constellation" aria-label="Key Performance Indicators">
            {METRIC_CARDS.map((card) => (
              <HeroMetricCard
                key={card.id}
                card={card}
                parallaxOffset={parallaxOffset}
              />
            ))}
          </div>
        </div>

        {/* Vertical Side Tagline & Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Showreel Cinematic Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        videoSrc="/media/assembly-video.mp4"
      />
    </>
  );
}
