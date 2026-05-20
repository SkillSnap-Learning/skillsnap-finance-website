import Link from "next/link";

const CARDS = [
  {
    href: "/investing/sip-beginners-guide",
    accent: "#059669",
    iconBg: "#ECFDF5",
    iconColor: "#059669",
    action: "Start investing with ₹500/mo",
    sub: "Mutual funds & SIPs for beginners",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    href: "/tax/old-regime-vs-new-regime",
    accent: "#D97706",
    iconBg: "#FEF9EE",
    iconColor: "#D97706",
    action: "File my ITR correctly",
    sub: "Old vs new regime + 80C guide",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="8" y1="13" x2="16" y2="13"/>
        <line x1="8" y1="17" x2="12" y2="17"/>
      </svg>
    ),
  },
  {
    href: "/insurance/term-insurance-how-much-needed",
    accent: "#7C3AED",
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
    action: "Buy the right term insurance",
    sub: "How much cover you actually need",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    href: "/calculators/education-corpus",
    accent: "#DB2777",
    iconBg: "#FDF2F8",
    iconColor: "#DB2777",
    action: "Save for my child's college",
    sub: "Education corpus calculator",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    href: "/schemes/ppf-complete-guide",
    accent: "#0284C7",
    iconBg: "#F0F9FF",
    iconColor: "#0284C7",
    action: "Use government schemes",
    sub: "PPF, SSY, EPF explained simply",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    href: "/loans/home-loan-guide",
    accent: "#1A3A8F",
    iconBg: "#EEF3FF",
    iconColor: "#1A3A8F",
    action: "Understand my home loan",
    sub: "EMI, prepayment & interest savings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
];

export default function StartHereStrip() {
  return (
    <div style={{
      background: "white",
      borderBottom: "1px solid var(--border)",
      padding: "40px 0",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: "var(--em)",
            letterSpacing: ".12em", textTransform: "uppercase",
            display: "block", marginBottom: 8,
          }}>
            Personalised for you
          </span>
          <div style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "clamp(20px,2.2vw,26px)",
            fontWeight: 800, color: "var(--text)",
            letterSpacing: "-.02em",
          }}>
            What do you want to do today?
          </div>
        </div>

        {/* Cards grid */}
        <div className="start-cards-grid">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="start-card-item"
              style={{ "--accent": card.accent } as React.CSSProperties}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 11,
                background: card.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, color: card.iconColor,
              }}>
                {card.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{
                  fontSize: 13, fontWeight: 700,
                  color: "var(--text)", lineHeight: 1.3,
                  fontFamily: "var(--font-jakarta)",
                }}>
                  {card.action}
                </span>
                <span style={{
                  fontSize: 11.5, color: "var(--muted)",
                  fontWeight: 500, lineHeight: 1.4,
                }}>
                  {card.sub}
                </span>
              </div>
              <div className="start-card-arrow">
                Explore
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <style>{`
        .start-cards-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        .start-card-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          padding: 20px 18px;
          border-radius: 14px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all .2s;
        }
        .start-card-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .25s ease;
          border-radius: 14px 14px 0 0;
        }
        .start-card-item:hover::before { transform: scaleX(1); }
        .start-card-item:hover {
          border-color: transparent;
          background: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(11,31,79,.1);
        }
        .start-card-arrow {
          margin-top: auto;
          font-size: 12px;
          font-weight: 700;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color .2s, gap .2s;
        }
        .start-card-item:hover .start-card-arrow {
          color: var(--navy-2);
          gap: 7px;
        }
        @media (max-width: 1100px) {
          .start-cards-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .start-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 380px) {
          .start-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}