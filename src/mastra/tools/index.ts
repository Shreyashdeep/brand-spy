import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import axios from 'axios';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const GENERIC_WORDS = [ 
  'Top', 'Best', 'Competitors', 'Brands', 'D2C', 'Direct', 'Consumer', 'List', '2024', '2023', 'Guide', 'Review', 'vs', 'and', 'or', 'of', 'for', 'to', 'the', 'a', 'an', 'with', 'by', 'in', 'on', 'from', 'at', 'as', 'is', 'are', 'be', 'that', 'this', 'these', 'those', 'it', 'its', 'their', 'our', 'your', 'my', 'his', 'her', 'his', 'hers', 'ours', 'yours', 'theirs', 'Inc', 'Ltd', 'LLC', 'Co', 'Corp', 'Company', 'Group', 'Limited', 'PLC', 'Private', 'Public', 'Enterprises', 'Holdings', 'International', 'Global', 'Solutions', 'Technologies', 'Systems', 'Industries', 'Enterprises', 'Corporation', 'LLP', 'AG', 'S.A.', 'Pvt', 'Sdn', 'Bhd', 'BV', 'NV', 'AB', 'Oy', 'A/S', 'SAS', 'GmbH', 'KG', 'KGaA', 'S.p.A.', 'S.r.l.', 'OÜ', 'SpA', 'Srl', 'S.A.S.', 'S.A.R.L.', 'S.A.E.', 'S.A.P.I.', 'S.A.B.', 'S.A.C.', 'S.A.', 'S.L.', 'S.L.U.', 'S.L.N.E.', 'S.A.U.', 'S.A.L.', 'S.A.M.', 'S.A.I.', 'S.A.I.C.', 'S.A.I.F.', 'S.A.I.R.L.', 'S.A.I.S.', 'S.A.I.V.', 'S.A.L.', 'S.A.M.', 'S.A.P.', 'S.A.R.L.', 'S.A.S.', 'S.A.S.U.', 'S.A.S.S.', 'S.A.T.', 'S.A.U.', 'S.A.V.', 'S.A.X.', 'S.A.Y.', 'S.A.Z.', 'S.A.', 'S.C.', 'S.C.A.', 'S.C.A.R.L.', 'S.C.C.', 'S.C.E.', 'S.C.I.', 'S.C.M.', 'S.C.O.P.', 'S.C.P.', 'S.C.R.L.', 'S.C.S.', 'S.C.S.A.', 'S.C.S.C.', 'S.C.S.L.', 'S.C.S.P.', 'S.C.S.R.L.', 'S.C.S.S.', 'S.C.T.', 'S.C.V.', 'S.D.', 'S.D.A.', 'S.D.E.', 'S.D.F.', 'S.D.G.', 'S.D.I.', 'S.D.L.', 'S.D.M.', 'S.D.P.', 'S.D.R.L.', 'S.D.S.', 'S.D.T.', 'S.E.', 'S.E.A.', 'S.E.C.', 'S.E.E.', 'S.E.I.', 'S.E.L.', 'S.E.M.', 'S.E.P.', 'S.E.R.L.', 'S.E.S.', 'S.E.T.', 'S.F.', 'S.F.A.', 'S.F.C.', 'S.F.I.', 'S.F.L.', 'S.F.M.', 'S.F.P.', 'S.F.R.L.', 'S.F.S.', 'S.F.T.', 'S.G.', 'S.G.A.', 'S.G.C.', 'S.G.I.', 'S.G.L.', 'S.G.M.', 'S.G.P.', 'S.G.R.L.', 'S.G.S.', 'S.G.T.', 'S.H.', 'S.H.A.', 'S.H.C.', 'S.H.I.', 'S.H.L.', 'S.H.M.', 'S.H.P.', 'S.H.R.L.', 'S.H.S.', 'S.H.T.', 'S.I.', 'S.I.A.', 'S.I.C.', 'S.I.E.', 'S.I.I.', 'S.I.L.', 'S.I.M.', 'S.I.P.', 'S.I.R.L.', 'S.I.S.', 'S.I.T.', 'S.L.', 'S.L.A.', 'S.L.C.', 'S.L.I.', 'S.L.L.', 'S.L.M.', 'S.L.P.', 'S.L.R.L.', 'S.L.S.', 'S.L.T.', 'S.M.', 'S.M.A.', 'S.M.C.', 'S.M.I.', 'S.M.L.', 'S.M.M.', 'S.M.P.', 'S.M.R.L.', 'S.M.S.', 'S.M.T.', 'S.N.', 'S.N.A.', 'S.N.C.', 'S.N.I.', 'S.N.L.', 'S.N.M.', 'S.N.P.', 'S.N.R.L.', 'S.N.S.', 'S.N.T.', 'S.O.', 'S.O.A.', 'S.O.C.', 'S.O.I.', 'S.O.L.', 'S.O.M.', 'S.O.P.', 'S.O.R.L.', 'S.O.S.', 'S.O.T.', 'S.P.', 'S.P.A.', 'S.P.C.', 'S.P.I.', 'S.P.L.', 'S.P.M.', 'S.P.P.', 'S.P.R.L.', 'S.P.S.', 'S.P.T.', 'S.R.L.', 'S.R.L.A.', 'S.R.L.C.', 'S.R.L.I.', 'S.R.L.L.', 'S.R.L.M.', 'S.R.L.P.', 'S.R.L.R.L.', 'S.R.L.S.', 'S.R.L.T.', 'S.S.', 'S.S.A.', 'S.S.C.', 'S.S.I.', 'S.S.L.', 'S.S.M.', 'S.S.P.', 'S.S.R.L.', 'S.S.S.', 'S.S.T.', 'S.T.', 'S.T.A.', 'S.T.C.', 'S.T.I.', 'S.T.L.', 'S.T.M.', 'S.T.P.', 'S.T.R.L.', 'S.T.S.', 'S.T.T.', 'S.V.', 'S.V.A.', 'S.V.C.', 'S.V.I.', 'S.V.L.', 'S.V.M.', 'S.V.P.', 'S.V.R.L.', 'S.V.S.', 'S.V.T.'
];

