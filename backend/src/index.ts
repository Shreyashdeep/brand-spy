import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import BrandAnalysisModel from './models/brandAnalysis.js';
import brandAnalysisRoutes from './routes/brandAnalysisRoutes.js';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Brand Spy API' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Initialize database tables
BrandAnalysisModel.createTablesIfNotExist()
  .then(() => {
    console.log('Database tables initialized successfully');
  })
  .catch((err) => {
    console.error('Error initializing database tables:', err);
  });

// Register routes
app.use('/api', brandAnalysisRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 