import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAI } from 'openai';
import Constants from 'expo-constants';

// Initialize Pinecone client with fallback for demo mode
const pinecone = new Pinecone({
  apiKey: Constants.expoConfig?.extra?.PINECONE_API_KEY || 'demo-api-key',
});

// Initialize OpenAI client with fallback for demo mode
const openai = new OpenAI({
  apiKey: Constants.expoConfig?.extra?.OPENAI_API_KEY || 'demo-api-key',
  dangerouslyAllowBrowser: true // Note: In production, API calls should be proxied through a backend
});

// Vector Service
const VectorService = {
  // Get context for AI tutor (simplified for demo)
  getContextForAITutor: async (
    query: string,
    userId: string,
    subject?: string,
    grade?: string
  ): Promise<string> => {
    // In demo mode, return a generic context
    if (Constants.expoConfig?.extra?.PINECONE_API_KEY === 'demo-api-key') {
      return "This is a demo context. In a production environment, relevant curriculum information would be retrieved from the vector database.";
    }
    
    try {
      // This would normally search the vector database for relevant content
      return "Relevant curriculum context would be retrieved here.";
    } catch (error) {
      console.error("Error getting context for AI tutor:", error);
      return "Unable to retrieve curriculum context.";
    }
  }
};

export default VectorService;