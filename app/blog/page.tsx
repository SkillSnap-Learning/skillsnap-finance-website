"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.skillsnaplearning.com/api/v1";

function BlogContent() {
  const [activeCat, setActiveCat] = useState("all");

  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/finance/blogs?isPublished=true&limit=100`).then(r => r.json()),
      fetch(`${API}/finance/categories`).then(r => r.json()),
    ]).then(([blogsJson, catsJson]) => {
      setBlogs(blogsJson.data?.blogs ?? []);
      setCategories(catsJson.data ?? []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = activeCat === "all"
    ? blogs
    : blogs.filter(b => {
        const slug = typeof b.category === "object" ? b.category.slug : "";
        return slug === activeCat;
      });

  const featured = filtered.slice(0, 2);
  const rest = filtered.slice(2);

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
            {activeCat === "all"
              ? "All Articles"
              : categories.find(c => c.slug === activeCat)?.name ?? "Articles"}
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65, maxWidth: 560 }}>
            Plain-language guides on investing, tax, insurance and loans — written for real Indian families.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Category filter pills */}
        {categories.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
            <button
              onClick={() => setActiveCat("all")}
              style={{
                padding: "7px 16px", borderRadius: 100,
                fontSize: 13, fontWeight: 600,
                background: activeCat === "all" ? "var(--navy)" : "white",
                color: activeCat === "all" ? "white" : "var(--muted)",
                border: `1.5px solid ${activeCat === "all" ? "var(--navy)" : "var(--border)"}`,
                cursor: "pointer", fontFamily: "inherit",
                transition: "all .15s",
              }}
            >
              All
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat._id}
                onClick={() => setActiveCat(cat.slug)}
                style={{
                  padding: "7px 16px", borderRadius: 100,
                  fontSize: 13, fontWeight: 600,
                  background: activeCat === cat.slug ? "var(--navy)" : "white",
                  color: activeCat === cat.slug ? "white" : "var(--muted)",
                  border: `1.5px solid ${activeCat === cat.slug ? "var(--navy)" : "var(--border)"}`,
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "all .15s",
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
            <div style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 20, fontWeight: 700,
              color: "var(--navy)", marginBottom: 8,
            }}>
              No articles yet
            </div>
            <p style={{ fontSize: 14, maxWidth: 360, margin: "0 auto" }}>
              Articles for this category are coming soon.
            </p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <div style={{ marginBottom: 56 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
                  textTransform: "uppercase", color: "var(--muted)", marginBottom: 20,
                }}>
                  Featured
                </div>
                <div className="featured-grid">
                  {featured.map((blog: any) => {
                    const catName = typeof blog.category === "object" ? blog.category.name : "";
                    const catSlug = typeof blog.category === "object" ? blog.category.slug : "";
                    return (
                      <Link key={blog._id} href={`/blog/${blog.slug}`} className="featured-card">
                        <div style={{
                          height: 240, position: "relative",
                          overflow: "hidden", borderRadius: "16px 16px 0 0",
                        }}>
                          {blog.coverImage ? (
                            <Image src={blog.coverImage} alt={blog.title} fill
                              style={{ objectFit: "cover", transition: "transform .4s ease" }}
                              className="feat-img" />
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
                          {catName && (
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
                          )}
                        </div>
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

            {/* All articles */}
            {rest.length > 0 && (
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
                  textTransform: "uppercase", color: "var(--muted)", marginBottom: 20,
                }}>
                  {activeCat === "all" ? "All Articles" : "More Articles"}
                </div>
                <div className="all-grid">
                  {rest.map((blog: any) => {
                    const catName = typeof blog.category === "object" ? blog.category.name : "";
                    return (
                      <Link key={blog._id} href={`/blog/${blog.slug}`} className="blog-card">
                        <div style={{
                          height: 180, position: "relative",
                          overflow: "hidden", borderRadius: "12px 12px 0 0",
                        }}>
                          {blog.coverImage ? (
                            <Image src={blog.coverImage} alt={blog.title} fill
                              style={{ objectFit: "cover", transition: "transform .4s ease" }}
                              className="blog-img" />
                          ) : (
                            <div style={{
                              width: "100%", height: "100%",
                              background: "linear-gradient(135deg,var(--navy) 0%,#1e3a8a 60%,#2D5BE3 100%)",
                            }} />
                          )}
                          {catName && (
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
                          )}
                        </div>
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
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .featured-card {
          border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border); background: white;
          text-decoration: none; display: block; transition: all .2s;
        }
        .featured-card:hover {
          box-shadow: 0 8px 32px rgba(11,31,79,.1);
          transform: translateY(-3px); border-color: transparent;
        }
        .featured-card:hover .feat-img { transform: scale(1.04); }
        .all-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .blog-card {
          border-radius: 12px; overflow: hidden;
          border: 1px solid var(--border); background: white;
          text-decoration: none; display: block; transition: all .2s;
        }
        .blog-card:hover {
          box-shadow: 0 6px 24px rgba(11,31,79,.08);
          transform: translateY(-2px); border-color: transparent;
        }
        .blog-card:hover .blog-img { transform: scale(1.04); }
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

export default function BlogPage() {
  return <BlogContent />;
}