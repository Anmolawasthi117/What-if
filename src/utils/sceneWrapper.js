// src/utils/sceneWrapper.js
import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // .env se key
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const sceneWrapper = async (userInput) => {
  try {
    // API call
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Create a funny story based on "${userInput}". Return a list of 4-8 scenes, each with: 
          1. sceneId (unique number), 
          2. script (funny text for the scene), 
          3. imagePrompt (a detailed prompt to generate an image for this scene).`,
    });

    console.log(response.text);

    // const data = await response.json();
    // return data.scenes || [];
  } catch (error) {
    console.error("Scene Wrapper Error:", error);
    return [];
  }
};

export default sceneWrapper;
