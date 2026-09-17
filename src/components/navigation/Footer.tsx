"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

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

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#020202] py-16 px-4 sm:px-6 lg:px-8 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <span className="font-semibold text-white tracking-[0.2em] font-display text-sm">
            DIGITAL PILLARS
          </span>
          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>LONDON {timeStr ? `${timeStr} GMT` : "GMT"}</span>
          </div>
        </div>

        {/* Studio Email & Quick Action */}
        <div className="flex items-center gap-6">
          <a
            href="mailto:hello@digitalpillars.co"
            className="text-zinc-300 hover:text-white transition-colors font-mono tracking-wider"
          >
            hello@digitalpillars.co
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUpRight className="w-4 h-4 -rotate-45" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 gap-4 text-center sm:text-left font-mono">
        <p>© {new Date().getFullYear()} Digital Pillars Studio Ltd. All rights reserved.</p>
        <p>Built for 60FPS Performance · Anti-Generic Architecture</p>
      </div>
    </footer>
  );
}
