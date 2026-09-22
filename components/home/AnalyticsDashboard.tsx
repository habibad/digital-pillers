"use client";

import { useRef, useCallback } from "react";

const chartBars = [
  { height: 12 },
  { height: 16 },
  { height: 18 },
  { height: 24 },
  { height: 32 },
  { height: 42 },
  { height: 48 },
  { height: 38 },
  { height: 64 },
  { height: 78 },
  { height: 58 },
  { height: 68 },
  { height: 80 },
  { height: 95 },
];

const kpiMetrics = [
  {
    id: "roas",
    value: "4.8x",
    label: "ROAS",
    targetNum: 4.8,
    suffix: "x",
    decimals: 1,
  },
  {
    id: "leads",
    value: "+38%",
    label: "Qualified Leads",
    prefix: "+",
    targetNum: 38,
    suffix: "%",
    decimals: 0,
  },
  {
    id: "impressions",
    value: "2.4M",
    label: "Ad Impressions",
    targetNum: 2.4,
    suffix: "M",
    decimals: 1,
  },
  {
    id: "retention",
    value: "91%",
    label: "Client Retention",
    targetNum: 91,
    suffix: "%",
    decimals: 0,
  },
];

export default function AnalyticsDashboard() {
  const panelRef = useRef<HTMLDivElement>(null);

  // Desktop subtle cursor tilt (rotateX ±0.5deg, rotateY ±0.8deg)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -0.5;
    const rotateY = ((x - centerX) / centerX) * 0.8;

    panelRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!panelRef.current) return;
    panelRef.current.style.transform = "";
  }, []);

  return (
    <div
      ref={panelRef}
      className="outcomes-dashboard-panel"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-reveal="dashboard"
    >
      <div className="dashboard-panel-glow" aria-hidden="true" />
      <div className="dashboard-panel-inner">
        {/* Left: Revenue Card with Animated Vertical Bar Chart */}
        <div className="dashboard-revenue-card" data-reveal="revenue-card">
          <div className="revenue-card-top">
            <span className="revenue-card-label">Total Revenue</span>
            <div className="revenue-card-val-row">
              <span className="revenue-card-value counter-revenue">$1,248,320</span>
            </div>
            <div className="revenue-card-growth">
              <span className="growth-arrow" aria-hidden="true">↑</span>
              <span className="growth-text">+312%</span>
            </div>
          </div>

          {/* 14 Electric Blue Chart Bars */}
          <div className="revenue-chart-bars" aria-label="Revenue growth chart">
            {chartBars.map((bar, idx) => (
              <div key={idx} className="chart-bar-slot">
                <div
                  className="chart-bar-fill"
                  style={{ height: `${bar.height}%` }}
                  data-height={bar.height}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: 4 KPI Cards in 2x2 Grid */}
        <div className="dashboard-kpi-grid">
          {kpiMetrics.map((kpi) => (
            <div
              key={kpi.id}
              className="dashboard-kpi-card"
              data-reveal="kpi-card"
            >
              <div className="kpi-card-glow" aria-hidden="true" />
              <div className="kpi-card-content">
                <span className={`kpi-card-value counter-${kpi.id}`}>
                  {kpi.value}
                </span>
                <span className="kpi-card-label">{kpi.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
