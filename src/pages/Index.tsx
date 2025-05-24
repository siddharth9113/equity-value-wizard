
import React, { useState } from 'react';
import Header from '../components/Header';
import CompanySearch from '../components/CompanySearch';
import AssumptionsForm from '../components/AssumptionsForm';
import ValuationResults from '../components/ValuationResults';
import StepsNavigation from '../components/StepsNavigation';
import { calculateDCF } from '../utils/dcfCalculator';
import { Assumptions, ValuationResult } from '../types';
import { toast } from 'sonner';
import DCF_STATIC from '../data/dcf_static.json';
import chartData from '../data/dcf_static.json'
import SharePriceChart from '@/components/SharePriceChart';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<{
    symbol: string;
    name: string;
    exchange: string;
  } | null>(null);
  
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
  
  const handleCompanySelect = (company: { symbol: string; name: string; exchange: string }) => {
    setSelectedCompany(company);
    toast.success(`Selected ${company.name}`);
  };
  
  const isNextDisabled = () => {
    if (currentStep === 0) {
      return !selectedCompany;
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
    
    // In a real app, we would fetch financial data for the selected company here
    setTimeout(() => {
      try {
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
          <div className="w-full">
            <CompanySearch onCompanySelect={handleCompanySelect} />
            {selectedCompany && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800">Selected Company</h3>
                <p className="text-green-700">{selectedCompany.name} ({selectedCompany.symbol})</p>
                <p className="text-sm text-green-600">{selectedCompany.exchange}</p>
              </div>
            )}
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
                <li>Company: {selectedCompany?.name} ({selectedCompany?.symbol})</li>
                <li>Exchange: {selectedCompany?.exchange}</li>
                <li>Forecast Period: {assumptions.forecastPeriod} years</li>
                <li>Growth Rate: {assumptions.growthRate}%</li>
                <li>Discount Rate (WACC): {assumptions.discountRate}%</li>
              </ul>
            </div>
          </div>
        );
        case 3:
          if (!selectedCompany) return null;
          const ticker     = selectedCompany.symbol;
          const staticData = (DCF_STATIC as any)[ticker];
        
          return (
            <>
              <ValuationResults
                enterpriseValue={staticData.enterpriseValue}
                equityValue={staticData.equityValue}
                sharePrice={staticData.sharePrice}
                projections={[]}    // or staticData.projections if you have them
                isLoading={false}
                chartData={staticData.chartData}
              />
            </>
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
            {currentStep === 0 && "Step 1: Select Company"}
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
                onClick={() => {
                  setCurrentStep(0);
                  setSelectedCompany(null);
                }}
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
