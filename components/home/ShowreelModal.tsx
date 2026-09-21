"use client";

import { useEffect, useRef } from "react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export default function ShowreelModal({
  isOpen,
  onClose,
  videoSrc = "/media/assembly-video.mp4",
}: ShowreelModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => undefined);
      }
    } else {
      document.body.style.overflow = "";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="showreel-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Digital Pillars Showreel"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="showreel-frame" ref={dialogRef}>
        <div className="showreel-topbar">
          <div className="showreel-title">
            <span className="live-dot" />
            <span>DIGITAL PILLARS — AGENCY SHOWREEL</span>
          </div>
          <button
            type="button"
            className="showreel-close"
            onClick={onClose}
            aria-label="Close showreel modal"
          >
            ✕
          </button>
        </div>
        <div className="showreel-video-wrap">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            autoPlay
            playsInline
            className="showreel-video"
          />
        </div>
      </div>
    </div>
  );
}
