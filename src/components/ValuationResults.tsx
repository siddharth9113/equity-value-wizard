
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DCF_STATIC from '../data/dcf_static.json';
import SharePriceChart from './SharePriceChart';
import { Share } from 'lucide-react';
import chartData from '../data/dcf_static.json'

interface ValuationResultsProps {
  enterpriseValue: number;
  equityValue: number;
  sharePrice: number;
  projections: {
    year: number;
    freeCashFlow: number;
    discountedCashFlow: number;
  }[];
  isLoading: boolean;
  chartData: {date:String; price: number}[];
}

const ValuationResults = ({ 
  enterpriseValue, 
  equityValue, 
  sharePrice, 
  projections,
  isLoading,
  chartData 
}: ValuationResultsProps) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Calculating Results...</CardTitle>
          <CardDescription>Please wait while we process the data</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>DCF Valuation Results</CardTitle>
        <CardDescription>Estimated fair value based on discounted cash flow analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-finance p-4 rounded-lg text-white">
            <h3 className="text-sm font-medium opacity-80">Enterprise Value</h3>
            <p className="text-2xl font-bold">${enterpriseValue.toLocaleString()}</p>
          </div>
          
          <div className="bg-finance-light p-4 rounded-lg text-white">
            <h3 className="text-sm font-medium opacity-80">Equity Value</h3>
            <p className="text-2xl font-bold">${equityValue.toLocaleString()}</p>
          </div>
          
          <div className="bg-finance-accent p-4 rounded-lg text-finance-dark">
            <h3 className="text-sm font-medium">Share Price</h3>
            <p className="text-2xl font-bold">${sharePrice.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="h-64">
          <SharePriceChart data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuationResults;
