"use client";
import { useState } from "react";
import Link from "next/link";

type Article = {
  href: string;
  cat: string;
  wm: string;
  bg: string;
  title: string;
  date: string;
  read: string;
};

const DATA: Record<string, Article[]> = {
  articles: [
    { href: "/tax/old-regime-vs-new-regime",         cat: "Tax Planning",   wm: "Tax",    bg: "",                                                            title: "Old Tax Regime vs New Tax Regime: Which saves more for a ₹12L salary in 2025–26?",          date: "May 14, 2026", read: "8 mins read" },
    { href: "/investing/index-funds-vs-active-funds", cat: "Investing",      wm: "Invest", bg: "linear-gradient(135deg,#064e3b 0%,#059669 100%)",             title: "Why index funds beat 90% of active mutual funds — and how to pick the right one",            date: "May 12, 2026", read: "6 mins read" },
    { href: "/insurance/lic-vs-term-insurance",       cat: "Insurance",      wm: "Insure", bg: "linear-gradient(135deg,#3b0764 0%,#7c3aed 100%)",             title: "LIC vs Term Insurance: The honest comparison your agent doesn't want you to see",            date: "May 10, 2026", read: "5 mins read" },
    { href: "/family-finance/child-education-corpus", cat: "Family Finance", wm: "Family", bg: "linear-gradient(135deg,#831843 0%,#db2777 100%)",             title: "How much should you save for your child's engineering degree in 2033?",                      date: "May 8, 2026",  read: "7 mins read" },
    { href: "/schemes/sukanya-samriddhi-yojana",      cat: "Govt. Schemes",  wm: "Govt",   bg: "linear-gradient(135deg,#0c4a6e 0%,#0284c7 100%)",             title: "Sukanya Samriddhi Yojana 2025: Interest rate, rules, and is it worth it?",                   date: "May 6, 2026",  read: "5 mins read" },
    { href: "/loans/home-loan-prepayment-strategy",   cat: "Loans & Credit", wm: "Loans",  bg: "linear-gradient(135deg,#78350f 0%,#d97706 100%)",             title: "Home loan prepayment strategy: Save ₹12 lakhs in interest with one simple rule",             date: "May 4, 2026",  read: "6 mins read" },
  ],
  guides: [
    { href: "/investing/beginners-guide",             cat: "Investing",      wm: "Guide",  bg: "linear-gradient(135deg,#064e3b 0%,#059669 100%)",             title: "Complete Beginner's Guide to Investing in India — where to start in 2025",                  date: "May 2, 2026",  read: "12 mins read" },
    { href: "/tax/complete-80c-guide",                cat: "Tax Planning",   wm: "Tax",    bg: "",                                                            title: "Section 80C: The complete guide to saving ₹46,800 in tax every year",                        date: "Apr 30, 2026", read: "10 mins read" },
    { href: "/insurance/health-insurance-guide",      cat: "Insurance",      wm: "Guide",  bg: "linear-gradient(135deg,#3b0764 0%,#7c3aed 100%)",             title: "Health Insurance in India: Everything you need to know before buying",                       date: "Apr 28, 2026", read: "11 mins read" },
    { href: "/schemes/ppf-complete-guide",            cat: "Govt. Schemes",  wm: "PPF",    bg: "linear-gradient(135deg,#0c4a6e 0%,#0284c7 100%)",             title: "PPF Complete Guide 2025: Rules, interest rate, withdrawal, and tax benefits",                date: "Apr 26, 2026", read: "9 mins read"  },
    { href: "/loans/home-loan-guide",                 cat: "Loans",          wm: "Loans",  bg: "linear-gradient(135deg,#78350f 0%,#d97706 100%)",             title: "Home Loan Guide India: Eligibility, interest rates, and EMI strategies",                     date: "Apr 24, 2026", read: "10 mins read" },
    { href: "/family-finance/emergency-fund-guide",   cat: "Family Finance", wm: "Fund",   bg: "linear-gradient(135deg,#831843 0%,#db2777 100%)",             title: "Emergency Fund: How much do you need and where to keep it in India?",                        date: "Apr 22, 2026", read: "7 mins read"  },
  ],
  calculators: [
    { href: "/calculators/sip-calculator",                       cat: "Calculator",     wm: "SIP",    bg: "linear-gradient(135deg,#064e3b 0%,#059669 100%)",             title: "SIP Calculator — See exactly how ₹5,000/month grows over 10 years",                         date: "Updated May 2026", read: "Free tool" },
    { href: "/calculators/emi-calculator",                       cat: "Calculator",     wm: "EMI",    bg: "",                                                            title: "EMI Calculator — Home loan, car loan, personal loan monthly outgo",                          date: "Updated May 2026", read: "Free tool" },
    { href: "/calculators/tax-calculator",                       cat: "Calculator",     wm: "Tax",    bg: "linear-gradient(135deg,#78350f 0%,#d97706 100%)",             title: "Tax Regime Comparator — Old vs New for your exact salary in FY 2025–26",                    date: "Updated May 2026", read: "Free tool" },
    { href: "/calculators/education-corpus-calculator",          cat: "Calculator",     wm: "Edu",    bg: "linear-gradient(135deg,#831843 0%,#db2777 100%)",             title: "Education Corpus Calculator — How much to save for your child's college in 2033",            date: "Updated May 2026", read: "Free tool" },
    { href: "/calculators/term-cover-estimator-calculator",                cat: "Calculator",     wm: "Term",   bg: "linear-gradient(135deg,#3b0764 0%,#7c3aed 100%)",             title: "Term Cover Estimator — How much life insurance does your family actually need?",             date: "Updated May 2026", read: "Free tool" },
    { href: "/calculators/ppf-calculator",                       cat: "Calculator",     wm: "PPF",    bg: "linear-gradient(135deg,#0c4a6e 0%,#0284c7 100%)",             title: "PPF Maturity Calculator — Returns, partial withdrawal, and tax savings",                     date: "Updated May 2026", read: "Free tool" },
  ],
};

