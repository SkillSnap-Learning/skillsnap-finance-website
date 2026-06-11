import Image from "next/image";

const CARDS = [
  {
    num: "01 / 04",
    title: "Zero conflict of interest",
    desc: "We don't sell financial products, earn commissions, or accept sponsored content. Every article is written purely to inform — not to sell you something.",
    img: "/images/why/battle-tactics.webp",
    alt: "Zero conflict of interest",
    gradient: "linear-gradient(135deg,#0d2a6e 0%,#1A3A8F 100%)",
    top: 100,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    num: "02 / 04",
    title: "Plain language, always",
    desc: "No CAGR-heavy jargon. No fine print traps. We explain every concept the way a knowledgeable friend would — clear, direct, and honest about the downsides too.",
    img: "/images/why/plain-language.webp",
    alt: "Plain language",
    gradient: "linear-gradient(135deg,#064e3b 0%,#059669 100%)",
    top: 120,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    num: "03 / 04",
    title: "Built for Indian families",
    desc: "Not America-first content with an Indian flag slapped on. Our guides cover PPF, SSY, EPF, the Indian tax regime, SEBI regulations — the real stuff that affects your life.",
    img: "/images/why/indian-family.webp",
    alt: "Built for India",
    gradient: "linear-gradient(135deg,#78350f 0%,#d97706 100%)",
    top: 140,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
  },
  {
    num: "04 / 04",
    title: "Free tools that respect you",
    desc: "Our calculators don't ask for your phone number to show results. No email walls, no dark patterns. Just open the tool, enter your numbers, get your answer.",
    img: "/images/why/sip-calculator-free.webp",
    alt: "Free tools",
    gradient: "linear-gradient(135deg,#3b0764 0%,#7c3aed 100%)",
    top: 160,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="8" y1="10" x2="16" y2="10"/>
        <line x1="8" y1="14" x2="12" y2="14"/>
      </svg>
    ),
  },
];

export default function StackingCards() {
  return (
    <section style={{
      background: "var(--navy)",
      padding: "80px 0 120px",
      position: "relative",
    }}>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle,rgba(255,255,255,.025) 1px,transparent 1px)",
        backgroundSize: "26px 26px",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{
        textAlign: "center",
        maxWidth: 640, margin: "0 auto",
        padding: "0 24px 64px",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: ".12em",
          textTransform: "uppercase", color: "rgba(5,150,105,.85)",
          marginBottom: 12,
        }}>
          Why SkillSnap Finance
        </div>
        <h2 style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "clamp(28px,3.2vw,42px)", fontWeight: 800,
          color: "white", letterSpacing: "-.025em", lineHeight: 1.2,
        }}>
          Finance advice that&apos;s actually{" "}
          <em style={{ fontStyle: "italic", color: "#34D399" }}>on your side</em>
        </h2>
        <p style={{
          fontSize: 15, color: "rgba(255,255,255,.5)",
          marginTop: 12, lineHeight: 1.7,
        }}>
          Four reasons why 10,000+ Indian families trust us for financial guidance.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 24px",
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column",
      }}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="stack-card"
            style={{
              position: "sticky",
              top: card.top,
              background: card.gradient,
              borderRadius: 20,
              padding: "48px 52px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {/* Dot pattern overlay */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)",
              backgroundSize: "20px 20px",
              borderRadius: 20, pointerEvents: "none",
            }} />

            {/* Text */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                fontFamily: "monospace",
                fontSize: 11, fontWeight: 500,
                color: "rgba(255,255,255,.3)",
                letterSpacing: ".1em", marginBottom: 16,
              }}>
                {card.num}
              </div>
              <div className="card-icon" style={{
                width: 44, height: 44, borderRadius: 11,
                background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20, color: "rgba(255,255,255,.85)",
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 800,
                color: "white", lineHeight: 1.2,
                letterSpacing: "-.02em", marginBottom: 14,
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: 15, color: "rgba(255,255,255,.65)",
                lineHeight: 1.75, maxWidth: 380,
              }}>
                {card.desc}
              </p>
            </div>

            {/* Image */}
            <div style={{
              position: "relative", zIndex: 1,
              borderRadius: 12, overflow: "hidden",
              aspectRatio: "4/3",
            }}>
              <Image
                className="card-img"
                src={card.img}
                alt={card.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* Image slow-zoom on hover */
        .card-img {
          transition: transform .8s cubic-bezier(.22,1,.36,1);
          will-change: transform;
        }
        .stack-card:hover .card-img { transform: scale(1.07); }

        /* Icon badge micro-interaction */
        .card-icon {
          transition: transform .4s cubic-bezier(.34,1.56,.64,1),
                      background .4s ease, box-shadow .4s ease;
        }
        .stack-card:hover .card-icon {
          transform: translateY(-3px) rotate(-6deg);
          background: rgba(255,255,255,.22) !important;
          box-shadow: 0 10px 26px rgba(0,0,0,.28);
        }

        /* Scroll-driven entrance + stacking depth.
           Wrapped so unsupported browsers / reduced-motion keep the static layout. */
        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: view()) {
            .stack-card {
              animation: card-reveal linear both, card-stack linear both;
              animation-timeline: view(), view();
              animation-range: entry 0% entry 80%,
                               exit-crossing 0% exit-crossing 100%;
              transform-origin: center top;
            }
            @keyframes card-reveal {
              from { opacity: 0; translate: 0 70px; }
              to   { opacity: 1; translate: 0 0; }
            }
            @keyframes card-stack {
              to { scale: .9; filter: brightness(.6) saturate(.92); }
            }
          }
        }

        @media (max-width: 768px) {
          .stack-card {
            grid-template-columns: 1fr !important;
            padding: 32px 28px !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 480px) {
          section { padding: 60px 0 80px !important; }
        }
      `}</style>
    </section>
  );
}