import { createTool } from '@mastra/core/tools';
// import { webSearch } from '@mastra/core/tools/tools'; // or custom SERP call
import axios from 'axios';
import { z } from 'zod';

const inputSchema = z.object({
  brand: z.string().describe('The brand name to find competitors for, e.g., "Nike", "Google Search"'),
});

type Input = z.infer<typeof inputSchema>;

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
