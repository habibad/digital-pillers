"use client";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export default function CarouselControls({
  onPrev,
  onNext,
  className = "",
}: CarouselControlsProps) {
  return (
    <div className={`carousel-controls-group ${className}`} aria-label="Testimonial Navigation">
      <button
        type="button"
        onClick={onPrev}
        className="carousel-control-btn btn-prev"
        aria-label="Previous testimonial"
      >
        <svg
          className="carousel-control-arrow"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12.5 15L7.5 10L12.5 5" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        className="carousel-control-btn btn-next"
        aria-label="Next testimonial"
      >
        <svg
          className="carousel-control-arrow"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7.5 15L12.5 10L7.5 5" />
        </svg>
      </button>
    </div>
  );
}
