export type FormulaType = 'sip' | 'emi' | 'tax' | 'education' | 'term' | 'ppf' | 'rd' | 'fd' | 'nps';
export type CalculatorType = 'sip' | 'emi' | 'tax' | 'education' | 'term' | 'ppf' | 'rd' | 'fd' | 'nps' | 'other';
export type InputType = 'slider' | 'number' | 'select';
export type OutputFormat = 'currency' | 'percent' | 'number' | 'years';

export type CalculatorInput = {
  id: string;
  label: string;
  type: InputType;
  min: number;
  max: number;
  step: number;
  default: number;
  prefix: string | null;
  unit: string | null;
  options?: { label: string; value: number }[];
};

export type CalculatorOutput = {
  id: string;
  label: string;
  format: OutputFormat;
  highlight: boolean;
};

export type RelatedArticle = {
  label: string;
  href: string;
};

export type RelatedCalculator = {
  label: string;
  href: string;
};

export type Calculator = {
  _id: string;
  slug: string;
  type: CalculatorType;
  variant: string | null;
  isVariant: boolean;
  canonical: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  formulaType: FormulaType;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  article: string;
  relatedArticles: RelatedArticle[];
  relatedCalculators: RelatedCalculator[]; // injected by API
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};