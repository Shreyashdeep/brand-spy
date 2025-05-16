# Project Scratchpad

## Background and Motivation

This project, called "brand-spy," is a marketing analysis tool built using Mastra.ai technology. It's designed to perform competitive analysis for D2C (Direct-to-Consumer) brands. The tool can identify top competitors for a given brand and provide comprehensive marketing insights including competitive analysis, target audience segmentation, marketing strategy, and content recommendations.

The project is now being expanded to become a full-stack web application with:

- A Next.js frontend that provides a user-friendly interface for inputting brand names and viewing competitor analysis
- A Node.js backend API that interfaces with the Mastra.ai agent
- Neon DB (PostgreSQL) for persistent storage of analysis results
- Support for retrieving 5 competitors with detailed marketing insights for any input brand

## Key Challenges and Analysis

1. **Marketing Data Collection**: The project uses external APIs (specifically SerpAPI) to gather real-world data about brands and competitors.

2. **AI Integration**: Leverages Google's Gemini 1.5 Flash model for generating marketing insights and competitive analysis.

3. **Storage Solution**: Currently uses LibSQL for data persistence via @mastra/libsql package, but will be migrated to Neon DB (PostgreSQL).

4. **Agent Architecture**: Implements a marketing strategist agent that can analyze brands and provide detailed marketing recommendations.

5. **Tool Integration**: Custom tools have been created for competitor analysis and marketing strategy generation.

6. **Full-Stack Architecture**: Need to design a cohesive architecture that separates the frontend, backend API, and AI agent components while ensuring efficient communication between them.

7. **Frontend Design**: Creating an intuitive, responsive UI/UX in Next.js that effectively displays complex marketing insights and competitor analysis data.

8. **API Development**: Building a robust Node.js API that handles requests from the frontend and communicates with the Mastra agent.

9. **Database Schema Design**: Developing an efficient database schema in Neon DB to store analysis results and user queries for future reference.

10. **Deployment Strategy**: Planning for containerization and deployment of the three-tier architecture.

## High-level Task Breakdown

### Phase 1: Architecture Design and Setup

1. **Design System Architecture**:

   - Create architecture diagrams showing the interaction between Next.js frontend, Node.js backend, Mastra agent, and Neon DB
   - Define API endpoints and data flow
   - Success Criteria: Complete architecture documentation with component interactions defined

2. **Set Up Next.js Frontend Project**:

   - Initialize Next.js project with TypeScript
   - Configure project structure (pages, components, services)
   - Add styling libraries (Tailwind CSS)
   - Success Criteria: Next.js application runs locally with basic navigation

3. **Set Up Node.js Backend API**:

   - Initialize Express.js project with TypeScript
   - Configure middleware and error handling
   - Create basic API structure
   - Success Criteria: Backend server runs locally and responds to health check requests

4. **Configure Neon DB Connection**:
   - Set up Neon DB account and database
   - Create database schema for storing brand analyses
   - Configure connection from backend to database
   - Success Criteria: Backend can connect to Neon DB and perform basic CRUD operations

### Phase 2: Core Functionality Implementation

5. **Integrate Existing Mastra Agent with Backend**:

   - Convert current agent structure to be callable from API endpoints
   - Create adapter layer between Express routes and Mastra agent
   - Implement error handling and response formatting
   - Success Criteria: Backend can invoke Mastra agent and return results via API

6. **Implement Frontend UI for Brand Analysis**:

   - Create search interface for brand name input
   - Design results display for competitor analysis
   - Implement loading states and error handling
   - Success Criteria: Users can input a brand name and view mock results (before actual API integration)

7. **Connect Frontend to Backend API**:

   - Implement API service layer in frontend
   - Create state management for analysis results
   - Add authentication if required
   - Success Criteria: Frontend can send requests to backend and display actual results

8. **Implement Analysis Storage in Neon DB**:
   - Create data models for storing analysis results
   - Implement persistence logic in the backend
   - Add retrieval functionality for historical analyses
   - Success Criteria: Analysis results are stored in the database and can be retrieved

### Phase 3: Enhancement and Optimization

9. **Optimize Analysis Display**:

   - Implement visualization components for marketing insights
   - Add filtering and sorting capabilities for competitor data
   - Create exportable reports
   - Success Criteria: Marketing insights are presented in an easily digestible and visually appealing format

