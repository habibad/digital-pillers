"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, ShieldCheck, Sparkles } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#hero" },
    { label: "Groundwork", href: "#groundwork" },
    { label: "The 3 Pillars", href: "#pillars" },
    { label: "Method", href: "#method" },
    { label: "Services", href: "#services" },
    { label: "Framework", href: "#foundation" },
  ];

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
            className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-[#08080c]/80 backdrop-blur-xl border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
                : "bg-white/[0.02] backdrop-blur-md border border-white/[0.05]"
            }`}
            aria-label="Main Navigation"
          >
            {/* Brand Identity */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent border border-blue-500/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <div className="w-3.5 h-3.5 border-l-2 border-r-2 border-t-2 border-blue-400 rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-[0.22em] text-white uppercase group-hover:text-blue-400 transition-colors">
                  DIGITAL PILLARS
                </span>
                <span className="text-[10px] tracking-wider text-zinc-500 font-mono-telemetry flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LONDON · SYSTEM LIVE
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white rounded-full transition-all duration-200 hover:bg-white/[0.05] tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA & Status */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#inquiry"
                onClick={(e) => handleNavClick(e, "#inquiry")}
                className="relative group overflow-hidden rounded-full p-[1px] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
                <div className="relative px-4 py-2 bg-[#09090d] rounded-full flex items-center gap-2 transition-transform duration-200 group-hover:scale-[0.98]">
                  <span className="text-xs font-medium text-white tracking-wide">
                    Initiate Brief
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/90 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-10 px-6 animate-in fade-in duration-300">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase mb-2">
              Navigation Blueprint
            </span>
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-display font-medium text-zinc-200 hover:text-white py-2 border-b border-white/[0.06] flex items-center justify-between"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-zinc-500">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs font-semibold text-white">Full-Funnel Guarantee</p>
                <p className="text-[11px] text-zinc-400">Response within 1 working day</p>
              </div>
            </div>
            <a
              href="#inquiry"
              onClick={(e) => handleNavClick(e, "#inquiry")}
              className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Build Your Pillars</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