function extractBrandNames(title: string, brand: string): string[] {
  // Extract capitalized words or phrases (likely brand names)
  const matches = title.match(/([A-Z][a-zA-Z0-9&'\-]+(?: [A-Z][a-zA-Z0-9&'\-]+)*)/g) || [];
  return matches
    .map((name) => name.trim())
    .filter((name) =>
      name &&
      name.length > 1 &&
      name.toLowerCase() !== brand.toLowerCase() &&
      !GENERIC_WORDS.includes(name)
    );
}

export const marketingCompetitorTool = createTool({
  id: 'getCompetitorBrands',
  description: 'Fetches 5 top competitors for a given brand name using Google search.',
  inputSchema: z.object({
    brand: z.string().describe('The brand to find competitors for'),
  }),
  async execute(context) {
    const brand = context.context.brand;
    const query = `top competitors of ${brand} D2C brands`;
    
    const serpApiKey = process.env.SERPAPI_KEY;
    if (!serpApiKey) throw new Error('Missing SERPAPI_KEY');

    const serpApiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${serpApiKey}&num=10`;

    const response = await axios.get(serpApiUrl);
    const results = response.data?.organic_results ?? [];

    let competitorNames: string[] = [];
    for (const res of results) {
      competitorNames.push(...extractBrandNames(res.title, brand));
    }

    // Remove duplicates and limit to 5
    const uniqueNames = [...new Set(competitorNames)].slice(0, 5);
    return uniqueNames;
  },
});

export const marketingCompetitorAnalysisTool = createTool({
  id: 'getCompetitorAnalysis',
  description: 'Lists 5 top competitors for a given brand and summarizes their marketing strategies that could help the input brand.',
  inputSchema: z.object({
    brand: z.string().describe('The brand to find competitors for and analyze their strategies'),
  }),
  async execute(context) {
    const brand = context.context.brand;
    // Step 1: Get competitors
    const query = `top competitors of ${brand}`;
    const serpApiKey = process.env.SERPAPI_KEY;
    if (!serpApiKey) throw new Error('Missing SERPAPI_KEY');
    const serpApiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${serpApiKey}&num=10`;
    const response = await axios.get(serpApiUrl);
    const results = response.data?.organic_results ?? [];
    let competitorNames: string[] = [];
    for (const res of results) {
      competitorNames.push(...extractBrandNames(res.title, brand));
    }
    // Remove duplicates and limit to 5
    const uniqueNames = [...new Set(competitorNames)].slice(0, 5);
    // Step 2: For each competitor, generate a brief actionable marketing strategy summary
    const strategies: { competitor: string; strategy: string }[] = [];
    for (const competitor of uniqueNames) {
      const prompt = `In 3-4 sentences, summarize the most effective marketing strategies used by the brand "${competitor}" that could inspire or help "${brand}" improve its own marketing. Focus on actionable tactics or approaches that are relevant for a D2C brand.`;
      const { text } = await generateText({
        model: google('gemini-1.5-flash'),
        prompt,
      });
      strategies.push({ competitor, strategy: text.trim() });
    }
    return { competitors: uniqueNames, strategies };
  },
});





