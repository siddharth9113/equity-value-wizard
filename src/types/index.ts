
export interface FinancialStatements {
  incomeStatement: File | null;
  balanceSheet: File | null;
  cashFlowStatement: File | null;
  annualReport: File | null;
}

export interface Assumptions {
  growthRate: string;
  discountRate: string;
  perpetualGrowthRate: string;
  forecastPeriod: string;
  taxRate: string;
  sharesOutstanding: string;
}

export interface Projection {
  year: number;
  freeCashFlow: number;
  discountedCashFlow: number;
}

export interface ValuationResult {
  enterpriseValue: number;
  equityValue: number;
  sharePrice: number;
  projections: Projection[];
}
