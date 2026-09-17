"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { ServiceItem, SERVICE_KEYS, SERVICES_DATA } from "@/data/servicesData";

interface ServiceDetailModalProps {
  serviceKey: string | null;
  onClose: () => void;
  onSelectService: (key: string) => void;
}

export function ServiceDetailModal({
  serviceKey,
  onClose,
  onSelectService,
}: ServiceDetailModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const service: ServiceItem | null =
    serviceKey && SERVICES_DATA[serviceKey] ? SERVICES_DATA[serviceKey] : null;

  // Keybindings (Escape to close, Left/Right arrow to navigate)
  useEffect(() => {
    if (!serviceKey) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        const currentIdx = SERVICE_KEYS.indexOf(serviceKey);
        const prevIdx =
          (currentIdx - 1 + SERVICE_KEYS.length) % SERVICE_KEYS.length;
        onSelectService(SERVICE_KEYS[prevIdx]);
      } else if (e.key === "ArrowRight") {
        const currentIdx = SERVICE_KEYS.indexOf(serviceKey);
        const nextIdx = (currentIdx + 1) % SERVICE_KEYS.length;
        onSelectService(SERVICE_KEYS[nextIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [serviceKey, onClose, onSelectService]);

  if (!service) return null;

  const currentIdx = SERVICE_KEYS.indexOf(service.id);
  const prevKey =
    SERVICE_KEYS[(currentIdx - 1 + SERVICE_KEYS.length) % SERVICE_KEYS.length];
  const nextKey = SERVICE_KEYS[(currentIdx + 1) % SERVICE_KEYS.length];

  const handleInquireClick = () => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector("#inquiry");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-2xl flex justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-4xl glass-panel-elevated rounded-3xl border border-white/[0.12] p-6 sm:p-10 lg:p-12 my-auto shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-8">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO OVERVIEW</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectService(prevKey)}
              className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
            >
              PREV
            </button>
            <button
              onClick={() => onSelectService(nextKey)}
              className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
            >
              NEXT
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer ml-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Header Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          <div className="md:col-span-7">
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-3">
              {service.eyebrow}
            </span>
            <h2
              id="modal-title"
              className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight mb-4"
            >
              {service.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-sans font-light leading-relaxed">
              {service.tagline}
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-lg bg-[#09090d]">
              {service.video ? (
                <video
                  src={service.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Lead Narrative */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-10">
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            {service.lead}
          </p>
        </div>

        {/* Detail Breakdown */}
        <div className="space-y-4 mb-10 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
          {service.detail.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Deliverables & Process Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Deliverables */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider mb-4">
              What You Get
            </h3>
            <ul className="space-y-2.5">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process Timeline */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider mb-4">
              How It Works
            </h3>
            <ol className="space-y-3">
              {service.process.map((step, idx) => (
                <li key={step} className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center font-mono text-[10px] text-blue-400 shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Telemetry Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {service.stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel rounded-xl p-4 border border-white/[0.08] text-center"
            >
              <div className="text-2xl font-display font-semibold text-white font-mono-telemetry mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Target Fit & Inquiry Action */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/20 via-blue-900/10 to-transparent border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-1">
              Suitability & Profile
            </span>
            <p className="text-xs text-zinc-300 max-w-lg leading-relaxed">
              {service.forWho}
            </p>
          </div>

          <button
            onClick={handleInquireClick}
            className="px-6 py-3 rounded-full bg-white text-black font-medium text-xs tracking-wide hover:bg-zinc-200 transition-colors shrink-0 cursor-pointer shadow-lg"
          >
            Start Your Inquiry →
          </button>
        </div>
      </div>
    </div>
  );
}