// import { createTool } from '@mastra/core/tools';
// import { z } from 'zod';
// import axios from 'axios';
// import { generateText } from 'ai';
// import { google } from '@ai-sdk/google';

// // Refined set of marketing insights interfaces
// interface MarketingInsights {
//   brandName: string;
//   brandOverview: string;
//   valueProposition: string;
//   keyCompetitors: string[];
//   targetAudience: TargetAudience;
//   marketingStrategy: MarketingStrategy;
//   contentRecommendations: ContentRecommendations;
// }

// interface TargetAudience {
//   demographics: {
//     age: string;
//     gender: string;
//     location: string;
//   };
//   interests: string[];
//   painPoints: string[];
// }

// interface MarketingStrategy {
//   primaryChannels: string[];
//   keyMessageThemes: string[];
//   differentiators: string[];
// }

// interface ContentRecommendations {
//   blogTopics: string[];
//   socialMediaContentIdeas: string[];
//   keywordFocus: string[];
// }

// // Utility function to filter out generic words
// const GENERIC_WORDS = [
//   'Top', 'Best', 'Competitors', 'Brands', 'D2C', 'Direct', 'Consumer', 'List', '2024', '2023', 'Guide', 'Review', 'vs', 'and', 'or', 'of', 'for', 'to', 'the', 'a', 'an', 'with', 'by', 'in', 'on', 'from', 'at', 'as', 'is', 'are', 'be', 'that', 'this', 'these', 'those', 'it', 'its', 'their', 'our', 'your', 'my', 'his', 'her', 'his', 'hers', 'ours', 'yours', 'theirs', 'Inc', 'Ltd', 'LLC', 'Co', 'Corp', 'Company', 'Group', 'Limited', 'PLC', 'Private', 'Public', 'Enterprises', 'Holdings', 'International', 'Global', 'Solutions', 'Technologies', 'Systems', 'Industries', 'Enterprises', 'Corporation', 'LLP', 'AG', 'S.A.', 'Pvt', 'Sdn', 'Bhd', 'BV', 'NV', 'AB', 'Oy', 'A/S', 'SAS', 'GmbH', 'KG', 'KGaA', 'S.p.A.', 'S.r.l.', 'OÜ', 'SpA', 'Srl', 'S.A.S.', 'S.A.R.L.', 'S.A.E.', 'S.A.P.I.', 'S.A.B.', 'S.A.C.', 'S.A.', 'S.L.', 'S.L.U.', 'S.L.N.E.', 'S.A.U.', 'S.A.L.', 'S.A.M.', 'S.A.I.', 'S.A.I.C.', 'S.A.I.F.', 'S.A.I.R.L.', 'S.A.I.S.', 'S.A.I.V.', 'S.A.L.', 'S.A.M.', 'S.A.P.', 'S.A.R.L.', 'S.A.S.', 'S.A.S.U.', 'S.A.S.S.', 'S.A.T.', 'S.A.U.', 'S.A.V.', 'S.A.X.', 'S.A.Y.', 'S.A.Z.', 'S.A.', 'S.C.', 'S.C.A.', 'S.C.A.R.L.', 'S.C.C.', 'S.C.E.', 'S.C.I.', 'S.C.M.', 'S.C.O.P.', 'S.C.P.', 'S.C.R.L.', 'S.C.S.', 'S.C.S.A.', 'S.C.S.C.', 'S.C.S.L.', 'S.C.S.P.', 'S.C.S.R.L.', 'S.C.S.S.', 'S.C.T.', 'S.C.V.', 'S.D.', 'S.D.A.', 'S.D.E.', 'S.D.F.', 'S.D.G.', 'S.D.I.', 'S.D.L.', 'S.D.M.', 'S.D.P.', 'S.D.R.L.', 'S.D.S.', 'S.D.T.', 'S.E.', 'S.E.A.', 'S.E.C.', 'S.E.E.', 'S.E.I.', 'S.E.L.', 'S.E.M.', 'S.E.P.', 'S.E.R.L.', 'S.E.S.', 'S.E.T.', 'S.F.', 'S.F.A.', 'S.F.C.', 'S.F.I.', 'S.F.L.', 'S.F.M.', 'S.F.P.', 'S.F.R.L.', 'S.F.S.', 'S.F.T.', 'S.G.', 'S.G.A.', 'S.G.C.', 'S.G.I.', 'S.G.L.', 'S.G.M.', 'S.G.P.', 'S.G.R.L.', 'S.G.S.', 'S.G.T.', 'S.H.', 'S.H.A.', 'S.H.C.', 'S.H.I.', 'S.H.L.', 'S.H.M.', 'S.H.P.', 'S.H.R.L.', 'S.H.S.', 'S.H.T.', 'S.I.', 'S.I.A.', 'S.I.C.', 'S.I.E.', 'S.I.I.', 'S.I.L.', 'S.I.M.', 'S.I.P.', 'S.I.R.L.', 'S.I.S.', 'S.I.T.', 'S.L.', 'S.L.A.', 'S.L.C.', 'S.L.I.', 'S.L.L.', 'S.L.M.', 'S.L.P.', 'S.L.R.L.', 'S.L.S.', 'S.L.T.', 'S.M.', 'S.M.A.', 'S.M.C.', 'S.M.I.', 'S.M.L.', 'S.M.M.', 'S.M.P.', 'S.M.R.L.', 'S.M.S.', 'S.M.T.', 'S.N.', 'S.N.A.', 'S.N.C.', 'S.N.I.', 'S.N.L.', 'S.N.M.', 'S.N.P.', 'S.N.R.L.', 'S.N.S.', 'S.N.T.', 'S.O.', 'S.O.A.', 'S.O.C.', 'S.O.I.', 'S.O.L.', 'S.O.M.', 'S.O.P.', 'S.O.R.L.', 'S.O.S.', 'S.O.T.', 'S.P.', 'S.P.A.', 'S.P.C.', 'S.P.I.', 'S.P.L.', 'S.P.M.', 'S.P.P.', 'S.P.R.L.', 'S.P.S.', 'S.P.T.', 'S.R.L.', 'S.R.L.A.', 'S.R.L.C.', 'S.R.L.I.', 'S.R.L.L.', 'S.R.L.M.', 'S.R.L.P.', 'S.R.L.R.L.', 'S.R.L.S.', 'S.R.L.T.', 'S.S.', 'S.S.A.', 'S.S.C.', 'S.S.I.', 'S.S.L.', 'S.S.M.', 'S.S.P.', 'S.S.R.L.', 'S.S.S.', 'S.S.T.', 'S.T.', 'S.T.A.', 'S.T.C.', 'S.T.I.', 'S.T.L.', 'S.T.M.', 'S.T.P.', 'S.T.R.L.', 'S.T.S.', 'S.T.T.', 'S.V.', 'S.V.A.', 'S.V.C.', 'S.V.I.', 'S.V.L.', 'S.V.M.', 'S.V.P.', 'S.V.R.L.', 'S.V.S.', 'S.V.T.'
// ];

