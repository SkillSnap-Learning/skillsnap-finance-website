"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    bg: "/images/hero/ltfinance-new-tractor-loan-banner.webp",
    fallback: "#0d2a6e",
    eyebrow: "Investing Basics",
    title: "Grow your wealth,\nSIP by SIP",
    sub: "Start with as little as ₹500 a month. Learn how mutual funds and index funds build real wealth over time.",
    cta: "Start Learning",
    href: "/investing",
  },
  {
    bg: "/images/hero/ltfinance-vikaas-loan-banner.webp",
    fallback: "#0B2D4F",
    eyebrow: "Tax Planning",
    title: "Old regime or new?\nKnow before you file",
    sub: "Our free tax regime calculator tells you exactly which option saves more — for your exact salary and deductions.",
    cta: "Compare Now",
    href: "/calculators/tax",
  },
  {
    bg: "/images/hero/kum-nahin-complete1920x460.webp",
    fallback: "#1a1a4e",
    eyebrow: "Insurance",
    title: "Protect your family\nthe right way",
    sub: "Most Indians are under-insured by 80%. Find out exactly how much term cover your family actually needs.",
    cta: "Read the Guide",
    href: "/insurance",
  },
  {
    bg: "/images/hero/ltfinance-personal-loan-banner.webp",
    fallback: "#0a2540",
    eyebrow: "Family Finance",
    title: "Plan your child's\neducation today",
    sub: "Engineering in 2033 may cost ₹25 lakhs. Use our education corpus calculator to start saving the right amount now.",
    cta: "Calculate Corpus",
    href: "/calculators/education-corpus",
  },
  {
    bg: "/images/hero/bl_1920x460383f3b2030aa4455b7273f940bc5dfbf.webp",
    fallback: "#0f2744",
    eyebrow: "Government Schemes",
    title: "PPF, SSY, EPF —\nare you using them?",
    sub: "Guaranteed returns, tax-free maturity, government-backed safety. Most Indians leave these benefits untapped.",
    cta: "Explore Schemes",
    href: "/schemes",
  },
];

const MS = 5000;

export default function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progRef = useRef<number>(0); // tracks elapsed ms for pause/resume
  const lastTickRef = useRef<number>(Date.now());

  const go = useCallback((idx: number) => {
    const next = ((idx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setCur(next);
    progRef.current = 0;
    lastTickRef.current = Date.now();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => go(cur + 1), MS - progRef.current);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [cur, paused, go]);

  const pause = () => {
    setPaused(true);
    progRef.current += Date.now() - lastTickRef.current;
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  const resume = () => {
    lastTickRef.current = Date.now();
    setPaused(false);
  };

  // Touch swipe
  const touchX = useRef(0);

  return (
    <section
      style={{ position: "relative", width: "100%", overflow: "hidden", background: "#0B1F4F" }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) go(cur + (diff > 0 ? 1 : -1));
      }}
    >
      {/* Track */}
      <div
        style={{
          display: "flex",
          transform: `translateX(-${cur * 100}%)`,
          transition: "transform .55s cubic-bezier(.45,0,.25,1)",
          willChange: "transform",
        }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              minWidth: "100%", height: "clamp(340px,52vw,500px)",
              position: "relative", display: "flex", alignItems: "center",
              flexShrink: 0, overflow: "hidden",
              backgroundColor: s.fallback,
            }}
          >
            {/* BG image */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url('${s.bg}')`,
              backgroundSize: "cover", backgroundPosition: "center right",
            }} />
            {/* Overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg,rgba(11,31,79,.85) 0%,rgba(11,31,79,.6) 42%,rgba(11,31,79,.12) 100%)",
            }} />
            {/* Content */}
            <div style={{
              position: "relative", zIndex: 2,
              maxWidth: 1280, margin: "0 auto",
              padding: "0 clamp(24px,4vw,48px)", width: "100%",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(5,150,105,.18)",
                border: "1px solid rgba(5,150,105,.3)",
                padding: "4px 12px", borderRadius: 100,
                fontSize: 11, fontWeight: 700, color: "#34D399",
                letterSpacing: ".07em", textTransform: "uppercase",
                marginBottom: 16,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block" }} />
                {s.eyebrow}
              </div>
              <h1 style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "clamp(30px,4.2vw,52px)", fontWeight: 800,
                color: "white", lineHeight: 1.1, letterSpacing: "-.025em",
                marginBottom: 14, maxWidth: 540,
                whiteSpace: "pre-line",
              }}>
                {s.title}
              </h1>
              <p style={{
                fontSize: "clamp(14px,1.5vw,17px)",
                color: "rgba(255,255,255,.68)", lineHeight: 1.65,
                maxWidth: 440, marginBottom: 28,
              }}>
                {s.sub}
              </p>
              <Link href={s.href} className="carousel-cta-btn" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 26px", borderRadius: 10,
                fontSize: 14, fontWeight: 700,
                background: "#059669", color: "white",
                textDecoration: "none",
                fontFamily: "var(--font-jakarta)",
                boxShadow: "0 2px 12px rgba(5,150,105,.45)",
              }}>
                {s.cta} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {[{ dir: -1, side: "left", Icon: ChevronLeft }, { dir: 1, side: "right", Icon: ChevronRight }].map(({ dir, side, Icon }) => (
        <button
          key={side}
          onClick={() => go(cur + dir)}
          className="carousel-arrow-btn"
          aria-label={dir === -1 ? "Previous" : "Next"}
          style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            [side]: 20, zIndex: 10,
            width: 42, height: 42, borderRadius: "50%",
            background: "rgba(255,255,255,.12)",
            border: "1.5px solid rgba(255,255,255,.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "white",
            backdropFilter: "blur(6px)",
          }}
        >
          <Icon size={17} />
        </button>
      ))}

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 7, zIndex: 10,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              height: 7, borderRadius: 100,
              width: i === cur ? 26 : 7,
              background: i === cur ? "#059669" : "rgba(255,255,255,.35)",
              border: "none", padding: 0, cursor: "pointer",
              transition: "all .35s ease",
            }}
          />
        ))}
      </div>

      {/* Arrows hidden on mobile */}
      <style>{`
  .carousel-cta-btn:hover {
    background: #047857 !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(5,150,105,.5);
  }
  .carousel-arrow-btn:hover {
    background: rgba(255,255,255,.22) !important;
    border-color: rgba(255,255,255,.4) !important;
  }
  @media (max-width: 768px) {
    .carousel-arrow-btn { display: none !important; }
  }
`}</style>
    </section>
  );
}