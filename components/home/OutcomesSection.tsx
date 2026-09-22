"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import AnalyticsDashboard from "./AnalyticsDashboard";
import OutcomeStatementCard from "./OutcomeStatementCard";

export default function OutcomesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP Scroll Entrance & Numeric Counter Animation
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      // 1. Eyebrow
      tl.fromTo(
        ".outcomes-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        // 2. Two-line Headline
        .fromTo(
          ".outcomes-headline-text",
          { yPercent: 45, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
          "-=0.4"
        )
        // 3. Analytics Dashboard container
        .fromTo(
          ".outcomes-dashboard-panel",
          { y: 35, scale: 0.985, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.9 },
          "-=0.5"
        )
        // 4. Revenue Card
        .fromTo(
          ".dashboard-revenue-card",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.6"
        )
        // 5. Four KPI cards staggered
        .fromTo(
          ".dashboard-kpi-card",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 },
          "-=0.5"
        )
        // 6. Right Statement Card
        .fromTo(
          ".outcomes-statement-card",
          { x: 25, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.85 },
          "-=0.6"
        )
        // 7. Chart bars scaleY from bottom
        .fromTo(
          ".chart-bar-fill",
          { scaleY: 0, transformOrigin: "bottom" },
          {
            scaleY: 1,
            duration: 0.9,
            stagger: 0.045,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // 8. Numeric Counters
      const countRevenue = { val: 0 };
      tl.to(
        countRevenue,
        {
          val: 1248320,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            const el = document.querySelector(".counter-revenue");
            if (el) {
              el.textContent = `$${Math.round(countRevenue.val).toLocaleString()}`;
            }
          },
        },
        "-=1.0"
      );

      const countRoas = { val: 0 };
      tl.to(
        countRoas,
        {
          val: 4.8,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            const el = document.querySelector(".counter-roas");
            if (el) el.textContent = `${countRoas.val.toFixed(1)}x`;
          },
        },
        "-=1.1"
      );

      const countLeads = { val: 0 };
      tl.to(
        countLeads,
        {
          val: 38,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            const el = document.querySelector(".counter-leads");
            if (el) el.textContent = `+${Math.round(countLeads.val)}%`;
          },
        },
        "-=1.1"
      );

      const countImpressions = { val: 0 };
      tl.to(
        countImpressions,
        {
          val: 2.4,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            const el = document.querySelector(".counter-impressions");
            if (el) el.textContent = `${countImpressions.val.toFixed(1)}M`;
          },
        },
        "-=1.1"
      );

      const countRetention = { val: 0 };
      tl.to(
        countRetention,
        {
          val: 91,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            const el = document.querySelector(".counter-retention");
            if (el) el.textContent = `${Math.round(countRetention.val)}%`;
          },
        },
        "-=1.1"
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
    <section
      className="outcomes-section"
      id="outcomes"
      ref={sectionRef}
      aria-label="Real Business Outcomes"
    >
      {/* Cinematic Starry Monolith Landscape Background */}
      <div className="outcomes-backdrop" aria-hidden="true">
        <Image
          src="/media/outcomes-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="outcomes-bg-image"
        />
        <div className="outcomes-ambient-beacon" />
        <div className="outcomes-overlay-vignette" />
        <div className="outcomes-seam-top" />
        <div className="outcomes-seam-bottom" />
      </div>

      <div className="page-shell outcomes-shell">
        <div className="outcomes-composition-grid">
          {/* Left: Eyebrow + Large Elegant Two-line Headline */}
          <div className="outcomes-headline-block">
            <div className="outcomes-eyebrow">
              REAL OUTCOMES
            </div>
            <h2 className="outcomes-headline">
              <span className="outcomes-headline-row">
                <span className="outcomes-headline-text">Results</span>
              </span>
              <span className="outcomes-headline-row">
                <span className="outcomes-headline-text">
                  that speak.
                </span>
              </span>
            </h2>
          </div>

          {/* Center: Large Analytics Dashboard (Revenue + 2x2 KPI Grid) */}
          <div className="outcomes-dashboard-block">
            <AnalyticsDashboard />
          </div>

          {/* Right: Independent Statement Card */}
          <div className="outcomes-statement-block">
            <OutcomeStatementCard />
          </div>
        </div>
      </div>
    </section>
  );
}
