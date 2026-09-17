"use client";

import React, { useEffect, useRef } from "react";

export function AmbientGlow() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable interactive cursor glow on touch devices or reduced motion
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      // Smooth lerp for liquid fluidity
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX - 350}px, ${currentY - 350}px, 0)`;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Dynamic Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full opacity-25 blur-[120px] transition-opacity duration-700 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(6, 182, 212, 0.08) 40%, rgba(3, 3, 3, 0) 70%)",
        }}
      />

      {/* Static Atmospheric Blooms */}
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full opacity-35 blur-[150px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.22) 0%, rgba(30, 58, 138, 0.08) 50%, rgba(3, 3, 3, 0) 80%)",
        }}
      />
      <div
        className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(3, 3, 3, 0) 70%)",
        }}
      />
      <div
        className="absolute top-[70%] -right-[10%] w-[700px] h-[700px] rounded-full opacity-15 blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, rgba(3, 3, 3, 0) 70%)",
        }}
      />

      {/* Subtle Noise / Film Grain Simulation Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
