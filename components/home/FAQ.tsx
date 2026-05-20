"use client";
import { useState } from "react";

type FaqItem = { q: string; a: string };
type FaqData = Record<string, FaqItem[]>;

const DATA: FaqData = {
  investing: [
    { q: "What is a SIP and how does it work?", a: "A SIP (Systematic Investment Plan) lets you invest a fixed amount in a mutual fund every month. Instead of timing the market, you invest regularly — this averages your purchase cost and builds wealth steadily over time through compounding." },
    { q: "Should I invest in direct or regular mutual funds?", a: "Direct funds have no distributor commission so their expense ratio is lower — meaning higher returns for you. Regular funds pay a commission to the agent who sold it to you. For most investors who can do basic research, direct funds are the better choice over the long run." },
    { q: "What is the difference between equity and debt mutual funds?", a: "Equity funds invest in stocks — higher potential returns but higher risk, best for 5+ year goals. Debt funds invest in bonds and fixed-income instruments — more stable, lower returns, suitable for short to medium-term goals or as the safer part of your portfolio." },
    { q: "How much should I invest every month to build wealth?", a: "A common rule is to invest at least 20% of your monthly income. But start with whatever you can — even ₹500/month in an index fund SIP, started early, can grow to significant wealth due to compounding. Use our SIP calculator to set a realistic target based on your goal." },
    { q: "Is it safe to invest in the stock market as a beginner?", a: "Yes — with the right approach. Beginners should start with index funds (like Nifty 50 index funds) rather than picking individual stocks. Keep a long-term horizon of 7–10 years, avoid panic-selling during dips, and never invest money you'll need in the short term." },
  ],
  tax: [
    { q: "Which tax regime is better — old or new?", a: "It depends on your deductions. The new regime has lower slab rates but allows very few deductions. The old regime allows HRA, 80C, home loan interest, and more. If your total deductions exceed ~₹3.75 lakhs, the old regime usually saves more. Use our Tax Regime Calculator for your exact situation." },
    { q: "What are the best tax-saving investments under Section 80C?", a: "Top 80C options up to ₹1.5L: ELSS mutual funds (best returns, 3-year lock-in), PPF (safe, 15-year, tax-free maturity), EPF (auto via salary), life insurance premiums, home loan principal repayment, and children's tuition fees. ELSS is generally recommended for those with a long horizon." },
    { q: "Do I need to file ITR if my income is below the taxable limit?", a: "Not mandatory, but highly recommended. Filing ITR builds a financial record useful for loan applications and visa processing. It's also required if you have foreign income, want to carry forward losses, or your TDS was deducted and you want a refund." },
    { q: "Is HRA exemption available under the new tax regime?", a: "No. HRA exemption is only available under the old tax regime. This is one of the key reasons why salaried employees paying rent in metro cities often find the old regime more beneficial — HRA exemption can save significant tax for those with high rent costs." },
  ],
  insurance: [
    { q: "How much term insurance cover do I actually need?", a: "A common rule is 10–15× your annual income. But the right amount depends on your outstanding loans, number of dependents, lifestyle expenses, and future goals like children's education. Use our Term Cover Estimator to calculate your exact requirement." },
    { q: "Why is term insurance better than LIC endowment plans?", a: "Term insurance gives pure life cover at a very low premium — ₹1 crore cover for ~₹10,000–15,000/year for a 30-year-old. LIC endowment mixes insurance + investment, giving you the worst of both worlds — inadequate cover and poor investment returns (typically 4–5% vs 12%+ in equity). Buy term separately, invest separately." },
    { q: "What should I look for in a health insurance plan?", a: "Key things to check: sum insured (minimum ₹10L in metros), no room rent capping, restoration benefit, pre/post hospitalisation coverage, no co-payment clause, wide network hospitals, and a high claim settlement ratio (above 95%). A family floater is cost-effective for families with young members." },
  ],
  loans: [
    { q: "How is my home loan EMI calculated?", a: "EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P is principal, R is monthly interest rate, and N is tenure in months. For a ₹50L loan at 8.5% for 20 years, EMI comes to ~₹43,391. Use our EMI calculator to instantly see your numbers and compare prepayment options." },
    { q: "Should I prepay my home loan or invest the extra money?", a: "If your home loan rate is 8.5% and you can earn 12%+ in equity mutual funds, investing typically wins over the long term. But prepayment gives guaranteed returns equal to your loan rate with zero risk. A balanced approach: maintain an emergency fund, invest for long-term goals, and prepay with surplus cash." },
    { q: "How can I improve my CIBIL score quickly?", a: "Pay all EMIs and credit card bills on time — this has the biggest impact. Keep credit utilisation below 30% of your limit. Don't apply for multiple loans at once. Maintain a mix of secured and unsecured credit. Check your report for errors and dispute them. A score above 750 gets you the best loan rates." },
  ],
  calculators: [
    { q: "Are your calculators free to use?", a: "Yes — completely free, always. No sign-up, no email required, no phone number asked. Open any calculator, enter your numbers, get your answer instantly. That's it." },
    { q: "How accurate is the SIP calculator?", a: "The SIP calculator uses the standard compound interest formula and gives you projections based on the return rate you enter. Actual returns depend on market performance and will vary. We recommend using a conservative rate (10–11%) for long-term equity SIPs rather than using recent high returns as your estimate." },
    { q: "What is the education corpus calculator and who should use it?", a: "It's built for parents who want to save for their child's college education. You enter the target year, estimated current cost, and education inflation rate — it tells you the future cost and the monthly SIP needed to build that corpus. Ideal for parents of children aged 0–12." },
  ],
};

