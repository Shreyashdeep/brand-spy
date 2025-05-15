import { ApiResponse, BrandAnalysis } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const errorData = await response.json();
    return {
      success: false,
      message: errorData.message || 'An error occurred',
      error: errorData.error
    };
  }
  
  return await response.json();
}

// API service
const apiService = {
  // Analyze a brand
  analyzeBrand: async (brandName: string): Promise<ApiResponse<BrandAnalysis>> => {
    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ brandName })
      });
      
      return handleResponse<BrandAnalysis>(response);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to the server',
        error: (error as Error).message
      };
    }
  },
  
  // Get a brand analysis by ID
  getAnalysisById: async (id: number): Promise<ApiResponse<BrandAnalysis>> => {
    try {
      const response = await fetch(`${API_URL}/analysis/${id}`);
      
      return handleResponse<BrandAnalysis>(response);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to the server',
        error: (error as Error).message
      };
    }
  },
  
  // Get all brand analyses
  getAllAnalyses: async (): Promise<ApiResponse<BrandAnalysis[]>> => {
    try {
      const response = await fetch(`${API_URL}/analyses`);
      
      return handleResponse<BrandAnalysis[]>(response);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to the server',
        error: (error as Error).message
      };
    }
  },
  
  // Get the latest analysis for a specific brand
  getLatestByBrandName: async (brandName: string): Promise<ApiResponse<BrandAnalysis>> => {
    try {
      const response = await fetch(`${API_URL}/analysis/brand/${encodeURIComponent(brandName)}`);
      
      return handleResponse<BrandAnalysis>(response);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to the server',
        error: (error as Error).message
      };
    }
  }
};

export default apiService; 