import Link from "next/link";
import { RelatedArticle, RelatedCalculator } from "@/lib/calculators/types";

type Props = {
  heading: string;
  subheading: string;
  breadcrumb: string;
  children: React.ReactNode; // calculator UI
  article: string;           // TipTap HTML
  relatedCalculators: RelatedCalculator[];
  relatedArticles: RelatedArticle[];
};

export default function CalculatorShell({
  heading,
  subheading,
  breadcrumb,
  children,
  article,
  relatedCalculators,
  relatedArticles,
}: Props) {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
    {/* Hero band */}
    <div style={{
        background: "var(--bg)",
        padding: "28px 0 32px",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "24px 24px", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12.5, color: "rgba(255,255,255,.4)",
            marginBottom: 20, fontWeight: 500,
          }}>
            <div style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12.5, marginBottom: 20, fontWeight: 500,
            }}>
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--border)", fontSize: 14 }}>›</span>
            <Link href="/calculators" style={{ color: "var(--muted)", textDecoration: "none" }}>Calculators</Link>
            <span style={{ color: "var(--border)", fontSize: 14 }}>›</span>
            <span style={{ color: "var(--text)", fontWeight: 600 }}>{breadcrumb}</span>
            </div>
          </div>
          <h1 style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800,
            color: "var(--navy)", letterSpacing: "-.025em",
            lineHeight: 1.15, marginBottom: 12,
          }}>
            {heading}
          </h1>
          {subheading && (
            <p style={{
              fontSize: 16, color: "var(--muted)",
              lineHeight: 1.65, maxWidth: 560,
            }}>
              {subheading}
            </p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div className="calc-layout">

          {/* Left — calculator + article */}
          <div className="calc-main">
            {/* Calculator card */}
            <div style={{
            background: "white",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 40,
            boxShadow: "0 2px 20px rgba(11,31,79,.06)",
            }}>
              {children}
            </div>

            {/* Article below calculator */}
            {article && (
              <div
                className="calc-article"
                dangerouslySetInnerHTML={{ __html: article.replace(/\uFFFD/g, "") }}
              />
            )}
          </div>

          {/* Right — sidebar */}
          <aside className="calc-sidebar">

            {/* Related calculators */}
            {relatedCalculators.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-card-title">Related Calculators</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {relatedCalculators.map((c, i) => (
                    <Link
                      key={i}
                      href={c.href}
                      className="sidebar-link"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, color: "var(--em)" }}>
                        <rect x="4" y="2" width="16" height="20" rx="2"/>
                        <line x1="8" y1="6" x2="16" y2="6"/>
                        <line x1="8" y1="10" x2="16" y2="10"/>
                        <line x1="8" y1="14" x2="12" y2="14"/>
                      </svg>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-card-title">Related Articles</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {relatedArticles.map((a, i) => (
                    <Link
                      key={i}
                      href={a.href}
                      className="sidebar-link"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, color: "var(--navy-2)" }}>
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      {a.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div style={{
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: 12,
              padding: "16px 18px",
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: "#92400E", letterSpacing: ".05em",
                textTransform: "uppercase", marginBottom: 8,
              }}>
                Disclaimer
              </div>
              <p style={{
                fontSize: 12.5, color: "#78350F",
                lineHeight: 1.65,
              }}>
                Results are for informational purposes only and based on the inputs you provide. Actual returns may vary. This is not financial advice.
              </p>
            </div>

          </aside>
        </div>
      </div>

      <style>{`
        .calc-layout {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 40px;
          align-items: flex-start;
        }
        .calc-main {}
        .calc-sidebar {
          position: sticky;
          top: 88px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sidebar-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px;
        }
        .sidebar-card-title {
          font-family: var(--font-jakarta);
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -.01em;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .sidebar-link {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 9px 0;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          transition: color .15s;
          line-height: 1.4;
        }
        .sidebar-link:last-child { border-bottom: none; }
        .sidebar-link:hover { color: var(--navy-2); }

        /* Article styles */
        .calc-article {
            background: white;
            border-radius: 20px;
            padding: 40px 44px;
          font-size: 15px;
          color: var(--text);
          line-height: 1.8;
        }
        .calc-article h2 {
          font-family: var(--font-jakarta);
          font-size: 24px;
          font-weight: 800;
          color: var(--navy);
          margin: 32px 0 14px;
          letter-spacing: -.02em;
        }
        .calc-article h2:first-child { margin-top: 0; }
        .calc-article h3 {
          font-family: var(--font-jakarta);
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          margin: 24px 0 10px;
        }
        .calc-article p { margin-bottom: 16px; color: var(--muted); }
        .calc-article ul, .calc-article ol {
          margin: 0 0 16px 20px;
          color: var(--muted);
        }
        .calc-article li { margin-bottom: 6px; }
        .calc-article strong { color: var(--text); font-weight: 600; }
        .calc-article table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .calc-article th {
          background: var(--nl);
          color: var(--navy);
          font-weight: 700;
          padding: 10px 14px;
          text-align: left;
          border: 1px solid var(--border);
        }
        .calc-article td {
          padding: 9px 14px;
          border: 1px solid var(--border);
          color: var(--muted);
        }
        .calc-article tr:nth-child(even) td { background: var(--bg); }

        @media (max-width: 1024px) {
          .calc-layout { grid-template-columns: 1fr; }
          .calc-sidebar { position: relative; top: auto; }
          .calc-article { padding: 28px 24px; }
        }
      `}</style>
    </div>
  );
}