10. **Implement Caching and Performance Optimizations**:

    - Add caching layer for frequent analyses
    - Optimize database queries
    - Implement rate limiting for external API calls
    - Success Criteria: Response times are under 3 seconds for cached analyses and under 15 seconds for new analyses

11. **Add User Management (Optional)**:
    - Implement user registration and authentication
    - Add saved analyses feature
    - Create user dashboard
    - Success Criteria: Users can create accounts, save analyses, and view their history

### Phase 4: Testing and Deployment

12. **Comprehensive Testing**:

    - Unit testing for frontend components and backend services
    - Integration testing for the entire application flow
    - Performance testing under load
    - Success Criteria: 90%+ test coverage and successful end-to-end testing

13. **Deployment Setup**:

    - Configure deployment pipelines
    - Set up containerization with Docker
    - Deploy to cloud provider
    - Success Criteria: Application is accessible online with all features working

14. **Documentation and Knowledge Transfer**:
    - Create user documentation
    - Document API endpoints
    - Create technical documentation for future maintenance
    - Success Criteria: Comprehensive documentation available for users and developers

## Project Status Board

- [x] Project setup and dependency installation
- [x] Core Mastra configuration
- [x] Marketing agent implementation
- [x] Competitor analysis tool creation
- [x] Marketing strategy tool development
- [x] System architecture design
- [x] Next.js frontend project setup
- [ ] Node.js backend API setup
- [x] Frontend UI implementation
- [ ] Neon DB configuration
- [ ] Mastra agent integration with backend
- [ ] Frontend-backend connection
- [ ] Analysis storage in Neon DB
- [ ] UI/UX optimization
- [ ] Performance enhancements
- [ ] Testing
- [ ] Deployment
- [ ] Documentation

## Current Status / Progress Tracking

The project has made significant progress with the core infrastructure now in place. We have:

1. Set up the Next.js frontend project with TypeScript and Tailwind CSS
2. Implemented the frontend UI components for brand search, competitor display, and marketing insights
3. ~~Created the Express.js backend API with TypeScript~~ (Previous backend implementation has been deleted as it was not working properly)
4. Defined the database schema and models for Neon DB
5. ~~Created controllers and routes for the brand analysis API~~ (Needs to be reimplemented)
6. ~~Implemented the service layer to integrate with the existing Mastra agent~~ (Needs to be reimplemented)
7. ~~Modified TypeScript configuration to be less strict with Express type checking~~ (Will be reconsidered in new implementation)

Current focus:
Rebuilding the backend API with proper integration with the Mastra agent. The backend should effectively process brand names from the frontend and return AI agent results.

## Backend Implementation Plan

### 1. Setup Express.js Backend Project (1-2 hours)

1. **Initialize Project**:

   - Create a new backend directory (e.g., `/backend`) in the project root
   - Initialize package.json with required dependencies
   - Configure TypeScript for the backend
   - Set up proper .gitignore, tsconfig.json, and .env files
   - Success Criteria: Project structure set up with all necessary configuration

2. **Install Dependencies**:
   - Express.js for API server
   - CORS for cross-origin support
   - Dotenv for environment variables
   - TypeScript and ts-node for TypeScript support
   - Nodemon for development reload
   - Winston for logging
   - Express-validator for request validation
   - Success Criteria: All dependencies installed and working

### 2. Create Basic Server Structure (1-2 hours)

1. **Create Server Entry Point**:

   - Set up Express application
   - Configure middleware (CORS, JSON parsing, etc.)
   - Implement error handling middleware
   - Create health check endpoint
   - Success Criteria: Server starts and responds to health check

2. **Design API Routes Structure**:
   - Set up modular routing system
   - Define routes to match frontend expectations:
     - POST /api/analyze (for analyzing a brand)
     - GET /api/analysis/:id (get analysis by ID)
     - GET /api/analyses (get all analyses)
     - GET /api/analysis/brand/:brandName (get latest analysis for a brand)
   - Implement proper request validation using express-validator
   - Success Criteria: Routes structure established with proper error handling

### 3. Mastra Agent Integration (2-3 hours)

