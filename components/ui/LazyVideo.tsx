"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

export default function LazyVideo({ src, poster, className = "" }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || !video.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.current.play().catch(() => undefined);
  }, [ready]);

  return (
    <div ref={wrapper} className={className}>
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        src={ready ? src : undefined}
        aria-hidden="true"
      />
    </div>
  );
}
