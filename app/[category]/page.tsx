import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.skillsnaplearning.com/api/v1";

const VALID_CATEGORIES = [
  "investing", "tax", "insurance", "loans",
  "family-finance", "schemes", "glossary",
];

const CATEGORY_META: Record<string, { heading: string; description: string; color: string; bg: string; icon: string }> = {
  investing:      { heading: "Investing",        description: "Mutual funds, SIPs, index funds, stocks and wealth building strategies for Indian investors.", color: "#059669", bg: "#ECFDF5", icon: "📈" },
  tax:            { heading: "Tax Planning",     description: "Old vs new regime, Section 80C, ITR filing, HRA exemption and everything about saving tax in India.", color: "#D97706", bg: "#FEF9EE", icon: "📋" },
  insurance:      { heading: "Insurance",        description: "Term insurance, health insurance, LIC vs term — honest guides to protect your family the right way.", color: "#7C3AED", bg: "#F5F3FF", icon: "🛡️" },
  loans:          { heading: "Loans & Credit",   description: "Home loans, personal loans, EMI strategies, CIBIL score and everything about borrowing wisely.", color: "#1A3A8F", bg: "#EEF3FF", icon: "🏠" },
  "family-finance": { heading: "Family Finance", description: "Education planning, child's corpus, emergency funds and financial planning for Indian families.", color: "#DB2777", bg: "#FDF2F8", icon: "👨‍👩‍👧" },
  schemes:        { heading: "Govt. Schemes",    description: "PPF, SSY, EPF, NPS and all government-backed savings schemes explained simply.", color: "#0284C7", bg: "#F0F9FF", icon: "🏛️" },
  glossary:       { heading: "Glossary",         description: "Plain-language definitions of every finance term you'll encounter as an Indian investor.", color: "#64748B", bg: "#F8FAFC", icon: "📖" },
};

type Props = {
  params: Promise<{ category: string }>;
};

async function getCategoryData(slug: string) {
  try {
    const res = await fetch(`${API}/finance/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const categories = json.data ?? [];
    return categories.find((c: any) => c.slug === slug) ?? null;
  } catch {
    return null;
  }
}

async function getBlogs(categorySlug: string) {
  try {
    const res = await fetch(
      `${API}/finance/blogs?isPublished=true&category=${categorySlug}&limit=50`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.blogs ?? [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map(category => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) return { title: "SkillSnap Finance" };
  const meta = CATEGORY_META[category];
  return {
    title: `${meta.heading} — SkillSnap Finance`,
    description: meta.description,
    alternates: {
      canonical: `https://finance.skillsnaplearning.com/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category)) notFound();

  const meta = CATEGORY_META[category];
  const [categoryData, blogs] = await Promise.all([
    getCategoryData(category),
    getBlogs(category),
  ]);

  return (
    <>
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
            <span style={{ color: "var(--text)", fontWeight: 600 }}>{meta.heading}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: meta.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, flexShrink: 0,
            }}>
              {meta.icon}
            </div>
            <h1 style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800,
              color: "var(--navy)", letterSpacing: "-.025em", lineHeight: 1.15,
            }}>
              {meta.heading}
            </h1>
          </div>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65, maxWidth: 600 }}>
            {meta.description}
          </p>
          {blogs.length > 0 && (
            <div style={{ marginTop: 16, fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>
              {blogs.length} article{blogs.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Articles */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
        {blogs.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "80px 0",
            color: "var(--muted)",
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{meta.icon}</div>
            <div style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 20, fontWeight: 700,
              color: "var(--navy)", marginBottom: 8,
            }}>
              Articles coming soon
            </div>
            <p style={{ fontSize: 14, maxWidth: 360, margin: "0 auto" }}>
              We&apos;re working on in-depth guides for {meta.heading.toLowerCase()}. Check back soon.
            </p>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginTop: 24, padding: "11px 24px", borderRadius: 10,
              background: "var(--navy)", color: "white",
              textDecoration: "none", fontSize: 14, fontWeight: 700,
              fontFamily: "var(--font-jakarta)",
            }}>
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="cat-grid">
            {blogs.map((blog: any) => {
              const postCat = typeof blog.category === "object" ? blog.category.slug : category;
              return (
                <Link key={blog._id} href={`/${postCat}/${blog.slug}`} className="cat-card">
                  {/* Image */}
                  <div style={{ height: 200, position: "relative", overflow: "hidden", borderRadius: "14px 14px 0 0" }}>
                    {blog.coverImage ? (
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        style={{ objectFit: "cover", transition: "transform .4s ease" }}
                        className="cat-card-img"
                      />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%",
                        background: `linear-gradient(135deg, var(--navy) 0%, #1e3a8a 60%, #2D5BE3 100%)`,
                        display: "flex", alignItems: "flex-end",
                        padding: 16, position: "relative",
                      }}>
                        <div style={{
                          position: "absolute", inset: 0,
                          backgroundImage: "radial-gradient(circle,rgba(255,255,255,.05) 1px,transparent 1px)",
                          backgroundSize: "18px 18px",
                        }} />
                        <div style={{
                          fontFamily: "var(--font-jakarta)",
                          fontSize: 52, fontWeight: 800,
                          color: "rgba(255,255,255,.08)",
                          position: "absolute", right: 14, bottom: -6,
                          letterSpacing: "-.04em", lineHeight: 1,
                        }}>
                          {meta.icon}
                        </div>
                      </div>
                    )}
                    {/* Category badge */}
                    <div style={{
                      position: "absolute", top: 12, left: 12,
                      padding: "3px 10px", borderRadius: 6,
                      fontSize: 10.5, fontWeight: 700,
                      letterSpacing: ".05em", textTransform: "uppercase",
                      background: "rgba(255,255,255,.15)",
                      border: "1px solid rgba(255,255,255,.2)",
                      color: "white", zIndex: 1,
                      backdropFilter: "blur(8px)",
                    }}>
                      {meta.heading}
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "18px 20px 22px" }}>
                    <div style={{
                      fontFamily: "var(--font-jakarta)",
                      fontSize: 16, fontWeight: 700,
                      color: "var(--text)", lineHeight: 1.35,
                      marginBottom: 10, letterSpacing: "-.01em",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {blog.title}
                    </div>
                    <div style={{
                      fontSize: 13.5, color: "var(--muted)",
                      lineHeight: 1.6, marginBottom: 14,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {blog.excerpt}
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      fontSize: 12, color: "var(--muted)",
                    }}>
                      {blog.publishedAt && (
                        <span>{new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}</span>
                      )}
                      {blog.readTime && (
                        <>
                          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--border)", display: "inline-block" }} />
                          <span>{blog.readTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .cat-card {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: white;
          text-decoration: none;
          display: block;
          transition: all .2s;
        }
        .cat-card:hover {
          box-shadow: 0 8px 32px rgba(11,31,79,.1);
          transform: translateY(-3px);
          border-color: transparent;
        }
        .cat-card:hover .cat-card-img {
          transform: scale(1.04);
        }
        @media (max-width: 900px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .cat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}