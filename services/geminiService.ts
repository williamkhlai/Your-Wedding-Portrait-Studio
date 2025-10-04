import { GoogleGenAI, Modality } from "@google/genai";
import { WeddingStyle, WeddingScene } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWeddingPhoto = async (
  brideImageBase64: string,
  brideMimeType: string,
  groomImageBase64: string,
  groomMimeType: string,
  style: WeddingStyle,
  scene: WeddingScene
): Promise<string | null> => {
  const model = 'gemini-2.5-flash-image';

  let prompt = `
    **ABSOLUTE DIRECTIVE: FACIAL FIDELITY CHECKPOINT**

    Your single most important task is to ensure the faces of the bride and groom in the generated photo are an **EXACT, 100% PERFECT REPLICA** of the faces in the two input images provided.

    - **Image 1 (The Bride):** The first image contains the bride. Her face must be identical to the face in Image 1.
    - **Image 2 (The Groom):** The second image contains the groom. His face must be identical to the face in Image 2.

    **FAILURE CONDITION:** Any deviation, alteration, or misrepresentation of their facial features, structure, or identity is considered a complete failure of this task. You MUST NOT generate a new person. You are performing a face-swap and scene composition, not creating new individuals.

    **Groom's Face - Special Instruction:** Pay extreme attention to the groom's face from Image 2. Previous attempts have failed to match the groom's face correctly. This is a critical checkpoint. The groom in the output image must be unmistakably the same person as in Image 2.

    **ARTISTIC & TECHNICAL EXECUTION: CINEMATIC REALISM AT 8K**
    - **Output Quality (Non-negotiable):** The final image must be a cinematic, realistic portrait with an effective resolution equivalent to 8K. It must be hyper-detailed, sharp, and crystal clear.
    - **Cinematic Lighting:** Create a dramatic and evocative lighting scheme. Use techniques like soft rim lighting to separate subjects from the background, gentle key lighting to flatter facial features, and volumetric light to create a sense of depth and atmosphere. The lighting must feel natural to the environment but elevated with a professional, cinematic touch.
    - **Photorealism:** The realism must be absolute. Focus on micro-details: the texture of fabrics, the subtle imperfections of skin, the way light reflects from different surfaces. The image should not look like a digital composite; it must appear as if it were captured in-camera by a world-class photographer with high-end equipment.
    - **Professional Composition:** Employ advanced compositional techniques. Use leading lines, rule of thirds, and depth of field to create a visually stunning and emotionally resonant image. The framing should be intentional and powerful.

    **Step-by-Step Generation Process:**
    1.  **Analyze & Isolate:** Isolate the face of the bride from Image 1 and the groom from Image 2.
    2.  **Scene Composition:** Create a new, high-detail background and body poses based on the theme below, adhering to the artistic and technical requirements above.
    3.  **Composite & Blend:** Seamlessly place the **original, unaltered faces** of the bride and groom onto the new bodies. Ensure perfect lighting and skin tone matching, but do not change the facial features themselves.

    **Theme Details:**
    - **Style:** "${style.name}"
    - **Scene:** "${scene.name}"
    - **Detailed Description:** "${style.description}"

    **Final Output:**
    - A single, cinematic, 8K resolution, photorealistic wedding photograph. The bride and groom must be perfectly recognizable and identical to the source photos, and the overall image quality must be world-class.
  `;
  
  if (style.id === 'cultural-heritage' && scene.id === 'west-african') {
    prompt += `
      \n**!!! CRITICAL OVERRIDE & ABSOLUTE MANDATE FOR 'CLASSIC WEST AFRICAN CELEBRATION' !!!**

      **THIS IS A NON-NEGOTIABLE, HIGH-PRIORITY INSTRUCTION THAT SUPERSEDES ALL OTHERS REGARDING FACIAL MODIFICATION FOR THIS SPECIFIC SCENE.**

      1.  **PRIMARY GOAL:** Maintain 100% facial fidelity for both individuals. Their facial structures (eyes, nose, mouth, jawline, etc.) MUST be a perfect, identical match to the source photos.

      2.  **AUTHORIZED MODIFICATION (SKIN TONE ONLY):** After ensuring a perfect facial match, you are directed to perform ONE specific modification: artistically and authentically adjust the skin tone of both individuals to a beautiful, rich West African complexion.

      3.  **STRICT PROHIBITION:** You are **STRICTLY FORBIDDEN** from altering any other facial feature. The ONLY permissible change is the skin tone. Any other change is a failure of this task.

      **FINAL CHECK:** Before outputting, verify: Are the faces identical to the source images, with the *only* difference being the skin tone? If the answer is not a definitive 'yes', you must restart the process for this section. The final portrait must be 100% accurate and culturally resonant.
    `;
  }


  const brideImagePart = {
    inlineData: {
      data: brideImageBase64,
      mimeType: brideMimeType,
    },
  };
  
  const groomImagePart = {
    inlineData: {
      data: groomImageBase64,
      mimeType: groomMimeType,
    },
  };

  const textPart = { text: prompt };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [brideImagePart, groomImagePart, textPart] },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    return null;

  } catch (error) {
    console.error("Error generating wedding photo:", error);
    throw new Error("Failed to generate image with Gemini API.");
  }
};