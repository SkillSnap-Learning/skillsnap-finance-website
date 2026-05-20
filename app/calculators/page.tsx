import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Calculator } from "@/lib/calculators/types";

export const metadata: Metadata = {
  title: "Free Financial Calculators — SkillSnap Finance",
  description: "Free online financial calculators for Indian families. SIP calculator, EMI calculator, tax regime comparator, education corpus calculator and more.",
};

const API = process.env.NEXT_PUBLIC_API_URL;

async function getAllCalculators(): Promise<Calculator[]> {
  try {
    const res = await fetch(`${API}/calculators?isActive=true`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

function buildListingJsonLd(calculators: Calculator[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Financial Calculators",
    "description": "Free online financial calculators for Indian families",
    "url": "https://finance.skillsnaplearning.com/calculators",
    "numberOfItems": calculators.length,
    "itemListElement": calculators.map((calc, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": calc.heading,
      "url": `https://finance.skillsnaplearning.com/calculators/${calc.slug}`,
    })),
  };
}

// Group calculators by type
function groupByType(calculators: Calculator[]) {
  const order = ["sip", "emi", "ppf", "tax", "education", "term", "rd", "fd", "nps", "other"];
  const groups: Record<string, Calculator[]> = {};
  calculators.forEach(c => {
    if (!groups[c.type]) groups[c.type] = [];
    groups[c.type].push(c);
  });
  // Sort: core first, variants after within each group
  Object.keys(groups).forEach(type => {
    groups[type].sort((a, b) => Number(a.isVariant) - Number(b.isVariant));
  });
  // Return in defined order
  return order.filter(t => groups[t]?.length).map(t => ({ type: t, items: groups[t] }));
}

const TYPE_META: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  sip:       { label: "SIP",             color: "#059669", bg: "#ECFDF5", icon: "📈" },
  emi:       { label: "EMI & Loans",     color: "#1A3A8F", bg: "#EEF3FF", icon: "🏠" },
  ppf:       { label: "PPF",             color: "#0284C7", bg: "#F0F9FF", icon: "🏛️" },
  tax:       { label: "Tax",             color: "#D97706", bg: "#FEF9EE", icon: "📋" },
  education: { label: "Education",       color: "#DB2777", bg: "#FDF2F8", icon: "🎓" },
  term:      { label: "Insurance",       color: "#7C3AED", bg: "#F5F3FF", icon: "🛡️" },
  rd:        { label: "RD",              color: "#059669", bg: "#ECFDF5", icon: "💰" },
  fd:        { label: "Fixed Deposit",   color: "#0284C7", bg: "#F0F9FF", icon: "🏦" },
  nps:       { label: "NPS",             color: "#1A3A8F", bg: "#EEF3FF", icon: "👴" },
  other:     { label: "Other",           color: "#64748B", bg: "#F8FAFC", icon: "🔢" },
};

export default async function CalculatorsPage() {
  const calculators = await getAllCalculators();
  const groups = groupByType(calculators);
  const total = calculators.length;

  return (
    <>
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(buildListingJsonLd(calculators)) }}
/>
      <Navbar />

      {/* Hero */}
      <div style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        padding: "40px 0 36px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12.5, color: "var(--muted)",
            marginBottom: 20, fontWeight: 500,
          }}>
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--border)", fontSize: 14 }}>›</span>
            <span style={{ color: "var(--text)", fontWeight: 600 }}>Calculators</span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800,
            color: "var(--navy)", letterSpacing: "-.025em",
            lineHeight: 1.15, marginBottom: 12,
          }}>
            Free Financial Calculators
          </h1>
          <p style={{
            fontSize: 16, color: "var(--muted)",
            lineHeight: 1.65, maxWidth: 560, marginBottom: 24,
          }}>
            {total} free calculators for Indian families. No sign-up, no phone number, no nonsense.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { num: `${total}+`, label: "Free calculators" },
              { num: "0",         label: "Sign-ups needed" },
              { num: "100%",      label: "Ad-free" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontFamily: "var(--font-jakarta)",
                  fontSize: 20, fontWeight: 800,
                  color: "var(--em)",
                }}>
                  {s.num}
                </span>
                <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
        {groups.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            No calculators available yet.
          </div>
        ) : groups.map(({ type, items }) => {
          const meta = TYPE_META[type] || TYPE_META.other;
          const core = items.filter(c => !c.isVariant);
          const variants = items.filter(c => c.isVariant);

          return (
            <div key={type} style={{ marginBottom: 56 }}>
              {/* Group header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                marginBottom: 20,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: meta.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0,
                }}>
                  {meta.icon}
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-jakarta)",
                    fontSize: 18, fontWeight: 800,
                    color: "var(--navy)", letterSpacing: "-.01em",
                    lineHeight: 1,
                  }}>
                    {meta.label} Calculators
                  </h2>
                  <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>
                    {items.length} calculator{items.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Core calculators — big cards */}
              {core.length > 0 && (
                <div className="calc-core-grid">
                  {core.map(calc => (
                    <Link
                      key={calc._id}
                      href={`/calculators/${calc.slug}`}
                      className="calc-core-card"
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: meta.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22, marginBottom: 16, flexShrink: 0,
                      }}>
                        {meta.icon}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-jakarta)",
                        fontSize: 17, fontWeight: 800,
                        color: "var(--navy)", marginBottom: 8,
                        letterSpacing: "-.01em", lineHeight: 1.2,
                      }}>
                        {calc.heading}
                      </div>
                      <div style={{
                        fontSize: 13, color: "var(--muted)",
                        lineHeight: 1.6, flex: 1,
                      }}>
                        {calc.subheading || calc.metaDescription.slice(0, 80) + "..."}
                      </div>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        marginTop: 20, fontSize: 13, fontWeight: 700,
                        color: meta.color,
                      }}>
                        Calculate now
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                      {/* Accent bar */}
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: 3, background: meta.color,
                        borderRadius: "16px 16px 0 0",
                      }} />
                    </Link>
                  ))}
                </div>
              )}

              {/* Variant calculators — compact list */}
              {variants.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <p style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
                    textTransform: "uppercase", color: "var(--muted)",
                    marginBottom: 10,
                  }}>
                    More {meta.label} Calculators
                  </p>
                  <div className="calc-variant-grid">
                    {variants.map(calc => (
                      <Link
                        key={calc._id}
                        href={`/calculators/${calc.slug}`}
                        className="calc-variant-item"
                      >
                        <span style={{ fontSize: 14, color: "var(--muted)", flexShrink: 0 }}>
                          {meta.icon}
                        </span>
                        <span style={{
                          fontSize: 13.5, fontWeight: 500,
                          color: "var(--text)",
                        }}>
                          {calc.heading}
                        </span>
                        <svg
                          width="13" height="13" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2.5"
                          style={{ color: "var(--muted)", flexShrink: 0, marginLeft: "auto" }}
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Footer />

      <style>{`
        .calc-core-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .calc-core-card {
          position: relative;
          background: white;
          border-radius: 16px;
          padding: 28px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          transition: all .2s;
          overflow: hidden;
        }
        .calc-core-card:hover {
          box-shadow: 0 8px 32px rgba(11,31,79,.1);
          transform: translateY(-3px);
          border-color: transparent;
        }
        .calc-variant-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .calc-variant-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 10px;
          text-decoration: none;
          transition: all .15s;
        }
        .calc-variant-item:hover {
          background: var(--nl);
          border-color: var(--navy-2);
        }
        .calc-variant-item:hover span:last-of-type {
          color: var(--navy-2);
        }
        @media (max-width: 900px) {
          .calc-core-grid { grid-template-columns: repeat(2, 1fr); }
          .calc-variant-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .calc-core-grid { grid-template-columns: 1fr; }
          .calc-variant-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}