import { MetadataRoute } from "next";

const BASE = "https://finance.skillsnaplearning.com";
const API  = process.env.NEXT_PUBLIC_API_URL;

async function getCalculatorSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API}/calculators/slugs`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

async function getFinanceBlogSlugs(): Promise<{ category: string; slug: string }[]> {
  try {
    const res = await fetch(`${API}/finance/blogs?isPublished=true&limit=1000`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data?.blogs ?? []).map((b: any) => ({
      category: typeof b.category === "object" ? b.category.slug : "investing",
      slug: b.slug,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getCalculatorSlugs();
  const blogSlugs = await getFinanceBlogSlugs();
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE}/calculators`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/investing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/tax`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/insurance`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/loans`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/schemes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Dynamic calculator pages
  const calculatorPages: MetadataRoute.Sitemap = slugs.map(slug => ({
    url: `${BASE}/calculators/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: slug.includes("-sip-") || slug.includes("-emi-")
      ? 0.75  // variants slightly lower
      : 0.9,  // core calculators high priority
  }));

  // Dynamic finance blog pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(({ category, slug }) => ({
    url: `${BASE}/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    }));

  return [...staticPages, ...calculatorPages, ...blogPages];
}