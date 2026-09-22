"use client";

export default function OutcomeStatementCard() {
  return (
    <div className="outcomes-statement-card" data-reveal="statement">
      {/* 4 Corner Border-Radius Lighting */}
      <span className="statement-corner corner-tl" aria-hidden="true" />
      <span className="statement-corner corner-tr" aria-hidden="true" />
      <span className="statement-corner corner-bl" aria-hidden="true" />
      <span className="statement-corner corner-br" aria-hidden="true" />

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
