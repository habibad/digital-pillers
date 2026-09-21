import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <Image src="/media/pillars-image.jpg" alt="" fill sizes="100vw" className="final-cta__image" />
      <div className="final-cta__veil" />
      <div className="page-shell final-cta__content" data-reveal="up">
        <span className="section-label">LET’S BUILD TOGETHER</span>
        <h2>Build the next pillar.</h2>
        <p>Turn attention into a measurable, maintainable growth system.</p>
        <div className="hero-actions-row">
          <MagneticButton href="/contact">Start a Project</MagneticButton>
          <MagneticButton href="/contact" variant="ghost">Book a Call</MagneticButton>
        </div>
      </div>
      <div className="final-cta__side" aria-hidden="true">SAME<br/>HIGHER<br/>FURTHER<br/>TOGETHER</div>
    </section>
  );
}
