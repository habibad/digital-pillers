"use client";

export default function OutcomeStatementCard() {
  return (
    <div className="outcomes-statement-card" data-reveal="statement">
      <div className="statement-card-glow" aria-hidden="true" />
      <div className="statement-card-inner">
        <div className="statement-card-copy">
          <p>More traffic.</p>
          <p>Better customers.</p>
          <p>Stronger brands.”</p>
        </div>
        <div className="statement-card-mark" aria-hidden="true">
          <span>///</span>
        </div>
      </div>
    </div>
  );
}
