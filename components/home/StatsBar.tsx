const STATS = [
  { num: "6",    suffix: "+",    desc: "Finance categories covered"   },
  { num: "5",    suffix: "+",    desc: "Free financial calculators"   },
  { num: "100",  suffix: "%",    desc: "Free. No paywalls, ever"      },
  { num: "0",    suffix: " ads", desc: "Clean reading experience"     },
];

export default function StatsBar() {
  return (
    <div style={{
      padding: "48px 0",
      background: "white",
      borderBottom: "1px solid var(--border)",
    }}>
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className="stat-cell">
            <div style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 36, fontWeight: 800,
              color: "var(--navy)", lineHeight: 1,
              letterSpacing: "-.03em",
            }}>
              {s.num}
              <span style={{ color: "var(--em)" }}>{s.suffix}</span>
            </div>
            <div style={{
              fontSize: 13.5, color: "var(--muted)", fontWeight: 500,
            }}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stats-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-cell {
          padding: 32px 40px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          border-right: 1px solid var(--border);
        }
        .stat-cell:last-child { border-right: none; }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .stat-cell:nth-child(2) { border-right: none; }
        }
      `}</style>
    </div>
  );
}