const TABS = [
  { key: "investing",   label: "Investing"    },
  { key: "tax",         label: "Tax Planning" },
  { key: "insurance",   label: "Insurance"    },
  { key: "loans",       label: "Loans"        },
  { key: "calculators", label: "Calculators"  },
];

function FaqItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1.5px solid ${open ? "var(--navy-2)" : "var(--border)"}`,
      borderRadius: 12, overflow: "hidden",
      background: open ? "#F8FAFF" : "white",
      transition: "border-color .2s, background .2s",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
          padding: "16px 20px", cursor: "pointer",
          background: "none", border: "none",
          width: "100%", textAlign: "left",
          fontFamily: "inherit",
        }}
      >
        <span style={{
          fontSize: 15, fontWeight: 600,
          color: open ? "var(--text)" : "var(--muted)",
          lineHeight: 1.4, transition: "color .2s",
        }}>
          {item.q}
        </span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%",
          background: open ? "var(--navy-2)" : "var(--bg)",
          border: `1.5px solid ${open ? "var(--navy-2)" : "var(--border)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transform: open ? "rotate(45deg)" : "none",
          transition: "all .25s",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke={open ? "white" : "currentColor"} strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 18px" }}>
          <div style={{
            paddingTop: 14,
            fontSize: 14, color: "var(--muted)",
            lineHeight: 1.75,
            borderTop: "1px solid var(--border)",
          }}>
            {item.a}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [active, setActive] = useState("investing");

  return (
    <section style={{ padding: "88px 0", background: "var(--bg)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <span style={{
          display: "block", textAlign: "center",
          fontSize: 11, fontWeight: 700, letterSpacing: ".12em",
          textTransform: "uppercase",
          background: "linear-gradient(90deg,var(--em),var(--navy-2))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 14,
        }}>
          Got questions?
        </span>
        <h2 style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800,
          color: "var(--text)", letterSpacing: "-.025em",
          textAlign: "center", marginBottom: 40,
        }}>
          Frequently Asked Questions
        </h2>

        {/* Category tabs */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "center",
          gap: 10, marginBottom: 40,
        }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`faq-tab ${active === tab.key ? "faq-tab-on" : ""}`}
            >
              <span style={{ position: "relative", zIndex: 1 }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DATA[active].map((item, i) => (
            <FaqItem key={`${active}-${i}`} item={item} />
          ))}
        </div>

      </div>

      <style>{`
        .faq-tab {
          position: relative; overflow: hidden;
          padding: 7px 16px; border-radius: 8px;
          border: 1.5px solid var(--border);
          font-size: 13px; font-weight: 600;
          color: var(--muted); background: transparent;
          cursor: pointer; font-family: inherit;
          transition: color .3s, border-color .3s;
        }
        .faq-tab::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, var(--em), var(--em-2));
          transform: translateY(100%);
          transition: transform .35s cubic-bezier(.4,0,.2,1);
          z-index: 0;
        }
        .faq-tab:hover { border-color: var(--em); color: var(--em); }
        .faq-tab-on {
          border-color: var(--em);
          color: white;
        }
        .faq-tab-on::before { transform: translateY(0); }
        @media (max-width: 480px) {
          .faq-tab { padding: 6px 12px; font-size: 12px; }
        }
      `}</style>
    </section>
  );
}