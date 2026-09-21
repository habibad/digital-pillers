"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const animations: gsap.core.Tween[] = [];
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
      const direction = element.dataset.reveal;
      const from = direction === "left" ? { x: -44, y: 0 } : direction === "right" ? { x: 44, y: 0 } : { x: 0, y: 34 };
      animations.push(gsap.fromTo(element,
        { opacity: 0, ...from },
        {
          opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true }
        }
      ));
    });

    document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
      animations.push(gsap.to(element, {
        yPercent: Number(element.dataset.parallax || -8),
        ease: "none",
        scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true }
      }));
    });

    return () => {
      animations.forEach((animation) => animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