1. **Create Mastra Service Layer**:

   - Implement a service layer that interfaces with the Mastra agent
   - Create wrapper functions for agent interaction:
     - analyzeBrand(brandName: string): Promise<BrandAnalysis>
   - Handle error cases and timeouts
   - Format Mastra agent response to match frontend expected types:

     ```typescript
     interface BrandAnalysis {
       id?: number;
       brandName: string;
       competitors: Competitor[];
       marketingInsights: MarketingInsight;
       analysisDate: Date;
     }

     interface Competitor {
       name: string;
       url?: string;
       description?: string;
     }

     interface MarketingInsight {
       targetAudience: string;
       usp: string;
       marketingChannels: string[];
       contentStrategy: string;
       recommendedTactics: string[];
     }
     ```

   - Success Criteria: Service can initialize and call the Mastra agent

2. **Build Brand Analysis Controller**:
   - Create controller function to process brand analysis requests
   - Implement input validation
   - Call Mastra service methods
   - Format response data to match the API response structure:
     ```typescript
     interface ApiResponse<T> {
       success: boolean;
       message?: string;
       data?: T;
       error?: string;
     }
     ```
   - Success Criteria: Controller can process a brand name and return results from the Mastra agent

### 4. Database Integration (Optional for MVP) (2-3 hours)

1. **Configure Neon DB Connection**:

   - Set up PostgreSQL client
   - Implement connection pool
   - Create database schema for BrandAnalysis, Competitor, and MarketingInsight tables
   - Success Criteria: Backend can connect to Neon DB

2. **Implement Data Access Layer**:
   - Create repository functions for storing analysis results
   - Implement query functions for retrieving previous analyses:
     - getAnalysisById(id: number): Promise<BrandAnalysis>
     - getAllAnalyses(): Promise<BrandAnalysis[]>
     - getLatestByBrandName(brandName: string): Promise<BrandAnalysis>
   - Success Criteria: Data can be stored and retrieved from Neon DB

### 5. Testing and Validation (1-2 hours)

1. **Manual Testing**:

   - Test API endpoints with Postman or curl
   - Verify integration with Mastra agent
   - Test error handling scenarios
   - Success Criteria: All API endpoints function as expected

2. **Integration with Frontend**:
   - Verify CORS settings are configured to allow the frontend to access the API
   - Test frontend-to-backend communication by running both services and testing the UI
   - Success Criteria: Frontend can successfully call backend API and receive responses

### 6. Performance Optimization (Optional for MVP) (1-2 hours)

1. **Implement Caching**:

   - Add in-memory caching for recent brand analyses
   - Set appropriate cache expiration
   - Success Criteria: Repeated requests for the same brand return cached results

2. **Request Throttling**:
   - Implement rate limiting to prevent API abuse
   - Configure appropriate limits
   - Success Criteria: Rate limiting prevents excessive API calls

### 7. Deployment Preparation (1 hour)

1. **Environment Configuration**:

   - Set up .env file with all required variables
   - Document required environment variables
   - Success Criteria: Application runs with proper environment configuration

2. **Dockerfile Creation**:
   - Create Dockerfile for containerization
   - Configure Docker Compose if needed
   - Success Criteria: Application can be containerized and run in Docker

## Executor's Feedback or Assistance Requests

1. **SerpAPI Integration**: The current implementation requires a SerpAPI key to be set as an environment variable (`SERPAPI_KEY`). This needs to be configured for proper functioning.

2. **Integration Testing**: Need to perform thorough testing with various brands across different industries to ensure consistency and accuracy of the marketing insights.

3. **Workflow Enhancement**: The current workflow needs to be adapted to work within the new full-stack architecture.

4. **Next.js Expertise**: May need assistance with optimizing Next.js for displaying complex marketing data visualization.

5. **Neon DB Schema Design**: The current schema design includes tables for competitors, marketing insights, brand analyses, and a join table for brand-competitor relationships. This should be reviewed for efficiency and scalability.

6. **Environment Variables**: Need to set up the `.env` files for both frontend and backend with proper configuration values.

7. **TypeScript-Express Compatibility**: In the previous implementation, we encountered issues with TypeScript type checking for Express route handlers. For the new implementation, we should:
   - Use a simpler routing pattern that's more TypeScript-friendly
   - Consider using express-validator for request validation
   - Properly type request and response objects
   - Use middleware factories with proper typing

## Lessons

1. The project uses several alpha versions of Mastra packages (like `@mastra/core: ^0.9.4-alpha.1`), which may have stability implications.

2. External API dependencies (SerpAPI) create a potential point of failure if the API is unavailable or changes its response format.

