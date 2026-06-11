"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SEO_DATA: Record<string, string[]> = {
  investing:   ["Mutual Funds for Beginners","SIP vs Lump Sum","Best Index Funds 2025","How to Open Demat Account","Nifty 50 vs Nifty Next 50","Direct vs Regular Mutual Fund","ELSS Tax Saving Funds","Stock Market for Beginners","Sovereign Gold Bonds","Dividend vs Growth Plan"],
  tax:         ["Old Regime vs New Regime","Section 80C Complete Guide","HRA Exemption Rules","ITR Filing Step by Step","Form 16 Explained","Tax on Salary Income","Home Loan Tax Benefits","Standard Deduction 2025","Tax on FD Interest","Capital Gains Tax India"],
  insurance:   ["Term Insurance vs LIC","How Much Term Cover Needed","Best Health Insurance 2025","Family Floater vs Individual","Critical Illness Cover","PMSBY Free Insurance","Accidental Insurance Guide","Health Insurance Deductible","Pre-existing Disease Cover","Health Insurance Portability"],
  loans:       ["Home Loan EMI Calculator","Education Loan Tax Benefit","Credit Score Improvement","Home Loan vs Rent","Education Loan Banks vs NBFCs","Credit Card Billing Cycle","Personal Loan Interest Rates","Loan Prepayment Strategy","CIBIL Score Free Check","Home Loan Balance Transfer"],
  calculators: ["SIP Calculator","EMI Calculator","Tax Regime Comparator","Education Corpus Calculator","Term Insurance Estimator","Compound Interest Calculator","Home Loan Calculator","Retirement Calculator","FD Interest Calculator","PPF Maturity Calculator"],
  schemes:     ["PPF Complete Guide","Sukanya Samriddhi Yojana","NPS vs EPF Comparison","PMJJBY Free Life Insurance","Atal Pension Yojana","Jan Dhan Account Benefits","Kisan Vikas Patra","NSC vs FD","EPF Withdrawal Rules","Senior Citizen Savings Scheme"],
};

const SEO_TABS = ["investing","tax","insurance","loans","calculators","schemes"];

const TOPICS = [
  { label: "Investing",      href: "/investing"      },
  { label: "Tax Planning",   href: "/tax"            },
  { label: "Insurance",      href: "/insurance"      },
  { label: "Loans & Credit", href: "/loans"          },
  { label: "Family Finance", href: "/family-finance" },
  { label: "Govt. Schemes",  href: "/schemes"        },
  { label: "Glossary A–Z",   href: "/glossary"       },
  { label: "All Articles",   href: "/blog"           },
];

const CALCULATORS = [
  { label: "SIP Calculator",        href: "/calculators/sip-calculator"               },
  { label: "EMI Calculator",        href: "/calculators/emi-calculator"               },
  { label: "Tax Regime Comparator", href: "/calculators/tax-calculator"               },
  { label: "Education Corpus",      href: "/calculators/education-corpus-calculator"  },
  { label: "Term Cover Estimator",  href: "/insurance/term-insurance-how-much-needed" },
];

const COMPANY = [
  { label: "About Us",      href: "/about"      },
  { label: "Contact",       href: "/contact"    },
  { label: "Disclaimer",    href: "/disclaimer" },
  { label: "Privacy Policy",href: "/privacy"    },
  { label: "Terms of Use",  href: "/terms"      },
];

function FLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="f-link-item">
      <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)" }}>›</span>
      {label}
    </Link>
  );
}

