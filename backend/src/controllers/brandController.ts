import { Request, Response } from "express";
import { mastraService } from "../services/mastraService";
import { logger } from "../utils/logger";

// For MVP, we'll use in-memory storage
const analysisStore: Map<number, any> = new Map();
let nextId = 1;

export const brandController = {
  // Analyze a brand
  async analyzeBrand(req: Request, res: Response): Promise<void> {
    try {
      const { brandName } = req.body;
      
      logger.info(`Received request to analyze brand: ${brandName}`);
      
      // Call Mastra service to analyze the brand
      const analysis = await mastraService.analyzeBrand(brandName);
      
      // Store analysis result (in-memory for MVP)
      analysis.id = nextId++;
      analysisStore.set(analysis.id, analysis);
      
      res.status(200).json({
        success: true,
        message: "Brand analysis completed successfully",
        data: analysis,
      });
    } catch (error) {
      logger.error("Error in analyzeBrand controller", error);
      res.status(500).json({
        success: false,
        message: "Failed to analyze brand",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
  
  // Get analysis by ID
  async getAnalysisById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      const analysis = analysisStore.get(id);
      
      if (!analysis) {
        res.status(404).json({
          success: false,
          message: "Analysis not found",
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: analysis,
      });
    } catch (error) {
      logger.error("Error in getAnalysisById controller", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve analysis",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
  
  // Get all analyses
  async getAllAnalyses(req: Request, res: Response): Promise<void> {
    try {
      const analyses = Array.from(analysisStore.values());
      
      res.status(200).json({
        success: true,
        data: analyses,
      });
    } catch (error) {
      logger.error("Error in getAllAnalyses controller", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve analyses",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
  
  // Get latest analysis for a brand
  async getLatestByBrandName(req: Request, res: Response): Promise<void> {
    try {
      const { brandName } = req.params;
      
      // Find all analyses for this brand and get the latest one
      const analyses = Array.from(analysisStore.values())
        .filter(
          (analysis) =>
            analysis.brandName.toLowerCase() === brandName.toLowerCase()
        )
        .sort(
          (a, b) =>
            new Date(b.analysisDate).getTime() -
            new Date(a.analysisDate).getTime()
        );
      
      if (analyses.length === 0) {
        res.status(404).json({
          success: false,
          message: "No analysis found for this brand",
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: analyses[0],
      });
    } catch (error) {
      logger.error("Error in getLatestByBrandName controller", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve brand analysis",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
}; 