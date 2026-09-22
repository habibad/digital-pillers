"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface ProcessStep {
  num: string;
  title: string;
  copy: [string, string];
  icon: (props: { className?: string }) => React.JSX.Element;
}

// Crisp, futuristic line icons matching the reference image
function AuditIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="7.5" />
      <path d="M17.5 17.5L24 24" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="3" strokeDasharray="2.5 2.5" strokeOpacity="0.75" />
    </svg>
  );
}

function BuildIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3L23.5 8.5V19.5L14 25L4.5 19.5V8.5L14 3Z" />
      <path d="M14 14L23.5 8.5" />
      <path d="M14 14V25" />
      <path d="M14 14L4.5 8.5" />
    </svg>
  );
}

function LaunchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3C14 3 8 7 8 15.5L12 19.5C12 19.5 14 16.5 14 15C14 16.5 16 19.5 16 19.5L20 15.5C20 7 14 3 14 3Z" />
      <path d="M8 15.5L4 18L5.5 21.5L9 20" />
      <path d="M20 15.5L24 18L22.5 21.5L19 20" />
      <circle cx="14" cy="10" r="1.8" fill="currentColor" />
      <path d="M12 21.5L14 25.5L16 21.5" strokeWidth="1.5" strokeOpacity="0.85" />
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 23.5H24.5" strokeWidth="1.6" />
      <rect x="5.5" y="15.5" width="4" height="8" rx="1" />
      <rect x="12" y="10.5" width="4" height="13" rx="1" />
      <rect x="18.5" y="5.5" width="4" height="18" rx="1" />
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
  const lineRef = useRef<HTMLDivElement>(null);

  // Video autoplay management with IntersectionObserver
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

  // GSAP Scroll Entrance Staged Animation
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
          { yPercent: 45, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.12 },
          "-=0.4"
        )
        .fromTo(
          ".process-support-block",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.55"
        )
        .fromTo(
          ".process-horizontal-line-track",
          { scaleX: 0, opacity: 0, transformOrigin: "left center" },
          { scaleX: 1, opacity: 1, duration: 1.1, ease: "power2.inOut" },
          "-=0.5"
        )
        .fromTo(
          ".process-step-item",
          { y: 25, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.12 },
          "-=0.8"
        )
        .fromTo(
          ".process-vertical-tagline",
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.6"
        );

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tl.play();
            observer.disconnect();
          }
        },
        { threshold: 0.08 }
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
      {/* Background Video Layer - Full-bleed, atmospheric, with delicate readability overlay */}
      <div className="process-video-bg" aria-hidden="true">
        <video
          ref={videoRef}
          src="/media/assembly-video.mp4"
          poster="/media/posters/assembly.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="process-video-element"
        />
        {/* Subtle translucent dark blue overlay: preserves video motion without muddying */}
        <div className="process-video-overlay" />
        {/* Seamless edge gradients into #020509 */}
        <div className="process-seam-top" />
        <div className="process-seam-bottom" />
      </div>

      {/* Main Content Shell */}
      <div className="page-shell process-shell">
        {/* Top Header Layout: Left Eyebrow + Headline; Right Supporting Copy + Pill Button */}
        <div className="process-header-grid">
          {/* Top Left: Clean Eyebrow + Editorial Two-line Headline */}
          <div className="process-headline-block">
            <div className="process-eyebrow">OUR PROCESS</div>
            <h2 className="process-headline">
              <span className="process-headline-row">
                <span className="process-headline-text">A clear path</span>
              </span>
              <span className="process-headline-row">
                <span className="process-headline-text">to real results.</span>
              </span>
            </h2>
          </div>

          {/* Upper Right: Supporting Description + Learn More CTA Button */}
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

        {/* Lower Middle: 4 Process Steps connected by the Horizontal Glowing Line */}
        <div className="process-timeline-wrap">
          {/* Connected Glowing Horizontal Line running continuously across the 4 nodes */}
          <div className="process-horizontal-line-track" ref={lineRef} aria-hidden="true">
            {/* Ambient Cyan Background Line */}
            <div className="process-line-ambient" />
            {/* Crisp Electric Core Line */}
            <div className="process-line-core" />
            {/* Animated Continuous Traveling Energy Pulse / Wave */}
            <div className="process-line-energy-pulse" />
          </div>

          {/* 4 Process Step Nodes */}
          <div className="process-steps-row">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div className="process-step-item" key={step.num}>
                  {/* Circular Node Container with animated border lighting */}
                  <div className="process-node-wrapper">
                    {/* Ambient Neon Outer Glow Halo */}
                    <div className="process-node-glow-halo" aria-hidden="true" />

                    {/* SVG Animated Circular Border Lighting */}
                    <svg
                      className="process-node-ring-svg"
                      viewBox="0 0 88 88"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id={`nodeSweepGrad-${index}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                          <stop offset="30%" stopColor="#e0f2fe" stopOpacity="0.95" />
                          <stop offset="62%" stopColor="#ffffff" stopOpacity="0.55" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Base Subtle Illuminated Ring */}
                      <circle
                        cx="44"
                        cy="44"
                        r="40"
                        className="process-node-base-ring"
                      />

                      {/* Continuous Sweeping Energy Beam around border */}
                      <circle
                        cx="44"
                        cy="44"
                        r="40"
                        className={`process-node-sweep-ring sweep-idx-${index}`}
                        stroke={`url(#nodeSweepGrad-${index})`}
                      />
                    </svg>

                    {/* Translucent Dark Glass Center Core with Icon */}
                    <div className="process-node-core">
                      <IconComponent className="process-step-icon" />
                    </div>
                  </div>

                  {/* Step Typography: 01 Audit + 2-line Description */}
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
      </div>

      {/* Far-Right Vertical Micro-Copy - Perfectly aligned with Hero side words */}
      <aside className="process-vertical-tagline" aria-hidden="true">
        <div className="process-tagline-stack">
          <span className="process-tagline-word">IDEAS</span>
          <span className="process-tagline-word">SYSTEMS</span>
          <span className="process-tagline-word">GROWTH</span>
          <span className="process-tagline-word">BEYOND</span>
        </div>
      </aside>
    </section>
  );
}
