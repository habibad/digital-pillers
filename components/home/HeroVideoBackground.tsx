"use client";

import { useEffect, useRef } from "react";

interface HeroVideoBackgroundProps {
  parallaxOffset?: { x: number; y: number };
}

export default function HeroVideoBackground({ parallaxOffset = { x: 0, y: 0 } }: HeroVideoBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Subtle ambient glowing particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (isReduced) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = isMobile ? 24 : 55;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.45 + 0.15),
      alpha: Math.random() * 0.6 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.phase) * 0.2;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 180, 255, ${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#3b82f6";
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hero-bg-container" aria-hidden="true">
      {/* Base Video Layer with cinematic color grading */}
      <div
        className="hero-video-wrapper"
        style={{
          transform: `scale(1.05) translate3d(${parallaxOffset.x * -8}px, ${parallaxOffset.y * -8}px, 0)`,
          transition: "transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/media/posters/hero-video-frame.jpg"
          className="hero-video-media"
        >
          <source src="/media/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Atmospheric Cinematic Treatment Layers */}
      
      {/* 1. Deep blue/black contrast gradient for readability */}
      <div className="hero-veil-contrast" />

      {/* 2. Central electric-blue atmospheric glow */}
      <div
        className="hero-glow-bloom"
        style={{
          transform: `translate3d(${parallaxOffset.x * -14}px, ${parallaxOffset.y * -14}px, 0)`,
        }}
      />

      {/* 3. Volumetric light shafts */}
      <div className="hero-light-beams" />

      {/* 4. Focal Sci-Fi Pillar energy lines & structure accent */}
      <div
        className="hero-focal-accents"
        style={{
          transform: `translate3d(${parallaxOffset.x * -10}px, ${parallaxOffset.y * -10}px, 0)`,
        }}
      >
        <div className="pillar-energy-line pillar-energy-line--center" />
        <div className="pillar-energy-line pillar-energy-line--left" />
        <div className="pillar-energy-line pillar-energy-line--right" />
        <div className="pillar-base-horizon" />
      </div>

      {/* 5. Edge vignette */}
      <div className="hero-vignette" />

      {/* 6. Subtle glowing particle drift */}
      <canvas ref={canvasRef} className="hero-particle-canvas" />
    </div>
  );
}
