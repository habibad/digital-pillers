"use client";

import Link from "next/link";
import { MouseEvent, useRef } from "react";

interface HeroContentProps {
  onOpenShowreel: () => void;
}

export default function HeroContent({ onOpenShowreel }: HeroContentProps) {
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);

  // Magnetic button micro-interaction for primary CTA
  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!primaryBtnRef.current) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = primaryBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    primaryBtnRef.current.style.transform = `translate3d(${x * 0.18}px, ${y * 0.18}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (primaryBtnRef.current) {
      primaryBtnRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  return (
    <div className="hero-content-block">
      {/* Top Eyebrow Label */}
      <div className="hero-eyebrow-wrapper">
        <div className="eyebrow-pill">
          <span className="eyebrow-pulse-dot" aria-hidden="true" />
          <span className="eyebrow-text">A GROWTH MARKETING AGENCY</span>
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="hero-main-heading">
        <span className="hero-heading-line">
          <span className="hero-heading-inner">Build growth</span>
        </span>
        <span className="hero-heading-line">
          <span className="hero-heading-inner">that holds.</span>
        </span>
      </h1>

      {/* Subheadline */}
      <p className="hero-subheadline">
        Strategy. Systems. Sustainable results.
      </p>

      {/* Action Buttons Row */}
      <div className="hero-cta-group">
        <Link
          ref={primaryBtnRef}
          href="/contact"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="hero-btn-primary"
        >
          <span>Start a Project</span>
          <span className="hero-btn-arrow" aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          onClick={onOpenShowreel}
          className="hero-btn-secondary"
          aria-label="Watch Digital Pillars agency showreel"
        >
          <span className="hero-btn-play-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span>Watch Showreel</span>
        </button>
      </div>
    </div>
  );
}
