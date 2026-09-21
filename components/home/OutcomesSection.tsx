export default function OutcomesSection() {
  return (
    <section className="section outcomes-section">
      <div className="page-shell outcomes-grid">
        <div data-reveal="right">
          <span className="section-label">REAL OUTCOMES</span>
          <h2>Results<br/>that speak.</h2>
          <p className="muted-copy">A live-feeling reporting interface keeps commercial signal visible without turning the site into a wall of numbers.</p>
        </div>
        <div className="analytics-console glass-card" data-reveal="left">
          <div className="analytics-chart-panel">
            <span className="analytics-label">Illustrative reporting view</span>
            <strong>$1,248,320</strong>
            <small>Tracked revenue snapshot</small>
            <div className="chart-bars" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ height: `${25 + ((i * 17) % 68)}%` }} />)}
            </div>
          </div>
          <div className="analytics-metrics">
            <div><strong>4.8x</strong><span>ROAS</span></div>
            <div><strong>+38%</strong><span>Qualified leads</span></div>
            <div><strong>2.4M</strong><span>Ad impressions</span></div>
            <div><strong>91%</strong><span>Retention UI</span></div>
          </div>
        </div>
        <div className="outcomes-note glass-card" data-reveal="left">
          <span>More signal.</span><span>Better decisions.</span><span>Stronger brands.</span>
        </div>
      </div>
    </section>
  );
}
