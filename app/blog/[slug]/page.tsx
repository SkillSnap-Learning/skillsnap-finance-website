import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.skillsnaplearning.com/api/v1";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${API}/finance/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

async function getAllSlugs() {
  try {
    const res = await fetch(`${API}/finance/blogs?isPublished=true&limit=1000`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.blogs ?? [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const blogs = await getAllSlugs();
  return blogs.map((b: any) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Article — SkillSnap Finance" };
  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    alternates: {
      canonical: `https://finance.skillsnaplearning.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const catName = typeof blog.category === "object" ? blog.category.name : "Article";
  const catSlug = typeof blog.category === "object" ? blog.category.slug : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.metaDescription || blog.excerpt,
    "datePublished": blog.publishedAt,
    "dateModified": blog.updatedAt,
    "author": { "@type": "Organization", "name": "SkillSnap Finance" },
    "publisher": {
      "@type": "Organization",
      "name": "SkillSnap Finance",
      "url": "https://finance.skillsnaplearning.com",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://finance.skillsnaplearning.com/blog/${blog.slug}`,
    },
    ...(blog.coverImage && { "image": blog.coverImage }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>

          {/* Breadcrumb */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12.5, color: "var(--muted)",
            marginBottom: 32, fontWeight: 500, flexWrap: "wrap",
          }}>
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--border)", fontSize: 14 }}>›</span>
            <Link href="/blog" style={{ color: "var(--muted)", textDecoration: "none" }}>Blog</Link>
            <span style={{ color: "var(--border)", fontSize: 14 }}>›</span>
            {catSlug && (
              <>
                <Link
                  href={`/blog?category=${catSlug}`}
                  style={{ color: "var(--muted)", textDecoration: "none" }}
                >
                  {catName}
                </Link>
                <span style={{ color: "var(--border)", fontSize: 14 }}>›</span>
              </>
            )}
            <span style={{ color: "var(--text)", fontWeight: 600 }}>
              {blog.title.length > 50 ? blog.title.slice(0, 50) + "..." : blog.title}
            </span>
          </div>

          <div className="article-layout">

            {/* Main */}
            <article className="article-main">

              {/* Header */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  {catSlug && (
                    <Link
                      href={`/blog?category=${catSlug}`}
                      style={{
                        fontSize: 11, fontWeight: 700,
                        letterSpacing: ".08em", textTransform: "uppercase",
                        color: "var(--em)", textDecoration: "none",
                        background: "var(--el)", padding: "3px 10px",
                        borderRadius: 100,
                      }}
                    >
                      {catName}
                    </Link>
                  )}
                  {blog.readTime && (
                    <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
                      {blog.readTime}
                    </span>
                  )}
                </div>

                <h1 style={{
                  fontFamily: "var(--font-jakarta)",
                  fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800,
                  color: "var(--navy)", lineHeight: 1.2,
                  letterSpacing: "-.025em", marginBottom: 16,
                }}>
                  {blog.title}
                </h1>

                <p style={{
                  fontSize: 17, color: "var(--muted)",
                  lineHeight: 1.7, marginBottom: 24, maxWidth: 680,
                }}>
                  {blog.excerpt}
                </p>

                <div style={{
                  display: "flex", alignItems: "center", gap: 16,
                  paddingBottom: 24, borderBottom: "1px solid var(--border)",
                  fontSize: 13, color: "var(--muted)", flexWrap: "wrap",
                }}>
                  <span>SkillSnap Finance</span>
                  {blog.publishedAt && (
                    <>
                      <span style={{ color: "var(--border)" }}>·</span>
                      <span>{new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric",
                      })}</span>
                    </>
                  )}
                  {blog.tags?.length > 0 && (
                    <>
                      <span style={{ color: "var(--border)" }}>·</span>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {blog.tags.map((tag: string) => (
                          <span key={tag} style={{
                            fontSize: 11.5, color: "var(--muted)",
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                            padding: "2px 8px", borderRadius: 100,
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Cover image */}
              {blog.coverImage && (
                <div style={{
                  borderRadius: 16, overflow: "hidden",
                  marginBottom: 40, aspectRatio: "16/9",
                  position: "relative",
                }}>
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              )}

              {/* Content */}
              {blog.content && (
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              )}

              {/* SEBI Disclaimer */}
              {blog.disclaimer && (
                <div style={{
                  background: "#FFFBEB",
                  border: "1px solid #FDE68A",
                  borderRadius: 12,
                  padding: "16px 20px",
                  marginTop: 40,
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700,
                    color: "#92400E", letterSpacing: ".05em",
                    textTransform: "uppercase", marginBottom: 8,
                  }}>
                    Disclaimer
                  </div>
                  <p style={{ fontSize: 13, color: "#78350F", lineHeight: 1.65 }}>
                    This article is for informational purposes only and does not
                    constitute financial advice. Mutual fund investments are subject
                    to market risks. Please read all scheme-related documents carefully
                    before investing. Past performance is not indicative of future results.
                  </p>
                </div>
              )}

              {/* FAQs */}
              {blog.faqs?.length > 0 && blog.faqs.some((f: any) => f.question) && (
                <div style={{ marginTop: 48 }}>
                  <h2 style={{
                    fontFamily: "var(--font-jakarta)",
                    fontSize: 24, fontWeight: 800,
                    color: "var(--navy)", marginBottom: 20,
                    letterSpacing: "-.02em",
                  }}>
                    {blog.faqsTitle || "Frequently Asked Questions"}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {blog.faqs.filter((f: any) => f.question && f.answer).map((faq: any, i: number) => (
                      <div key={i} style={{
                        border: "1.5px solid var(--border)",
                        borderRadius: 12, padding: "16px 20px",
                        background: "white",
                      }}>
                        <div style={{
                          fontFamily: "var(--font-jakarta)",
                          fontSize: 15, fontWeight: 700,
                          color: "var(--text)", marginBottom: 8,
                        }}>
                          {faq.question}
                        </div>
                        <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related posts */}
              {blog.relatedPosts?.length > 0 && (
                <div style={{ marginTop: 48 }}>
                  <h2 style={{
                    fontFamily: "var(--font-jakarta)",
                    fontSize: 20, fontWeight: 800,
                    color: "var(--navy)", marginBottom: 20,
                    letterSpacing: "-.02em",
                  }}>
                    Related Articles
                  </h2>
                  <div className="related-grid">
                    {blog.relatedPosts.map((post: any) => (
                      <Link key={post._id} href={`/blog/${post.slug}`} className="related-card">
                        {post.coverImage && (
                          <div style={{
                            height: 120, borderRadius: "10px 10px 0 0",
                            overflow: "hidden", position: "relative",
                          }}>
                            <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} />
                          </div>
                        )}
                        <div style={{ padding: "14px 16px" }}>
                          <div style={{
                            fontFamily: "var(--font-jakarta)",
                            fontSize: 14, fontWeight: 700,
                            color: "var(--text)", lineHeight: 1.35,
                            marginBottom: 6,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}>
                            {post.title}
                          </div>
                          {post.publishedAt && (
                            <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
                              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric",
                              })}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="article-sidebar">

              {/* Related calculators */}
              {blog.relatedCalculators?.length > 0 && (
                <div className="sidebar-widget">
                  <div className="sidebar-widget-title">Free Calculators</div>
                  {blog.relatedCalculators.map((c: any, i: number) => (
                    <Link key={i} href={c.href} className="sidebar-widget-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        style={{ color: "var(--em)", flexShrink: 0 }}>
                        <rect x="4" y="2" width="16" height="20" rx="2"/>
                        <line x1="8" y1="6" x2="16" y2="6"/>
                        <line x1="8" y1="10" x2="16" y2="10"/>
                        <line x1="8" y1="14" x2="12" y2="14"/>
                      </svg>
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Calculators CTA */}
              <div style={{
                background: "linear-gradient(145deg, var(--navy) 0%, #1e3a8a 100%)",
                borderRadius: 14, padding: "20px",
              }}>
                <div style={{
                  fontFamily: "var(--font-jakarta)",
                  fontSize: 15, fontWeight: 800,
                  color: "white", marginBottom: 8, lineHeight: 1.3,
                }}>
                  Free Financial Calculators
                </div>
                <p style={{
                  fontSize: 12.5, color: "rgba(255,255,255,.55)",
                  lineHeight: 1.6, marginBottom: 16,
                }}>
                  SIP, EMI, Tax, PPF and more — no sign-up needed.
                </p>
                <Link href="/calculators" style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "10px", borderRadius: 8,
                  background: "var(--em)", color: "white",
                  fontSize: 13, fontWeight: 700,
                  textDecoration: "none", fontFamily: "var(--font-jakarta)",
                }}>
                  View All Calculators →
                </Link>
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="sidebar-widget">
                  <div className="sidebar-widget-title">Tags</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {blog.tags.map((tag: string) => (
                      <span key={tag} style={{
                        fontSize: 12, color: "var(--muted)",
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        padding: "4px 10px", borderRadius: 100,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </aside>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .article-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 40px;
          align-items: flex-start;
        }
        .article-sidebar {
          position: sticky;
          top: 88px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sidebar-widget {
          background: white;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 20px;
        }
        .sidebar-widget-title {
          font-family: var(--font-jakarta);
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .sidebar-widget-link {
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
        .sidebar-widget-link:last-child { border-bottom: none; }
        .sidebar-widget-link:hover { color: var(--navy-2); }
        .article-content {
          font-size: 16px;
          color: var(--text);
          line-height: 1.85;
        }
        .article-content h2 {
          font-family: var(--font-jakarta);
          font-size: 26px;
          font-weight: 800;
          color: var(--navy);
          margin: 40px 0 16px;
          letter-spacing: -.02em;
          line-height: 1.2;
        }
        .article-content h2:first-child { margin-top: 0; }
        .article-content h3 {
          font-family: var(--font-jakarta);
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          margin: 28px 0 12px;
        }
        .article-content h4 {
          font-family: var(--font-jakarta);
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
          margin: 20px 0 8px;
        }
        .article-content p { margin-bottom: 20px; color: #374151; }
        .article-content ul, .article-content ol {
          margin: 0 0 20px 24px;
          color: #374151;
        }
        .article-content li { margin-bottom: 8px; }
        .article-content strong { color: var(--text); font-weight: 700; }
        .article-content a { color: var(--navy-2); text-decoration: underline; }
        .article-content blockquote {
          border-left: 4px solid var(--em);
          padding: 12px 20px;
          margin: 24px 0;
          background: var(--el);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: var(--muted);
        }
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          font-size: 14px;
        }
        .article-content th {
          background: var(--nl);
          color: var(--navy);
          font-weight: 700;
          padding: 10px 14px;
          text-align: left;
          border: 1px solid var(--border);
        }
        .article-content td {
          padding: 9px 14px;
          border: 1px solid var(--border);
          color: #374151;
        }
        .article-content tr:nth-child(even) td { background: var(--bg); }
        .article-content code {
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
          font-family: monospace;
        }
        .article-content img {
          max-width: 100%;
          border-radius: 10px;
          margin: 16px 0;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .related-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: all .2s;
          background: white;
        }
        .related-card:hover {
          box-shadow: 0 4px 20px rgba(11,31,79,.08);
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .article-layout { grid-template-columns: 1fr; }
          .article-sidebar { position: relative; top: auto; }
        }
        @media (max-width: 640px) {
          .related-grid { grid-template-columns: 1fr; }
          .article-content h2 { font-size: 22px; }
        }
      `}</style>
    </>
  );
}