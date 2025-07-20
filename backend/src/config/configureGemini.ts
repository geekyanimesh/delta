// backend/config/configureGemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export const configureGemini = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEYS || "");
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // the correct model
  });
  return model;
};
