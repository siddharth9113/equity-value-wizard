
import React, { useState } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data array - in a real app, this would come from an API
const indianCompanies = [
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NYSE' },
  { symbol: 'META', name: 'Meta Inc', exchange: 'NYSE' },
  { symbol: 'MSFT', name: 'Microsoft Inc.', exchange: 'NYSE' },
  { symbol: 'PM', name: 'Philip Morris International', exchange: 'NYSE' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.', exchange: 'NYSE' },
  { symbol: 'JNJ', name: 'Johnson and Johnson', exchange: 'NYSE' },
  { symbol: 'HD', name: 'The Home Depot Inc.', exchange: 'NYSE' },
  { symbol: 'UNH', name: 'UnitedHealth Group Incorporated', exchange: 'NYSE' },
  { symbol: 'KO', name: 'The Coca-Cola Company', exchange: 'NYSE' },
  { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE' },
  { symbol: 'MA', name: 'Mastercard Incorporated', exchange: 'NYSE' },
];

interface CompanySearchProps {
  onCompanySelect: (company: { symbol: string; name: string; exchange: string }) => void;
}

const CompanySearch = ({ onCompanySelect }: CompanySearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredCompanies = indianCompanies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            className="pl-10 w-full"
            onFocus={() => setShowResults(true)}
          />
        </div>

        {showResults && searchQuery && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border">
            {filteredCompanies.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                No companies found
              </div>
            ) : (
              <ul className="max-h-60 overflow-auto">
                {filteredCompanies.map((company) => (
                  <li
                    key={company.symbol}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onCompanySelect(company);
                      setShowResults(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{company.symbol}</p>
                        <p className="text-sm text-gray-600">{company.name}</p>
                      </div>
                      <span className="text-xs text-gray-500">{company.exchange}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySearch;

