"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/constants/hero";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Monitor scroll for subtle frosted backdrop transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Magnetic hover for CTA button on desktop
  const handleCtaMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ctaRef.current) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ctaRef.current.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
  };

  const handleCtaLeave = () => {
    if (ctaRef.current) {
      ctaRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  return (
    <header
      className={`site-floating-header ${isScrolled ? "is-scrolled" : ""}`}
      role="banner"
    >
      <div className="site-header-container">
        {/* Left: Brand Identity */}
        <div className="header-col-left">
          <Logo />
        </div>

        {/* Center: Navigation Links */}
        <nav className="header-col-center desktop-nav-bar" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link-item"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right: Primary CTA + Utility / Menu Icon */}
        <div className="header-col-right">
          <Link
            ref={ctaRef}
            href="/contact"
            onMouseMove={handleCtaMove}
            onMouseLeave={handleCtaLeave}
            className="header-primary-cta"
          >
            <span>Start a Project</span>
            <span className="header-cta-arrow" aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            className={`utility-menu-toggle ${mobileMenuOpen ? "is-active" : ""}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="menu-bar menu-bar--1" />
            <span className="menu-bar menu-bar--2" />
            <span className="menu-bar menu-bar--3" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`mobile-glass-drawer ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-inner">
          <nav className="mobile-nav-list" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                <span className="mobile-nav-arrow">→</span>
              </Link>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <Link
              href="/contact"
              className="mobile-drawer-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Start a Project</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
