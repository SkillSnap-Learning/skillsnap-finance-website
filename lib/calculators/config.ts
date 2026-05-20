export type CalculatorType = "sip" | "emi" | "tax" | "education" | "term" | "ppf";

export type CalculatorVariant = {
  type: CalculatorType;
  variant: string | null;
  title: string;
  description: string;
  canonical: string; // always points to the core calculator
};

export const CALCULATOR_CONFIG: Record<string, CalculatorVariant> = {
  // ── SIP ────────────────────────────────────────────────
  "sip-calculator": {
    type: "sip",
    variant: null,
    title: "SIP Calculator — Calculate SIP Returns Online",
    description: "Calculate how your monthly SIP investment grows over time. Free SIP calculator for mutual funds — see maturity amount, wealth gained, and year-by-year breakdown.",
    canonical: "/calculators/sip-calculator",
  },
  "hdfc-sip-calculator": {
    type: "sip",
    variant: "HDFC",
    title: "HDFC SIP Calculator — HDFC Mutual Fund SIP Returns",
    description: "Calculate SIP returns for HDFC Mutual Fund schemes. Free HDFC SIP calculator — estimate maturity amount for HDFC equity, debt, and hybrid funds.",
    canonical: "/calculators/sip-calculator",
  },
  "sbi-sip-calculator": {
    type: "sip",
    variant: "SBI",
    title: "SBI SIP Calculator — SBI Mutual Fund SIP Returns",
    description: "Calculate SIP returns for SBI Mutual Fund schemes. Free SBI SIP calculator — estimate maturity amount for SBI equity, debt, and hybrid funds.",
    canonical: "/calculators/sip-calculator",
  },
  "icici-sip-calculator": {
    type: "sip",
    variant: "ICICI",
    title: "ICICI Prudential SIP Calculator — SIP Returns",
    description: "Calculate SIP returns for ICICI Prudential Mutual Fund. Free ICICI SIP calculator — estimate maturity amount for ICICI equity and debt funds.",
    canonical: "/calculators/sip-calculator",
  },
  "axis-sip-calculator": {
    type: "sip",
    variant: "Axis",
    title: "Axis Bank SIP Calculator — Axis Mutual Fund SIP Returns",
    description: "Calculate SIP returns for Axis Mutual Fund schemes. Free Axis SIP calculator — estimate maturity amount for Axis equity and hybrid funds.",
    canonical: "/calculators/sip-calculator",
  },
  "kotak-sip-calculator": {
    type: "sip",
    variant: "Kotak",
    title: "Kotak SIP Calculator — Kotak Mutual Fund SIP Returns",
    description: "Calculate SIP returns for Kotak Mutual Fund schemes. Free Kotak SIP calculator — estimate maturity amount for Kotak equity and debt funds.",
    canonical: "/calculators/sip-calculator",
  },

  // ── EMI ────────────────────────────────────────────────
  "emi-calculator": {
    type: "emi",
    variant: null,
    title: "EMI Calculator — Calculate Loan EMI Online",
    description: "Calculate your exact monthly EMI for home loan, car loan, or personal loan. Free EMI calculator with amortization schedule and prepayment analysis.",
    canonical: "/calculators/emi-calculator",
  },
  "home-loan-emi-calculator": {
    type: "emi",
    variant: "Home Loan",
    title: "Home Loan EMI Calculator — Calculate Housing Loan EMI",
    description: "Calculate your home loan EMI instantly. Free housing loan EMI calculator — see monthly payment, total interest, and full amortization schedule.",
    canonical: "/calculators/emi-calculator",
  },
  "car-loan-emi-calculator": {
    type: "emi",
    variant: "Car Loan",
    title: "Car Loan EMI Calculator — Calculate Auto Loan EMI",
    description: "Calculate your car loan EMI instantly. Free auto loan EMI calculator — see monthly payment, total interest payable, and loan breakdown.",
    canonical: "/calculators/emi-calculator",
  },
  "personal-loan-emi-calculator": {
    type: "emi",
    variant: "Personal Loan",
    title: "Personal Loan EMI Calculator — Calculate Personal Loan EMI",
    description: "Calculate your personal loan EMI instantly. Free personal loan EMI calculator — see monthly payment and total interest for any loan amount.",
    canonical: "/calculators/emi-calculator",
  },

  // ── TAX ────────────────────────────────────────────────
  "tax-calculator": {
    type: "tax",
    variant: null,
    title: "Income Tax Calculator FY 2025-26 — Old vs New Regime",
    description: "Calculate and compare your income tax under old and new tax regime for FY 2025-26. Free tax calculator — find which regime saves you more money.",
    canonical: "/calculators/tax-calculator",
  },

  // ── EDUCATION ──────────────────────────────────────────
  "education-corpus-calculator": {
    type: "education",
    variant: null,
    title: "Education Corpus Calculator — Plan Your Child's College Fund",
    description: "Calculate how much you need to save for your child's higher education. Free education corpus calculator — accounts for education inflation and SIP planning.",
    canonical: "/calculators/education-corpus-calculator",
  },

  // ── TERM COVER ─────────────────────────────────────────
  "term-cover-calculator": {
    type: "term",
    variant: null,
    title: "Term Insurance Calculator — How Much Cover Do You Need?",
    description: "Calculate the right term insurance cover for your family. Free term cover estimator — based on income, loans, dependents, and lifestyle expenses.",
    canonical: "/calculators/term-cover-calculator",
  },

  // ── PPF ────────────────────────────────────────────────
  "ppf-calculator": {
    type: "ppf",
    variant: null,
    title: "PPF Calculator — Calculate PPF Maturity Amount",
    description: "Calculate PPF maturity amount, interest earned, and year-by-year growth. Free PPF calculator for 15-year and extended tenure planning.",
    canonical: "/calculators/ppf-calculator",
  },
  "sbi-ppf-calculator": {
    type: "ppf",
    variant: "SBI",
    title: "SBI PPF Calculator — SBI Public Provident Fund Returns",
    description: "Calculate PPF maturity amount for SBI PPF account. Free SBI PPF calculator — see year-by-year growth and total interest earned.",
    canonical: "/calculators/ppf-calculator",
  },
};