// function extractBrandNames(title: string, brand: string): string[] {
//   // Extract capitalized words or phrases (likely brand names)
//   const matches = title.match(/([A-Z][a-zA-Z0-9&'\-]+(?: [A-Z][a-zA-Z0-9&'\-]+)*)/g) || [];
//   return matches
//     .map((name) => name.trim())
//     .filter((name) =>
//       name &&
//       name.length > 1 &&
//       name.toLowerCase() !== brand.toLowerCase() &&
//       !GENERIC_WORDS.includes(name)
//     );
// }

// export const marketingInsightsTool = createTool({
//   id: 'getMarketingInsights',
//   description: 'Comprehensive marketing insights for a given brand and fetches 5 top competiors for a given brand using google search ',
//   inputSchema: z.object({
//     brand: z.string().describe('The brand to find competitors for'),
//     industry: z.string().optional().describe('Optional industry context for more precise analysis'),
//   }),
//   async execute(context) {
//     const { brand, industry } = context.context;
    
//     try {
//       // Fetch competitors using SerpAPI
//       const competitorsQuery = `top competitors of ${brand} ${industry || 'D2C'} brands`;
//       const serpApiKey = process.env.SERPAPI_KEY;
//       if (!serpApiKey) throw new Error('Missing SERPAPI_KEY');
      
