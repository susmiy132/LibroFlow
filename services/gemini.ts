
import { GoogleGenAI } from "@google/genai";

export const geminiService = {
  async getRecommendation(books: any[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const bookTitles = books.map(b => b.title).join(', ');
    
    const prompt = `As a world-class librarian, suggest 3 more books for someone who likes: ${bookTitles}. 
    Provide the response in a brief list with a short 'why' for each. Keep it friendly and professional.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to fetch recommendations at this time.";
    }
  }
};
