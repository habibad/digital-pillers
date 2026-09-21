import LazyVideo from "@/components/ui/LazyVideo";

const steps = [
  ["01", "Audit", "We analyse the market, brand, funnel and measurement before recommending spend."],
  ["02", "Build", "We create the strategy, creative system, tracking and experience around one clear goal."],
  ["03", "Launch", "We activate in controlled stages, test deliberately and monitor signal quality."],
  ["04", "Scale", "We double down on what earns it, remove friction and keep the system accountable."],
];

export default function ProcessSection() {
  return (
    <section className="process-section" id="process">
      <LazyVideo src="/media/assembly-video.mp4" poster="/media/posters/assembly.jpg" className="process-media" />
      <div className="process-overlay" />
      <div className="page-shell process-shell">
        <div className="process-head" data-reveal="up">
          <span className="section-label">OUR PROCESS</span>
          <h2>A clear path<br/>to real results.</h2>
          <p>A lightweight operating model designed for clarity, speed and sustainable growth.</p>
        </div>
        <div className="process-track" aria-hidden="true"><span /></div>
        <div className="process-steps">
          {steps.map(([num, title, copy]) => (
            <article className="process-step" key={num} data-reveal="up">
              <div className="process-node"><span>{num}</span></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
