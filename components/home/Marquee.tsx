import Link from "next/link";

const TESTIMONIALS = [
  { q: "Finally a finance site that explains things without making me feel stupid. The SIP calculator genuinely changed how I think about savings.", name: "Rahul Sharma", role: "Software Engineer, Bengaluru", color: "#1A3A8F" },
  { q: "The old vs new tax regime article saved me ₹18,000 this year. I had been on the wrong regime for 2 years without realising.", name: "Priya Nair", role: "Teacher, Kochi", color: "#059669" },
  { q: "Used the education corpus calculator for my daughter's college. Now I know exactly how much to SIP monthly.", name: "Amit Verma", role: "Father of 2, Gurgaon", color: "#D97706" },
  { q: "The LIC vs term insurance article is the most honest piece I've read. My agent hates this website and that's why I trust it.", name: "Sunita Mehta", role: "Homemaker, Jaipur", color: "#7C3AED" },
  { q: "No ads, no spam, no agenda. Just clean financial information. Rare to find on the internet.", name: "Kiran Reddy", role: "CA, Hyderabad", color: "#0284C7" },
  { q: "The PPF guide is the best I've found anywhere. Clear, complete, answers questions I've had for years.", name: "Meera Joshi", role: "Govt. Employee, Pune", color: "#DB2777" },
  { q: "Recommended to my entire family WhatsApp group. My parents finally understand what EPF is after 30 years.", name: "Vikram Singh", role: "Product Manager, Delhi", color: "#059669" },
  { q: "I'm a practicing CA and I still found the 80C guide useful. The way it explains fine print is impressive.", name: "Naveen Kumar", role: "Chartered Accountant, Mumbai", color: "#1A3A8F" },
  { q: "The EMI calculator helped me decide to prepay my home loan 3 years early. Incredible tool.", name: "Deepika Patel", role: "IT Professional, Ahmedabad", color: "#D97706" },
  { q: "As a first-generation investor, this is what I needed. No jargon. No pressure. Just knowledge.", name: "Tarun Gupta", role: "Fresher, Lucknow", color: "#7C3AED" },
  { q: "The government schemes section is a goldmine. I didn't know about PMSBY until I found this site.", name: "Suresh Babu", role: "Business Owner, Chennai", color: "#0284C7" },
  { q: "Shared this with my college friends. The term cover calculator blew their minds.", name: "Ananya Rathi", role: "MBA Student, Pune", color: "#DB2777" },
];

// Split into 4 columns
const COLS = [0, 1, 2, 3].map(ci =>
  TESTIMONIALS.filter((_, i) => i % 4 === ci)
);

function Card({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{
      background: "rgba(255,255,255,.07)",
      border: "1px solid rgba(255,255,255,.1)",
      borderRadius: 14,
      padding: "18px 20px",
      aspectRatio: "970/580",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      <div>
        <div style={{ color: "#FBBF24", fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>★★★★★</div>
        <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.72)", lineHeight: 1.65 }}>
          &ldquo;{t.q}&rdquo;
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 12 }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: t.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0,
        }}>
          {t.name[0]}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "white", fontFamily: "var(--font-jakarta)" }}>
            {t.name}
          </div>
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.38)" }}>
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section style={{
      position: "relative",
      minHeight: 580,
      background: "var(--navy)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {/* 3D card grid in background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div className="mq-scale">
          <div className="mq-rotated">
            {COLS.map((col, ci) => (
              <div key={ci} className={`mq-col mq-col-${ci % 2 === 0 ? "odd" : "even"}`}>
                {[...col, ...col].map((t, i) => (
                  <Card key={i} t={t} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        background: "rgba(11,31,79,.78)",
        pointerEvents: "none",
      }} />

      {/* Center text */}
      <div style={{
        position: "relative", zIndex: 20,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "40px 24px",
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: ".12em",
          textTransform: "uppercase", color: "rgba(5,150,105,.85)",
          marginBottom: 18,
        }}>
          Trusted by readers across India
        </div>
        <div style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "clamp(36px,6vw,72px)", fontWeight: 800,
          letterSpacing: "-.03em", lineHeight: 1.05,
          marginBottom: 16,
        }}>
          <div style={{ color: "white" }}>Real people.</div>
          <div style={{ color: "#34D399" }}>Real results.</div>
        </div>
        <p style={{
          fontSize: 15, color: "rgba(255,255,255,.55)",
          marginBottom: 32, maxWidth: 400, lineHeight: 1.7,
        }}>
          What Indian families say about SkillSnap Finance
        </p>
        <Link href="/investing" className="mq-btn">
          Start Reading Free →
        </Link>
      </div>

      <style>{`
        .mq-scale {
          width: 1600px; height: 1600px;
          flex-shrink: 0;
          transform: scale(.38);
          transform-origin: center center;
        }
        @media (min-width: 640px)  { .mq-scale { transform: scale(.52); } }
        @media (min-width: 1024px) { .mq-scale { transform: scale(.72); } }

        .mq-rotated {
          width: 100%; height: 100%;
          transform: rotateX(52deg) rotateY(0deg) rotateZ(-43deg);
          transform-style: preserve-3d;
          position: relative;
          top: 360px; right: 50%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .mq-col {
          display: flex; flex-direction: column; gap: 20px;
        }
        .mq-col-odd  { animation: mqUp   10s ease-in-out infinite alternate; }
        .mq-col-even { animation: mqDown 13s ease-in-out infinite alternate; }

        @keyframes mqUp   { from { transform: translateY(0); }     to { transform: translateY(-100px); } }
        @keyframes mqDown { from { transform: translateY(-80px); } to { transform: translateY(60px); }   }

        .mq-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 10px;
          font-size: 14px; font-weight: 700;
          background: var(--em); color: white;
          text-decoration: none;
          font-family: var(--font-jakarta);
          box-shadow: 0 2px 12px rgba(5,150,105,.4);
          transition: all .2s;
        }
        .mq-btn:hover {
          background: var(--em-2);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}