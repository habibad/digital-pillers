"use client";

interface Metric {
  value: string;
  label: string;
  subtext: string;
}

const metrics: Metric[] = [
  {
    value: "250+",
    label: "Brands Empowered",
    subtext: "Global portfolio scaled",
  },
  {
    value: "4.8x",
    label: "Average Client ROAS",
    subtext: "Data-driven growth systems",
  },
  {
    value: "+312%",
    label: "Growth Delivered",
    subtext: "Qualified revenue pipeline",
  },
  {
    value: "91%",
    label: "Client Retention",
    subtext: "Long-term partnerships",
  },
];

export default function MetricsStrip() {
  return (
    <section className="metrics-strip" aria-label="Key Performance Indicators">
      <div className="page-shell">
        <div className="metrics-strip__inner">
          {metrics.map((item) => (
            <div className="metric-strip-item" key={item.label}>
              <div className="metric-strip-value">{item.value}</div>
              <div className="metric-strip-content">
                <span className="metric-strip-label">{item.label}</span>
                <span className="metric-strip-sub">{item.subtext}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
