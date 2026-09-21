"use client";

import { SIDE_TAGLINE } from "@/lib/constants/hero";

export default function ScrollIndicator() {
  const handleScrollClick = () => {
    const nextSection = document.getElementById("services") || document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Far Right Subtle Vertical Tagline */}
      <aside className="hero-side-tagline" aria-hidden="true">
        <div className="tagline-stack">
          {SIDE_TAGLINE.map((word, idx) => (
            <span key={idx} className="tagline-word">
              {word}
            </span>
          ))}
        </div>
      </aside>

      {/* Bottom Right Refined Scroll Indicator */}
      <div
        className="hero-scroll-indicator"
        onClick={handleScrollClick}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
      >
        <span className="scroll-label">SCROLL</span>
        <div className="scroll-track" aria-hidden="true">
          <div className="scroll-pip" />
        </div>
      </div>
    </>
  );
}
