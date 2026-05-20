"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp, FileText, Shield, Briefcase, Users, Monitor,
  Calculator, BookOpen, Star, Home, GraduationCap, RefreshCw,
  CreditCard, BarChart2, Globe, ChevronDown, Menu, X,
  User, Phone, ChevronRight, ArrowRight,
} from "lucide-react";
import LoginModal from "@/components/shared/LoginModal";

// ── Types ──────────────────────────────────────────────────────────────
type SimpleItem = { label: string; href: string; icon: React.ReactNode; sub?: string };
type MegaCol = { heading: string; links: { label: string; href: string }[] };

// ── Data ───────────────────────────────────────────────────────────────
const loansCols: MegaCol[] = [
  {
    heading: "Home Loans",
    links: [
      { label: "Home Loan Guide",      href: "/loans/home-loan-guide"         },
      { label: "Balance Transfer",     href: "/loans/balance-transfer"        },
      { label: "Top Up Loan",          href: "/loans/top-up-loan"             },
      { label: "EMI Calculator",       href: "/calculators/emi"               },
      { label: "Eligibility Criteria", href: "/loans/home-loan-eligibility"   },
      { label: "Interest Rates",       href: "/loans/home-loan-rates"         },
    ],
  },
  {
    heading: "Personal Loans",
    links: [
      { label: "Personal Loan Guide",  href: "/loans/personal-loan-guide"     },
      { label: "Loan for Wedding",     href: "/loans/wedding-loan"            },
      { label: "Loan for Vacation",    href: "/loans/vacation-loan"           },
      { label: "EMI Calculator",       href: "/calculators/emi"               },
      { label: "Eligibility Criteria", href: "/loans/personal-loan-eligibility"},
      { label: "Interest Rates",       href: "/loans/personal-loan-rates"     },
    ],
  },
  {
    heading: "Education Loans",
    links: [
      { label: "Education Loan Guide", href: "/loans/education-loan-guide"    },
      { label: "Banks vs NBFCs",       href: "/loans/banks-vs-nbfc"           },
      { label: "Moratorium Period",    href: "/loans/moratorium-period"       },
      { label: "Section 80E Benefit",  href: "/loans/section-80e"            },
      { label: "EMI Calculator",       href: "/calculators/emi"               },
      { label: "Eligibility Criteria", href: "/loans/education-loan-eligibility"},
    ],
  },
  {
    heading: "Credit & Score",
    links: [
      { label: "CIBIL Score Guide",    href: "/loans/cibil-score"             },
      { label: "Improve Credit Score", href: "/loans/improve-credit-score"    },
      { label: "Credit Card Guide",    href: "/loans/credit-card-guide"       },
      { label: "Billing Cycle",        href: "/loans/billing-cycle"           },
      { label: "Minimum Payment Trap", href: "/loans/minimum-payment-trap"    },
    ],
  },
  {
    heading: "Loan Tools",
    links: [
      { label: "Home Loan EMI Calc",   href: "/calculators/emi"               },
      { label: "Personal Loan EMI",    href: "/calculators/emi"               },
      { label: "Prepayment Strategy",  href: "/loans/prepayment-strategy"     },
      { label: "Rent vs Buy",          href: "/loans/rent-vs-buy"             },
    ],
  },
];

const investingCols: MegaCol[] = [
  {
    heading: "Mutual Funds",
    links: [
      { label: "Mutual Funds 101",     href: "/investing/mutual-funds-101"    },
      { label: "SIP vs Lump Sum",      href: "/investing/sip-vs-lumpsum"      },
      { label: "Direct vs Regular",    href: "/investing/direct-vs-regular"   },
      { label: "Best Index Funds",     href: "/investing/best-index-funds"    },
      { label: "ELSS for Tax Saving",  href: "/investing/elss"                },
    ],
  },
  {
    heading: "Stocks & More",
    links: [
      { label: "Stock Market Basics",  href: "/investing/stock-market-basics" },
      { label: "How to Open Demat",    href: "/investing/open-demat-account"  },
      { label: "Sovereign Gold Bonds", href: "/investing/sovereign-gold-bonds"},
      { label: "Fixed Deposits Guide", href: "/investing/fixed-deposits"      },
      { label: "Nifty 50 Explained",   href: "/investing/nifty-50"            },
    ],
  },
  {
    heading: "Strategies",
    links: [
      { label: "Emergency Fund First", href: "/investing/emergency-fund"      },
      { label: "Goal-based Investing", href: "/investing/goal-based"          },
      { label: "Asset Allocation",     href: "/investing/asset-allocation"    },
      { label: "Rebalancing Portfolio",href: "/investing/rebalancing"         },
      { label: "Retire Early Guide",   href: "/investing/retire-early"        },
    ],
  },
];

