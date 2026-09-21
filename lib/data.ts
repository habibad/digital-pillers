export type Service = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  image: string;
  accentMetric: string;
  accentLabel: string;
  deliverables: string[];
  process: string[];
  detail: string[];
};

export const services: Service[] = [
  {
    slug: "performance-marketing",
    index: "01",
    title: "Performance Marketing",
    shortTitle: "Performance",
    description: "Paid social built around clean tracking, disciplined testing and measurable return.",
    eyebrow: "Paid media · Meta · Analytics",
    image: "/media/svc-performance.jpg",
    accentMetric: "4.8x",
    accentLabel: "sample ROAS view",
    deliverables: [
      "Full-funnel Meta and Instagram campaigns",
      "Creative testing systems and iteration loops",
      "Pixel, CAPI and conversion tracking setup",
      "Live reporting dashboards and weekly analysis",
      "Budget scaling based on validated performance"
    ],
    process: [
      "Audit current spend, funnel and measurement",
      "Repair attribution and define success metrics",
      "Launch structured creative tests",
      "Scale proven combinations and cut waste"
    ],
    detail: [
      "Paid social should behave like infrastructure, not a slot machine. We make the channel measurable first, then build campaigns around evidence rather than opinion.",
      "Every test has a purpose, every metric has context, and every budget increase is earned by performance."
    ]
  },
  {
    slug: "social-brand-presence",
    index: "02",
    title: "Social & Brand Presence",
    shortTitle: "Social & Brand",
    description: "A consistent brand voice, content system and creator strategy that keeps the brand visible between campaigns.",
    eyebrow: "Content · Community · Creators",
    image: "/media/svc-presence.jpg",
    accentMetric: "+38%",
    accentLabel: "engagement snapshot",
    deliverables: [
      "Content pillars and monthly editorial calendars",
      "Platform-native creative direction",
      "Community and comment management",
      "Influencer sourcing and partnership support",
      "Organic performance reporting and iteration"
    ],
    process: [
      "Define voice, audience and channel roles",
      "Build a repeatable content operating system",
      "Publish, engage and listen consistently",
      "Review signals and sharpen what resonates"
    ],
    detail: [
      "Paid media can buy attention. Presence is what earns familiarity and trust over time.",
      "We create the operating system behind a brand that feels active, coherent and recognisable across the channels that matter."
    ]
  },
  {
    slug: "web-digital-experiences",
    index: "03",
    title: "Web & Digital Experiences",
    shortTitle: "Web & Digital",
    description: "Fast, conversion-focused websites and landing experiences built to turn attention into action.",
    eyebrow: "Websites · Landing pages · Conversion",
    image: "/media/signal-image.jpg",
    accentMetric: "<2s",
    accentLabel: "target first-load",
    deliverables: [
      "Conversion-led website strategy and structure",
      "Responsive visual design and interaction systems",
      "Landing pages for paid campaign traffic",
      "Analytics, event tracking and lead capture",
      "Performance, accessibility and SEO foundations"
    ],
    process: [
      "Map the visitor journey and conversion goal",
      "Prototype the information and interaction system",
      "Build the responsive experience",
      "Measure, test and improve after launch"
    ],
    detail: [
      "The website is where attention becomes a business outcome. It should feel premium without becoming heavy, slow or difficult to use.",
      "We pair strong visual systems with deliberate performance budgets, responsive behaviour and measurable conversion paths."
    ]
  },
  {
    slug: "growth-strategy-advisory",
    index: "04",
    title: "Growth Strategy & Advisory",
    shortTitle: "Growth Strategy",
    description: "Clear positioning, practical growth roadmaps and senior-level decision support for what happens next.",
    eyebrow: "Positioning · Planning · Advisory",
    image: "/media/svc-consulting.jpg",
    accentMetric: "90d",
    accentLabel: "roadmap horizon",
    deliverables: [
      "Market and positioning review",
      "Quarter-by-quarter growth roadmap",
      "Channel and budget prioritisation",
      "KPI design and reporting structure",
      "Ongoing advisory and decision support"
    ],
    process: [
      "Interrogate the offer, market and goals",
      "Identify the highest-leverage growth constraints",
      "Translate strategy into a staged roadmap",
      "Review progress and adapt with the numbers"
    ],
    detail: [
      "Growth gets expensive when teams add channels before they agree on direction.",
      "We create the strategic layer that keeps campaigns, content, websites and investment moving toward the same outcome."
    ]
  }
];

export const testimonials = [
  {
    quote: "Digital Pillars brought structure to our paid media and gave the team a clearer way to decide what to scale next.",
    role: "Growth Lead",
    company: "B2B SaaS brand"
  },
  {
    quote: "The value was not just in the campaigns. It was the operating system around the campaigns — tracking, reporting and a repeatable process.",
    role: "Founder",
    company: "Consumer brand"
  },
  {
    quote: "A focused partner that could connect brand, content and conversion instead of treating each channel as a separate project.",
    role: "Marketing Director",
    company: "Services business"
  }
];

export const faqs = [
  {
    q: "What services do you offer?",
    a: "We focus on performance marketing, social and brand presence, web and digital experiences, and growth strategy/advisory. Each can work independently or as one connected growth system."
  },
  {
    q: "How do I get started?",
    a: "Start with a short discovery call. We will identify the commercial goal, current bottleneck and the smallest useful first engagement before recommending scope."
  },
  {
    q: "What’s your typical turnaround?",
    a: "Timelines depend on scope. Strategy and campaign setup can move quickly; larger web projects run in planned phases. A clear delivery plan is agreed before work begins."
  },
  {
    q: "Do you build websites?",
    a: "Yes. We design and build conversion-led marketing websites and campaign landing pages, with performance, analytics and accessibility considered from the start."
  }
];
