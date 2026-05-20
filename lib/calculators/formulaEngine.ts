import { FormulaType, CalculatorInput } from './types';

export type FormulaResult = Record<string, number>;

// ── SIP ──────────────────────────────────────────────────────────────
function calcSip(values: Record<string, number>): FormulaResult {
  const P = values.monthlyAmount;
  const r = values.expectedReturn / 100 / 12;
  const n = values.timePeriod * 12;

  const totalValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const investedAmount = P * n;
  const estimatedReturn = totalValue - investedAmount;

  return {
    investedAmount: Math.round(investedAmount),
    estimatedReturn: Math.round(estimatedReturn),
    totalValue: Math.round(totalValue),
  };
}

// ── EMI ──────────────────────────────────────────────────────────────
function calcEmi(values: Record<string, number>): FormulaResult {
  const P = values.loanAmount;
  const r = values.interestRate / 100 / 12;
  const n = values.loanTenure * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - P;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalAmount),
  };
}

// ── PPF ──────────────────────────────────────────────────────────────
function calcPpf(values: Record<string, number>): FormulaResult {
  const P = values.yearlyInvestment;
  const r = values.interestRate / 100;
  const n = values.timePeriod;

  let balance = 0;
  for (let i = 0; i < n; i++) {
    balance = (balance + P) * (1 + r);
  }

  const investedAmount = P * n;
  const totalInterest = balance - investedAmount;

  return {
    investedAmount: Math.round(investedAmount),
    totalInterest: Math.round(totalInterest),
    maturityValue: Math.round(balance),
  };
}

// ── EDUCATION CORPUS ─────────────────────────────────────────────────
function calcEducation(values: Record<string, number>): FormulaResult {
  const currentCost = values.currentCost;
  const inflation = values.educationInflation / 100;
  const years = values.yearsToGoal;
  const expectedReturn = values.expectedReturn / 100 / 12;
  const n = years * 12;

  const futureCost = currentCost * Math.pow(1 + inflation, years);
  const monthlySip = futureCost * expectedReturn / (Math.pow(1 + expectedReturn, n) - 1);

  return {
    futureCost: Math.round(futureCost),
    monthlySip: Math.round(monthlySip),
    totalInvestment: Math.round(monthlySip * n),
  };
}

// ── TERM COVER ───────────────────────────────────────────────────────
function calcTerm(values: Record<string, number>): FormulaResult {
  const annualIncome = values.annualIncome;
  const outstandingLoans = values.outstandingLoans;
  const monthlyExpenses = values.monthlyExpenses;
  const dependents = values.dependents;
  const yearsToRetirement = values.yearsToRetirement;

  // Income replacement (15x for higher dependents, 10x for lower)
  const incomeMultiplier = dependents >= 3 ? 15 : dependents === 2 ? 12 : 10;
  const incomeReplacement = annualIncome * incomeMultiplier;

  // Expense corpus (monthly expenses × 12 × years to retirement)
  const expenseCorpus = monthlyExpenses * 12 * yearsToRetirement;

  // Total = income replacement + loans + expense corpus
  const recommendedCover = incomeReplacement + outstandingLoans + expenseCorpus;

  // Round to nearest 25L
  const roundedCover = Math.ceil(recommendedCover / 2500000) * 2500000;

  return {
    recommendedCover: roundedCover,
    incomeReplacement: Math.round(incomeReplacement),
    expenseCorpus: Math.round(expenseCorpus),
  };
}

// ── FD ───────────────────────────────────────────────────────────────
function calcFd(values: Record<string, number>): FormulaResult {
  const P = values.principal;
  const r = values.interestRate / 100;
  const n = values.timePeriod;
  const frequency = values.compoundingFrequency || 4; // quarterly default

  const maturityValue = P * Math.pow(1 + r / frequency, frequency * n);
  const totalInterest = maturityValue - P;

  return {
    principal: Math.round(P),
    totalInterest: Math.round(totalInterest),
    maturityValue: Math.round(maturityValue),
  };
}

// ── RD ───────────────────────────────────────────────────────────────
function calcRd(values: Record<string, number>): FormulaResult {
  const P = values.monthlyDeposit;
  const r = values.interestRate / 100 / 4; // quarterly
  const n = values.timePeriod * 4; // quarters

  let maturityValue = 0;
  for (let i = 1; i <= n; i++) {
    maturityValue += P * 3 * Math.pow(1 + r, i); // 3 months per quarter
  }
  // Simplified: use standard RD formula
  const months = values.timePeriod * 12;
  const rMonthly = values.interestRate / 100 / 12;
  const maturity = P * ((Math.pow(1 + rMonthly, months) - 1) / rMonthly) * (1 + rMonthly);
  const invested = P * months;

  return {
    investedAmount: Math.round(invested),
    totalInterest: Math.round(maturity - invested),
    maturityValue: Math.round(maturity),
  };
}

// ── NPS ──────────────────────────────────────────────────────────────
function calcNps(values: Record<string, number>): FormulaResult {
  const P = values.monthlyContribution;
  const r = values.expectedReturn / 100 / 12;
  const n = values.investmentPeriod * 12;
  const annuityPercent = values.annuityPercent / 100;

  const corpus = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const lumpsum = corpus * (1 - annuityPercent);
  const annuityCorpus = corpus * annuityPercent;
  const monthlyPension = annuityCorpus * 0.06 / 12; // assuming 6% annuity rate

  return {
    totalCorpus: Math.round(corpus),
    lumpsum: Math.round(lumpsum),
    annuityCorpus: Math.round(annuityCorpus),
    monthlyPension: Math.round(monthlyPension),
  };
}

// ── Engine ───────────────────────────────────────────────────────────
const FORMULAS: Record<FormulaType, (values: Record<string, number>) => FormulaResult> = {
  sip:       calcSip,
  emi:       calcEmi,
  ppf:       calcPpf,
  education: calcEducation,
  term:      calcTerm,
  fd:        calcFd,
  rd:        calcRd,
  nps:       calcNps,
  tax:       () => ({}), // tax is complex — handled separately in its own component
};

export function calculate(formulaType: FormulaType, values: Record<string, number>): FormulaResult {
  const fn = FORMULAS[formulaType];
  if (!fn) return {};
  return fn(values);
}

// Get default values from inputs config
export function getDefaultValues(inputs: CalculatorInput[]): Record<string, number> {
  return inputs.reduce((acc, input) => {
    acc[input.id] = input.default;
    return acc;
  }, {} as Record<string, number>);
}

// Format output value based on format type
export function formatValue(value: number, format: OutputFormat): string {
  switch (format) {
    case 'currency':
      if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
      if (value >= 100000)   return `₹${(value / 100000).toFixed(2)} L`;
      if (value >= 1000)     return `₹${(value / 1000).toFixed(1)}K`;
      return `₹${value.toLocaleString('en-IN')}`;
    case 'percent':
      return `${value.toFixed(2)}%`;
    case 'years':
      return `${value} Yr`;
    case 'number':
      return value.toLocaleString('en-IN');
    default:
      return value.toString();
  }
}

export type { OutputFormat };