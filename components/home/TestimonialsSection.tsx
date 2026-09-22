"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import CarouselControls from "./CarouselControls";
import TestimonialCarousel from "./TestimonialCarousel";

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const controllerRef = useRef<{
    prev: () => void;
    next: () => void;
  } | null>(null);

  // GSAP Staged Scroll Entrance Animation
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".testimonials-eyebrow",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          ".testimonials-headline-text",
          { yPercent: 45, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.12 },
          "-=0.4"
        )
        .fromTo(
          ".carousel-controls-group",
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7 },
          "-=0.6"
        )
        .fromTo(
          ".testimonial-slide-cell",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
          "-=0.5"
        )
        .fromTo(
          ".testimonial-card-item.is-active .testimonial-card-glow-layer",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
          "-=0.4"
        );

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tl.play();
            observer.disconnect();
          }
        },
        { threshold: 0.12 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="testimonials-section"
      id="reviews"
      ref={sectionRef}
      aria-label="Client Testimonials"
    >
      {/* Cinematic Cavern Background & Atmospheric Overlays */}
      <div className="testimonials-backdrop" aria-hidden="true">
        <Image
          src="/media/testimonials-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="testimonials-bg-image"
        />
        <div className="testimonials-overlay-vignette" />
        <div className="testimonials-ambient-glow" />
        <div className="testimonials-seam-top" />
        <div className="testimonials-seam-bottom" />
      </div>

      <div className="page-shell testimonials-shell">
        {/* Top Header Grid: Left Headline + Right Navigation Arrows */}
        <div className="testimonials-header-grid">
          {/* Top Left: Eyebrow + Large Elegant Two-line Headline */}
          <div className="testimonials-headline-block">
            <div className="testimonials-eyebrow">
              REAL OUTCOMES
            </div>
            <h2 className="testimonials-headline">
              <span className="testimonials-headline-row">
                <span className="testimonials-headline-text">Trusted</span>
              </span>
              <span className="testimonials-headline-row">
                <span className="testimonials-headline-text">
                  by ambitious brands.
                </span>
              </span>
            </h2>
          </div>

          {/* Top Right: Circular Arrow Navigation Controls */}
          <div className="testimonials-controls-block">
            <CarouselControls
              onPrev={() => controllerRef.current?.prev()}
              onNext={() => controllerRef.current?.next()}
            />
          </div>
        </div>
      </div>

      {/* Horizontally Overflowing Carousel Viewport */}
      <div className="testimonials-carousel-viewport">
        <TestimonialCarousel controllerRef={controllerRef} />
      </div>
    </section>
  );
}
