'use client';

import React, { useState } from 'react';
import BrandSearchInput from '@/components/BrandSearchInput';
import CompetitorsList from '@/components/CompetitorsList';
import MarketingInsights from '@/components/MarketingInsights';
import apiService from '@/services/api';
import { BrandAnalysis } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<BrandAnalysis | null>(null);

  const handleSearch = async (brandName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiService.analyzeBrand(brandName);
      
      if (response.success && response.data) {
        setAnalysis(response.data);
      } else {
        setError(response.message || 'An error occurred during analysis');
      }
    } catch (error) {
      setError('Failed to connect to the server');
      console.error('Error analyzing brand:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-10 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Brand Spy</h1>
          <p className="mx-auto text-gray-600 md:w-2/3 lg:w-1/2">
            Enter a brand name to discover its top competitors and get comprehensive marketing insights to help improve your strategy.
          </p>
        </div>
        
        <BrandSearchInput onSearch={handleSearch} isLoading={isLoading} />
        
        {error && (
          <div className="p-4 mt-6 text-red-700 bg-red-100 rounded-md">
            <p>{error}</p>
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center mt-10">
            <div className="w-16 h-16 border-b-2 border-gray-800 rounded-full animate-spin"></div>
          </div>
        )}
        
        {!isLoading && analysis && (
          <div className="mt-8">
            <CompetitorsList competitors={analysis.competitors} brandName={analysis.brandName} />
            <MarketingInsights insights={analysis.marketingInsights} brandName={analysis.brandName} />
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Analysis generated on {new Date(analysis.analysisDate).toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
