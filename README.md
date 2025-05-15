# Brand Spy

A full-stack marketing analysis tool built using Mastra.ai technology. Brand Spy identifies top competitors for any brand and provides comprehensive marketing insights to help improve your strategy.

## Features

- **Competitor Analysis**: Identifies the top 5 competitors for any brand
- **Marketing Insights**: Provides detailed marketing insights for each brand
- **Target Audience Segmentation**: Identifies the target audience for a brand
- **Marketing Strategy Recommendations**: Suggests marketing strategies based on competitor analysis
- **Content Recommendations**: Provides content recommendations for your brand

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Node.js/Express with TypeScript
- **Database**: Neon DB (PostgreSQL)
- **AI**: Mastra.ai with Google's Gemini 1.5 Flash model
- **Data Collection**: SerpAPI

## Project Structure

The project is organized into two main directories:

- `frontend/`: Contains the Next.js frontend application
- `backend/`: Contains the Express.js backend API
- `src/mastra/`: Contains the Mastra.ai agent for brand analysis

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or pnpm
- A SerpAPI key
- A Neon DB account and database

### Environment Variables

1. Backend:

   - Create a `.env` file in the `backend/` directory with the following variables:

   ```
   PORT=5000
   NEON_DB_URL=your_neon_db_connection_string
   SERPAPI_KEY=your_serpapi_key
   ```

2. Frontend:
   - Create a `.env.local` file in the `frontend/` directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Installation and Running

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/brand-spy.git
   cd brand-spy
   ```

2. Install dependencies and run the backend:

   ```
   cd backend
   npm install
   npm run dev
   ```

3. In a new terminal, install dependencies and run the frontend:

   ```
   cd frontend
   npm install
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter a brand name in the search field
2. Click "Analyze Brand" to start the analysis
3. View the competitors and marketing insights for the brand

## API Endpoints

- `POST /api/analyze`: Analyze a brand and get competitors and marketing insights
- `GET /api/analysis/:id`: Get a specific brand analysis by ID
- `GET /api/analyses`: Get all brand analyses
- `GET /api/analysis/brand/:brandName`: Get the latest analysis for a specific brand

## License

ISC
