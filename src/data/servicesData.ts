export interface ServiceItem {
  id: string;
  pillarNum: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  tagline: string;
  lead: string;
  image: string;
  video?: string;
  velocity: string;
  deliverables: string[];
  process: string[];
  stats: { value: string; label: string }[];
  detail: string[];
  forWho: string;
}

export const SERVICES_DATA: Record<string, ServiceItem> = {
  "paid-acquisition": {
    id: "paid-acquisition",
    pillarNum: "01",
    eyebrow: "Pillar I · Paid Acquisition",
    title: "Paid Acquisition Engine",
    shortTitle: "Paid Acquisition",
    tagline: "Full-funnel Meta & Social ads engineered to scale on unit economics, not guesswork.",
    lead: "Most brands treat paid social like a slot machine. We treat it like financial infrastructure: measured, defended, and built to return more than it costs in hard reconciled revenue.",
    image: "/assets/svc-performance.jpg",
    velocity: "7-Day Sprint Testing Cycles",
    deliverables: [
      "Full-funnel Meta, TikTok & YouTube ad pipeline management",
      "Disciplined weekly creative testing sprints with verified winner isolation",
      "Server-side Meta Conversions API (CAPI) & clean attribution tracking",
      "Live P&L dashboards reconciled against bank and Shopify data",
      "Dynamic budget allocation scaling only when target ROAS is cleared",
      "Fatigue mitigation & continuous high-production asset replenishment",
    ],
    process: [
      "Attribution & Funnel Audit: Zero in on conversion leakage and untracked sales",
      "Measurement Architecture: Rebuild server-side telemetry so every pound is traceable",
      "Disciplined Sprint Launch: Deploy tested hooks, angles, and formats against KPI targets",
      "Algorithmic Scaling: Aggressively scale proven winners and terminate losers without sentiment",
    ],
    stats: [
      { value: "4.8x", label: "Target ROAS" },
      { value: "-38%", label: "CPA Reduction" },
      { value: "7 Days", label: "To First Live Reporting" },
    ],
    detail: [
      "Paid social rewards discipline and brutally punishes guesswork. Category leaders aren't the ones with the largest budgets; they are the ones with the tightest feedback loops who know down to the penny what every pound generates.",
      "We start by making your acquisition infrastructure measurable: proper pixel and server-side tracking, clean conversion events, and an attribution layer that tells the truth. Then we build creative in structured sprint rounds, testing hooks, messaging angles, and visual pacing.",
      "Only once a campaign clears its agreed unit economics do we scale spend. The result is a predictable, defensible customer acquisition machine that compounds month over month.",
    ],
    forWho:
      "For brands spending £10k–£250k+/month on Meta and paid social who require disciplined capital defense, whether scaling a proven offer or repairing an ad account leaking cash.",
  },

  "brand-organic": {
    id: "brand-organic",
    pillarNum: "02",
    eyebrow: "Pillar II · Brand & Social",
    title: "Brand Identity & Organic Social Infrastructure",
    shortTitle: "Brand & Organic",
    tagline: "The audience and cultural moat you keep when the paid media spend pauses.",
    lead: "Paid buys attention; brand presence keeps it. We engineer the always-on voice, high-production content calendars, and creator partnerships that turn fleeting visitors into die-hard brand evangelists.",
    image: "/assets/svc-presence.jpg",
    velocity: "Daily Publishing Cadence",
    deliverables: [
      "Strategic visual & verbal brand guidelines engineered for digital dominance",
      "High-cadence monthly content production (short-form video, carousels, editorial)",
      "Creator scouting, contract negotiation, and vetted audience overlap analysis",
      "Active community & comment engagement management in your authentic tone",
      "Platform-native cultural trend capitalizing without brand dilution",
      "Compounding reach playbooks built to diminish reliance on paid ads",
    ],
    process: [
      "Identity Calibration: Formalize tone of voice, visual benchmarks, and cultural pillars",
      "Repeatable Content Engine: Establish production cadences for TikTok, Reels, and LinkedIn",
      "Vetted Creator Matching: Source and brief creators whose audiences genuinely overlap",
      "Daily Community Execution: Publish, engage, listen, and double down on viral resonance",
    ],
    stats: [
      { value: "+120%", label: "Avg. Organic Engagement" },
      { value: "Daily", label: "Consistent Publishing" },
      { value: "100%", label: "Vetted Creator Alignment" },
    ],
    detail: [
      "The brands that command category pricing power are the ones that show up every day with cultural relevance. A scattered social presence burns executive time and pays for impressions it should earn organically.",
      "We build a scalable, repeatable content engine: monthly calendars, high-velocity short-form creative, and proactive community management that fosters genuine conversation. We pair this with vetted creator matchmaking, handling contracts, content rights, and ROI tracking end-to-end.",
      "Done right, organic social compounds value over time, turning casual followers into an unshakeable moat that competitors cannot buy their way past.",
    ],
    forWho:
      "For ambitious brands whose organic channels feel inconsistent, reactive, or neglected, and founders who want an elite in-house quality presence without the friction of hiring a 5-person creative team.",
  },

  "web-architecture": {
    id: "web-architecture",
    pillarNum: "03",
    eyebrow: "Pillar III · Digital Flagship",
    title: "Conversion-Driven Web Architecture & Next-Gen Platforms",
    shortTitle: "Web Architecture",
    tagline: "Headless, 60FPS digital flagships built to turn passive visitors into high-ticket buyers.",
    lead: "Your digital experience is the single point of failure for all marketing capital. We architect bespoke, sub-second web platforms that fuse Awwwards-tier visual prestige with ruthless conversion rate optimization.",
    image: "/assets/svc-brand.jpg",
    video: "/assets/desk-video.mp4",
    velocity: "Sub-100ms Interaction Latency",
    deliverables: [
      "Bespoke Next.js 14+ (App Router) full-stack architecture with edge rendering",
      "GPU-accelerated interactive 3D WebGL experiences and fluid micro-interactions",
      "Zero-latency checkout optimization for Shopify Plus and custom headless checkouts",
      "Mobile-first responsive engineering guaranteed at 60FPS fluid scroll",
      "Full tracking telemetry integration (Meta CAPI, GA4, PostHog, Segment)",
      "Technical SEO & Core Web Vitals scoring in the 95th+ percentile",
    ],
    process: [
      "UX & Conversion Audit: Heatmap analysis and elimination of checkout friction points",
      "Bespoke Spatial Design: High-production wireframes, luxury typography, and 3D modeling",
      "Modern Edge Engineering: Next.js, Tailwind, GSAP, and headless e-commerce integration",
      "Conversion Stress-Testing: Live traffic testing, A/B checkout splits, and latency audit",
    ],
    stats: [
      { value: "+42%", label: "Avg. Conversion Rate Lift" },
      { value: "<0.8s", label: "Average Page Load Time" },
      { value: "60FPS", label: "Guaranteed Fluidity" },
    ],
    detail: [
      "Cookie-cutter templates and sluggish e-commerce themes silently bleed conversion rate. When paid traffic lands on a generic site, trust plummets and CPA surges.",
      "We architect digital flagships that command instant authority: bespoke typography, fluid smooth scrolling, 3D interactive product storytelling, and sub-second load times. Every pixel is calculated to guide visitors seamlessly from first impression to transaction.",
      "The result is a conversion asset that amplifies every marketing dollar spent, increasing average order value and elevating perceived brand value to luxury standards.",
    ],
    forWho:
      "For category-leading direct-to-consumer and B2B enterprises ready to abandon sluggish Shopify templates for an iconic, high-conversion bespoke digital presence.",
  },

  "growth-strategy": {
    id: "growth-strategy",
    pillarNum: "04",
    eyebrow: "Pillar IV · Executive Advisory",
    title: "Growth Strategy, Systems & Executive Advisory",
    shortTitle: "Growth Strategy",
    tagline: "Ambition translated into a staged, quarter-by-quarter financial roadmap you can run.",
    lead: "We sit on your side of the board table. Strategic positioning, capital allocation models, and executive KPI design that turn big revenue targets into immediate, actionable operational execution.",
    image: "/assets/svc-consulting.jpg",
    velocity: "90-Day Execution Roadmaps",
    deliverables: [
      "Comprehensive market positioning & competitive white-space evaluation",
      "Quarter-by-quarter financial growth roadmap with hard revenue milestones",
      "Unit economics stress-testing: CAC, LTV, payback windows & contribution margin",
      "Cross-channel budget & capital deployment modeling",
      "Board-ready executive KPI dashboards and governance reporting",
      "Direct on-call partner advisory for strategic pivots and capital raises",
    ],
    process: [
      "Strategic Diagnostic: Deep-dive audit into historical financials, funnels, and churn",
      "Positioning Architecture: Pinpoint the defensible space in the market you can own",
      "Staged Milestone Roadmap: Translate revenue targets into 90-day actionable sprints",
      "Quarterly Governance: Review progress against hard numbers, reallocate capital, and adjust",
    ],
    stats: [
      { value: "90 Days", label: "To Operational Clarity" },
      { value: "100%", label: "Reconciled Unit Economics" },
      { value: "Direct", label: "Partner Access On Call" },
    ],
    detail: [
      "Ambition is common; an operational plan a business can actually execute is extraordinarily rare. Most scaling companies know where they want to be, but flounder on what to prioritize next quarter.",
      "We interrogate your business fundamentals: unit economics, customer lifetime value, market dynamics, and margin structure. We then build an actionable growth roadmap with the specific KPIs that prove traction and the capital allocation models that safeguard cash flow.",
      "You walk away with complete clarity: what to execute, in what sequence, and how to verify that the entire growth engine is compounding value.",
    ],
    forWho:
      "For founders, CEOs, and executive teams scaling through inflection points (£1M–£20M ARR) who require an experienced outside strategic partner holding the numbers accountable.",
  },
};

export const SERVICE_KEYS = [
  "paid-acquisition",
  "brand-organic",
  "web-architecture",
  "growth-strategy",
];