//       const serpApiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(competitorsQuery)}&api_key=${serpApiKey}&num=10`;
//       const response = await axios.get(serpApiUrl);
//       const results = response.data?.organic_results ?? [];
      
//       // Extract unique competitor names
//       let competitorNames: string[] = [];
//       for (const res of results) {
//         competitorNames.push(...extractBrandNames(res.title, brand));
//       }
//       const uniqueCompetitors = [...new Set(competitorNames)].slice(0, 5);

//       // Generate marketing insights using AI
//       const aiPrompt =`Provide a comprehensive marketing analysis for the brand [brand] in the [industry || 'D2C'] industry.  The analysis should be detailed, actionable, and suitable for informing a strategic marketing plan.  Specifically address the following:

//       1. **Brand Overview:**  Describe the brand's mission, vision, values, target audience (beyond demographics – include psychographics, lifestyle, and buying behaviors), unique selling proposition (USP), and current market positioning (e.g., premium, value, niche).  Include a brief history if relevant to understanding the brand's current trajectory.
      
//       2. **Competitive Analysis:** Analyze the key competitors listed: [uniqueCompetitors.join(', ')]. For each competitor, describe their strengths, weaknesses, target audience, marketing strategies, and market share (if available).  Identify opportunities for differentiation and competitive advantage for [brand].
      
//       3. **Target Audience Segmentation:**  Define at least three distinct target audience segments for [brand]. For each segment, provide detailed profiles including:
//           * Demographics (age, gender, location, income, education, etc.)
//           * Psychographics (values, attitudes, lifestyle, interests, personality traits)
//           * Buying behaviors (purchase frequency, preferred channels, price sensitivity, brand loyalty)
//           * Pain points and unmet needs
//           * Motivations and aspirations
      
//       4. **Marketing Strategy:** Develop a comprehensive marketing strategy encompassing:
//           * **Value Proposition:** Clearly articulate the value [brand] offers to each target segment.
//           * **Marketing Channels:** Identify the most effective channels to reach each target segment (e.g., social media platforms, paid advertising, content marketing, email marketing, influencer marketing, public relations).  Justify your channel selections.
//           * **Messaging and Positioning:**  Develop key messaging themes tailored to each target segment, emphasizing the brand's unique selling proposition and addressing the target audience's pain points and needs.
//           * **Brand Voice and Tone:** Describe the ideal brand voice and tone for all marketing communications.
      
//       5. **Content Strategy:**  Develop a content strategy that aligns with the marketing strategy and addresses the needs and interests of each target segment. This should include:
//           * **Content Pillars:**  Identify 3-5 key content pillars that will form the foundation of your content strategy.
//           * **Content Formats:** Specify the types of content you will create (e.g., blog posts, social media updates, videos, infographics, ebooks, podcasts).
//           * **Content Calendar (Example):** Provide a sample content calendar for one month, showing planned content across different channels.
//           * **Keyword Research:** List relevant keywords for SEO purposes, categorized by target segment.
      
//       6. **Marketing Budget Allocation (Optional but Highly Recommended):** Suggest a hypothetical budget allocation across the different marketing channels and activities.
      
//       Provide specific, actionable recommendations, and support your analysis with data and evidence whenever possible.`
      

//       const aiResponse = await generateText({
//         model: google('gemini-1.5-flash'),
//         prompt: aiPrompt,
//       });

//       // Parse the AI-generated response
//       const insights = parseMarketingInsights(aiResponse.text, brand, uniqueCompetitors);

//       return {
//         originalBrand: brand,
//         insights,
//         uniqueCompetitors
//       };
//     } catch (error) {
//       // Comprehensive error handling
//       console.error('Marketing insights generation error:', error);
//       return { 
//         error: error instanceof Error ? error.message : String(error),
//         originalBrand: brand
//       };
//     }
//   },
// });