const taxCols: MegaCol[] = [
  {
    heading: "Tax Planning",
    links: [
      { label: "Old vs New Regime",    href: "/tax/old-regime-vs-new-regime"  },
      { label: "Section 80C Guide",    href: "/tax/section-80c"               },
      { label: "HRA Exemption Rules",  href: "/tax/hra-exemption"             },
      { label: "Home Loan Tax Benefit",href: "/tax/home-loan-tax-benefit"     },
      { label: "Standard Deduction",   href: "/tax/standard-deduction"        },
      { label: "LTA Exemption",        href: "/tax/lta-exemption"             },
    ],
  },
  {
    heading: "ITR Filing",
    links: [
      { label: "How to File ITR",      href: "/tax/how-to-file-itr"           },
      { label: "Form 16 Decoded",      href: "/tax/form-16"                   },
      { label: "Capital Gains Tax",    href: "/tax/capital-gains"             },
      { label: "Tax on FD Interest",   href: "/tax/fd-interest-tax"           },
      { label: "Tax for Freelancers",  href: "/tax/freelancer-tax"            },
      { label: "Advance Tax Guide",    href: "/tax/advance-tax"               },
    ],
  },
];

const toolsCols: MegaCol[] = [
  {
    heading: "Calculators",
    links: [
      { label: "SIP Calculator",       href: "/calculators/sip"               },
      { label: "EMI Calculator",       href: "/calculators/emi"               },
      { label: "Tax Regime Comparator",href: "/calculators/tax"               },
      { label: "Education Corpus",     href: "/calculators/education-corpus"  },
      { label: "Term Cover Estimator", href: "/calculators/term-cover"        },
    ],
  },
  {
    heading: "Reference",
    links: [
      { label: "Finance Glossary A–Z", href: "/glossary"                      },
      { label: "Govt. Schemes Guide",  href: "/schemes"                       },
      { label: "PPF Rate History",     href: "/schemes/ppf-rates"             },
      { label: "Interest Rate Tracker",href: "/tools/interest-rates"          },
    ],
  },
];

const blogItems: SimpleItem[] = [
  { label: "Latest Articles", href: "/blog",              icon: <FileText size={14} />, sub: "All recent posts"       },
  { label: "Most Popular",    href: "/blog/popular",      icon: <Star     size={14} />, sub: "Top reads this month"   },
  { label: "Investing",       href: "/blog?cat=investing", icon: <TrendingUp size={14}/>, sub: "Stocks, SIPs, funds"  },
  { label: "Tax Planning",    href: "/blog?cat=tax",      icon: <FileText size={14} />, sub: "ITR, regimes, 80C"      },
  { label: "Family Finance",  href: "/blog?cat=family",   icon: <Users    size={14} />, sub: "Plan for your family"   },
  { label: "Govt. Schemes",   href: "/blog?cat=schemes",  icon: <Monitor  size={14} />, sub: "PPF, SSY, EPF, NPS"     },
];

const aboutItems: SimpleItem[] = [
  { label: "Who We Are",     href: "/about",      icon: <User      size={14} /> },
  { label: "Contact Us",     href: "/contact",    icon: <Phone     size={14} /> },
  { label: "Disclaimer",     href: "/disclaimer", icon: <Shield    size={14} /> },
  { label: "Privacy Policy", href: "/privacy",    icon: <FileText  size={14} /> },
  { label: "Terms of Use",   href: "/terms",      icon: <BookOpen  size={14} /> },
];

