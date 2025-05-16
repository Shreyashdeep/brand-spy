import { Router, Request, Response } from "express";
import { brandController } from "../controllers/brandController";
import { validate, handleValidationErrors } from "../middleware/validation";

const router = Router();

// Analyze a brand
router.post(
  "/analyze", 
  validate("analyzeBrand"),
  handleValidationErrors,
  (req: Request, res: Response) => {
    brandController.analyzeBrand(req, res);
  }
);

// Get analysis by ID
router.get(
  "/analysis/:id",
  validate("getAnalysisById"),
  handleValidationErrors,
  (req: Request, res: Response) => {
    brandController.getAnalysisById(req, res);
  }
);

// Get all analyses
router.get("/analyses", (req: Request, res: Response) => {
  brandController.getAllAnalyses(req, res);
});

// Get latest analysis for a brand
router.get(
  "/analysis/brand/:brandName",
  validate("getByBrandName"),
  handleValidationErrors,
  (req: Request, res: Response) => {
    brandController.getLatestByBrandName(req, res);
  }
);

export default router; 