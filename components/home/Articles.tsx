"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.skillsnaplearning.com/api/v1";

const DEFAULT_BG = "linear-gradient(135deg,var(--navy) 0%,var(--navy-2) 60%,var(--navy-3) 100%)";

const CAT_GRADIENTS: Record<string, string> = {
  investing:        "linear-gradient(135deg,#064e3b 0%,#059669 100%)",
  tax:              "linear-gradient(135deg,#78350f 0%,#d97706 100%)",
  insurance:        "linear-gradient(135deg,#3b0764 0%,#7c3aed 100%)",
  "family-finance": "linear-gradient(135deg,#831843 0%,#db2777 100%)",
  schemes:          "linear-gradient(135deg,#0c4a6e 0%,#0284c7 100%)",
  loans:            "linear-gradient(135deg,#1a2744 0%,#1A3A8F 100%)",
};

type Tab = "articles" | "calculators";

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: { name: string; slug: string } | string;
  coverImage: string | null;
  readTime: string | null;
  publishedAt: string | null;
};

type Calculator = {
  _id: string;
  heading: string;
  slug: string;
  subheading: string;
  type: string;
};

function ArticleCard({ a }: { a: Article }) {
  const catSlug = typeof a.category === "object" ? a.category.slug : "";
  const catName = typeof a.category === "object" ? a.category.name : "";
  const bg = CAT_GRADIENTS[catSlug] || DEFAULT_BG;
  const wm = catName.slice(0, 6).toUpperCase();

  return (
    <Link href={`/blog/${a.slug}`} className="art-card">
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        {a.coverImage ? (
          <img
            src={a.coverImage}
            alt={a.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: bg,
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
              {wm}
            </div>
          </div>
        )}
        {catName && (
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
            {catName}
          </span>
        )}
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <div className="art-card-title">{a.title}</div>
        <div style={{
          fontSize: 12, color: "var(--muted)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {a.publishedAt && (
            <span>{new Date(a.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            })}</span>
          )}
          {a.readTime && (
            <>
              <div style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--border)", flexShrink: 0 }} />
              <span>{a.readTime}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

function CalculatorCard({ c }: { c: Calculator }) {
  return (
    <Link href={`/calculators/${c.slug}`} className="art-card">
      <div style={{
        height: 200,
        background: "linear-gradient(135deg,var(--navy) 0%,#1e3a8a 60%,#2D5BE3 100%)",
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
          {c.type.toUpperCase()}
        </div>
        <span style={{
          position: "absolute", top: 12, left: 12,
          padding: "4px 10px", borderRadius: 6,
          fontSize: 10.5, fontWeight: 700,
          letterSpacing: ".05em", textTransform: "uppercase",
          background: "rgba(255,255,255,.15)",
          border: "1px solid rgba(255,255,255,.2)",
          color: "white", zIndex: 1,
        }}>
          Calculator
        </span>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <div className="art-card-title">{c.heading}</div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Free tool
        </div>
      </div>
    </Link>
  );
}

export default function Articles() {
  const [active, setActive] = useState<Tab>("articles");
  const [fading, setFading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/finance/blogs?isPublished=true&limit=6`)
        .then(r => r.json())
        .catch(() => ({ data: { blogs: [] } })),
      fetch(`${API}/calculators?isActive=true`)
        .then(r => r.json())
        .catch(() => ({ data: [] })),
    ]).then(([blogsJson, calcsJson]) => {
      setArticles(blogsJson.data?.blogs ?? []);
      setCalculators((calcsJson.data ?? []).filter((c: Calculator) => !c.slug.includes("-sip-") && !c.slug.includes("-emi-") && !c.slug.includes("-ppf-")).slice(0, 6));
      setLoading(false);
    });
  }, []);

  function switchTab(key: Tab) {
    if (key === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(key);
      setFading(false);
    }, 150);
  }

  const displayed = active === "articles" ? articles : calculators;

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
          <div style={{
            display: "flex", border: "1px solid var(--border)",
            borderRadius: 8, overflow: "hidden",
          }}>
            {(["articles", "calculators"] as Tab[]).map(tab => (
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
        {loading ? (
          <div className="articles-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                borderRadius: 14, overflow: "hidden",
                border: "1px solid var(--border)", background: "white",
              }}>
                <div style={{ height: 200, background: "var(--bg)" }} />
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ height: 16, background: "var(--bg)", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 12, background: "var(--bg)", borderRadius: 4, width: "60%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
            No {active} yet — check back soon.
          </div>
        ) : (
          <div
            className="articles-grid"
            style={{ opacity: fading ? 0 : 1, transition: "opacity .3s ease" }}
          >
            {active === "articles"
              ? articles.map(a => <ArticleCard key={a._id} a={a} />)
              : calculators.map(c => <CalculatorCard key={c._id} c={c} />)
            }
          </div>
        )}

        {/* View all */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link
            href={active === "articles" ? "/blog" : "/calculators"}
            className="art-view-all"
          >
            {active === "articles" ? "View All Articles" : "View All Calculators"}
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