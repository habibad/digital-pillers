"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import gsap from "gsap";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Framework", href: "#pillars" },
  { label: "Results", href: "#signal" },
  { label: "Contact", href: "#inquiry" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop Magnetic Physics for the "Book Strategy" CTA (<300ms reaction time)
  useEffect(() => {
    const btn = buttonRef.current;
    const txt = buttonTextRef.current;
    if (!btn || !txt) return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });
    const textXTo = gsap.quickTo(txt, "x", { duration: 0.25, ease: "power3.out" });
    const textYTo = gsap.quickTo(txt, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      xTo(relX * 0.35);
      yTo(relY * 0.35);
      textXTo(relX * 0.15);
      textYTo(relY * 0.15);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between px-5 py-2.5 rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-[#0d0d0d]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
                : "bg-[#0d0d0d]/40 backdrop-blur-md border border-white/[0.05]"
            }`}
            aria-label="Primary Navigation"
          >
            {/* "Digital Pillars" logo in crisp thin typography */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0055ff]/30 to-transparent border border-[#0055ff]/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <div className="w-3 h-3 border-l border-r border-t border-blue-400 rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-light tracking-[0.28em] text-white uppercase group-hover:text-blue-400 transition-colors">
                  Digital Pillars
                </span>
              </div>
            </a>

            {/* Floating pill navigation bar (Home, Services, Framework, Results, Contact) */}
            <div className="hidden md:flex items-center gap-1 bg-white/[0.025] border border-white/[0.06] rounded-full px-3.5 py-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-1.5 text-xs font-light text-zinc-400 hover:text-white rounded-full transition-all duration-200 hover:bg-white/[0.05] tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Magnetic "Book Strategy" CTA Button */}
            <div className="hidden sm:flex items-center">
              <a
                ref={buttonRef}
                href="#inquiry"
                onClick={(e) => handleNavClick(e, "#inquiry")}
                className="relative group overflow-hidden rounded-full p-[1px] cursor-pointer will-change-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0055ff] via-[#00d4ff] to-[#ff4d00] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
                <div className="relative px-4 py-2 bg-[#09090d] rounded-full flex items-center gap-2 transition-colors duration-200 group-hover:bg-[#0c0c12]">
                  <span
                    ref={buttonTextRef}
                    className="text-xs font-medium text-white tracking-wide will-change-transform inline-block"
                  >
                    Book Strategy
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 animate-in fade-in duration-300">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-mono text-blue-400 tracking-widest uppercase mb-2">
              Architecture Index
            </span>
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xl font-light text-zinc-200 hover:text-white py-2.5 border-b border-white/[0.06] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-zinc-600">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="pt-6">
            <a
              href="#inquiry"
              onClick={(e) => handleNavClick(e, "#inquiry")}
              className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-[0_0_25px_rgba(0,85,255,0.4)]"
            >
              <span>Book Strategy</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
