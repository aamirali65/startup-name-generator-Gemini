import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API

const genAI = new GoogleGenerativeAI("AIzaSyC_gCQvpIFO_5ydHkWRHwIKTfe3Oke4Joo"); // Replace with your actual API key

export const testGemini = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Test message");
    console.log("Test response:", result.response.text());
    return true;
  } catch (error) {
    console.error("Gemini Error:", error);
    return false;
  }
};

export const generateNames = async (formData) => {
  const { industry, keywords } = formData;

  const prompt = `Generate 6 unique and creative startup names for a ${industry} company.
Keywords to consider: ${keywords}
Guidelines:
- Memorable and easy to pronounce
- Check domain name availability
- Avoid common clichés
Only provide the names, one per line.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response.split('\n').filter(name => name.trim().length > 0);
  } catch (error) {
    console.error('Gemini Error:', error);
    throw new Error('Failed to generate names');
  }
}; 