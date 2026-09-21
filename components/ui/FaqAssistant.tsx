"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export default function FaqAssistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className={`faq-assistant ${open ? "is-open" : ""}`}>
      <div className="faq-panel" aria-hidden={!open}>
        <div className="faq-head"><div><strong>Ask Our AI Assistant</strong><span>Quick answers about our services.</span></div><button onClick={() => setOpen(false)} aria-label="Close assistant">×</button></div>
        {active === null ? (
          <div className="faq-options">
            {faqs.map((faq, index) => <button key={faq.q} onClick={() => setActive(index)}>{faq.q}</button>)}
          </div>
        ) : (
          <div className="faq-answer">
            <button onClick={() => setActive(null)}>← Questions</button>
            <strong>{faqs[active].q}</strong>
            <p>{faqs[active].a}</p>
          </div>
        )}
      </div>
      <button className="faq-launcher" onClick={() => { setOpen((value) => !value); setActive(null); }} aria-label="Open Digital Pillars FAQ assistant">
        <span className="brand-mark" aria-hidden="true"><i/><i/><i/></span>
      </button>
    </div>
  );
}
