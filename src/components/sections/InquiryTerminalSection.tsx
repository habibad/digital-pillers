"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Mail, Clock, Globe } from "lucide-react";

export function InquiryTerminalSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [brief, setBrief] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Dynamic Brief Strength Calculation
  const briefStrength = useMemo(() => {
    let score = 0;
    if (name.trim().length >= 2) score += 33;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (emailRegex.test(email.trim())) score += 33;
    if (brief.trim().length >= 40) score += 34;
    else if (brief.trim().length > 0) score += Math.min(Math.round((brief.trim().length / 40) * 34), 30);
    return Math.min(score, 100);
  }, [name, email, brief]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSending(true);

    // Fallback directly to mailto protocol so visitor's inquiry is guaranteed to reach the team
    setTimeout(() => {
      const subject = encodeURIComponent(`Growth Inquiry — ${name} (${company || "Direct"})`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\n\nProject Scope & Objectives:\n${brief || "N/A"}`
      );
      window.location.href = `mailto:hello@digitalpillars.co?subject=${subject}&body=${body}`;
      setIsSending(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section
      id="inquiry"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Context & Studio Pledge */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
                Client Inquiry
              </span>
              <div className="h-[1px] w-8 bg-blue-500/40" />
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.08] mb-6">
              Build Your <br />
              <span className="text-blue-400">Pillars.</span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-400 font-sans font-light leading-relaxed mb-10">
              Tell us where the business is now and where it needs to be. We reply
              with an initial structural diagnosis within one working day.
            </p>
          </div>

          {/* Studio Pledge Box */}
          <div className="glass-panel-elevated rounded-2xl p-6 border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <span className="text-white font-medium">Response SLA: </span>
                <span className="text-zinc-400">Within 1 working day</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-white font-medium">No Obligation: </span>
                <span className="text-zinc-400">Honest preliminary growth audit</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <span className="text-white font-medium">Headquartered: </span>
                <span className="text-zinc-400">London · Deploying globally</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Inquiry Console */}
        <div className="lg:col-span-7">
          <div className="glass-panel-elevated rounded-3xl p-8 sm:p-10 border border-white/[0.1] relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-white mb-2">
                  Inquiry Dispatched
                </h3>
                <p className="text-sm text-zinc-400 max-w-md font-light leading-relaxed mb-6">
                  Your growth brief has been directed to the London partner team.
                  We will follow up via email within one working day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-blue-400 hover:underline cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dynamic Brief Strength Meter */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-400 uppercase tracking-wider">
                      Brief Strength Metric
                    </span>
                    <span
                      className={`font-semibold ${
                        briefStrength >= 100
                          ? "text-emerald-400"
                          : briefStrength > 50
                          ? "text-blue-400"
                          : "text-zinc-500"
                      }`}
                    >
                      {briefStrength}% {briefStrength >= 100 ? "· OPTIMAL" : ""}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        briefStrength >= 100
                          ? "bg-gradient-to-r from-blue-500 to-emerald-400"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${briefStrength}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alexander Croft"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2"
                    >
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@enterprise.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2"
                  >
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Brand name or domain"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="brief"
                    className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2"
                  >
                    What are you building? (Current stage & objectives)
                  </label>
                  <textarea
                    id="brief"
                    rows={3}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="E.g., Scaling direct-to-consumer revenue from £1M to £5M ARR, seeking full-funnel Meta acquisition & unified brand presence..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSending ? "Dispatching..." : "Build Your Pillars"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
