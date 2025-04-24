
import { Assumptions, Projection } from "../types";

export const calculateDCF = (
  assumptions: Assumptions,
  initialCashFlow: number = 1000000 // This would normally come from the uploaded statements
): {
  enterpriseValue: number;
  equityValue: number;
  sharePrice: number;
  projections: Projection[];
} => {
  // Convert string inputs to numbers
  const growthRate = parseFloat(assumptions.growthRate) / 100;
  const discountRate = parseFloat(assumptions.discountRate) / 100;
  const perpetualGrowthRate = parseFloat(assumptions.perpetualGrowthRate) / 100;
  const forecastPeriod = parseInt(assumptions.forecastPeriod);
  const taxRate = parseFloat(assumptions.taxRate) / 100;
  const sharesOutstanding = parseFloat(assumptions.sharesOutstanding) * 1000000; // Convert millions to actual number
  
  // Normally we would extract these from the uploaded financial statements
  const totalDebt = 2000000; // Example value
  const cashAndCashEquivalents = 500000; // Example value
  
  const projections: Projection[] = [];
  let presentValueSum = 0;
  
  // Calculate projected cash flows for each year
  for (let year = 1; year <= forecastPeriod; year++) {
    // Calculate free cash flow with growth
    const freeCashFlow = initialCashFlow * Math.pow(1 + growthRate, year);
    
    // Calculate the discount factor
    const discountFactor = Math.pow(1 + discountRate, year);
    
    // Calculate the discounted cash flow
    const discountedCashFlow = freeCashFlow / discountFactor;
    
    // Add to the sum of present values
    presentValueSum += discountedCashFlow;
    
    // Store the projection data
    projections.push({
      year,
      freeCashFlow,
      discountedCashFlow
    });
  }
  
  // Calculate terminal value using perpetuity growth model
  const finalYearCashFlow = initialCashFlow * Math.pow(1 + growthRate, forecastPeriod);
  const terminalValue = finalYearCashFlow * (1 + perpetualGrowthRate) / (discountRate - perpetualGrowthRate);
  
  // Discount the terminal value to present value
  const presentTerminalValue = terminalValue / Math.pow(1 + discountRate, forecastPeriod);
  
  // Calculate enterprise value
  const enterpriseValue = presentValueSum + presentTerminalValue;
  
  // Calculate equity value
  const equityValue = enterpriseValue - totalDebt + cashAndCashEquivalents;
  
  // Calculate share price
  const sharePrice = equityValue / sharesOutstanding;
  
  return {
    enterpriseValue,
    equityValue,
    sharePrice,
    projections
  };
};
