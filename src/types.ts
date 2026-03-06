import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const model = ai.models.generateContent.bind(ai.models);

export interface UserProfile {
  name: string;
  needs: string[];
  sensoryProfile: {
    sensitivity: "low" | "medium" | "high";
    triggers: string[];
  };
  speechGoals: string[];
  visualPreference: "high-contrast" | "standard" | "dark";
}

export const INITIAL_PROFILE: UserProfile = {
  name: "",
  needs: [],
  sensoryProfile: {
    sensitivity: "medium",
    triggers: [],
  },
  speechGoals: [],
  visualPreference: "standard",
};
