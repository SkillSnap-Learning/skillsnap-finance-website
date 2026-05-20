import Link from "next/link";

const CHART_BARS = [
  { pct: 20, type: "inv" },
  { pct: 32, type: "inv" },
  { pct: 46, type: "ret" },
  { pct: 60, type: "ret" },
  { pct: 75, type: "ret" },
  { pct: 88, type: "ret" },
  { pct: 100, type: "ret" },
];

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function BentoGrid() {
  return (
    <section style={{ padding: "88px 0", background: "var(--bg)" }}>

      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: ".12em",
          textTransform: "uppercase", color: "var(--em)", marginBottom: 12,
        }}>
          Free Tools
        </div>
        <h2 style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "clamp(28px,3.2vw,40px)", fontWeight: 800,
          color: "var(--text)", letterSpacing: "-.025em", lineHeight: 1.2,
        }}>
          Calculators that give you{" "}
          <em style={{ fontStyle: "italic", color: "var(--navy-2)" }}>real answers</em>
        </h2>
        <p style={{
          fontSize: 15, color: "var(--muted)",
          marginTop: 12, lineHeight: 1.7, maxWidth: 480,
        }}>
          Not estimates. Not ballparks. Exact numbers for your exact situation.
        </p>
      </div>

      {/* Grid */}
      <div className="bento-grid">

        {/* SIP — tall */}
        <Link href="/calculators/sip" className="bento-item bento-sip">
          <div className="bi-ey">Most Popular</div>
          <div className="bi-h" style={{ fontSize: 26 }}>SIP Calculator</div>
          <div className="bi-sub">
            Enter your monthly investment, duration, and expected return — see exactly how your wealth compounds.
          </div>
          {/* Mini chart */}
          <div style={{
            display: "flex", alignItems: "flex-end", gap: 4,
            height: 60, margin: "16px 0",
          }}>
            {CHART_BARS.map((b, i) => (
              <div key={i} style={{
                flex: 1, height: `${b.pct}%`,
                borderRadius: "3px 3px 0 0",
                background: b.type === "inv"
                  ? "var(--nl)"
                  : "linear-gradient(180deg,#34D399,var(--em))",
              }} />
            ))}
          </div>
          {/* Result pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--el)",
            border: "1px solid rgba(5,150,105,.2)",
            padding: "8px 14px", borderRadius: 10,
            fontSize: 13, fontWeight: 700, color: "var(--em)",
          }}>
            <span>₹5K/mo × 10yr</span>
            <strong>= ₹11.6L</strong>
          </div>
          <div className="bi-link" style={{ marginTop: 16 }}>
            Calculate now <ArrowRight />
          </div>
        </Link>

        {/* EMI */}
        <Link href="/calculators/emi" className="bento-item bento-emi">
          <div className="bi-ey">Home · Car · Personal</div>
          <div className="bi-h">EMI Calculator</div>
          <div className="bi-sub">Know your exact monthly outgo before you sign any loan agreement.</div>
          <div className="bi-link" style={{ marginTop: 14 }}>
            Calculate now <ArrowRight />
          </div>
        </Link>

        {/* Tax */}
        <Link href="/calculators/tax" className="bento-item bento-tax">
          <div className="bi-ey">FY 2025–26</div>
          <div className="bi-h">Tax Regime</div>
          <div className="bi-sub">Old vs New — which saves more at your salary.</div>
          <div className="bi-link" style={{ marginTop: 14 }}>
            Compare <ArrowRight />
          </div>
        </Link>

        {/* Education — wide */}
        <Link href="/calculators/education-corpus" className="bento-item bento-edu">
          <div className="bi-ey">Plan for 2030–2036</div>
          <div className="bi-h">Education Corpus Calculator</div>
          <div className="bi-sub">
            How much should you invest today so your child&apos;s college fees are fully covered — accounting for education inflation at 10% annually?
          </div>
          <div className="bi-link" style={{ marginTop: 14 }}>
            Plan your child&apos;s future <ArrowRight />
          </div>
        </Link>

        {/* Term insurance */}
        <Link href="/insurance/term-insurance-how-much-needed" className="bento-item bento-term">
          <div className="bi-ey">Insurance</div>
          <div className="bi-h">Term Cover Estimator</div>
          <div className="bi-sub">
            Find out exactly how much life cover your family actually needs — not what agents tell you.
          </div>
          <div className="bi-link" style={{ marginTop: 14 }}>
            Estimate cover <ArrowRight />
          </div>
        </Link>

      </div>

      <style>{`
        .bento-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
        }
        .bento-sip  { grid-column: span 5; grid-row: span 2; }
        .bento-emi  { grid-column: span 4; }
        .bento-tax  { grid-column: span 3; }
        .bento-edu  { grid-column: span 7; }
        .bento-term { grid-column: span 5; }

        .bento-item {
          background: white;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          text-decoration: none;
          display: block;
          position: relative;
          overflow: hidden;
          transition: all .2s;
        }
        .bento-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 16px 16px 0 0;
          opacity: 0;
          transition: opacity .25s;
        }
        .bento-item:hover {
          box-shadow: 0 8px 32px rgba(11,31,79,.1);
          transform: translateY(-3px);
          border-color: transparent;
        }
        .bento-item:hover::before { opacity: 1; }

        .bento-sip::before  { background: linear-gradient(90deg,var(--em),#34D399); }
        .bento-emi::before  { background: var(--navy-2); }
        .bento-tax::before  { background: var(--gold); }
        .bento-edu::before  { background: var(--em); }
        .bento-term::before { background: #7C3AED; }

        .bi-ey {
          font-size: 10.5px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 10px;
        }
        .bi-h {
          font-family: var(--font-jakarta);
          font-size: 22px; font-weight: 800;
          color: var(--text); line-height: 1.2;
          letter-spacing: -.02em; margin-bottom: 8px;
        }
        .bi-sub {
          font-size: 13px; color: var(--muted);
          line-height: 1.65; margin-bottom: 16px;
        }
        .bi-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 700; color: var(--em);
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .bento-grid { display: flex; flex-direction: column; }
        }
      `}</style>
    </section>
  );
}