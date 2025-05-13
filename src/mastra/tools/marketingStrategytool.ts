// import { createTool } from '@mastra/core/tools';
// // import { generate } from '@mastra/core/tools/generate';
// import {generateText} from "ai";
// import {z } from "zod";
// import {google } from "@ai-sdk/google"

// export const marketingStrategyTool = createTool({
//   id: 'marketingStrategyTool',
//   description: 'Generates a full marketing strategy for a given brand name.',
//   inputSchema: z.object({
//     brand:
//     z.string().describe("the name of the brand to analyze") 
//     // {
//     //   type: 'string',
//     //   description: 'The name of the brand to analyze',
//     // },
//   }),
//   async execute(context) {
//     const brand = context.context.brand;
//     const prompt = `
// You are a senior marketing strategist. Generate a detailed marketing strategy for the brand "${brand}". Include:

// 1. Brand Overview
// 2. Target Audience & Buyer Personas
// 3. Value Proposition
// 4. Content Strategy (Blog, Video, Social)
// 5. Influencer & Community Strategy
// 6. Marketing Funnel (Awareness → Conversion)
// 7. SEO Strategy & Sample Keywords
// 8. Ad Copy Ideas
// 9. Email Campaign Ideas
// 10. Tone of Voice & Visual Guidelines

// Keep the output structured in JSON with each section as a key. Avoid fluff.
//     `;

//     const { text } = await generateText({
//       model: google('gemini-1.5-flash'),
//       prompt,
//     });
//     try {
//       return JSON.parse(text);
//     } catch (e) {
//       // If the model returns invalid JSON, return the raw text for debugging
//       return { error: 'Failed to parse JSON', raw: text };
//     }
//   },
// });



import { createTool } from '@mastra/core/tools';
// import { search } from '@mastra/core/tools/web';
// import { generate } from '@mastra/core/tools/generate';
import {generateText} from "ai";
import { z } from 'zod';
import axios from "axios";
import { google } from '@ai-sdk/google';

export const getCompetitorBrands = createTool({
  id: 'getCompetitorBrands',
  description: 'Given a brand name, find its top competitors.',
  inputSchema: z.object({
    brand: z.string().describe('The brand to find competitors for'),
  }),
  async execute(context) {
    const brand=context.context.brand;
    const query = `Top competitors of ${brand}`;
    // const result = await webSearch({ query });
    // ... inside your run function:
    const serpApiKey = process.env.SERPAPI_KEY;
    if (!serpApiKey) throw new Error('Missing SERPAPI_KEY');
    const serpApiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${serpApiKey}&num=10`;
    const response = await axios.get(serpApiUrl);
    const result = response.data?.organic_results ?? [];

    // Extract brand names from titles/snippets (basic string matching)
    const competitorList: string[] = [];

    for (const r of result) {
      const snippet = `${r.title} ${r.snippet}`.toLowerCase();

      if (snippet.includes('competitor') || snippet.includes('alternative')) {
        const matches = snippet.match(/(?:\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/g);
        if (matches) {
          matches.forEach(name => {
            if (
              name.toLowerCase() !== brand.toLowerCase() &&
              !competitorList.includes(name)
            ) {
              competitorList.push(name);
            }
          });
        }
      }
    }

    return competitorList.slice(0, 5); // Return top 5
  },
});


export const marketingStrategyTool = createTool({
  id: 'marketingStrategyTool',
  description: 'Generates a full marketing strategy for a given brand name.',
  inputSchema: z.object({
    brand:
    z.string().describe("the name of the brand to analyze") 
    // {
    //   type: 'string',
    //   description: 'The name of the brand to analyze',
    // },
  }),
  async execute(context) {
    const brand = context.context.brand;
    const prompt = `
You are a senior marketing strategist. Generate a detailed marketing strategy for the brand "${brand}". Include:

1. Brand Overview
2. Target Audience & Buyer Personas
3. Value Proposition
4. Content Strategy (Blog, Video, Social)
5. Influencer & Community Strategy
6. Marketing Funnel (Awareness → Conversion)
7. SEO Strategy & Sample Keywords
8. Ad Copy Ideas
9. Email Campaign Ideas
10. Tone of Voice & Visual Guidelines

Keep the output structured in JSON with each section as a key. Avoid fluff.
    `;

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt,
    });
    try {
      return JSON.parse(text);
    } catch (e) {
      // If the model returns invalid JSON, return the raw text for debugging
      return { error: 'Failed to parse JSON', raw: text };
    }
  },
});