// ── CSS vars (inline) ──────────────────────────────────────────────────
const V = {
  navy:    "#0B1F4F",
  navy2:   "#1A3A8F",
  nl:      "#EEF3FF",
  em:      "#059669",
  em2:     "#047857",
  text:    "#0F172A",
  muted:   "#64748B",
  border:  "#E2E8F0",
  bg:      "#F8FAFC",
};

// ── Shared dropdown box styles ─────────────────────────────────────────
const ddBox: React.CSSProperties = {
  background: "white",
  border: `1px solid ${V.border}`,
  borderRadius: 14,
  boxShadow: "0 8px 40px rgba(11,31,79,.13), 0 2px 8px rgba(11,31,79,.07)",
  position: "relative",
};

// ── Sub-components ─────────────────────────────────────────────────────

function McLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex", alignItems: "flex-start", gap: 7,
        padding: "6px 8px", borderRadius: 6,
        fontSize: 12.5, fontWeight: 500, color: "#374151",
        textDecoration: "none", lineHeight: 1.4,
        transition: "all .15s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = V.nl;
        (e.currentTarget as HTMLAnchorElement).style.color = V.navy2;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
        (e.currentTarget as HTMLAnchorElement).style.color = "#374151";
      }}
    >
      <span style={{ width: 5, height: 5, minWidth: 5, borderRadius: "50%", background: "#D1D5DB", marginTop: 5, flexShrink: 0, display: "inline-block" }} />
      {label}
    </Link>
  );
}

function McCol({ col, last }: { col: MegaCol; last?: boolean }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      padding: "0 18px",
      borderRight: last ? "none" : `1px solid ${V.border}`,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".1em",
        textTransform: "uppercase", color: "#94A3B8",
        marginBottom: 10, paddingBottom: 8,
        borderBottom: `1px solid ${V.border}`,
        whiteSpace: "nowrap",
      }}>
        {col.heading}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {col.links.map(l => <McLink key={l.href + l.label} href={l.href} label={l.label} />)}
      </div>
    </div>
  );
}

function FeatCard({ icon, title, sub, href }: { icon: React.ReactNode; title: string; sub: string; href: string }) {
  return (
    <div style={{
      width: 172, flexShrink: 0,
      background: `linear-gradient(145deg,${V.navy} 0%,${V.navy2} 100%)`,
      borderRadius: 10, padding: "18px 16px",
      marginRight: 18, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle,rgba(255,255,255,.05) 1px,transparent 1px)",
        backgroundSize: "16px 16px", pointerEvents: "none",
      }} />
      <div style={{
        width: 34, height: 34, borderRadius: 8,
        background: "rgba(255,255,255,.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 11, position: "relative", zIndex: 1, color: "white",
      }}>
        {icon}
      </div>
      <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 13.5, fontWeight: 700, color: "white", marginBottom: 5, position: "relative", zIndex: 1 }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", lineHeight: 1.55, marginBottom: 14, position: "relative", zIndex: 1 }}>
        {sub}
      </div>
      <Link href={href} style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "6px 11px", borderRadius: 7,
        background: "rgba(255,255,255,.15)", color: "white",
        fontSize: 11, fontWeight: 600, textDecoration: "none",
        border: "1px solid rgba(255,255,255,.15)",
        position: "relative", zIndex: 1,
      }}>
        Try Free <ArrowRight size={11} />
      </Link>
    </div>
  );
}

