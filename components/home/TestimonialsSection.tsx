import { testimonials } from "@/lib/data";
import TiltCard from "@/components/ui/TiltCard";

export default function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="reviews">
      <div className="page-shell">
        <div className="section-head testimonials-head">
          <div data-reveal="up">
            <span className="section-label">CLIENT PERSPECTIVE</span>
            <h2>Trusted by ambitious teams.</h2>
          </div>
          <p className="review-disclaimer" data-reveal="left">Sample review layout — replace with verified client testimonials before launch.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <TiltCard className={`testimonial-card glass-card ${index === 1 ? "is-featured" : ""}`} key={item.quote}>
              <div className="quote-mark">“</div>
              <p>{item.quote}</p>
              <div className="review-meta">
                <span className="review-avatar">{item.role.charAt(0)}</span>
                <div><strong>{item.role}</strong><span>{item.company}</span></div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
