const ITEMS = [
  { label: "NIFTY 50",   value: "24,845.65", change: "+0.42%", up: true  },
  { label: "SENSEX",     value: "81,724.40", change: "+0.38%", up: true  },
  { label: "BANK NIFTY", value: "52,934.20", change: "-0.14%", up: false },
  { label: "USD/INR",    value: "84.21",     change: "-0.09%", up: false },
  { label: "GOLD",       value: "₹92,450",   change: "+0.61%", up: true  },
  { label: "REPO RATE",  value: "6.00%",     change: "RBI",    up: true  },
  { label: "PPF RATE",   value: "7.10%",     change: "Q1 FY26",up: true  },
  { label: "SSY RATE",   value: "8.20%",     change: "Q1 FY26",up: true  },
];

function TickerTrack() {
  return (
    <div style={{ display: "flex", padding: "11px 0" }}>
      {ITEMS.map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 9,
          padding: "0 28px",
          borderRight: i < ITEMS.length - 1 ? "1px solid rgba(255,255,255,.08)" : "none",
          whiteSpace: "nowrap",
        }}>
          <span style={{
            fontSize: 11, color: "rgba(255,255,255,.4)",
            fontWeight: 600, letterSpacing: ".05em",
            fontFamily: "var(--font-jakarta)",
          }}>
            {item.label}
          </span>
          <span style={{
            fontSize: 11.5, fontWeight: 700,
            color: "rgba(255,255,255,.85)",
            fontFamily: "monospace",
          }}>
            {item.value}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: item.up ? "#34D399" : "#F87171",
          }}>
            {item.change}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div style={{
      background: "var(--navy)",
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,.06)",
    }}>
      <div className="ticker-inner">
        <TickerTrack />
        <TickerTrack />
      </div>

      <style>{`
        .ticker-inner {
          display: flex;
          width: max-content;
          animation: ticker 28s linear infinite;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}