export default function Footer() {
  const [seoTab, setSeoTab] = useState("investing");

  return (
    <footer style={{ background: "var(--navy)" }}>

      {/* Top CTA band */}
      <div style={{
        padding: "22px 0",
        background: "linear-gradient(90deg,rgba(5,150,105,.14) 0%,transparent 60%)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          gap: 20, flexWrap: "wrap",
        }}>
          <div style={{
            fontSize: 15, fontWeight: 600,
            color: "rgba(255,255,255,.8)",
            fontFamily: "var(--font-jakarta)",
          }}>
            Start with the{" "}
            <span style={{ color: "#34D399" }}>SIP Calculator</span>
            {" "}— see your wealth grow in 30 seconds.
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/calculators/sip-calculator" className="f-btn-em">Try SIP Calculator</Link>
            <Link href="/calculators" className="f-btn-ghost">All Calculators</Link>
          </div>
        </div>
      </div>

      {/* Main body */}
      <div style={{ padding: "52px 0 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

          {/* 4-col grid */}
          <div className="f-main-grid">

            {/* Brand */}
            <div>
              <div style={{ marginBottom: 12 }}>
                <div style={{
                    width: 80, height: 80,
                    borderRadius: 12, background: "white",
                    padding: 7, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    }}>
                    <Image
                        src="/images/skillsnap-logo.svg"
                        alt="SkillSnap Finance"
                        width={156} height={80}
                        style={{ objectFit: "contain", display: "block", width: 66, height: "auto" }}
                    />
                </div>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", letterSpacing: ".05em", marginBottom: 14 }}>
                by SkillSnap Learning · Gurgaon, India
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.75, marginBottom: 22, maxWidth: 220 }}>
                Plain-language personal finance for Indian families. No jargon, no agenda, no ads.
              </div>
              {/* Socials */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { href: "https://x.com/skillsnaplearn", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { href: "https://www.linkedin.com/company/skillsnap-learning-pvt-ltd/", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                  { href: "https://www.youtube.com/@SkillSnaplearning", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg> },
                  { href: "https://www.instagram.com/skillsnaplearning", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                ].map((s, i) => (
                  <Link key={i} href={s.href} target="_blank" rel="noopener" className="f-social-btn">
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <div className="f-col-h">Topics</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TOPICS.map(l => <FLink key={l.href} href={l.href} label={l.label} />)}
              </div>
            </div>

            {/* Calculators */}
            <div>
              <div className="f-col-h">Free Calculators</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {CALCULATORS.map(l => <FLink key={l.href} href={l.href} label={l.label} />)}
              </div>
              <div className="f-col-h" style={{ marginTop: 24 }}>SkillSnap Learning</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <FLink href="https://skillsnaplearning.com" label="Main Website ↗" />
                <FLink href="https://skillsnaplearning.com/contact" label="Book Free Demo" />
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="f-col-h">Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {COMPANY.map(l => <FLink key={l.href} href={l.href} label={l.label} />)}
              </div>
            </div>

          </div>

          {/* SEO tabs grid */}
          <div style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{
              display: "flex", overflowX: "auto",
              marginBottom: 24, scrollbarWidth: "none",
            }}>
              {SEO_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setSeoTab(tab)}
                  className={`f-seo-tab-btn ${seoTab === tab ? "f-seo-tab-on" : ""}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="f-seo-grid">
              {SEO_DATA[seoTab].map((l, i) => (
                <Link key={i} href="#" className="f-seo-link-item">{l}</Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,.07)",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12.5, color: "rgba(255,255,255,.25)",
            flexWrap: "wrap", gap: 12,
          }}>
            <span>
              © 2026 SkillSnap Finance · Part of{" "}
              <Link href="https://skillsnaplearning.com" style={{ color: "rgba(52,211,153,.7)", textDecoration: "none" }}>
                SkillSnap Learning
              </Link>
            </span>
            <div style={{ display: "flex", gap: 22 }}>
              {[
                { label: "Privacy",    href: "/privacy"     },
                { label: "Terms",      href: "/terms"       },
                { label: "Disclaimer", href: "/disclaimer"  },
                { label: "Sitemap",    href: "/sitemap.xml" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="f-bottom-link">{l.label}</Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .f-main-grid {
          display: grid;
          grid-template-columns: 260px 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 44px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          margin-bottom: 40px;
        }
        .f-col-h {
          font-size: 11px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.3); margin-bottom: 18px;
        }
        .f-link-item {
          font-size: 13.5px; color: rgba(255,255,255,.5);
          text-decoration: none; transition: color .12s;
          display: flex; align-items: center; gap: 5px; padding: 2px 0;
        }
        .f-link-item:hover { color: white; }
        .f-social-btn {
          width: 34px; height: 34px; border-radius: 8px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,.45); text-decoration: none;
          transition: all .15s;
        }
        .f-social-btn:hover { background: rgba(255,255,255,.14); color: white; }
        .f-btn-em {
          padding: 9px 20px; border-radius: 8px;
          background: var(--em); color: white;
          font-size: 13px; font-weight: 700;
          text-decoration: none; transition: all .15s;
          font-family: var(--font-jakarta);
        }
        .f-btn-em:hover { background: var(--em-2); }
        .f-btn-ghost {
          padding: 9px 20px; border-radius: 8px;
          background: rgba(255,255,255,.1);
          color: rgba(255,255,255,.7);
          font-size: 13px; font-weight: 600;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.1);
          transition: all .15s;
        }
        .f-btn-ghost:hover { background: rgba(255,255,255,.15); color: white; }
        .f-seo-tab-btn {
          padding: 8px 16px; font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,.35); cursor: pointer;
          border-bottom: 2px solid transparent;
          border-top: none; border-left: none; border-right: none;
          background: none; transition: all .15s; white-space: nowrap;
          font-family: var(--font-jakarta);
        }
        .f-seo-tab-btn:hover { color: rgba(255,255,255,.65); }
        .f-seo-tab-on { color: white !important; border-bottom-color: var(--em) !important; }
        .f-seo-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px 20px;
        }
        .f-seo-link-item {
          font-size: 12.5px; color: rgba(255,255,255,.35);
          text-decoration: none; padding: 4px 0;
          transition: color .12s;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .f-seo-link-item:hover { color: rgba(255,255,255,.7); }
        .f-bottom-link {
          color: rgba(255,255,255,.25); text-decoration: none; transition: color .12s;
        }
        .f-bottom-link:hover { color: rgba(255,255,255,.55); }
        @media (max-width: 1024px) {
          .f-main-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
          .f-seo-grid  { grid-template-columns: repeat(3,1fr); }
        }
        @media (max-width: 640px) {
          .f-main-grid { grid-template-columns: 1fr; }
          .f-seo-grid  { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </footer>
  );
}