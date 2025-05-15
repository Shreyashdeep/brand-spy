// Competitor type definition
export interface Competitor {
  name: string;
  url?: string;
  description?: string;
}

// Marketing Insight type definition
export interface MarketingInsight {
  targetAudience: string;
  usp: string; // Unique Selling Proposition
  marketingChannels: string[];
  contentStrategy: string;
  recommendedTactics: string[];
}

// Brand Analysis type definition
export interface BrandAnalysis {
  id?: number;
  brandName: string;
  competitors: Competitor[];
  marketingInsights: MarketingInsight;
  analysisDate: Date;
}

// Analysis Request type
export interface AnalysisRequest {
  brandName: string;
} 