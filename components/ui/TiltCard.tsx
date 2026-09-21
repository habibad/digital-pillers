"use client";

import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (!active || matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.transform = `perspective(1100px) rotateX(${py * -5}deg) rotateY(${px * 6}deg) translateY(-4px)`;
    event.currentTarget.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const leave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1100px) rotateX(0) rotateY(0) translateY(0)";
    ref.current.style.setProperty("--mx", "50%");
    ref.current.style.setProperty("--my", "50%");
  };

  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`tilt-card ${className}`}>{children}</div>;
}
