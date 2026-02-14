import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGemini } from "../config/configureGemini.js";

export const generateGeminiChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const { userId } = req.auth;
    if (!userId) return res.status(401).json({ message: "User not authenticated" });

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ message: "User not linked to database." });

    const model = configureGemini();

    const history = user.chats.map((chat) => ({
      role: chat.role === "user" ? "user" : "model",
      parts: [{ text: chat.content }],
    }));

    const chatSession = model.startChat({
      history: history,
      systemInstruction: {
        role: "system",
        parts: [{ text: "You are a concise programming assistant. Provide code solutions directly. Do not provide line-by-line explanations or 'How to compile' sections. Use Markdown for all code blocks." }]
      },
      generationConfig: {
        maxOutputTokens: 2048, 
        temperature: 0.2,      
      },
    });

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    user.chats.push({ role: "user", content: message });
    user.chats.push({ role: "model", content: responseText });
    await user.save();

    return res.status(200).json({ message: responseText, chats: user.chats });
    
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return res.status(500).json({ message: "AI failed to respond", error });
  }
};

export const sendChatsToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth;
    if (!userId) return res.status(401).send("User not authenticated");

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(401).send("User not found");

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteUserChats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth;
    if (!userId) return res.status(401).send("User not authenticated");

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(401).send("User not found");

    user.chats.splice(0, user.chats.length);
    await user.save();
    
    return res.status(200).json({ message: "OK" });
  } catch (error: any) {
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};