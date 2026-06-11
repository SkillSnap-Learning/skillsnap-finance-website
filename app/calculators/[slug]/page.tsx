import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CalculatorShell from "@/components/calculators/CalculatorShell";
import CalculatorUI from "@/components/calculators/CalculatorUI";
import { getCalculatorBySlug, getAllActiveSlugs } from "@/lib/calculators/api";
import { Calculator } from "@/lib/calculators/types";

type Props = {
  params: Promise<{ slug: string }>;
};

function buildJsonLd(calculator: Calculator, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": calculator.heading,
    "description": calculator.metaDescription,
    "url": `https://finance.skillsnaplearning.com/calculators/${slug}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
    },
    "provider": {
      "@type": "Organization",
      "name": "SkillSnap Finance",
      "url": "https://finance.skillsnaplearning.com",
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://finance.skillsnaplearning.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Calculators",
          "item": "https://finance.skillsnaplearning.com/calculators",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": calculator.heading,
          "item": `https://finance.skillsnaplearning.com/calculators/${slug}`,
        },
      ],
    },
  };
}

// Generate all static paths at build time
export async function generateStaticParams() {
  const slugs = await getAllActiveSlugs();
  return slugs.map(slug => ({ slug }));
}

// Dynamic metadata per calculator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const calc = await getCalculatorBySlug(slug);
    return {
      title: calc.metaTitle,
      description: calc.metaDescription,
      alternates: {
        canonical: calc.canonical,
      },
    };
  } catch {
    return {
      title: "Calculator — SkillSnap Finance",
      description: "Free financial calculators for Indian families.",
    };
  }
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;

  let calculator;
  try {
    calculator = await getCalculatorBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(calculator, slug)) }}
      />
      <Navbar />
      <CalculatorShell
        heading={calculator.heading}
        subheading={calculator.subheading}
        breadcrumb={calculator.heading}
        article={calculator.article}
        relatedCalculators={calculator.relatedCalculators}
        relatedArticles={calculator.relatedArticles}
      >
        <CalculatorUI calculator={calculator} />
      </CalculatorShell>
      <Footer />
    </>
  );
}