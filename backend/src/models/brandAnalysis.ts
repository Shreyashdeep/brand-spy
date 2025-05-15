import pool from '../config/db.js';
import { BrandAnalysis, Competitor, MarketingInsight } from '../types/index.js';

class BrandAnalysisModel {
  // Create tables if they don't exist
  static async createTablesIfNotExist() {
    try {
      // Create competitors table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS competitors (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          url VARCHAR(255),
          description TEXT
        )
      `);

      // Create marketing_insights table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS marketing_insights (
          id SERIAL PRIMARY KEY,
          target_audience TEXT NOT NULL,
          usp TEXT NOT NULL,
          marketing_channels TEXT[] NOT NULL,
          content_strategy TEXT NOT NULL,
          recommended_tactics TEXT[] NOT NULL
        )
      `);

      // Create brand_analyses table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS brand_analyses (
          id SERIAL PRIMARY KEY,
          brand_name VARCHAR(255) NOT NULL,
          analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          marketing_insight_id INTEGER REFERENCES marketing_insights(id)
        )
      `);

      // Create join table for brand_analyses and competitors
      await pool.query(`
        CREATE TABLE IF NOT EXISTS brand_competitors (
          brand_analysis_id INTEGER REFERENCES brand_analyses(id),
          competitor_id INTEGER REFERENCES competitors(id),
          PRIMARY KEY (brand_analysis_id, competitor_id)
        )
      `);

      console.log('Database tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  // Save a brand analysis to the database
  static async save(analysis: BrandAnalysis): Promise<number> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert marketing insights
      const insightResult = await client.query(
        `INSERT INTO marketing_insights (target_audience, usp, marketing_channels, content_strategy, recommended_tactics)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [
          analysis.marketingInsights.targetAudience,
          analysis.marketingInsights.usp,
          analysis.marketingInsights.marketingChannels,
          analysis.marketingInsights.contentStrategy,
          analysis.marketingInsights.recommendedTactics
        ]
      );
      
      const marketingInsightId = insightResult.rows[0].id;
      
      // Insert brand analysis
      const brandResult = await client.query(
        `INSERT INTO brand_analyses (brand_name, marketing_insight_id)
         VALUES ($1, $2)
         RETURNING id`,
        [analysis.brandName, marketingInsightId]
      );
      
      const brandAnalysisId = brandResult.rows[0].id;
      
      // Insert competitors
      for (const competitor of analysis.competitors) {
        // Insert competitor
        const competitorResult = await client.query(
          `INSERT INTO competitors (name, url, description)
           VALUES ($1, $2, $3)
           RETURNING id`,
          [competitor.name, competitor.url || null, competitor.description || null]
        );
        
        const competitorId = competitorResult.rows[0].id;
        
        // Create relationship between brand analysis and competitor
        await client.query(
          `INSERT INTO brand_competitors (brand_analysis_id, competitor_id)
           VALUES ($1, $2)`,
          [brandAnalysisId, competitorId]
        );
      }
      
      await client.query('COMMIT');
      return brandAnalysisId;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error saving brand analysis:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Get a brand analysis by ID
  static async getById(id: number): Promise<BrandAnalysis | null> {
    try {
      // Get brand analysis
      const brandResult = await pool.query(
        `SELECT ba.id, ba.brand_name, ba.analysis_date, mi.target_audience, mi.usp, 
                mi.marketing_channels, mi.content_strategy, mi.recommended_tactics
         FROM brand_analyses ba
         JOIN marketing_insights mi ON ba.marketing_insight_id = mi.id
         WHERE ba.id = $1`,
        [id]
      );
      
      if (brandResult.rows.length === 0) {
        return null;
      }
      
      const brandData = brandResult.rows[0];
      
      // Get competitors for this brand analysis
      const competitorsResult = await pool.query(
        `SELECT c.name, c.url, c.description
         FROM competitors c
         JOIN brand_competitors bc ON c.id = bc.competitor_id
         WHERE bc.brand_analysis_id = $1`,
        [id]
      );
      
      const competitors: Competitor[] = competitorsResult.rows.map(row => ({
        name: row.name,
        url: row.url,
        description: row.description
      }));
      
      const marketingInsights: MarketingInsight = {
        targetAudience: brandData.target_audience,
        usp: brandData.usp,
        marketingChannels: brandData.marketing_channels,
        contentStrategy: brandData.content_strategy,
        recommendedTactics: brandData.recommended_tactics
      };
      
      const brandAnalysis: BrandAnalysis = {
        id: brandData.id,
        brandName: brandData.brand_name,
        analysisDate: new Date(brandData.analysis_date),
        competitors,
        marketingInsights
      };
      
      return brandAnalysis;
    } catch (error) {
      console.error('Error getting brand analysis:', error);
      throw error;
    }
  }

  // Get all brand analyses
  static async getAll(): Promise<BrandAnalysis[]> {
    try {
      const result = await pool.query(
        `SELECT id, brand_name, analysis_date 
         FROM brand_analyses
         ORDER BY analysis_date DESC`
      );
      
      const analyses: BrandAnalysis[] = [];
      
      for (const row of result.rows) {
        const analysis = await this.getById(row.id);
        if (analysis) {
          analyses.push(analysis);
        }
      }
      
      return analyses;
    } catch (error) {
      console.error('Error getting all brand analyses:', error);
      throw error;
    }
  }

  // Get the latest analysis for a specific brand
  static async getLatestByBrandName(brandName: string): Promise<BrandAnalysis | null> {
    try {
      const result = await pool.query(
        `SELECT id FROM brand_analyses
         WHERE brand_name = $1
         ORDER BY analysis_date DESC
         LIMIT 1`,
        [brandName]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return await this.getById(result.rows[0].id);
    } catch (error) {
      console.error('Error getting latest brand analysis:', error);
      throw error;
    }
  }
}

export default BrandAnalysisModel; 