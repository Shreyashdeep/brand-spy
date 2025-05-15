import React from 'react';
import { MarketingInsight } from '@/types';

interface MarketingInsightsProps {
  insights: MarketingInsight;
  brandName: string;
}

const MarketingInsights: React.FC<MarketingInsightsProps> = ({ insights, brandName }) => {
  if (!insights) {
    return (
      <div className="p-6 mt-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">No marketing insights available for {brandName}.</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Marketing Insights for {brandName}</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Target Audience</h3>
          <p className="mt-2 text-gray-600">{insights.targetAudience}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Unique Selling Proposition</h3>
          <p className="mt-2 text-gray-600">{insights.usp}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recommended Marketing Channels</h3>
          <ul className="mt-2 ml-5 space-y-1 list-disc text-gray-600">
            {insights.marketingChannels.map((channel, index) => (
              <li key={index}>{channel}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Content Strategy</h3>
          <p className="mt-2 text-gray-600">{insights.contentStrategy}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recommended Tactics</h3>
          <ul className="mt-2 ml-5 space-y-1 list-disc text-gray-600">
            {insights.recommendedTactics.map((tactic, index) => (
              <li key={index}>{tactic}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketingInsights; 