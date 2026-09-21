"use client";

export default function TrustedBrands() {
  return (
    <div className="hero-trusted-strip">
      <span className="trusted-title">Trusted by forward-thinking brands</span>
      <div className="trusted-logos-row" role="list">
        {/* Stripe */}
        <div className="trusted-logo-item" role="listitem" title="Stripe">
          <svg viewBox="0 0 54 22" className="brand-svg brand-svg--stripe" fill="currentColor" aria-label="Stripe">
            <text x="0" y="17" fontSize="16" fontWeight="700" letterSpacing="-0.04em" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif">stripe</text>
          </svg>
        </div>

        {/* Shopify */}
        <div className="trusted-logo-item" role="listitem" title="Shopify">
          <svg viewBox="0 0 82 24" className="brand-svg brand-svg--shopify" fill="currentColor" aria-label="Shopify">
            {/* Bag Icon */}
            <path d="M12.4 3.7c-.1-.1-.3 0-.4.1L9.6 6.8c-.2-.1-.5-.2-.8-.3.1-.3.1-.6.1-.8 0-1.6-1.3-2.8-2.9-2.8-.9 0-1.7.4-2.2 1.1L2.5 3c-.1-.1-.3-.1-.5.1L.4 8.5c0 .1-.1.2 0 .3l2.8 13.8c0 .2.2.3.4.3h14.8c.2 0 .3-.1.4-.2l2.6-12c0-.1 0-.2-.1-.2H12.4zm-5.7 1.3c.8 0 1.5.7 1.5 1.5 0 .2-.1.4-.2.6L5.6 5.9c.3-.6.7-.9 1.1-.9zm-4.1 9.8l2-9.1 4 2-6 7.1zm9.3.8H1.7l2.2-6.1 5.3 2.6c.2.1.5.1.6 0l5.1-5.4-2.1 8.9z" />
            {/* Wordmark Shopify */}
            <text x="24" y="17" fontSize="13" fontWeight="700" letterSpacing="-0.02em" fill="currentColor" fontFamily="system-ui, sans-serif">shopify</text>
          </svg>
        </div>

        {/* Webflow */}
        <div className="trusted-logo-item" role="listitem" title="Webflow">
          <svg viewBox="0 0 88 24" className="brand-svg brand-svg--webflow" fill="currentColor" aria-label="Webflow">
            {/* Webflow W */}
            <path d="M16.8 5.2c-2.4 0-4.4 1.5-5.2 3.6-.7-2.1-2.8-3.6-5.1-3.6-2.4 0-4.4 1.5-5.2 3.6-.4-2.1-2.2-3.6-4.5-3.6H.2v11.2h3V10c0-1.6 1.2-2.8 2.8-2.8 1.6 0 2.8 1.2 2.8 2.8v6.4h3V10c0-1.6 1.2-2.8 2.8-2.8 1.6 0 2.8 1.2 2.8 2.8v6.4h3V10c0-2.6-2.1-4.8-4.8-4.8z" />
            {/* Wordmark webflow */}
            <text x="24" y="17" fontSize="13" fontWeight="700" letterSpacing="-0.02em" fill="currentColor" fontFamily="system-ui, sans-serif">webflow</text>
          </svg>
        </div>

        {/* Google */}
        <div className="trusted-logo-item" role="listitem" title="Google">
          <svg viewBox="0 0 66 22" className="brand-svg brand-svg--google" fill="currentColor" aria-label="Google">
            <text x="0" y="17" fontSize="16" fontWeight="600" letterSpacing="-0.03em" fill="currentColor" fontFamily="system-ui, sans-serif">Google</text>
          </svg>
        </div>

        {/* Meta */}
        <div className="trusted-logo-item" role="listitem" title="Meta">
          <svg viewBox="0 0 68 22" className="brand-svg brand-svg--meta" fill="currentColor" aria-label="Meta">
            {/* Meta Infinity */}
            <path d="M14.5 4.5c-2.4 0-4.4 1.4-5.3 3.4-.9-2-2.9-3.4-5.3-3.4-3.4 0-5.9 2.8-5.9 6.2 0 4.3 5.8 7.7 8.9 7.7 2.4 0 4.4-1.4 5.3-3.4.9 2 2.9 3.4 5.3 3.4 3.1 0 5.9-2.4 5.9-6.2 0-3.4-2.5-6.2-5.9-6.2zm-5.3 9.2c-2.2 0-5.8-2.8-5.8-5.6 0-.9.7-1.6 1.6-1.6 1.9 0 3.5 2.7 4.3 4.6l-.1 2.6zm1.5-2.6c.8-1.9 2.4-4.6 4.3-4.6.9 0 1.6.7 1.6 1.6 0 2.8-3.7 5.6-5.8 5.6l-.1-2.6z" />
            {/* Wordmark Meta */}
            <text x="24" y="16.5" fontSize="14" fontWeight="700" letterSpacing="-0.02em" fill="currentColor" fontFamily="system-ui, sans-serif">Meta</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
