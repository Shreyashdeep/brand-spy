import { BrandAnalysis, Competitor, MarketingInsight } from '../types/index.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../');

class MastraService {
  // Run the Mastra agent analysis for a given brand
  static async analyzeBrand(brandName: string): Promise<BrandAnalysis> {
    try {
      console.log(`Starting brand analysis for: ${brandName}`);
      
      // Define the path to the mastra agent script
      const agentPath = path.join(projectRoot, 'src/mastra/index.ts');
      
      // Check if the file exists
      if (!fs.existsSync(agentPath)) {
        throw new Error(`Mastra agent file not found at: ${agentPath}`);
      }
      
      // Execute the Mastra agent script with the brand name as an argument
      const { stdout, stderr } = await execPromise(`cd ${projectRoot} && npx ts-node --esm ${agentPath} ${brandName}`);
      
      if (stderr) {
        console.error('Error from Mastra agent:', stderr);
      }
      
      // Parse the output to get the analysis result
      const result = JSON.parse(stdout);
      
      // Transform the Mastra agent output to our BrandAnalysis interface
      const competitors: Competitor[] = result.competitors.map((comp: any) => ({
        name: comp.name,
        url: comp.url || '',
        description: comp.description || ''
      }));
      
      const marketingInsights: MarketingInsight = {
        targetAudience: result.marketingInsights.targetAudience,
        usp: result.marketingInsights.usp,
        marketingChannels: result.marketingInsights.marketingChannels,
        contentStrategy: result.marketingInsights.contentStrategy,
        recommendedTactics: result.marketingInsights.recommendedTactics
      };
      
      const brandAnalysis: BrandAnalysis = {
        brandName,
        competitors,
        marketingInsights,
        analysisDate: new Date()
      };
      
      return brandAnalysis;
    } catch (error) {
      console.error('Error analyzing brand with Mastra agent:', error);
      throw error;
    }
  }
}

export default MastraService; 