// All valid slugs — used by generateStaticParams
export const ALL_SLUGS = Object.keys(CALCULATOR_CONFIG);

// Related calculators per type — used in sidebar
export const RELATED_CALCULATORS: Record<CalculatorType, { label: string; href: string }[]> = {
  sip: [
    { label: "EMI Calculator",              href: "/calculators/emi-calculator"               },
    { label: "PPF Calculator",              href: "/calculators/ppf-calculator"               },
    { label: "Education Corpus Calculator", href: "/calculators/education-corpus-calculator"  },
    { label: "Tax Regime Calculator",       href: "/calculators/tax-calculator"               },
  ],
  emi: [
    { label: "SIP Calculator",              href: "/calculators/sip-calculator"               },
    { label: "PPF Calculator",              href: "/calculators/ppf-calculator"               },
    { label: "Tax Regime Calculator",       href: "/calculators/tax-calculator"               },
    { label: "Term Cover Calculator",       href: "/calculators/term-cover-calculator"        },
  ],
  tax: [
    { label: "SIP Calculator",              href: "/calculators/sip-calculator"               },
    { label: "EMI Calculator",              href: "/calculators/emi-calculator"               },
    { label: "PPF Calculator",             href: "/calculators/ppf-calculator"               },
    { label: "Term Cover Calculator",       href: "/calculators/term-cover-calculator"        },
  ],
  education: [
    { label: "SIP Calculator",              href: "/calculators/sip-calculator"               },
    { label: "PPF Calculator",              href: "/calculators/ppf-calculator"               },
    { label: "EMI Calculator",              href: "/calculators/emi-calculator"               },
    { label: "Term Cover Calculator",       href: "/calculators/term-cover-calculator"        },
  ],
  term: [
    { label: "SIP Calculator",              href: "/calculators/sip-calculator"               },
    { label: "EMI Calculator",              href: "/calculators/emi-calculator"               },
    { label: "Education Corpus Calculator", href: "/calculators/education-corpus-calculator"  },
    { label: "PPF Calculator",              href: "/calculators/ppf-calculator"               },
  ],
  ppf: [
    { label: "SIP Calculator",              href: "/calculators/sip-calculator"               },
    { label: "EMI Calculator",              href: "/calculators/emi-calculator"               },
    { label: "Tax Regime Calculator",       href: "/calculators/tax-calculator"               },
    { label: "Education Corpus Calculator", href: "/calculators/education-corpus-calculator"  },
  ],
};

// Related articles per type — used in sidebar
export const RELATED_ARTICLES: Record<CalculatorType, { label: string; href: string }[]> = {
  sip: [
    { label: "SIP vs Lump Sum: Which is better?",           href: "/investing/sip-vs-lumpsum"            },
    { label: "Best Index Funds in India 2025",              href: "/investing/best-index-funds"          },
    { label: "How to start a SIP with ₹500/month",         href: "/investing/sip-beginners-guide"       },
    { label: "Direct vs Regular Mutual Funds explained",    href: "/investing/direct-vs-regular"         },
  ],
  emi: [
    { label: "Home loan prepayment strategy",               href: "/loans/home-loan-prepayment-strategy" },
    { label: "Should I prepay my loan or invest?",          href: "/loans/prepay-vs-invest"              },
    { label: "How to improve your CIBIL score",             href: "/loans/improve-credit-score"          },
    { label: "Home loan tax benefits explained",            href: "/tax/home-loan-tax-benefit"           },
  ],
  tax: [
    { label: "Old vs New Tax Regime: Full comparison",      href: "/tax/old-regime-vs-new-regime"        },
    { label: "Section 80C: Complete guide",                 href: "/tax/section-80c"                     },
    { label: "HRA exemption rules explained",               href: "/tax/hra-exemption"                   },
    { label: "How to file ITR step by step",                href: "/tax/how-to-file-itr"                 },
  ],
  education: [
    { label: "How much to save for child's college",        href: "/family-finance/child-education-corpus"},
    { label: "Sukanya Samriddhi Yojana guide",              href: "/schemes/sukanya-samriddhi-yojana"    },
    { label: "Goal-based investing explained",              href: "/investing/goal-based"                },
    { label: "SIP vs Lump Sum for long-term goals",         href: "/investing/sip-vs-lumpsum"            },
  ],
  term: [
    { label: "LIC vs Term Insurance: honest comparison",    href: "/insurance/lic-vs-term-insurance"     },
    { label: "How much term cover do you need?",            href: "/insurance/term-insurance-how-much-needed"},
    { label: "Health insurance buying guide",               href: "/insurance/health-insurance-guide"    },
    { label: "PMSBY: Free govt insurance scheme",           href: "/schemes/pmsby"                       },
  ],
  ppf: [
    { label: "PPF complete guide 2025",                     href: "/schemes/ppf-complete-guide"          },
    { label: "PPF vs ELSS: Which is better?",               href: "/investing/ppf-vs-elss"               },
    { label: "NPS vs EPF vs PPF comparison",                href: "/schemes/nps-vs-epf-vs-ppf"           },
    { label: "Section 80C tax saving guide",                href: "/tax/section-80c"                     },
  ],
};