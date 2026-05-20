import { Calculator } from './types';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getCalculatorBySlug(slug: string): Promise<Calculator> {
  const res = await fetch(`${API}/calculators/${slug}`, {
    next: { revalidate: 60 }, // ISR — revalidate every 60s
  });

  if (!res.ok) {
    throw new Error(`Calculator not found: ${slug}`);
  }

  const json = await res.json();
  return json.data;
}

export async function getAllActiveSlugs(): Promise<string[]> {
  const res = await fetch(`${API}/calculators/slugs`, {
    next: { revalidate: 3600 }, // revalidate slugs every hour
  });

  if (!res.ok) return [];

  const json = await res.json();
  return json.data;
}