function SimpleItem({ item }: { item: SimpleItem }) {
  return (
    <Link
      href={item.href}
      style={{
        display: "flex", alignItems: "center", gap: 9,
        padding: "8px 10px", borderRadius: 7,
        fontSize: 13, fontWeight: 500, color: V.text,
        textDecoration: "none", whiteSpace: "nowrap",
        transition: "all .15s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = V.nl;
        (e.currentTarget as HTMLAnchorElement).style.color = V.navy2;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
        (e.currentTarget as HTMLAnchorElement).style.color = V.text;
      }}
    >
      <span style={{ color: V.muted, display: "flex" }}>{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  );
}

// ── Hover dropdown wrapper ─────────────────────────────────────────────
function HoverDrop({
  label,
  children,
  leftAlign = false,
  rightAlign = false,
}: {
  label: string;
  children: React.ReactNode;
  leftAlign?: boolean;
  rightAlign?: boolean;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();

  const ddPos = leftAlign
    ? "left:0;transform:none;"
    : rightAlign
    ? "left:auto;right:0;transform:none;"
    : "left:50%;transform:translateX(-50%);";

  return (
    <div className={`ni ni-${id}`} style={{ position: "relative" }}>
      <button className="nl" style={{
        display: "flex", alignItems: "center", gap: 4,
        padding: "7px 11px", borderRadius: 7,
        fontSize: 13, fontWeight: 600,
        color: V.muted, background: "transparent",
        border: "none", cursor: "pointer", whiteSpace: "nowrap",
        fontFamily: "inherit",
      }}>
        {label}
        <ChevronDown size={11} style={{ color: "#94A3B8" }} className="chv" />
      </button>

      <div className="dd" style={{
        position: "absolute", top: "100%",
        paddingTop: 10, zIndex: 600,
      }}>
        {children}
      </div>

      <style>{`
        .ni-${id} .nl { transition: all .15s; }
        .ni-${id}:hover .nl { background: ${V.nl}; color: ${V.navy2}; }
        .ni-${id}:hover .nl .chv { transform: rotate(180deg); color: ${V.navy2}; }
        .ni-${id} .dd {
          opacity: 0; visibility: hidden; pointer-events: none;
          ${ddPos}
          transform: ${leftAlign || rightAlign ? "translateY(-6px)" : "translateX(-50%) translateY(-6px)"};
          transition: opacity .18s ease, transform .18s ease, visibility 0s .18s;
        }
        .ni-${id}:hover .dd {
          opacity: 1; visibility: visible; pointer-events: auto;
          transform: ${leftAlign || rightAlign ? "translateY(0)" : "translateX(-50%) translateY(0)"};
          transition: opacity .18s ease, transform .18s ease, visibility 0s 0s;
        }
      `}</style>
    </div>
  );
}

// ── Mobile accordion ──────────────────────────────────────────────────
function MobAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${V.border}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "13px 18px",
          background: "none", border: "none", cursor: "pointer",
          fontSize: 14, fontWeight: 600, color: V.text, fontFamily: "inherit",
          transition: "background .15s",
        }}
      >
        {label}
        <ChevronDown size={14} style={{ color: V.muted, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div style={{ padding: "4px 18px 12px 32px", display: "flex", flexDirection: "column", gap: 2 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function MobLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{ display: "block", padding: "7px 8px", fontSize: 13, color: V.muted, textDecoration: "none", borderRadius: 6 }}
    >
      {label}
    </Link>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobOpen, setMobOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ── Top bar ── */}
      <div style={{ background: V.navy, padding: "7px 0", fontSize: 12 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[
              { label: "About Us",      href: "/about"      },
              { label: "Disclaimer",    href: "/disclaimer" },
              { label: "Privacy Policy",href: "/privacy"    },
            ].map((l, i) => (
              <span key={l.href} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,.2)", fontSize: 10 }}>•</span>}
                <Link href={l.href} style={{ color: "rgba(255,255,255,.55)", textDecoration: "none", fontWeight: 500, padding: "2px 7px", borderRadius: 4, whiteSpace: "nowrap" }}>
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ background: "rgba(5,150,105,.3)", color: "#34D399", padding: "2px 8px", borderRadius: 4, fontSize: 10.5, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase" }}>
              Beta
            </span>
            <Link href="https://skillsnaplearning.com" target="_blank" style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.55)", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>
              <Home size={11} />
              SkillSnap Learning
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav style={{
        background: "white",
        borderBottom: `1px solid ${V.border}`,
        position: "sticky", top: 0, zIndex: 500,
        boxShadow: "0 2px 16px rgba(11,31,79,.07)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 64, gap: 16 }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
            <Image
              src="/images/skillsnap-logo.svg"
              alt="SkillSnap Finance"
              width={80}
              height={80}
              style={{ borderRadius: 10, flexShrink: 0 }}
            />
          </Link>

          {/* Search */}
          <div style={{ flex: 1, minWidth: 0, maxWidth: 380, position: "relative" }}>
            <input
              type="text"
              placeholder="Search articles, calculators…"
              style={{
                width: "100%", height: 38,
                padding: "0 36px 0 14px",
                border: `1.5px solid ${V.border}`, borderRadius: 8,
                fontSize: 13, fontFamily: "inherit",
                color: V.text, background: V.bg,
                outline: "none",
              }}
              onFocus={e => { e.target.style.borderColor = V.navy2; e.target.style.background = "white"; }}
              onBlur={e  => { e.target.style.borderColor = V.border; e.target.style.background = V.bg; }}
            />
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", display: "flex", pointerEvents: "none" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </span>
          </div>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }} className="hide-mobile">

            {/* LOANS */}
            <HoverDrop label="Loans" leftAlign>
              <div style={{ ...ddBox, padding: 22, width: "min(860px,95vw)", right: 200 }}>
                <div style={{ display: "flex", overflow: "hidden" }}>
                  {loansCols.map((col, i) => (
                    <McCol key={col.heading} col={col} last={i === loansCols.length - 1} />
                  ))}
                </div>
              </div>
            </HoverDrop>

            {/* INVESTING */}
            <HoverDrop label="Investing">
              <div style={{ ...ddBox, padding: 22, width: "min(680px,95vw)" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <FeatCard
                    icon={<TrendingUp size={17} />}
                    title="SIP Calculator"
                    sub="See how ₹5,000/mo grows to ₹11.6L in 10 years"
                    href="/calculators/sip"
                  />
                  <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
                    {investingCols.map((col, i) => (
                      <McCol key={col.heading} col={col} last={i === investingCols.length - 1} />
                    ))}
                  </div>
                </div>
                {/* Footer strip */}
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${V.border}`, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", fontSize: 12, color: V.muted }}>
                  <Star size={12} style={{ color: "#94A3B8" }} />
                  Popular:
                  {[
                    { label: "Beginner's Guide to Investing", href: "/investing/beginners-guide" },
                    { label: "Why Index Funds Beat Active Funds", href: "/investing/index-funds-vs-active-funds" },
                    { label: "SIP Returns Calculator", href: "/calculators/sip" },
                  ].map((l, i) => (
                    <span key={l.href} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {i > 0 && <span style={{ color: "#D1D5DB" }}>·</span>}
                      <Link href={l.href} style={{ fontSize: 12, fontWeight: 600, color: V.navy2, textDecoration: "none" }}>{l.label}</Link>
                    </span>
                  ))}
                </div>
              </div>
            </HoverDrop>

            {/* TAX */}
            <HoverDrop label="Tax">
              <div style={{ ...ddBox, padding: 22, width: "min(480px,95vw)" }}>
                <div style={{ display: "flex" }}>
                  {taxCols.map((col, i) => (
                    <McCol key={col.heading} col={col} last={i === taxCols.length - 1} />
                  ))}
                </div>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${V.border}`, display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: V.muted }}>
                  <FileText size={12} style={{ color: "#94A3B8" }} />
                  Try:
                  <Link href="/calculators/tax" style={{ fontSize: 12, fontWeight: 600, color: V.navy2, textDecoration: "none" }}>
                    Old vs New Regime Calculator
                  </Link>
                </div>
              </div>
            </HoverDrop>

            {/* TOOLS */}
            <HoverDrop label="Tools">
              <div style={{ ...ddBox, padding: 22, width: "min(520px,95vw)" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <FeatCard
                    icon={<Calculator size={17} />}
                    title="All Calculators"
                    sub="5 free tools to plan your finances"
                    href="/calculators"
                  />
                  <div style={{ flex: 1, display: "flex" }}>
                    {toolsCols.map((col, i) => (
                      <McCol key={col.heading} col={col} last={i === toolsCols.length - 1} />
                    ))}
                  </div>
                </div>
              </div>
            </HoverDrop>

            {/* BLOG */}
            <HoverDrop label="Blog" rightAlign>
              <div style={{ ...ddBox, padding: 8, width: 210 }}>
                {blogItems.slice(0, 2).map(item => <SimpleItem key={item.href} item={item} />)}
                <div style={{ height: 1, background: V.border, margin: "6px 4px" }} />
                {blogItems.slice(2).map(item => <SimpleItem key={item.href} item={item} />)}
              </div>
            </HoverDrop>

            {/* ABOUT */}
            <HoverDrop label="About Us" rightAlign>
              <div style={{ ...ddBox, padding: 8, width: 192 }}>
                {aboutItems.slice(0, 2).map(item => <SimpleItem key={item.href} item={item} />)}
                <div style={{ height: 1, background: V.border, margin: "6px 4px" }} />
                {aboutItems.slice(2).map(item => <SimpleItem key={item.href} item={item} />)}
              </div>
            </HoverDrop>
          </div>

          {/* Login button */}
          <button
            onClick={() => setModalOpen(true)}
            className="nav-login-btn"
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "8px 20px", borderRadius: 9,
              fontSize: 13, fontWeight: 700,
              background: "#0B1F4F", color: "white",
              border: "none", cursor: "pointer", flexShrink: 0,
              fontFamily: "var(--font-jakarta)",
              boxShadow: "0 1px 6px rgba(11,31,79,.25)",
              whiteSpace: "nowrap",
            }}
          >
            <User size={13} />
            Login
          </button>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobOpen(o => !o)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 7, borderRadius: 8, color: V.text, marginLeft: "auto" }}
          >
            {mobOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 700 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)" }} onClick={() => setMobOpen(false)} />
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: "min(320px,90vw)", background: "white",
            overflowY: "auto", boxShadow: "4px 0 24px rgba(0,0,0,.15)",
          }}>
            {/* Drawer header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: `1px solid ${V.border}`, position: "sticky", top: 0, background: "white", zIndex: 1 }}>
              <span style={{ fontFamily: "var(--font-jakarta)", fontSize: 15, fontWeight: 800, color: V.navy }}>SkillSnap Finance</span>
              <button onClick={() => setMobOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: V.muted }}>
                <X size={20} />
              </button>
            </div>

            <MobAccordion label="Loans">
              {loansCols.map(col => col.links.map(l => <MobLink key={l.href + l.label} href={l.href} label={l.label} />))}
            </MobAccordion>
            <MobAccordion label="Investing">
              {investingCols.map(col => col.links.map(l => <MobLink key={l.href + l.label} href={l.href} label={l.label} />))}
            </MobAccordion>
            <MobAccordion label="Tax">
              {taxCols.map(col => col.links.map(l => <MobLink key={l.href + l.label} href={l.href} label={l.label} />))}
            </MobAccordion>
            <MobAccordion label="Tools">
              {toolsCols.map(col => col.links.map(l => <MobLink key={l.href + l.label} href={l.href} label={l.label} />))}
            </MobAccordion>
            <MobAccordion label="Blog">
              {blogItems.map(l => <MobLink key={l.href} href={l.href} label={l.label} />)}
            </MobAccordion>
            <MobAccordion label="About Us">
              {aboutItems.map(l => <MobLink key={l.href} href={l.href} label={l.label} />)}
            </MobAccordion>

            <div style={{ margin: 18 }}>
              <Link
                href="/login"
                className="nav-login-btn"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: 12, borderRadius: 10,
                  background: V.navy, color: "white",
                  fontSize: 14, fontWeight: 700, textDecoration: "none",
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                <User size={15} /> Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 960px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 961px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
      <style>{`
  .nav-login-btn:hover {
    background: #1A3A8F !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(11,31,79,.3);
  }
`}</style>

<LoginModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}