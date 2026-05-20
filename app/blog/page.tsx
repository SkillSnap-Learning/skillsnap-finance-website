import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.skillsnaplearning.com/api/v1";

export const metadata: Metadata = {
  title: "All Articles — SkillSnap Finance",
  description: "In-depth guides, articles and explainers on investing, tax, insurance, loans and government schemes for Indian families.",
  alternates: {
    canonical: "https://finance.skillsnaplearning.com/blog",
  },
};

async function getAllBlogs() {
  try {
    const res = await fetch(`${API}/finance/blogs?isPublished=true&limit=100`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.blogs ?? [];
  } catch {
    return [];
  }
}

async function getAllCategories() {
  try {
    const res = await fetch(`${API}/finance/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  investing:        { color: "#059669", bg: "#ECFDF5" },
  tax:              { color: "#D97706", bg: "#FEF9EE" },
  insurance:        { color: "#7C3AED", bg: "#F5F3FF" },
  loans:            { color: "#1A3A8F", bg: "#EEF3FF" },
  "family-finance": { color: "#DB2777", bg: "#FDF2F8" },
  schemes:          { color: "#0284C7", bg: "#F0F9FF" },
  glossary:         { color: "#64748B", bg: "#F8FAFC" },
};

function getCatColor(slug: string) {
  return CATEGORY_COLORS[slug] ?? { color: "#1A3A8F", bg: "#EEF3FF" };
}

export default async function BlogPage() {
  const [blogs, categories] = await Promise.all([getAllBlogs(), getAllCategories()]);

  // Featured = first 2 published
  const featured = blogs.slice(0, 2);
  const rest = blogs.slice(2);

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
            <span style={{ color: "var(--text)", fontWeight: 600 }}>All Articles</span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800,
            color: "var(--navy)", letterSpacing: "-.025em",
            lineHeight: 1.15, marginBottom: 12,
          }}>
            All Articles
          </h1>
          <p style={{
            fontSize: 16, color: "var(--muted)",
            lineHeight: 1.65, maxWidth: 560,
          }}>
            Plain-language guides on investing, tax, insurance and loans —
            written for real Indian families.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Category filter pills */}
        {categories.length > 0 && (
          <div style={{
            display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48,
          }}>
            <Link href="/blog" style={{
              padding: "7px 16px", borderRadius: 100,
              fontSize: 13, fontWeight: 600,
              background: "var(--navy)", color: "white",
              textDecoration: "none", border: "1.5px solid var(--navy)",
            }}>
              All
            </Link>
            {categories.map((cat: any) => {
              const c = getCatColor(cat.slug);
              return (
                <Link
                  key={cat._id}
                  href={`/${cat.slug}`}
                  style={{
                    padding: "7px 16px", borderRadius: 100,
                    fontSize: 13, fontWeight: 600,
                    background: "white", color: "var(--muted)",
                    textDecoration: "none",
                    border: "1.5px solid var(--border)",
                    transition: "all .15s",
                  }}
                  className="cat-pill"
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        )}

        {blogs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
            <div style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 20, fontWeight: 700,
              color: "var(--navy)", marginBottom: 8,
            }}>
              Articles coming soon
            </div>
            <p style={{ fontSize: 14, maxWidth: 360, margin: "0 auto" }}>
              We&apos;re working on in-depth guides. Check back soon.
            </p>
          </div>
        ) : (
          <>
            {/* Featured articles — big 2-col */}
            {featured.length > 0 && (
              <div style={{ marginBottom: 56 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
                  textTransform: "uppercase", color: "var(--muted)",
                  marginBottom: 20,
                }}>
                  Featured
                </div>
                <div className="featured-grid">
                  {featured.map((blog: any) => {
                    const catSlug = typeof blog.category === "object" ? blog.category.slug : "investing";
                    const catName = typeof blog.category === "object" ? blog.category.name : "Investing";
                    const c = getCatColor(catSlug);
                    return (
                      <Link key={blog._id} href={`/${catSlug}/${blog.slug}`} className="featured-card">
                        {/* Image */}
                        <div style={{
                          height: 240, position: "relative",
                          overflow: "hidden", borderRadius: "16px 16px 0 0",
                        }}>
                          {blog.coverImage ? (
                            <Image
                              src={blog.coverImage}
                              alt={blog.title}
                              fill
                              style={{ objectFit: "cover", transition: "transform .4s ease" }}
                              className="feat-img"
                            />
                          ) : (
                            <div style={{
                              width: "100%", height: "100%",
                              background: "linear-gradient(135deg,var(--navy) 0%,#1e3a8a 60%,#2D5BE3 100%)",
                              position: "relative",
                            }}>
                              <div style={{
                                position: "absolute", inset: 0,
                                backgroundImage: "radial-gradient(circle,rgba(255,255,255,.05) 1px,transparent 1px)",
                                backgroundSize: "18px 18px",
                              }} />
                              <div style={{
                                position: "absolute", right: 20, bottom: -8,
                                fontFamily: "var(--font-jakarta)",
                                fontSize: 80, fontWeight: 800,
                                color: "rgba(255,255,255,.06)",
                                letterSpacing: "-.04em", lineHeight: 1,
                              }}>
                                {catName.slice(0, 4).toUpperCase()}
                              </div>
                            </div>
                          )}
                          <div style={{
                            position: "absolute", top: 14, left: 14,
                            padding: "4px 12px", borderRadius: 6,
                            fontSize: 10.5, fontWeight: 700,
                            letterSpacing: ".05em", textTransform: "uppercase",
                            background: "rgba(255,255,255,.15)",
                            border: "1px solid rgba(255,255,255,.2)",
                            color: "white", backdropFilter: "blur(8px)",
                          }}>
                            {catName}
                          </div>
                        </div>
                        {/* Body */}
                        <div style={{ padding: "22px 24px 26px" }}>
                          <div style={{
                            fontFamily: "var(--font-jakarta)",
                            fontSize: 20, fontWeight: 800,
                            color: "var(--text)", lineHeight: 1.3,
                            marginBottom: 10, letterSpacing: "-.015em",
                          }}>
                            {blog.title}
                          </div>
                          <div style={{
                            fontSize: 14, color: "var(--muted)",
                            lineHeight: 1.65, marginBottom: 16,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}>
                            {blog.excerpt}
                          </div>
                          <div style={{
                            display: "flex", alignItems: "center", gap: 8,
                            fontSize: 12.5, color: "var(--muted)",
                          }}>
                            {blog.publishedAt && (
                              <span>{new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "long", year: "numeric",
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
              </div>
            )}

            {/* All other articles */}
            {rest.length > 0 && (
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
                  textTransform: "uppercase", color: "var(--muted)",
                  marginBottom: 20,
                }}>
                  All Articles
                </div>
                <div className="all-grid">
                  {rest.map((blog: any) => {
                    const catSlug = typeof blog.category === "object" ? blog.category.slug : "investing";
                    const catName = typeof blog.category === "object" ? blog.category.name : "Investing";
                    const c = getCatColor(catSlug);
                    return (
                      <Link key={blog._id} href={`/${catSlug}/${blog.slug}`} className="blog-card">
                        {/* Image */}
                        <div style={{
                          height: 180, position: "relative",
                          overflow: "hidden", borderRadius: "12px 12px 0 0",
                        }}>
                          {blog.coverImage ? (
                            <Image
                              src={blog.coverImage}
                              alt={blog.title}
                              fill
                              style={{ objectFit: "cover", transition: "transform .4s ease" }}
                              className="blog-img"
                            />
                          ) : (
                            <div style={{
                              width: "100%", height: "100%",
                              background: "linear-gradient(135deg,var(--navy) 0%,#1e3a8a 60%,#2D5BE3 100%)",
                              position: "relative",
                            }}>
                              <div style={{
                                position: "absolute", inset: 0,
                                backgroundImage: "radial-gradient(circle,rgba(255,255,255,.05) 1px,transparent 1px)",
                                backgroundSize: "18px 18px",
                              }} />
                            </div>
                          )}
                          <div style={{
                            position: "absolute", top: 10, left: 10,
                            padding: "3px 9px", borderRadius: 5,
                            fontSize: 10, fontWeight: 700,
                            letterSpacing: ".05em", textTransform: "uppercase",
                            background: "rgba(255,255,255,.15)",
                            border: "1px solid rgba(255,255,255,.2)",
                            color: "white", backdropFilter: "blur(8px)",
                          }}>
                            {catName}
                          </div>
                        </div>
                        {/* Body */}
                        <div style={{ padding: "16px 18px 20px" }}>
                          <div style={{
                            fontFamily: "var(--font-jakarta)",
                            fontSize: 15, fontWeight: 700,
                            color: "var(--text)", lineHeight: 1.35,
                            marginBottom: 8, letterSpacing: "-.01em",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}>
                            {blog.title}
                          </div>
                          <div style={{
                            fontSize: 13, color: "var(--muted)",
                            lineHeight: 1.6, marginBottom: 12,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}>
                            {blog.excerpt}
                          </div>
                          <div style={{
                            display: "flex", alignItems: "center", gap: 8,
                            fontSize: 11.5, color: "var(--muted)",
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
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      <style>{`
        .cat-pill:hover {
          background: var(--nl) !important;
          color: var(--navy-2) !important;
          border-color: var(--navy-2) !important;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .featured-card {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: white;
          text-decoration: none;
          display: block;
          transition: all .2s;
        }
        .featured-card:hover {
          box-shadow: 0 8px 32px rgba(11,31,79,.1);
          transform: translateY(-3px);
          border-color: transparent;
        }
        .featured-card:hover .feat-img {
          transform: scale(1.04);
        }
        .all-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .blog-card {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: white;
          text-decoration: none;
          display: block;
          transition: all .2s;
        }
        .blog-card:hover {
          box-shadow: 0 6px 24px rgba(11,31,79,.08);
          transform: translateY(-2px);
          border-color: transparent;
        }
        .blog-card:hover .blog-img {
          transform: scale(1.04);
        }
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: 1fr; }
          .all-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .all-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}