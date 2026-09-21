import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div><Logo /><p>Strategy. Systems. Sustainable growth.</p><small>© {new Date().getFullYear()} Digital Pillars. All rights reserved.</small></div>
        <nav aria-label="Footer navigation">
          <Link href="/#services">Services</Link><Link href="/#process">Process</Link><Link href="/work">Work</Link><Link href="/#reviews">Reviews</Link><Link href="/about">About</Link>
        </nav>
        <div className="footer-socials" aria-label="Social links"><span>in</span><span>𝕏</span><span>◎</span></div>
      </div>
    </footer>
  );
}
