import { GoogleGenAI } from "@google/genai";
import imageGeneration from "./imageGeneration";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // .env se key
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const sceneWrapper = async (userInput) => {
  try {
    // API call
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Generate a list of 3 humorous and imaginative indian style humour of  "What if" scenes for a platform called "What if", based only on the following user-provided scenario: "${userInput}"

This platform allows users to explore creative and funny interpretations of a single "What if" idea through multiple scenes rendered visually and narrated with voiceover.

Each scene should explore a different angle, consequence, or funny twist of the same scenario continuing from previous scenes. The scenes should be light-hearted, whimsical, and suitable for a wide audience. They should be engaging and funny, with a touch of surrealism or absurdity.

Format each scene as a JSON object with:
- sceneId: A unique number starting from 1
- script: A short, funny, and engaging narrative describing a scene from the scenario. It should feel like a moment from an animated short, complete with character actions, humor, and surprises.
- imagePrompt: A matching Ghibli-style image description. It should be magical, surreal, and rich in detail with whimsical humor. The image should reflect the scene described in the script.

Example:
{
  "sceneId": 1,
  "script": "What if pigeons had a secret space agency? One bird in a tiny jetpack accidentally launches from a park bench and ends up leading an intergalactic peace treaty... with breadcrumbs.",
  "imagePrompt": "Create a Ghibli-style illustration of a pigeon wearing aviator goggles, zooming through space in a mini rocket, with other pigeons in mission control wearing headsets made of twigs and soda caps. The Earth is in the background, and stars twinkle with a whimsical glow."
}

Make all scenes stay true to the original scenario: "${userInput}"

IMPORTANT: Return the output as a JSON array only — do not include explanations or wrap it in backticks.
 `,
    });

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response.text);
      console.log("Successfully parsed response:", parsedResponse);
    } catch (e) {
      // If direct parsing fails, try to extract JSON from code blocks
      const jsonMatch = response.text.match(/```(?:json\s*)?([\s\S]*?)```/);
      if (jsonMatch && jsonMatch[1]) {
        parsedResponse = JSON.parse(jsonMatch[1]);
        console.log("Parsed response from code block:", parsedResponse);
      } else {
        throw new Error("Failed to parse response as JSON");
      }
    }

    // If we have a valid response, process each scene to generate images
    if (parsedResponse && Array.isArray(parsedResponse)) {
      // Create an array of promises for image generation
      const imagePromises = parsedResponse.map(async (scene) => {
        try {
          // Call imageGeneration function with the image prompt
          const imageUrl = await imageGeneration(scene.imagePrompt);
          console.log(
            `Generated image URL for scene ${scene.sceneId}: ${imageUrl}`
          );

          // Return the original scene with the added imageUrl
          return {
            ...scene,
            imageUrl,
          };
        } catch (error) {
          console.error(
            `Error generating image for scene ${scene.sceneId}:`,
            error
          );
          // Return the original scene without an imageUrl if there was an error
          return {
            ...scene,
            imageUrl: null,
          };
        }
      });

      // Wait for all image generation promises to resolve
      const enhancedScenes = await Promise.all(imagePromises);

      return enhancedScenes;
    }

    return [];
  } catch (error) {
    console.error("Scene Wrapper Error:", error);
    return [];
  }
};

export default sceneWrapper;
