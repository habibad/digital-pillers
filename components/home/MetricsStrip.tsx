const metrics = [
  ["250+", "Brands empowered"],
  ["4.8x", "Illustrative ROAS"],
  ["+312%", "Growth dashboard"],
  ["91%", "Retention UI"]
];

export default function MetricsStrip() {
  return (
    <section className="metrics-strip" aria-label="Illustrative metrics">
      <div className="page-shell metrics-strip__inner">
        {metrics.map(([value, label], index) => (
          <div className="metric-item" key={label} data-reveal="up">
            <span className="metric-icon" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{value}</strong><span>{label}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}
