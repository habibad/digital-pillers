import Image from "next/image";

const principles = [
  ["01", "Data-first decisions", "Every move is connected to a signal the team can inspect."],
  ["02", "Integrated growth", "Strategy, marketing and technology work as one system."],
  ["03", "Long-term partnership", "The operating model compounds instead of resetting each month."]
];

export default function PhilosophySection() {
  return (
    <section className="section philosophy-section">
      <Image src="/media/signal-image.jpg" alt="" fill sizes="100vw" className="philosophy-image" />
      <div className="philosophy-veil" />
      <div className="page-shell philosophy-shell">
        <div className="philosophy-copy" data-reveal="right">
          <span className="section-label">WHY DIGITAL PILLARS</span>
          <h2>Strategy before spend.<br/>Systems before scale.</h2>
          <p>We do not just run campaigns. We build the foundations that make better growth decisions possible.</p>
        </div>
        <div className="principles">
          {principles.map(([num, title, copy]) => (
            <article key={num} className="principle glass-card" data-reveal="up">
              <span>{num}</span><div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
