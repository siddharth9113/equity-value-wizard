
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface StepsNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled: boolean;
}

const StepsNavigation = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  isNextDisabled 
}: StepsNavigationProps) => {
  return (
    <div className="mt-6">
      <Separator className="mb-4" />
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div 
                className={`h-3 w-3 rounded-full ${
                  index < currentStep 
                    ? 'bg-finance-accent' 
                    : index === currentStep 
                    ? 'bg-finance' 
                    : 'bg-gray-300'
                }`}
              />
              {index < totalSteps - 1 && (
                <div 
                  className={`h-0.5 w-12 ${
                    index < currentStep ? 'bg-finance-accent' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div>
          <span className="text-sm text-gray-500">Step {currentStep + 1} of {totalSteps}</span>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          onClick={onPrev}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button 
          className="bg-finance hover:bg-finance-light" 
          onClick={onNext}
          disabled={isNextDisabled}
        >
          {currentStep === totalSteps - 1 ? 'Calculate Valuation' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default StepsNavigation;