// // Utility function to parse AI response
// function parseMarketingInsights(
//   aiResponse: string, 
//   brandName: string, 
//   competitors: string[]
// ): MarketingInsights {
//   // Basic parsing with fallback values
//   return {
//     brandName,
//     brandOverview: extractSection(aiResponse, 'Brand Overview') || 
//       `Marketing insights for ${brandName} in the ${brandName} industry`,
//     valueProposition: extractSection(aiResponse, 'Value Proposition') || 
//       'Unique solutions for modern business challenges',
//     keyCompetitors: competitors,
//     targetAudience: {
//       demographics: {
//         age: extractSubSection(aiResponse, 'Target Audience', 'Age') || '25-45',
//         gender: extractSubSection(aiResponse, 'Target Audience', 'Gender') || 'All',
//         location: extractSubSection(aiResponse, 'Target Audience', 'Location') || 'Global'
//       },
//       interests: extractList(aiResponse, 'Interests') || ['Technology', 'Innovation'],
//       painPoints: extractList(aiResponse, 'Pain Points') || ['Efficiency', 'Cost-effectiveness']
//     },
//     marketingStrategy: {
//       primaryChannels: extractList(aiResponse, 'Marketing Channels') || ['Digital', 'Social Media'],
//       keyMessageThemes: extractList(aiResponse, 'Key Message Themes') || ['Innovation', 'Customer Success'],
//       differentiators: extractList(aiResponse, 'Unique Differentiators') || ['Cutting-edge technology']
//     },
//     contentRecommendations: {
//       blogTopics: extractList(aiResponse, 'Blog Topics') || ['Industry Trends', 'Product Innovations'],
//       socialMediaContentIdeas: extractList(aiResponse, 'Social Media Content') || ['Behind the Scenes', 'Customer Testimonials'],
//       keywordFocus: extractList(aiResponse, 'Keywords') || ['industry solution', 'innovative approach']
//     }
//   };
// }

// // Utility extraction functions
// function extractSection(text: string, sectionName: string): string | null {
//   const regex = new RegExp(`${sectionName}:?\\s*([^\\n]+(?:\\n[^\\n]+)*)`);
//   const match = text.match(regex);
//   return match ? match[1].trim() : null;
// }

// function extractSubSection(text: string, sectionName: string, subSectionName: string): string | null {
//   const regex = new RegExp(`${sectionName}.*?${subSectionName}:?\\s*([^\\n]+)`, 'is');
//   const match = text.match(regex);
//   return match ? match[1].trim() : null;
// }

// function extractList(text: string, listName: string): string[] | null {
//   const regex = new RegExp(`${listName}:?\\s*([\\s\\S]*?)(?=\\n\\n|$)`, 'i');
//   const match = text.match(regex);
//   if (match) {
//     return match[1].split('\n')
//       .map(item => item.replace(/^[-*•]\s*/, '').trim())
//       .filter(item => item.length > 0);
//   }
//   return null;
// }

// // Optional: Quick snapshot tool for rapid insights
// export const quickMarketingSnapshot = createTool({
//   id: 'quickMarketingSnapshot',
//   description: 'Rapid marketing insights for a brand',
//   inputSchema: z.object({
//     brand: z.string().describe('The brand to get a quick marketing snapshot for'),
//     industry: z.string().optional().describe('Optional industry context')
//   }),
//   async execute(context) {
//     const { brand, industry } = context.context;
    
//     try {
//       const aiPrompt = `Provide a concise 3-point marketing snapshot for ${brand} in the ${industry || 'market'}:
//       1. Unique Selling Proposition
//       2. Primary Target Audience
//       3. Key Marketing Channels`;

//       const aiResponse = await generateText({
//         model: google('gemini-1.5-flash'),
//         prompt: aiPrompt,
//         maxTokens: 500
//       });

//       return {
//         brand,
//         snapshot: aiResponse.text.split('\n').map(point => point.trim()).filter(Boolean)
//       };
//     } catch (error) {
//       console.error('Quick snapshot generation error:', error);
//       return { 
//         error: error instanceof Error ? error.message : String(error),
//         brand
//       };
//     }
//   }
// });