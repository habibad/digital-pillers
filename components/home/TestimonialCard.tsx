"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { TestimonialItem } from "@/lib/constants/testimonials";

interface TestimonialCardProps {
  item: TestimonialItem;
  isActive: boolean;
  distance?: number;
  onClick?: () => void;
}

export default function TestimonialCard({
  item,
  isActive,
  distance = 0,
  onClick,
}: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Cinematic 3D interactive tilt on hover (all cards)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Cinematic 3D tilt angles (±2.5° X, ±3.5° Y)
      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      // Specular spotlight glare that tracks cursor
      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(56, 189, 248, 0.2), transparent 70%)`;
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`testimonial-card-item ${
        isActive ? "is-active is-distance-0" : `is-secondary is-distance-${distance}`
      }`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="group"
      aria-roledescription="slide"
      aria-label={`Testimonial from ${item.name}`}
    >
      {/* Top Specular Edge Line (matching AnalyticsDashboard) */}
      <div className="testimonial-card-top-glow" aria-hidden="true" />

      {/* Interactive 3D Cursor Glare Spotlight */}
      <div ref={glareRef} className="testimonial-card-glare" aria-hidden="true" />

      {/* Active Glowing Electric Blue Edge & Inner Atmosphere */}
      <div className="testimonial-card-glow-layer" aria-hidden="true" />
      <div className="testimonial-card-border-glow" aria-hidden="true" />

      {/* Card Content Shell */}
      <div className="testimonial-card-inner">
        {/* Top: Testimonial Quote */}
        <blockquote className="testimonial-quote">
          {item.quote}
        </blockquote>

        {/* Bottom Metadata: Left Avatar + Client Info, Right 5 Gold Stars */}
        <div className="testimonial-card-bottom">
          {/* Left: Avatar & Meta */}
          <div className="testimonial-client-wrap">
            <div className="testimonial-avatar-shell">
              <Image
                src={item.avatar}
                alt={item.name}
                width={46}
                height={46}
                className="testimonial-avatar-img"
              />
            </div>
            <div className="testimonial-client-meta">
              <span className="testimonial-client-name">{item.name}</span>
              <span className="testimonial-client-role">
                {item.role}, {item.company}
              </span>
            </div>
          </div>

          {/* Right: 5 Gold / Yellow Stars */}
          <div
            className="testimonial-stars-wrap"
            aria-label={`${item.rating} out of 5 stars`}
          >
            {Array.from({ length: item.rating }).map((_, i) => (
              <svg
                key={i}
                className="testimonial-star-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
