import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

export const validate = (method: string) => {
  switch (method) {
    case "analyzeBrand": {
      return [
        body("brandName").notEmpty().withMessage("Brand name is required"),
      ];
    }
    case "getAnalysisById": {
      return [
        param("id").isInt().withMessage("Analysis ID must be an integer"),
      ];
    }
    case "getByBrandName": {
      return [
        param("brandName").notEmpty().withMessage("Brand name is required"),
      ];
    }
    default:
      return [];
  }
};

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
    return;
  }
  next();
}; 