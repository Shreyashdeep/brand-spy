import React from 'react';
import { Competitor } from '@/types';

interface CompetitorsListProps {
  competitors: Competitor[];
  brandName: string;
}

const CompetitorsList: React.FC<CompetitorsListProps> = ({ competitors, brandName }) => {
  if (!competitors || competitors.length === 0) {
    return (
      <div className="p-6 mt-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">No competitors found for {brandName}.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Top Competitors for {brandName}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {competitors.map((competitor, index) => (
          <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              {competitor.name}
            </h3>
            {competitor.url && (
              <a
                href={competitor.url.startsWith('http') ? competitor.url : `https://${competitor.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            )}
            {competitor.description && (
              <p className="mt-2 text-sm text-gray-600">{competitor.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorsList; 