"use client";

import Link from "next/link";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function MagneticButton({ href, children, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!active || matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    event.currentTarget.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`magnetic-button magnetic-button--${variant} ${className}`}
    >
      <span>{children}</span>
      <span className="button-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