3. The GENERIC_WORDS array is quite extensive but important for filtering out noise when identifying competitor brands.

4. Both the codebase and dependencies are TypeScript-based, ensuring type safety throughout the project.

5. When transitioning a Mastra agent to a full-stack application, it's crucial to maintain the agent's functionality while adapting it to work within an API context.

6. Next.js and Express.js with TypeScript provide a solid foundation for full-stack JavaScript applications with good type safety.

7. Separating the frontend and backend into different directories helps maintain a clear project structure and separation of concerns.

8. TypeScript with Express can sometimes have type compatibility issues, especially when working with middleware and route handlers. Various approaches to resolve this include:

   - Using explicit handler functions with the correct signatures
   - Modifying tsconfig.json to be less strict
   - Creating custom type declaration files (.d.ts) to augment existing types
   - Using type assertions when necessary

9. When rebuilding a backend, focus on simplicity first, then add complexity as needed:
   - Start with a minimal viable backend that can process requests and call the Mastra agent
   - Add proper error handling and input validation
   - Implement database integration after the core functionality is working
   - Add performance optimizations (caching, rate limiting) last

## Detailed Implementation Steps

### Step 1: Set up Backend Directory and Initialize Project

1. Create backend directory and initialize package.json:

```bash
mkdir -p backend
cd backend
npm init -y
```

2. Install required dependencies:

```bash
npm install express cors dotenv winston express-validator
npm install -D typescript ts-node nodemon @types/express @types/cors
```

3. Create TypeScript configuration file (tsconfig.json):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "types": ["node"],
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

4. Create .env file:

```
PORT=5000
NODE_ENV=development
SERPAPI_KEY=your_serpapi_key_here
```

### Step 2: Create Basic Server Structure

1. Create src directory and server entry point (src/index.ts):

```typescript
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./utils/logger";
import routes from "./routes";

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", routes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});

export default app;
```

2. Create logger utility (src/utils/logger.ts):

```typescript
import winston from "winston";

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
```

3. Create routes (src/routes/index.ts):

```typescript
import { Router } from "express";
import brandRoutes from "./brandRoutes";

const router = Router();

router.use("/", brandRoutes);

export default router;
```

4. Create brand routes (src/routes/brandRoutes.ts):

```typescript
import { Router } from "express";
import { brandController } from "../controllers/brandController";
import { validate } from "../middleware/validation";

const router = Router();

// Analyze a brand
router.post("/analyze", validate("analyzeBrand"), brandController.analyzeBrand);

// Get analysis by ID
router.get(
  "/analysis/:id",
  validate("getAnalysisById"),
  brandController.getAnalysisById
);

// Get all analyses
router.get("/analyses", brandController.getAllAnalyses);

// Get latest analysis for a brand
router.get(
  "/analysis/brand/:brandName",
  validate("getByBrandName"),
  brandController.getLatestByBrandName
);

export default router;
```

5. Create validation middleware (src/middleware/validation.ts):

```typescript
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
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};
```

### Step 3: Implement Mastra Service

1. Create Mastra service (src/services/mastraService.ts):

