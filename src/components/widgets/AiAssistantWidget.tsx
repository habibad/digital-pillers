"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, X, MessageSquare, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import gsap from "gsap";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  actionText?: string;
  actionTarget?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "services",
    question: "What services do you offer?",
    answer:
      "We engineer growth across four core pillars: (1) Paid Acquisition Engine on Meta, TikTok & YouTube; (2) Brand Identity & Always-On Organic Social; (3) Conversion-Driven Next.js Digital Flagships; and (4) Growth Strategy & Executive Advisory. Each functions standalone or interlocks as an unshakeable digital moat.",
    actionText: "Explore The 4 Pillars",
    actionTarget: "#services",
  },
  {
    id: "started",
    question: "How do we get started?",
    answer:
      "Every partnership begins with a preliminary diagnostic audit. Submit a brief in our inquiry console—we analyze your unit economics and current funnels, then reply within 1 working day with a concrete structural diagnosis and no-obligation strategic review.",
    actionText: "Initiate Diagnostic Brief",
    actionTarget: "#inquiry",
  },
  {
    id: "turnaround",
    question: "What is your typical turnaround?",
    answer:
      "Execution speed is our competitive moat. Preliminary audits are dispatched within 1 working day. Paid acquisition testing rounds run on 7-day sprint cycles. Web architecture builds deploy in 4–6 weeks. Strategic growth roadmaps operate on 90-day staged execution intervals.",
    actionText: "View Execution SLAs",
    actionTarget: "#services",
  },
  {
    id: "pricing",
    question: "How does your pricing work?",
    answer:
      "We structure engagements around aligned incentives, not bloated agency retainers. Pricing models are tailored by pillar: performance-tied retainers for paid acquisition, fixed milestone sprints for digital flagships, and quarterly advisory retainers for growth strategy. Capital only scales when agreed unit economics are verified.",
    actionText: "Schedule Partner Discussion",
    actionTarget: "#inquiry",
  },
];

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeFaqId, setActiveFaqId] = useState<string>("services");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on ESC key or Click Outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        widgetRef.current &&
        !widgetRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Drawer Open Animation
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      gsap.fromTo(
        drawerRef.current,
        { scale: 0.95, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handlePillClick = (id: string) => {
    if (id === activeFaqId) return;
    setIsTyping(true);
    setTimeout(() => {
      setActiveFaqId(id);
      setIsTyping(false);
    }, 180);
  };

  const handleActionClick = (target?: string) => {
    if (!target) return;
    setIsOpen(false);
    const el = document.querySelector(target);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  const activeFaq = FAQ_ITEMS.find((f) => f.id === activeFaqId) || FAQ_ITEMS[0];

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-40">
      {/* 1. Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0d0d0d]/90 hover:bg-[#141418] border border-white/[0.1] hover:border-[#0055ff]/50 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] transition-all duration-300 cursor-pointer will-change-transform hover:scale-105"
          aria-label="Open AI Assistant"
        >
          {/* Ambient Glow Pulse Ring */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#0055ff] to-[#00d4ff] opacity-40 group-hover:opacity-80 blur-[6px] transition-opacity duration-300 -z-10 animate-pulse" />

          <div className="w-6 h-6 rounded-full bg-[#0055ff]/20 border border-[#0055ff]/40 flex items-center justify-center text-[#00d4ff]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-medium text-white tracking-wide flex items-center gap-1.5">
              <span>Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
          </div>
        </button>
      )}

      {/* 2. Glassmorphic Modal / Drawer Window */}
      {isOpen && (
        <div
          ref={drawerRef}
          className="w-[92vw] sm:w-[420px] max-h-[85vh] flex flex-col glass-panel-elevated rounded-3xl border border-white/[0.12] p-5 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0055ff]/20 border border-[#0055ff]/40 flex items-center justify-center text-[#00d4ff]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-wide">
                  Pillars Intelligence
                </h4>
                <p className="text-[10px] font-mono text-zinc-400">
                  Instant Strategic Diagnostics
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Interactive Smart Pre-Loaded Query Pills */}
          <div className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Select Query Topic
            </span>
            <div className="flex flex-col gap-1.5">
              {FAQ_ITEMS.map((item) => {
                const isSelected = item.id === activeFaqId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePillClick(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-[#0055ff]/20 border border-[#0055ff]/50 text-white shadow-[0_0_15px_rgba(0,85,255,0.25)]"
                        : "bg-white/[0.02] border border-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{item.question}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "text-[#00d4ff] translate-x-0.5" : "text-zinc-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Dynamic Answer Display Panel */}
          <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] flex-1 flex flex-col justify-between">
            {isTyping ? (
              <div className="flex items-center gap-1.5 py-4 text-xs font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0055ff] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:300ms]" />
                <span className="ml-2 text-[11px]">Synthesizing response...</span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-mono text-[#00d4ff] uppercase tracking-wider block mb-1.5">
                  Verified Protocol
                </span>
                <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed mb-4">
                  {activeFaq.answer}
                </p>
              </div>
            )}

            {activeFaq.actionText && (
              <button
                onClick={() => handleActionClick(activeFaq.actionTarget)}
                className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md mt-2"
              >
                <span>{activeFaq.actionText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
