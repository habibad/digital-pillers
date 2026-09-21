"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import gsap from "gsap";
import { testimonialsData, TestimonialItem } from "@/lib/constants/testimonials";
import TestimonialCard from "./TestimonialCard";

interface TestimonialCarouselProps {
  onSlideChange?: (index: number) => void;
  controllerRef?: React.MutableRefObject<{
    prev: () => void;
    next: () => void;
  } | null>;
}

export default function TestimonialCarousel({
  onSlideChange,
  controllerRef,
}: TestimonialCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentDragXRef = useRef(0);
  const hasMovedRef = useRef(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  // Triple dataset for seamless infinite looping
  const count = testimonialsData.length;
  const items = useMemo(() => {
    return [...testimonialsData, ...testimonialsData, ...testimonialsData];
  }, []);

  // Start in middle set: James T. (index 1 in testimonialsData -> index 1 + 6 = 7)
  const [currentIndex, setCurrentIndex] = useState(count + 1);

  // Measure card geometry responsive
  const getCardMetrics = useCallback(() => {
    if (typeof window === "undefined") {
      return { cardWidth: 540, gap: 28 };
    }
    const w = window.innerWidth;
    if (w <= 640) {
      // Mobile: 82vw card width (max 350px) with 16px gap
      const cardWidth = Math.min(350, Math.floor(w * 0.82));
      return { cardWidth, gap: 16 };
    }
    if (w <= 1024) {
      // Tablet: 460px card with 24px gap
      return { cardWidth: 460, gap: 24 };
    }
    // Desktop: 540px card with 28px gap
    return { cardWidth: 540, gap: 28 };
  }, []);

  // Compute horizontal translate offset to center slide at `index`
  const getTargetOffset = useCallback(
    (index: number) => {
      if (!containerRef.current) return 0;
      const containerWidth = containerRef.current.offsetWidth;
      const { cardWidth, gap } = getCardMetrics();
      const pitch = cardWidth + gap;

      // Position center of card at exact center of container
      return containerWidth / 2 - (index * pitch + cardWidth / 2);
    },
    [getCardMetrics]
  );

  // Animate track to target index
  const goToIndex = useCallback(
    (targetIndex: number, animate = true) => {
      const track = trackRef.current;
      if (!track) return;

      const targetX = getTargetOffset(targetIndex);

      if (animate) {
        gsap.to(track, {
          x: targetX,
          duration: 0.85,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => {
            // Seamless infinite teleport when reaching boundary sets
            if (targetIndex >= count * 2) {
              const normalized = targetIndex - count;
              setCurrentIndex(normalized);
              const wrapX = getTargetOffset(normalized);
              gsap.set(track, { x: wrapX });
            } else if (targetIndex < count) {
              const normalized = targetIndex + count;
              setCurrentIndex(normalized);
              const wrapX = getTargetOffset(normalized);
              gsap.set(track, { x: wrapX });
            }
          },
        });
      } else {
        gsap.set(track, { x: targetX });
      }

      setCurrentIndex(targetIndex);
      onSlideChange?.(targetIndex % count);
    },
    [count, getTargetOffset, onSlideChange]
  );

  // Navigation callbacks
  const handlePrev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  const handleNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  // Expose controller to parent
  useEffect(() => {
    if (controllerRef) {
      controllerRef.current = {
        prev: handlePrev,
        next: handleNext,
      };
    }
  }, [controllerRef, handlePrev, handleNext]);

  // Autoplay management: 6.5 second interval, pauses on hover / drag
  const resetAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      if (!isHoveredRef.current && !isDraggingRef.current) {
        handleNext();
      }
    }, 6500);
  }, [handleNext]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [resetAutoplay]);

  // Sync track on window resize and container changes
  useEffect(() => {
    const handleResize = () => {
      goToIndex(currentIndex, false);
    };

    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => {
      goToIndex(currentIndex, false);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initial center on mount
    goToIndex(currentIndex, false);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [currentIndex, goToIndex]);

  // Drag / Touch handlers
  const handleDragStart = (clientX: number) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = clientX;
    currentDragXRef.current = clientX;

    if (trackRef.current) {
      gsap.killTweensOf(trackRef.current);
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const deltaX = clientX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasMovedRef.current = true;
    }

    const baseOffset = getTargetOffset(currentIndex);
    gsap.set(trackRef.current, { x: baseOffset + deltaX });
    currentDragXRef.current = clientX;
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const deltaX = currentDragXRef.current - startXRef.current;
    const { cardWidth, gap } = getCardMetrics();
    const threshold = Math.min(80, (cardWidth + gap) * 0.2);

    if (deltaX > threshold) {
      handlePrev();
    } else if (deltaX < -threshold) {
      handleNext();
    } else {
      // Snap back to current
      goToIndex(currentIndex);
    }

    resetAutoplay();
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const onMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const onMouseLeave = () => {
    isHoveredRef.current = false;
    if (isDraggingRef.current) {
      handleDragEnd();
    }
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <div
      ref={containerRef}
      className={`testimonial-carousel-root ${
        isDraggingRef.current ? "is-grabbing" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Client Testimonials Carousel"
    >
      {/* Horizontally Overflowing Track */}
      <div ref={trackRef} className="testimonial-carousel-track">
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={`${item.id}-${index}`}
              className={`testimonial-slide-cell ${
                isActive ? "cell-active" : "cell-secondary"
              }`}
            >
              <TestimonialCard
                item={item}
                isActive={isActive}
                onClick={() => {
                  if (!hasMovedRef.current && !isActive) {
                    goToIndex(index);
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
