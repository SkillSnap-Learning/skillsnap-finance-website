import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillSnap Finance — Smart Money for Every Indian Family",
  description:
    "Plain-language guides, calculators and tools on investing, tax, insurance and loans — written for real Indian families.",
  metadataBase: new URL("https://finance.skillsnaplearning.com"),
  alternates: {
    canonical: "https://finance.skillsnaplearning.com",
  },
  openGraph: {
    title: "SkillSnap Finance",
    description: "Smart money, plain language. Zero jargon.",
    url: "https://finance.skillsnaplearning.com",
    siteName: "SkillSnap Finance",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className={inter.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}