const DEFAULT_BG = "linear-gradient(135deg,var(--navy) 0%,var(--navy-2) 60%,var(--navy-3) 100%)";

function ArticleCard({ a }: { a: Article }) {
  return (
    <Link href={a.href} className="art-card">
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <div style={{
          width: "100%", height: "100%",
          background: a.bg || DEFAULT_BG,
          position: "relative", display: "flex",
          alignItems: "flex-end", padding: 14,
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,.05) 1px,transparent 1px)",
            backgroundSize: "18px 18px", pointerEvents: "none",
          }} />
          <div style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: 48, fontWeight: 800,
            color: "rgba(255,255,255,.08)",
            position: "absolute", right: 16, bottom: -4,
            letterSpacing: "-.04em", lineHeight: 1,
          }}>
            {a.wm}
          </div>
        </div>
        <span style={{
          position: "absolute", top: 12, left: 12,
          padding: "4px 10px", borderRadius: 6,
          fontSize: 10.5, fontWeight: 700,
          letterSpacing: ".05em", textTransform: "uppercase",
          backdropFilter: "blur(8px)",
          background: "rgba(255,255,255,.15)",
          border: "1px solid rgba(255,255,255,.2)",
          color: "white", zIndex: 1,
        }}>
          {a.cat}
        </span>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <div className="art-card-title">{a.title}</div>
        <div style={{
          fontSize: 12, color: "var(--muted)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span>{a.date}</span>
          <div style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--border)", flexShrink: 0 }} />
          <span>{a.read}</span>
        </div>
      </div>
    </Link>
  );
}

export default function Articles() {
  const [active, setActive] = useState<"articles" | "guides" | "calculators">("articles");
  const [fading, setFading] = useState(false);
  const [displayed, setDisplayed] = useState<Article[]>(DATA.articles);

  function switchTab(key: "articles" | "guides" | "calculators") {
    if (key === active) return;
    setFading(true);
    setTimeout(() => {
      setDisplayed(DATA[key]);
      setActive(key);
      setFading(false);
    }, 150);
  }

  return (
    <section style={{
      padding: "88px 0",
      background: "white",
      borderTop: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header row */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 36, gap: 16, flexWrap: "wrap",
        }}>
          <h2 style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "clamp(26px,3vw,36px)", fontWeight: 800,
            color: "var(--text)", letterSpacing: "-.025em",
          }}>
            Latest Articles
          </h2>
          {/* Tab toggles */}
          <div style={{
            display: "flex", border: "1px solid var(--border)",
            borderRadius: 8, overflow: "hidden",
          }}>
            {(["articles", "guides", "calculators"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                style={{
                  padding: "8px 18px",
                  fontSize: 13, fontWeight: 600,
                  border: "none", cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all .2s",
                  background: active === tab ? "var(--navy)" : "white",
                  color: active === tab ? "white" : "var(--muted)",
                  textTransform: "capitalize",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className="articles-grid"
          style={{ opacity: fading ? 0 : 1, transition: "opacity .3s ease" }}
        >
          {displayed.map((a, i) => <ArticleCard key={i} a={a} />)}
        </div>

        {/* View all */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/blog" className="art-view-all">
            View All Articles
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>

      <style>{`
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .art-card {
          border-radius: 14px; overflow: hidden;
          border: 1px solid var(--border);
          background: white;
          transition: all .2s;
          text-decoration: none;
          display: block;
          cursor: pointer;
        }
        .art-card:hover {
          box-shadow: 0 8px 32px rgba(11,31,79,.1);
          transform: translateY(-3px);
          border-color: transparent;
        }
        .art-card-title {
          font-family: var(--font-jakarta);
          font-size: 16px; font-weight: 700;
          color: var(--text); line-height: 1.35;
          margin-bottom: 10px; letter-spacing: -.01em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .art-view-all {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 40px; border-radius: 10px;
          font-size: 14px; font-weight: 700;
          background: var(--navy); color: white;
          text-decoration: none;
          font-family: var(--font-jakarta);
          transition: all .2s;
          box-shadow: 0 2px 10px rgba(11,31,79,.2);
        }
        .art-view-all:hover {
          background: var(--navy-2);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(11,31,79,.3);
        }
        @media (max-width: 900px) {
          .articles-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 580px) {
          .articles-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}