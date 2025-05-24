
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AssumptionsFormProps {
  assumptions: {
    growthRate: string;
    discountRate: string;
    perpetualGrowthRate: string;
    forecastPeriod: string;
    taxRate: string;
    sharesOutstanding: string;
  };
  setAssumptions: React.Dispatch<React.SetStateAction<{
    growthRate: string;
    discountRate: string;
    perpetualGrowthRate: string;
    forecastPeriod: string;
    taxRate: string;
    sharesOutstanding: string;
  }>>;
}

const AssumptionsForm = ({ assumptions, setAssumptions }: AssumptionsFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssumptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>DCF Assumptions</CardTitle>
        <CardDescription>Set some of your key assumptions for the valuation model. Other assumptions will be calculated with analytical models</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="growthRate">Revenue Growth Rate (%)</Label>
            <p className="text-xs text-muted-foreground">Calculated via sentiment analysis</p>
            <p className="text-xs text-muted-foreground">Expected annual growth rate for revenue projections</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="discountRate">Discount Rate / WACC (%)</Label>
            <Input
              id="discountRate"
              name="discountRate"
              type="number"
              placeholder="10.0"
              value={assumptions.discountRate}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">Weighted Average Cost of Capital</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="perpetualGrowthRate">Perpetual Growth Rate (%)</Label>
            <Input
              id="perpetualGrowthRate"
              name="perpetualGrowthRate"
              type="number"
              placeholder="2.0"
              value={assumptions.perpetualGrowthRate}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">Long-term growth rate for terminal value calculation</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="forecastPeriod">Forecast Period = 5 (Years)</Label>
            <p className="text-xs text-muted-foreground">Number of years to project cash flows</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <p className="text-xs text-muted-foreground">To be calculated by Model</p>
            <p className="text-xs text-muted-foreground">Effective corporate tax rate</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="sharesOutstanding">Shares Outstanding (millions)</Label>
            <p className="text-xs text-muted-foreground">To be calculated by Model</p>
            <p className="text-xs text-muted-foreground">Total number of outstanding shares</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssumptionsForm;
