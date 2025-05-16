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

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
} 