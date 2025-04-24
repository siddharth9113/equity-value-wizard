
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
        <CardDescription>Set your key assumptions for the valuation model</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="growthRate">Revenue Growth Rate (%)</Label>
            <Input
              id="growthRate"
              name="growthRate"
              type="number"
              placeholder="5.0"
              value={assumptions.growthRate}
              onChange={handleChange}
            />
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
            <Label htmlFor="forecastPeriod">Forecast Period (Years)</Label>
            <Input
              id="forecastPeriod"
              name="forecastPeriod"
              type="number"
              placeholder="5"
              value={assumptions.forecastPeriod}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">Number of years to project cash flows</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              name="taxRate"
              type="number"
              placeholder="25.0"
              value={assumptions.taxRate}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">Effective corporate tax rate</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="sharesOutstanding">Shares Outstanding (millions)</Label>
            <Input
              id="sharesOutstanding"
              name="sharesOutstanding"
              type="number"
              placeholder="100"
              value={assumptions.sharesOutstanding}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">Total number of outstanding shares</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssumptionsForm;
