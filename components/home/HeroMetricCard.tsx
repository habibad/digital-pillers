"use client";

import { useState, useRef, MouseEvent } from "react";
import { MetricCardData } from "@/lib/constants/hero";

interface HeroMetricCardProps {
  card: MetricCardData;
  parallaxOffset: { x: number; y: number };
  className?: string;
}

export default function HeroMetricCard({
  card,
  parallaxOffset,
  className = "",
}: HeroMetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, spotlightX: 50, spotlightY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized [-0.5, 0.5]
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    setTilt({
      x: py * -8, // max 8 deg tilt
      y: px * 9,
      spotlightX: (x / rect.width) * 100,
      spotlightY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, spotlightX: 50, spotlightY: 50 });
  };

  // Parallax translation from hero-level cursor movement
  const pxOffset = parallaxOffset.x * card.parallaxSpeed * 50;
  const pyOffset = parallaxOffset.y * card.parallaxSpeed * 50;

  return (
    <div
      ref={cardRef}
      className={`hero-metric-card-wrapper hero-metric-card--${card.id} ${className}`}
      style={{
        ...card.desktopPosition,
        transform: `translate3d(${pxOffset}px, ${pyOffset}px, 0)`,
      }}
    >
      <div
        className="glass-metric-panel"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.025)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
          // @ts-expect-error CSS variable
          "--spot-x": `${tilt.spotlightX}%`,
          "--spot-y": `${tilt.spotlightY}%`,
        }}
      >
        {/* Glossy spotlight overlay */}
        <div className="card-specular-highlight" />

        {/* Card Header: Value and Label */}
        <div className="metric-header">
          <div className="metric-value-row">
            <span className="metric-value">{card.value}</span>
            {card.badge && <span className="metric-badge">{card.badge}</span>}
          </div>
          <span className="metric-label">{card.label}</span>
        </div>

        {/* Dynamic Graphic Visualizations */}
        <div className="metric-visual" aria-hidden="true">
          {card.type === "bars" && (
            <div className="metric-chart-bars">
              <svg viewBox="0 0 100 42" className="chart-svg-bars">
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="41" x2="100" y2="41" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="0" y1="21" x2="100" y2="21" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 3" strokeWidth="1" />
                <rect x="6" y="24" width="8" height="17" rx="2" fill="url(#barGrad)" className="bar-elem" />
                <rect x="22" y="18" width="8" height="23" rx="2" fill="url(#barGrad)" className="bar-elem" />
                <rect x="38" y="12" width="8" height="29" rx="2" fill="url(#barGrad)" className="bar-elem" />
                <rect x="54" y="15" width="8" height="26" rx="2" fill="url(#barGrad)" className="bar-elem" />
                <rect x="70" y="7" width="8" height="34" rx="2" fill="url(#barGrad)" className="bar-elem" />
                <rect x="86" y="2" width="8" height="39" rx="2" fill="url(#barGrad)" className="bar-elem" />
              </svg>
            </div>
          )}

          {card.type === "line" && (
            <div className="metric-chart-line">
              <svg viewBox="0 0 100 40" className="chart-svg-line">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.45)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                  <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path
                  d="M0,35 Q18,32 30,22 T60,20 T85,8 T100,5 L100,40 L0,40 Z"
                  fill="url(#areaGrad)"
                />
                <path
                  d="M0,35 Q18,32 30,22 T60,20 T85,8 T100,5"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="2.4"
                  filter="url(#glowLine)"
                />
                <circle cx="98" cy="5" r="3.2" fill="#bfdbfe" />
                <circle cx="98" cy="5" r="5.5" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.6" className="pulse-circle" />
              </svg>
            </div>
          )}

          {card.type === "wave" && (
            <div className="metric-chart-wave">
              <svg viewBox="0 0 100 36" className="chart-svg-wave">
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
                <path
                  d="M 2 28 Q 12 6 22 24 T 42 20 T 62 10 T 82 26 T 98 12"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="62" cy="10" r="2.5" fill="#38bdf8" />
                <circle cx="98" cy="12" r="2.5" fill="#818cf8" />
              </svg>
            </div>
          )}

          {card.type === "ring" && (
            <div className="metric-chart-ring">
              <svg viewBox="0 0 54 54" className="chart-svg-ring">
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <circle
                  cx="27"
                  cy="27"
                  r="21"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="5"
                />
                <circle
                  cx="27"
                  cy="27"
                  r="21"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="132"
                  strokeDashoffset="12" /* ~91% */
                  transform="rotate(-90 27 27)"
                  filter="url(#ringGlow)"
                />
                <text
                  x="27"
                  y="30"
                  textAnchor="middle"
                  fill="#f1f5f9"
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="-0.02em"
                >
                  91%
                </text>
              </svg>
            </div>
          )}
        </div>

        {card.detail && <span className="metric-detail">{card.detail}</span>}
      </div>
    </div>
  );
}
