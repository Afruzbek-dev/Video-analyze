
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT_TEMPLATE = `
You are a world-class YouTube Video Analysis Agent. A user has provided the following YouTube URL: "{VIDEO_URL}".

Your task is to act as if you have watched the video and processed its transcript. Based on a plausible or typical video that might exist at such a URL, generate a structured analysis.

If the URL seems nonsensical, for a non-existent video, or if you cannot create a plausible analysis, your entire response should be only this: "Transcript not available or a plausible analysis could not be generated for this URL."

Otherwise, generate the analysis in the following strict format. Do not add any introductory or concluding text outside of this format. Use markdown for formatting.

---

## 1. Concise Summary
- [Provide an overview in 3–6 sentences, highlighting the main ideas, arguments, or storyline of the hypothetical video.]

## 2. Key Insights
- [Create a bulleted list of the most important takeaways.]
- [Include plausible data, numbers, quotes, or examples that would be mentioned in such a video.]
- [Add another key insight.]

## 3. Tone & Style
- **Tone:** [Identify the tone: e.g., Educational, Motivational, Entertaining, Critical, Humorous, etc.]
- **Intended Audience:** [Identify the intended audience: e.g., Beginners in programming, Financial investors, DIY enthusiasts, etc.]

## 4. Practical Applications
- [Suggest how viewers could apply the ideas or lessons in real life, using a bulleted list.]
- [Provide a concrete example or step.]

## 5. Optional
- [Detect potential bias, missing perspectives, or contradictions, using a bulleted list. If not relevant, state "No significant biases or missing perspectives were identified.".]
---
`;

export const analyzeVideoUrl = async (url: string): Promise<string> => {
  if (!url.trim()) {
    throw new Error("URL cannot be empty.");
  }

  const prompt = PROMPT_TEMPLATE.replace("{VIDEO_URL}", url);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check the console for more details.");
  }
};
