import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export const configureGemini = () => {
  // Using the variable name from your .env file
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEYS || "");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite", // The stable, latest lite model
  });
  
  return model;
};