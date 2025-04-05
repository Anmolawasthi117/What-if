// src/utils/sceneWrapper.js
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // .env se key

const sceneWrapper = async (userInput) => {
  try {
    // API call
    const response = await fetch("https://api.gemini.com/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Create a funny story based on "${userInput}". Return a list of 4-8 scenes, each with: 
          1. sceneId (unique number), 
          2. script (funny text for the scene), 
          3. imagePrompt (a detailed prompt to generate an image for this scene).`,
        maxScenes: 8,
      }),
    });

    if (!response.ok) {
      throw new Error("Gemini API ne jawab nahi diya!");
    }

    const data = await response.json();
    return data.scenes || [];
  } catch (error) {
    console.error("Scene Wrapper Error:", error);
    return []; 
  }
};

export default sceneWrapper;