import express from 'express';
import BrandAnalysisController from '../controllers/brandAnalysisController.js';

const router = express.Router();

// Route to analyze a brand
router.post('/analyze', BrandAnalysisController.analyzeBrand);

// Route to get a brand analysis by ID
router.get('/analysis/:id', BrandAnalysisController.getAnalysisById);

// Route to get all brand analyses
router.get('/analyses', BrandAnalysisController.getAllAnalyses);

// Route to get the latest analysis for a specific brand
router.get('/analysis/brand/:brandName', BrandAnalysisController.getLatestByBrandName);

export default router; 