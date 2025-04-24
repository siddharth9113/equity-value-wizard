
import React, { useState } from 'react';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import AssumptionsForm from '../components/AssumptionsForm';
import ValuationResults from '../components/ValuationResults';
import StepsNavigation from '../components/StepsNavigation';
import { calculateDCF } from '../utils/dcfCalculator';
import { FinancialStatements, Assumptions, ValuationResult } from '../types';
import { toast } from 'sonner';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [financialStatements, setFinancialStatements] = useState<FinancialStatements>({
    incomeStatement: null,
    balanceSheet: null,
    cashFlowStatement: null,
    annualReport: null
  });
  
  const [assumptions, setAssumptions] = useState<Assumptions>({
    growthRate: '5',
    discountRate: '10',
    perpetualGrowthRate: '2',
    forecastPeriod: '5',
    taxRate: '25',
    sharesOutstanding: '100'
  });
  
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const handleFileUpload = (type: keyof FinancialStatements, file: File) => {
    setFinancialStatements(prev => ({
      ...prev,
      [type]: file
    }));
  };
  
  const isNextDisabled = () => {
    if (currentStep === 0) {
      return !financialStatements.incomeStatement || 
             !financialStatements.balanceSheet || 
             !financialStatements.cashFlowStatement;
    }
    if (currentStep === 1) {
      return !assumptions.growthRate || 
             !assumptions.discountRate || 
             !assumptions.perpetualGrowthRate || 
             !assumptions.forecastPeriod || 
             !assumptions.taxRate || 
             !assumptions.sharesOutstanding;
    }
    return false;
  };
  
  const handleNext = () => {
    if (currentStep === 2) {
      performValuation();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const performValuation = () => {
    setIsCalculating(true);
    
    // In a real app, we would process the uploaded files here
    // For now, we'll simulate with a timeout
    setTimeout(() => {
      try {
        // In reality, we would extract the initial cash flow from the uploaded statements
        const result = calculateDCF(assumptions);
        setValuationResult(result);
        setCurrentStep(prev => prev + 1);
        toast.success("Valuation completed successfully!");
      } catch (error) {
        toast.error("Error calculating valuation. Please check your inputs.");
      } finally {
        setIsCalculating(false);
      }
    }, 2000);
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload 
              title="Income Statement"
              description="Upload the company's income statement (CSV, Excel or PDF)"
              fileType="incomeStatement"
              onFileUpload={(file) => handleFileUpload('incomeStatement', file)}
            />
            <FileUpload 
              title="Balance Sheet"
              description="Upload the company's balance sheet (CSV, Excel or PDF)"
              fileType="balanceSheet"
              onFileUpload={(file) => handleFileUpload('balanceSheet', file)}
            />
            <FileUpload 
              title="Cash Flow Statement"
              description="Upload the company's cash flow statement (CSV, Excel or PDF)"
              fileType="cashFlowStatement"
              onFileUpload={(file) => handleFileUpload('cashFlowStatement', file)}
            />
            <FileUpload 
              title="Annual Report (Optional)"
              description="Upload the company's annual report for additional analysis"
              fileType="annualReport"
              onFileUpload={(file) => handleFileUpload('annualReport', file)}
            />
          </div>
        );
      case 1:
        return (
          <AssumptionsForm 
            assumptions={assumptions} 
            setAssumptions={setAssumptions} 
          />
        );
      case 2:
        return (
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold mb-4">Ready to Calculate Valuation</h2>
            <p className="text-gray-600 mb-8">
              We've collected all necessary information. Click "Calculate Valuation" to proceed.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
              <h3 className="font-semibold text-blue-800 mb-2">Summary</h3>
              <ul className="text-left text-sm space-y-1 text-blue-700">
                <li>Financial Statements: {Object.values(financialStatements).filter(Boolean).length} files uploaded</li>
                <li>Forecast Period: {assumptions.forecastPeriod} years</li>
                <li>Revenue Growth Rate: {assumptions.growthRate}%</li>
                <li>Discount Rate (WACC): {assumptions.discountRate}%</li>
                <li>Perpetual Growth Rate: {assumptions.perpetualGrowthRate}%</li>
              </ul>
            </div>
          </div>
        );
      case 3:
        return (
          <ValuationResults 
            enterpriseValue={valuationResult?.enterpriseValue || 0}
            equityValue={valuationResult?.equityValue || 0}
            sharePrice={valuationResult?.sharePrice || 0}
            projections={valuationResult?.projections || []}
            isLoading={isCalculating}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-finance">
            {currentStep === 0 && "Step 1: Upload Financial Statements"}
            {currentStep === 1 && "Step 2: Set DCF Assumptions"}
            {currentStep === 2 && "Step 3: Review and Calculate"}
            {currentStep === 3 && "Valuation Results"}
          </h2>
          
          {renderStepContent()}
          
          {currentStep < 3 && (
            <StepsNavigation 
              currentStep={currentStep}
              totalSteps={3}
              onNext={handleNext}
              onPrev={handlePrev}
              isNextDisabled={isNextDisabled()}
            />
          )}
          
          {currentStep === 3 && (
            <div className="mt-6 text-center">
              <button 
                onClick={() => setCurrentStep(0)}
                className="text-finance hover:text-finance-accent underline"
              >
                Start New Valuation
              </button>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-finance-dark text-white text-sm p-4 text-center">
        <p>DCF Valuation Tool | Professional Financial Analysis</p>
      </footer>
    </div>
  );
};

export default Index;
