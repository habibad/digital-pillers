export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "sarah-k",
    quote:
      "“Digital Pillars transformed our paid media performance. Our ROAS increased by 4x within three months.”",
    name: "Sarah K.",
    role: "CEO",
    company: "Lumina",
    avatar: "/media/avatars/avatar-sarah.jpg",
    rating: 5,
  },
  {
    id: "james-t",
    quote:
      "“A strategic partner, not just an agency. They helped us build a complete growth system that actually works.”",
    name: "James T.",
    role: "Founder",
    company: "Nexa",
    avatar: "/media/avatars/avatar-james.jpg",
    rating: 5,
  },
  {
    id: "priya-m",
    quote:
      "“Professional, data-driven and incredible results. Our brand has never felt stronger.”",
    name: "Priya M.",
    role: "Marketing Director",
    company: "Orbit",
    avatar: "/media/avatars/avatar-priya.jpg",
    rating: 5,
  },
  {
    id: "marcus-v",
    quote:
      "“They don't just execute campaigns — they architect an unfair competitive advantage for your brand.”",
    name: "Marcus V.",
    role: "Head of Growth",
    company: "Aether Labs",
    avatar: "/media/avatars/avatar-marcus.jpg",
    rating: 5,
  },
  {
    id: "elena-r",
    quote:
      "“The level of strategic clarity and technical execution they bring is genuinely rare in the agency world.”",
    name: "Elena R.",
    role: "VP Marketing",
    company: "Kinetic Global",
    avatar: "/media/avatars/avatar-elena.jpg",
    rating: 5,
  },
  {
    id: "david-s",
    quote:
      "“Our customer acquisition engine went from inconsistent experiments to a predictable high-scale machine.”",
    name: "David S.",
    role: "Co-Founder",
    company: "Synthetix AI",
    avatar: "/media/avatars/avatar-david.jpg",
    rating: 5,
  },
];
