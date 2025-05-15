import { Request, Response } from 'express';
import BrandAnalysisModel from '../models/brandAnalysis.js';
import MastraService from '../services/mastraService.js';
import { AnalysisRequest } from '../types/index.js';

class BrandAnalysisController {
  // Analyze a brand and store the results
  static async analyzeBrand(req: Request, res: Response) {
    try {
      const { brandName } = req.body as AnalysisRequest;
      
      if (!brandName) {
        return res.status(400).json({ 
          success: false, 
          message: 'Brand name is required' 
        });
      }
      
      // Check if we already have a recent analysis for this brand
      const existingAnalysis = await BrandAnalysisModel.getLatestByBrandName(brandName);
      
      // If we have an analysis that's less than 24 hours old, return it
      if (existingAnalysis && 
          (new Date().getTime() - existingAnalysis.analysisDate.getTime()) < 24 * 60 * 60 * 1000) {
        return res.json({
          success: true,
          message: 'Analysis retrieved from cache',
          data: existingAnalysis
        });
      }
      
      // Otherwise, run a new analysis
      const analysis = await MastraService.analyzeBrand(brandName);
      
      // Save the analysis to the database
      const analysisId = await BrandAnalysisModel.save(analysis);
      
      // Get the saved analysis with the ID
      const savedAnalysis = await BrandAnalysisModel.getById(analysisId);
      
      return res.json({
        success: true,
        message: 'Brand analysis completed successfully',
        data: savedAnalysis
      });
    } catch (error) {
      console.error('Error in analyzeBrand controller:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while analyzing the brand',
        error: (error as Error).message
      });
    }
  }

  // Get a brand analysis by ID
  static async getAnalysisById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ID format'
        });
      }
      
      const analysis = await BrandAnalysisModel.getById(id);
      
      if (!analysis) {
        return res.status(404).json({
          success: false,
          message: 'Analysis not found'
        });
      }
      
      return res.json({
        success: true,
        data: analysis
      });
    } catch (error) {
      console.error('Error in getAnalysisById controller:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the analysis',
        error: (error as Error).message
      });
    }
  }

  // Get all brand analyses
  static async getAllAnalyses(req: Request, res: Response) {
    try {
      const analyses = await BrandAnalysisModel.getAll();
      
      return res.json({
        success: true,
        data: analyses
      });
    } catch (error) {
      console.error('Error in getAllAnalyses controller:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving analyses',
        error: (error as Error).message
      });
    }
  }

  // Get the latest analysis for a specific brand
  static async getLatestByBrandName(req: Request, res: Response) {
    try {
      const brandName = req.params.brandName;
      
      if (!brandName) {
        return res.status(400).json({
          success: false,
          message: 'Brand name is required'
        });
      }
      
      const analysis = await BrandAnalysisModel.getLatestByBrandName(brandName);
      
      if (!analysis) {
        return res.status(404).json({
          success: false,
          message: 'No analysis found for this brand'
        });
      }
      
      return res.json({
        success: true,
        data: analysis
      });
    } catch (error) {
      console.error('Error in getLatestByBrandName controller:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the analysis',
        error: (error as Error).message
      });
    }
  }
}

export default BrandAnalysisController; 