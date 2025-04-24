
import React, { useState } from 'react';
import { Search } from "lucide-react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// This is a mock data array - in a real app, this would come from an API
const indianCompanies = [
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.', exchange: 'NSE' },
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', exchange: 'BSE' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', exchange: 'NSE' },
  { symbol: 'INFY', name: 'Infosys Ltd.', exchange: 'BSE' },
  { symbol: 'WIPRO', name: 'Wipro Ltd.', exchange: 'NSE' },
];

interface CompanySearchProps {
  onCompanySelect: (company: { symbol: string; name: string; exchange: string }) => void;
}

const CompanySearch = ({ onCompanySelect }: CompanySearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = indianCompanies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Search Company</CardTitle>
        <CardDescription>
          Search for companies listed on NSE/BSE
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Search companies..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          {filteredCompanies.length === 0 && (
            <CommandEmpty className="py-6 text-center text-sm">
              No companies found.
            </CommandEmpty>
          )}
          <CommandGroup className="max-h-60 overflow-auto">
            {filteredCompanies.map((company) => (
              <CommandItem
                key={company.symbol}
                onSelect={() => onCompanySelect(company)}
                className="flex items-center px-4 py-2 hover:bg-accent cursor-pointer"
              >
                <div>
                  <p className="font-medium">{company.symbol}</p>
                  <p className="text-sm text-muted-foreground">{company.name}</p>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">
                  {company.exchange}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </CardContent>
    </Card>
  );
};

export default CompanySearch;
