"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface ProcessStep {
  num: string;
  title: string;
  copy: string[];
  icon: (props: { className?: string }) => React.JSX.Element;
}

// Crisp, futuristic SVG icons
function AuditIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="13" cy="13" r="8.5" />
      <path d="M19.5 19.5L27 27" strokeWidth="2.2" />
      {/* Precision reticle accents */}
      <circle cx="13" cy="13" r="3.5" strokeDasharray="2.5 2.5" strokeOpacity="0.85" />
      <path d="M13 7.5V9.5M13 16.5V18.5M7.5 13H9.5M16.5 13H18.5" strokeWidth="1.4" strokeOpacity="0.7" />
    </svg>
  );
}

function BuildIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* 3D isometric system cube */}
      <path d="M16 3.5L27 9.8V22.2L16 28.5L5 22.2V9.8L16 3.5Z" />
      <path d="M16 16L27 9.8" />
      <path d="M16 16V28.5" />
      <path d="M16 16L5 9.8" />
      {/* Luminous core node */}
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

function LaunchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Aerodynamic rocket hull */}
      <path d="M16 3C16 3 9 7.5 9 17L13.5 21.5C13.5 21.5 16 18 16 16C16 18 18.5 21.5 18.5 21.5L23 17C23 7.5 16 3 16 3Z" />
      {/* Fins */}
      <path d="M9 17L4.5 19.5L6 23L9.5 21.5" />
      <path d="M23 17L27.5 19.5L26 23L22.5 21.5" />
      {/* Porthole */}
      <circle cx="16" cy="11.5" r="2" fill="currentColor" />
      {/* Propulsion thrust vector */}
      <path d="M13.5 23.5L16 28.5L18.5 23.5" strokeWidth="1.5" strokeOpacity="0.85" />
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Base baseline */}
      <path d="M4 27H28" strokeWidth="1.6" />
      {/* Ascending bars */}
      <rect x="6" y="18" width="4" height="9" rx="1" />
      <rect x="13" y="12" width="4" height="15" rx="1" />
      <rect x="20" y="7" width="4" height="20" rx="1" />
      {/* Exponential breakout curve & arrow */}
      <path d="M6 14.5L13.5 9L25.5 4" strokeWidth="1.8" strokeOpacity="0.95" />
      <path d="M21 4H25.5V8.5" strokeWidth="1.8" />
    </svg>
  );
}

const steps: ProcessStep[] = [
  {
    num: "01",
    title: "Audit",
    copy: ["We analyze your market,", "brand and opportunities."],
    icon: AuditIcon,
  },
  {
    num: "02",
    title: "Build",
    copy: ["We create a tailored", "strategy and systems."],
    icon: BuildIcon,
  },
  {
    num: "03",
    title: "Launch",
    copy: ["We execute, test", "and optimize."],
    icon: LaunchIcon,
  },
  {
    num: "04",
    title: "Scale",
    copy: ["We double down on", "what works."],
    icon: ScaleIcon,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video reliably when section approaches or enters viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP scroll entrance animation
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".process-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          ".process-headline-text",
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          ".process-support-block",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.5"
        )
        .fromTo(
          ".process-track-progress",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
          "-=0.4"
        )
        .fromTo(
          ".process-step-item",
          { y: 30, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12 },
          "-=0.8"
        )
        .fromTo(
          ".process-vertical-tagline",
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.5"
        );

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tl.play();
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="process-section" id="process" ref={sectionRef} aria-label="Our Process">
      {/* Background Video Layer - Full bleed, fully visible, zero full-screen dark overlays */}
      <div className="process-video-bg">
        <video
          ref={videoRef}
          src="/media/assembly-video.mp4"
          poster="/media/posters/assembly.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="process-video-element"
        />
        {/* Subtle top & bottom edge vignettes to blend seamlessly into #020509 */}
        <div className="process-seam-top" aria-hidden="true" />
        <div className="process-seam-bottom" aria-hidden="true" />
      </div>

      {/* Main Content Shell */}
      <div className="page-shell process-shell">
        {/* Top Header Layout: Left Headline + Right Supporting Copy & CTA */}
        <div className="process-header-grid">
          {/* Top Left: Eyebrow + Large Elegant Headline */}
          <div className="process-headline-block">
            <div className="process-eyebrow">
              <span className="process-eyebrow-dot" />
              <span>OUR PROCESS</span>
            </div>
            <h2 className="process-headline">
              <span className="process-headline-row">
                <span className="process-headline-text">A clear path</span>
              </span>
              <span className="process-headline-row">
                <span className="process-headline-text">to real results.</span>
              </span>
            </h2>
          </div>

          {/* Top Right: Supporting Description + Pill CTA */}
          <div className="process-support-block">
            <p className="process-support-copy">
              A proven process designed for clarity,
              <br className="process-copy-break" />
              speed and sustainable growth.
            </p>
            <Link href="#contact" className="process-cta-btn">
              <span>Learn More</span>
              <svg
                className="process-cta-arrow"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8H13M9 4L13 8L9 12" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Lower Middle: 4-Step Horizontal Timeline with Connected Animated Glowing Line */}
        <div className="process-timeline-wrap">
          {/* Animated Horizontal Glowing Connector Line centered through step 1 to step 4 */}
          <div className="process-line-track" aria-hidden="true">
            {/* Atmospheric soft blur beam */}
            <div className="process-line-glow" />
            {/* Base neon wire */}
            <div className="process-line-base" />
            {/* Entrance reveal progress bar */}
            <div className="process-track-progress" />
            {/* Continuously streaming light energy pulse */}
            <div className="process-line-pulse" />
          </div>

          {/* 4 Process Step Nodes */}
          <div className="process-steps-row">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div className="process-step-item" key={step.num}>
                  {/* Glowing Circular Icon Node with Continuously Animated Rotating Border */}
                  <div className="process-node-wrapper">
                    {/* Ambient Neon Outer Aura */}
                    <div className="process-node-glow-halo" aria-hidden="true" />

                    {/* SVG Circular Border with Active Rotating Lighting Sweep */}
                    <svg className="process-node-ring" viewBox="0 0 88 88" aria-hidden="true">
                      <defs>
                        <linearGradient id={`sweepGrad-${step.num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#93c5fd" stopOpacity="1" />
                          <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.95" />
                          <stop offset="70%" stopColor="#2563eb" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Base static guide ring */}
                      <circle cx="44" cy="44" r="41" className="ring-base" />
                      {/* Ambient breathing glow ring */}
                      <circle cx="44" cy="44" r="41" className="ring-ambient" />
                      {/* Active continuously rotating light sweep arc */}
                      <circle
                        cx="44"
                        cy="44"
                        r="41"
                        className="ring-sweep"
                        stroke={`url(#sweepGrad-${step.num})`}
                      />
                    </svg>

                    {/* Central Glassmorphic Core Container with Icon */}
                    <div className="process-node-core">
                      <IconComponent className="process-step-icon" />
                    </div>
                  </div>

                  {/* Step Typography: Number + Title */}
                  <div className="process-step-info">
                    <h3 className="process-step-heading">
                      <span className="process-step-number">{step.num}</span>
                      <span className="process-step-title">{step.title}</span>
                    </h3>
                    <p className="process-step-desc">
                      {step.copy[0]}
                      <br />
                      {step.copy[1]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Far-Right Vertical Micro-Copy */}
        <div className="process-vertical-tagline" aria-hidden="true">
          <span>IDEAS</span>
          <span>SYSTEMS</span>
          <span>GROWTH</span>
          <span>BEYOND</span>
        </div>
      </div>
    </section>
  );
}
