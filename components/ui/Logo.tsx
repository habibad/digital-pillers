import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="brand-lockup" aria-label="Digital Pillars home">
      <span className="brand-pillar-icon" aria-hidden="true">
        <svg viewBox="0 0 28 26" fill="none" width="24" height="22">
          {/* Top Architrave / Pediment */}
          <rect x="2" y="2" width="24" height="2.5" rx="1.2" fill="currentColor" />
          <rect x="4" y="5" width="20" height="1.5" rx="0.75" fill="currentColor" opacity="0.85" />
          {/* 3 Pillars */}
          <rect x="5.5" y="7.5" width="3" height="12" rx="1" fill="currentColor" />
          <rect x="12.5" y="7.5" width="3" height="12" rx="1" fill="currentColor" />
          <rect x="19.5" y="7.5" width="3" height="12" rx="1" fill="currentColor" />
          {/* Bottom Base */}
          <rect x="4" y="20.5" width="20" height="1.5" rx="0.75" fill="currentColor" opacity="0.85" />
          <rect x="2" y="22.5" width="24" height="2.5" rx="1.2" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-name">DIGITAL PILLARS</span>
    </Link>
  );
}
