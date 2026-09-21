"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
      <path d="M16 3.5L27 9.8V22.2L16 28.5L5 22.2V9.8L16 3.5Z" />
      <path d="M16 16L27 9.8" />
      <path d="M16 16V28.5" />
      <path d="M16 16L5 9.8" />
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
      <path d="M16 3C16 3 9 7.5 9 17L13.5 21.5C13.5 21.5 16 18 16 16C16 18 18.5 21.5 18.5 21.5L23 17C23 7.5 16 3 16 3Z" />
      <path d="M9 17L4.5 19.5L6 23L9.5 21.5" />
      <path d="M23 17L27.5 19.5L26 23L22.5 21.5" />
      <circle cx="16" cy="11.5" r="2" fill="currentColor" />
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
      <path d="M4 27H28" strokeWidth="1.6" />
      <rect x="6" y="18" width="4" height="9" rx="1" />
      <rect x="13" y="12" width="4" height="15" rx="1" />
      <rect x="20" y="7" width="4" height="20" rx="1" />
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
  const timelineWrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const traveledPathRef = useRef<SVGPathElement>(null);
  const bodyPathRef = useRef<SVGPathElement>(null);
  const headPathRef = useRef<SVGPathElement>(null);
  const pulseTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const nodeRangesRef = useRef<{ start: number; end: number }[]>([]);

  const [pathD, setPathD] = useState<string>("");

  // Construct a single continuous 540° loop circuit path across all 4 nodes
  const updateCircuitPath = useCallback(() => {
    const container = timelineWrapRef.current;
    if (!container) return;

    const cRect = container.getBoundingClientRect();
    const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
    if (nodes.length !== 4) return;

    const isMobile = window.innerWidth <= 640;
    const r = 41; // Circular radius matching 88px node

    const points = nodes.map((node) => {
      const nRect = node.getBoundingClientRect();
      return {
        cx: nRect.left - cRect.left + nRect.width / 2,
        cy: nRect.top - cRect.top + nRect.height / 2,
      };
    });

    let d = "";

    if (isMobile) {
      // Mobile: Vertical flow
      // Enters top of Node 1, loops 540° (top -> bot -> top -> bot), straight line down to next node
      const cx = points[0].cx;
      const startY = Math.max(0, points[0].cy - r - 24);
      d += `M ${cx} ${startY} L ${cx} ${points[0].cy - r}`;

      const entranceLen = points[0].cy - r - startY;
      const loopLen = 3 * Math.PI * r;
      const ranges: { start: number; end: number }[] = [];

      let currentCursor = entranceLen;
      ranges.push({ start: currentCursor, end: currentCursor + loopLen });
      currentCursor += loopLen;

      points.forEach((pt, idx) => {
        const cy = pt.cy;
        const topY = cy - r;
        const botY = cy + r;

        // 540° loop: 180° to bottom, 180° to top (360°), 180° to bottom (540°)
        d += ` A ${r} ${r} 0 0 1 ${cx} ${botY}`;
        d += ` A ${r} ${r} 0 0 1 ${cx} ${topY}`;
        d += ` A ${r} ${r} 0 0 1 ${cx} ${botY}`;

        if (idx < points.length - 1) {
          const nextTopY = points[idx + 1].cy - r;
          d += ` L ${cx} ${nextTopY}`;
          const distNext = nextTopY - botY;
          currentCursor += distNext;
          ranges.push({ start: currentCursor, end: currentCursor + loopLen });
          currentCursor += loopLen;
        }
      });
      nodeRangesRef.current = ranges;
    } else {
      // Desktop: Horizontal flow
      // Enters left (9 o'clock) of Node 1
      // Loops 540° around Node 1 (360° full circle + 180° extra to exit at 3 o'clock)
      // Continues straight line from 3 o'clock of Node 1 to 9 o'clock of Node 2
      // Repeats through all 4 steps!
      const cy = points[0].cy;
      const startX = Math.max(0, points[0].cx - r - 40);
      d += `M ${startX} ${cy} L ${points[0].cx - r} ${cy}`;

      const entranceLen = points[0].cx - r - startX;
      const loopLen = 3 * Math.PI * r;
      const ranges: { start: number; end: number }[] = [];

      let currentCursor = entranceLen;
      ranges.push({ start: currentCursor, end: currentCursor + loopLen });
      currentCursor += loopLen;

      points.forEach((pt, idx) => {
        const cx = pt.cx;
        const leftX = cx - r;
        const rightX = cx + r;

        // 540° loop around node:
        // Arc 1 (over top to 3 o'clock): 180°
        // Arc 2 (under bottom to 9 o'clock): 180° -> 360° full circle
        // Arc 3 (over top to 3 o'clock): 180° -> 540° total! Exits smoothly on right!
        d += ` A ${r} ${r} 0 0 1 ${rightX} ${cy}`;
        d += ` A ${r} ${r} 0 0 1 ${leftX} ${cy}`;
        d += ` A ${r} ${r} 0 0 1 ${rightX} ${cy}`;

        if (idx < points.length - 1) {
          const nextLeftX = points[idx + 1].cx - r;
          // Straight line connects right side of current icon to left side of next icon
          d += ` L ${nextLeftX} ${cy}`;
          const distNext = nextLeftX - rightX;
          currentCursor += distNext;
          ranges.push({ start: currentCursor, end: currentCursor + loopLen });
          currentCursor += loopLen;
        }
      });
      nodeRangesRef.current = ranges;
    }

    setPathD(d);
  }, []);

  // Update circuit on mount, window resize, and layout changes
  useEffect(() => {
    updateCircuitPath();

    const handleResize = () => {
      updateCircuitPath();
    };

    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => {
      updateCircuitPath();
    });

    if (timelineWrapRef.current) {
      observer.observe(timelineWrapRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [updateCircuitPath]);

  // Animate the single continuous traveling pulse along the 540° circuit
  // with a thick snake head ("shaper matha mota"), tapering body, and thin already-traveled illuminated trail
  useEffect(() => {
    const traveledPath = traveledPathRef.current;
    const bodyPath = bodyPathRef.current;
    const headPath = headPathRef.current;
    if (!traveledPath || !bodyPath || !headPath || !pathD) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    try {
      const totalLen = traveledPath.getTotalLength();
      if (!totalLen || isNaN(totalLen)) return;

      if (pulseTimelineRef.current) {
        pulseTimelineRef.current.kill();
      }

      const progressObj = { p: 0 };

      const resetVisuals = () => {
        gsap.set([traveledPath, bodyPath, headPath], { opacity: 1 });
        stepItemRefs.current.forEach((item) => {
          item?.classList.remove("is-current", "is-traveled");
        });
      };

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      tl.call(resetVisuals);

      // Single continuous animation with constant velocity:
      // Glides straight, loops 540° around Node 1, glides straight to Node 2, loops 540° around Node 2, etc.
      // Head is thick (7.2px), body tapers (4.4px), already traveled path stays lit (2.2px thin)
      tl.to(progressObj, {
        p: 1,
        duration: 8.5,
        ease: "none",
        onUpdate: () => {
          const headDist = progressObj.p * totalLen;

          // 1. Thin Already-traveled path (persists from 0 up to headDist)
          traveledPath.style.strokeDasharray = `${headDist} ${totalLen + 50}`;
          traveledPath.style.strokeDashoffset = "0";

          // 2. Snake body (length ~240px, tapers down behind headDist)
          const lenB = Math.min(headDist, 240);
          const startB = headDist - lenB;
          bodyPath.style.strokeDasharray = `${lenB} ${totalLen + 50}`;
          bodyPath.style.strokeDashoffset = `${-startB}`;

          // 3. Thick Snake head ("shaper matha mota" - length ~50px leading plasma tip)
          const lenH = Math.min(headDist, 50);
          const startH = headDist - lenH;
          headPath.style.strokeDasharray = `${lenH} ${totalLen + 50}`;
          headPath.style.strokeDashoffset = `${-startH}`;

          // 4. Update Node active and traveled discovery states
          const ranges = nodeRangesRef.current;
          stepItemRefs.current.forEach((item, idx) => {
            if (!item || !ranges[idx]) return;
            const { start, end } = ranges[idx];
            if (headDist >= start && headDist <= end) {
              item.classList.add("is-current");
              item.classList.remove("is-traveled");
            } else if (headDist > end) {
              item.classList.add("is-traveled");
              item.classList.remove("is-current");
            } else {
              item.classList.remove("is-current", "is-traveled");
            }
          });
        },
      });

      // Hold all 4 completed illuminated steps in synergy for 1.2s
      tl.to({}, { duration: 1.2 });

      // Smoothly fade out the completed trail before repeating
      tl.to([traveledPath, bodyPath, headPath], {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          stepItemRefs.current.forEach((item) => {
            item?.classList.remove("is-current", "is-traveled");
          });
        },
      });

      pulseTimelineRef.current = tl;
    } catch {
      // Fallback if SVG geometry is calculating
    }

    return () => {
      if (pulseTimelineRef.current) {
        pulseTimelineRef.current.kill();
      }
    };
  }, [pathD]);

  // Video autoplay management
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
          pulseTimelineRef.current?.resume();
        } else {
          video.pause();
          pulseTimelineRef.current?.pause();
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
          ".process-step-item",
          { y: 30, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12 },
          "-=0.6"
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

        {/* Lower Middle: 4-Step Process Timeline with Single Continuous 540° Circuit Path */}
        <div className="process-timeline-wrap" ref={timelineWrapRef}>
          {/* Continuous SVG Circuit Track Overlay */}
          <svg
            className="process-circuit-svg"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
              overflow: "visible",
            }}
          >
            {/* 0. Base Circuit Guide Wire (Continuous dormant unvisited path) */}
            {pathD && <path d={pathD} className="circuit-wire-base" />}

            {/* 1. Thin Already-Traveled Path (Persists behind the snake, showing traveled path) */}
            {pathD && (
              <path
                d={pathD}
                className="circuit-wire-traveled"
                ref={traveledPathRef}
              />
            )}

            {/* 2. Medium Snake Body (Smooth taper right behind the head) */}
            {pathD && (
              <path
                d={pathD}
                className="circuit-wire-body"
                ref={bodyPathRef}
              />
            )}

            {/* 3. Thick Snake Head ("Shaper Matha" - Bold leading plasma tip) */}
            {pathD && (
              <path
                d={pathD}
                className="circuit-wire-head"
                ref={headPathRef}
              />
            )}
          </svg>

          {/* 4 Process Step Nodes */}
          <div className="process-steps-row">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  className="process-step-item"
                  key={step.num}
                  ref={(el) => {
                    stepItemRefs.current[index] = el;
                  }}
                >
                  {/* Circular Node Wrapper (Ref captured for exact pixel alignment with the 540° circuit) */}
                  <div
                    className="process-node-wrapper"
                    ref={(el) => {
                      nodeRefs.current[index] = el;
                    }}
                  >
                    {/* Ambient Neon Outer Halo */}
                    <div className="process-node-glow-halo" aria-hidden="true" />

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
