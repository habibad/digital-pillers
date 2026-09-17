export interface ServiceItem {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  lead: string;
  image: string;
  deliverables: string[];
  process: string[];
  stats: { value: string; label: string }[];
  detail: string[];
  forWho: string;
}

export const SERVICES_DATA: Record<string, ServiceItem> = {
  performance: {
    id: "performance",
    eyebrow: "Performance · Paid Media",
    title: "Performance Ads",
    tagline: "Turn ad spend into a system that pays for itself.",
    lead: "Most brands treat paid social like a slot machine. We treat it like infrastructure: measured, defended, and built to return more than it costs.",
    image: "/assets/svc-performance.jpg",
    deliverables: [
      "Full-funnel Meta & Instagram campaigns",
      "Disciplined creative testing in structured rounds",
      "Pixel, CAPI & server-side tracking setup",
      "Live dashboards you actually understand",
      "Weekly ROI reporting against agreed targets",
      "Budget scaling only when the numbers earn it",
    ],
    process: [
      "Audit current spend, funnels, and tracking",
      "Rebuild measurement so every pound is traceable",
      "Launch tested creative against a clear target",
      "Scale what works, cut what doesn't, weekly",
    ],
    stats: [
      { value: "4.2x", label: "Avg. return on ad spend" },
      { value: "-38%", label: "Cost per acquisition" },
      { value: "7 Days", label: "To first live reporting" },
    ],
    detail: [
      "Paid social rewards discipline and punishes guesswork. The brands that win aren't the ones with the biggest budgets, they're the ones who know exactly what each pound does and can prove it.",
      "We start by making your account measurable: proper pixel and server-side tracking, clean conversion events, and a reporting layer you can actually read. Then we build creative in structured test rounds, so winners are found by evidence, not opinion.",
      "The result is a paid channel that behaves like infrastructure, not a gamble: predictable, defensible, and compounding month over month.",
    ],
    forWho:
      "For brands spending on Meta and paid social that want their budget held accountable, whether you're scaling a proven offer or fixing a channel that's quietly bleeding money.",
  },
  brand: {
    id: "brand",
    eyebrow: "Strategy · Positioning",
    title: "Brand Strategy",
    tagline: "Decide what you stand for before you spend a penny promoting it.",
    lead: "Positioning is the difference between shouting louder and being chosen. We find the space you can own, then make every channel point at it.",
    image: "/assets/svc-brand.jpg",
    deliverables: [
      "Market & competitor evaluation",
      "Positioning & messaging framework",
      "Visual and verbal identity direction",
      "Audience definition & segmentation",
      "Brand architecture for growth",
      "A single source of truth for every campaign",
    ],
    process: [
      "Interrogate the offer, market, and audience",
      "Map where you can credibly win",
      "Define positioning and the story around it",
      "Hand every other pillar a clear brief",
    ],
    stats: [
      { value: "1", label: '"Own-able" position defined' },
      { value: "360°", label: "Consistency across channels" },
      { value: "100%", label: "Campaigns pointing one way" },
    ],
    detail: [
      "Positioning is the most valuable and most skipped work in marketing. Without it, every campaign starts from zero and every channel says something slightly different.",
      "We interrogate your offer, your market, and your audience to find the space you can credibly own, then translate that into a messaging framework, a verbal and visual direction, and a brand architecture built for growth.",
      "Once it exists, it becomes the single source of truth every other pillar answers to, so effort stops scattering and starts compounding.",
    ],
    forWho:
      "For founders and teams who feel their marketing is busy but directionless, or who are about to invest in paid and content and want a foundation worth building on.",
  },
  presence: {
    id: "presence",
    eyebrow: "Presence · Social",
    title: "Social Presence",
    tagline: "The audience you keep when the ads switch off.",
    lead: "Paid gets attention. Presence keeps it. We run the day-to-day voice of the brand so it feels alive every day, not just on launch day.",
    image: "/assets/svc-presence.jpg",
    deliverables: [
      "Content systems & monthly calendars",
      "Community & engagement management",
      "On-brand copy and creative direction",
      "Platform-native content formats",
      "Reactive & always-on posting",
      "Monthly performance review",
    ],
    process: [
      "Set the voice, pillars, and cadence",
      "Build a repeatable content engine",
      "Publish, engage, and listen daily",
      "Review and double down on what resonates",
    ],
    stats: [
      { value: "Daily", label: "Consistent brand presence" },
      { value: "+120%", label: "Avg. engagement lift" },
      { value: "1 Voice", label: "Across every platform" },
    ],
    detail: [
      "Paid buys attention; presence keeps it. The brands people trust are the ones that show up consistently, in a voice that feels human, long before anyone is ready to buy.",
      "We run the day-to-day: a content system and calendar, community and comment management, and reactive posting that keeps you culturally current. It's the unglamorous, compounding work that makes a brand feel alive.",
      "Done well, presence turns followers into an audience and an audience into a moat competitors can't buy their way past.",
    ],
    forWho:
      "For brands that go quiet between campaigns, or whose social feels like a chore rather than an asset. Ideal if you want a consistent presence without hiring an in-house team.",
  },
  influencer: {
    id: "influencer",
    eyebrow: "Presence · Partnerships",
    title: "Influencer Talent",
    tagline: "The right partners, properly matched, fully managed.",
    lead: "Influencer marketing fails when the fit is wrong. We find creators whose audience genuinely overlaps yours, handle the deal, and make the partnership pay.",
    image: "/assets/svc-influencer.jpg",
    deliverables: [
      "Creator scouting & vetting",
      "Audience-overlap analysis",
      "Rate negotiation & contracts",
      "Campaign briefing & management",
      "Content rights & usage handling",
      "Performance tracking per partner",
    ],
    process: [
      "Define the audience you need to reach",
      "Source and vet creators who hold it",
      "Negotiate terms that protect ROI",
      "Manage delivery and measure impact",
    ],
    stats: [
      { value: "100%", label: "Vetted, on-brand partners" },
      { value: "Handled", label: "Deal to delivery, end to end" },
      { value: "Tracked", label: "Every partnership measured" },
    ],
    detail: [
      "Influencer marketing fails for one reason more than any other: the fit was wrong. A big follower count means nothing if the audience doesn't overlap yours.",
      "We scout and vet creators on genuine audience overlap, not vanity metrics, then handle the entire relationship: negotiation, contracts, briefing, content rights, and delivery.",
      "Every partnership is tracked against real outcomes, so you know which creators actually move the needle and which to walk away from.",
    ],
    forWho:
      "For brands that want to grow through creators but don't have the time or contacts to source, vet, and manage them, or who've been burned by partnerships that didn't deliver.",
  },
  consulting: {
    id: "consulting",
    eyebrow: "Strategy · Advisory",
    title: "Business Consultations",
    tagline: "Ambition, translated into a plan you can actually run.",
    lead: "We sit on your side of the table. Strategic planning, growth roadmaps and KPI analysis that turn where you want to be into what you do next quarter.",
    image: "/assets/svc-consulting.jpg",
    deliverables: [
      "Strategic planning sessions",
      "Quarter-by-quarter growth roadmap",
      "KPI design & accountability",
      "Channel & budget allocation",
      "Board-ready reporting",
      "Ongoing advisory on call",
    ],
    process: [
      "Understand the business and its goals",
      "Translate ambition into a staged plan",
      "Set the numbers that prove progress",
      "Review and adjust every quarter",
    ],
    stats: [
      { value: "90 Days", label: "To a clear roadmap" },
      { value: "Verified", label: "KPIs that mean something" },
      { value: "On Call", label: "Executive advisory" },
    ],
    detail: [
      "Ambition is easy; a plan you can actually run is rare. Most businesses know where they want to be but not what to do next quarter to get there.",
      "We sit on your side of the table and translate goals into a staged growth roadmap, with the KPIs that prove progress and the budget and channel allocation to make it real.",
      "You come away with clarity: what to do, in what order, and how you'll know it's working.",
    ],
    forWho:
      "For founders and leadership teams scaling past the point where instinct alone is enough, and who want an experienced outside perspective holding the numbers accountable.",
  },
  social: {
    id: "social",
    eyebrow: "Performance · Organic",
    title: "Social Consultations",
    tagline: "Turn a scattered social presence into a system that compounds.",
    lead: "Platform audits, content calendars and organic growth strategy, so your reach grows without paying for every single impression.",
    image: "/assets/svc-social.jpg",
    deliverables: [
      "Full platform audit",
      "Content strategy & calendar",
      "Organic growth playbook",
      "Hashtag, format & timing strategy",
      "Analytics setup & benchmarking",
      "Team training & handover",
    ],
    process: [
      "Audit what's working and what's noise",
      "Design a strategy around your strengths",
      "Build the calendar and the playbook",
      "Hand it over, or run it with you",
    ],
    stats: [
      { value: "Organic", label: "Growth without ad spend reliance" },
      { value: "Audited", label: "Every platform thoroughly" },
      { value: "Compounding", label: "Reach that builds on itself" },
    ],
    detail: [
      "A scattered social presence burns time and pays for reach it should earn for free. Organic done right compounds, so growth stops depending on constant spend.",
      "We start with an honest audit of every platform, then design a content strategy and calendar around your genuine strengths, with the formats, timing, and hooks that actually travel.",
      "The outcome is a system that grows reach on its own momentum, whether we run it with you or train your team to.",
    ],
    forWho:
      "For brands relying too heavily on paid for reach, or whose organic social is inconsistent and underperforming. Ideal if you want a repeatable system rather than one-off wins.",
  },
};

export const SERVICE_KEYS = [
  "performance",
  "brand",
  "presence",
  "influencer",
  "consulting",
  "social",
];