```typescript
import path from "path";
import { BrandAnalysis, Competitor, MarketingInsight } from "../types";
import { mastra } from "../../../src/mastra";
import { logger } from "../utils/logger";

export class MastraService {
  async analyzeBrand(brandName: string): Promise<BrandAnalysis> {
    try {
      logger.info(`Analyzing brand: ${brandName}`);

      // Call the marketing agent from the Mastra instance
      const agentResponse = await mastra.agents.marketingAgent.run({
        input: brandName,
      });

      logger.info(`Agent response received for brand: ${brandName}`);

      // Extract competitors and insights from the agent response and format
      // according to our API's expected structure
      const formattedResponse = this.formatAgentResponse(
        agentResponse,
        brandName
      );

      return formattedResponse;
    } catch (error) {
      logger.error(`Error analyzing brand: ${brandName}`, error);
      throw error;
    }
  }

  private formatAgentResponse(
    agentResponse: any,
    brandName: string
  ): BrandAnalysis {
    try {
      // Extract competitor information
      const competitors: Competitor[] = [];

      if (agentResponse.marketingCompetitorAnalysisTool?.uniqueCompetitors) {
        // Map competitors from the tool response
        agentResponse.marketingCompetitorAnalysisTool.uniqueCompetitors.forEach(
          (name: string) => {
            competitors.push({ name });
          }
        );
      }

      // Extract marketing insights
      const marketingInsights: MarketingInsight = {
        targetAudience: extractTargetAudience(agentResponse),
        usp: extractUSP(agentResponse),
        marketingChannels: extractMarketingChannels(agentResponse),
        contentStrategy: extractContentStrategy(agentResponse),
        recommendedTactics: extractRecommendedTactics(agentResponse),
      };

      return {
        brandName,
        competitors,
        marketingInsights,
        analysisDate: new Date(),
      };
    } catch (error) {
      logger.error("Error formatting agent response", error);
      throw new Error("Failed to parse marketing agent response");
    }
  }
}

// Helper functions to extract marketing insights from the agent response
function extractTargetAudience(response: any): string {
  // Implement extraction logic based on agent response structure
  return "Target audience extracted from response";
}

function extractUSP(response: any): string {
  // Implement extraction logic based on agent response structure
  return "USP extracted from response";
}

function extractMarketingChannels(response: any): string[] {
  // Implement extraction logic based on agent response structure
  return ["Social Media", "Email Marketing", "Content Marketing"];
}

function extractContentStrategy(response: any): string {
  // Implement extraction logic based on agent response structure
  return "Content strategy extracted from response";
}

function extractRecommendedTactics(response: any): string[] {
  // Implement extraction logic based on agent response structure
  return [
    "Increase social media presence",
    "Develop influencer partnerships",
    "Create more video content",
  ];
}

export const mastraService = new MastraService();
```

2. Create type definitions (src/types/index.ts):

```typescript
// Competitor type definition
export interface Competitor {
  name: string;
  url?: string;
  description?: string;
}

// Marketing Insight type definition
export interface MarketingInsight {
  targetAudience: string;
  usp: string; // Unique Selling Proposition
  marketingChannels: string[];
  contentStrategy: string;
  recommendedTactics: string[];
}

// Brand Analysis type definition
export interface BrandAnalysis {
  id?: number;
  brandName: string;
  competitors: Competitor[];
  marketingInsights: MarketingInsight;
  analysisDate: Date;
}

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
```

### Step 4: Implement Brand Controller

1. Create brand controller (src/controllers/brandController.ts):

```typescript
import { Request, Response } from "express";
import { mastraService } from "../services/mastraService";
import { logger } from "../utils/logger";

// For MVP, we'll use in-memory storage
const analysisStore: Map<number, any> = new Map();
let nextId = 1;

export const brandController = {
  // Analyze a brand
  async analyzeBrand(req: Request, res: Response) {
    try {
      const { brandName } = req.body;

      logger.info(`Received request to analyze brand: ${brandName}`);

      // Call Mastra service to analyze the brand
      const analysis = await mastraService.analyzeBrand(brandName);

      // Store analysis result (in-memory for MVP)
      analysis.id = nextId++;
      analysisStore.set(analysis.id, analysis);

      return res.status(200).json({
        success: true,
        message: "Brand analysis completed successfully",
        data: analysis,
      });
    } catch (error) {
      logger.error("Error in analyzeBrand controller", error);
      return res.status(500).json({
        success: false,
        message: "Failed to analyze brand",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Get analysis by ID
  async getAnalysisById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const analysis = analysisStore.get(id);

      if (!analysis) {
        return res.status(404).json({
          success: false,
          message: "Analysis not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: analysis,
      });
    } catch (error) {
      logger.error("Error in getAnalysisById controller", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve analysis",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Get all analyses
  async getAllAnalyses(req: Request, res: Response) {
    try {
      const analyses = Array.from(analysisStore.values());

      return res.status(200).json({
        success: true,
        data: analyses,
      });
    } catch (error) {
      logger.error("Error in getAllAnalyses controller", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve analyses",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Get latest analysis for a brand
  async getLatestByBrandName(req: Request, res: Response) {
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
        return res.status(404).json({
          success: false,
          message: "No analysis found for this brand",
        });
      }

      return res.status(200).json({
        success: true,
        data: analyses[0],
      });
    } catch (error) {
      logger.error("Error in getLatestByBrandName controller", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve brand analysis",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};
```

### Step 5: Configure Scripts

1. Update package.json to add scripts:

```json
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "lint": "eslint . --ext .ts",
    "test": "echo \"No tests specified\" && exit 0"
  }
}
```
