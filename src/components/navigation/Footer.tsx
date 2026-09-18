"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowUp, ShieldCheck } from "lucide-react";

export function Footer() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Framework", href: "#pillars" },
    { label: "The Method", href: "#method" },
    { label: "The Signal", href: "#signal" },
    { label: "Client Ledger", href: "#proof" },
    { label: "Initiate Brief", href: "#inquiry" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#020202] border-t border-white/[0.06] pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-400 overflow-hidden">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bloom-glow-blue opacity-15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Operational Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-16 border-b border-white/[0.06]">
          {/* Left: Studio Identity & Pitch */}
          <div className="md:col-span-5">
            <span className="text-xs font-mono tracking-[0.25em] text-[#0055ff] uppercase block mb-3">
              Digital Pillars Studio · London
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight leading-snug mb-4">
              Architecting unshakeable <br />
              <span className="text-zinc-400 font-light">growth infrastructure.</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm mb-6">
              We engineer full-funnel acquisition, organic presence, and growth
              roadmaps benchmarked to audited enterprise returns.
            </p>
            <a
              href="mailto:hello@digitalpillars.co"
              className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-[#00d4ff] tracking-wider uppercase transition-colors"
            >
              <span>hello@digitalpillars.co</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Center: Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                Navigation
              </span>
              <ul className="space-y-2">
                {navLinks.slice(0, 4).map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={(e) => handleNavClick(e, l.href)}
                      className="text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                Architecture
              </span>
              <ul className="space-y-2">
                {navLinks.slice(4).map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={(e) => handleNavClick(e, l.href)}
                      className="text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Operational Telemetry & Live Clock */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end gap-6">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="text-left md:text-right space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-white/[0.03] border border-white/[0.07] px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Systems Operational · 99.9%</span>
              </div>
              <div className="font-mono text-xs text-zinc-500">
                LONDON {timeStr ? `${timeStr} GMT` : "GMT"}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Large Masked Typographic Agency Signature */}
        <div className="pt-16 pb-12 select-none overflow-hidden text-center">
          <h2
            className="font-display font-bold tracking-[-0.04em] uppercase leading-none whitespace-nowrap bg-gradient-to-b from-white/[0.18] via-white/[0.06] to-transparent bg-clip-text text-transparent"
            style={{ fontSize: "clamp(48px, 12.5vw, 175px)" }}
          >
            Digital Pillars
          </h2>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Digital Pillars Studio Ltd. Registered in England & Wales.</p>
          <p>60FPS Composited · Anti-Generic Architecture · London Studio</p>
        </div>
      </div>
    </footer>
  );
}
