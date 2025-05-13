import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { getCompetitorBrands } from '../tools/getCompetitorBrands';
import { marketingStrategyTool } from '../tools/marketingStrategytool';
import { marketingCompetitorAnalysisTool } from '../tools';

export const marketingAgent = new Agent({
  name: 'Marketing Strategist Agent',
  instructions: `
As a D2C marketing strategist AI, perform a competitive analysis. Your response should include the following steps:

Step 1: Competitor Identification

Identify the five top direct-to-consumer (D2C) competitors for the provided brand <BRAND> . Justify your selection of competitors based on market share, target audience overlap, and similar product offerings. If insufficient information is available to identify five distinct competitors, clearly state this limitation and proceed with the analysis based on the available information.
Step 2: Competitive Analysis (for each brand, including <BRAND> ):

For each brand identified in Step 1, provide the following information in a structured markdown format:

Brand Overview:

Mission Statement: Concisely state the brand's mission and purpose.
Target Audience: Describe the primary demographic and psychographic characteristics of the brand's ideal customer.
Brand Positioning: Explain how the brand differentiates itself from competitors in the market (e.g., value, premium, luxury, etc.).
Buyer Personas: Develop 2-3 detailed buyer personas representing the key segments of the target audience. Include demographic information, psychographics (values, interests, lifestyle), motivations, and pain points.

Value Proposition: Clearly articulate the unique value the brand offers to its customers. What problem does it solve? What benefits does it provide?

Content Strategy: Outline the overall content strategy, including the types of content (blog posts, videos, social media updates, etc.), content pillars, and content distribution channels.

Blog/Video/Social Media Topics: Provide a list of relevant and engaging topics for blog posts, videos, and social media content.

Social Media Calendar (Example): Provide a sample social media calendar outlining content themes for a week or month, showcasing the variety and consistency of posting.

Influencer Strategy: Describe the ideal influencer profile for the brand and how influencer marketing will be leveraged to reach the target audience.

Marketing Funnel (Awareness → Consideration → Conversion): Detail the steps in the customer journey and the marketing tactics used at each stage.

SEO Plan & Keywords: Identify relevant keywords and phrases for search engine optimization (SEO) and outline a basic SEO strategy.

Ad Copy Ideas (Examples): Provide 3-5 examples of compelling ad copy that resonates with the target audience.

Email Campaign Ideas (Examples): Suggest 2-3 examples of email campaigns that could be used to nurture leads and drive conversions.

Tone & Style Guide: Describe the brand's voice and personality. Include examples of appropriate language and imagery.
`,
  model: google('gemini-1.5-flash'),
  tools: { marketingCompetitorAnalysisTool},
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
    options: {
      lastMessages: 10,
      semanticRecall: false,
      threads: {
        generateTitle: false,
      },
    },
  }),
});
