import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGemini } from "../config/configureGemini.js";

// Helper to access Clerk Auth Object
interface ClerkRequest extends Request {
  auth: {
    userId: string;
  };
}

export const generateGeminiChatCompletion = async (req: Request, res: Response) => {
  const { message } = req.body;
  
  // 1. Get the Clerk ID from the request
  const { userId } = (req as ClerkRequest).auth;

  try {
    // 2. Find the user by their Clerk ID
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return res.status(404).json({ message: "User not linked to database." });
    }

    // ... Existing Gemini Logic ...
    const model = configureGemini();
    const chat = model.startChat({
      history: user.chats.map((chat) => ({
        role: chat.role,
        parts: [{ text: chat.content }],
      })),
      generationConfig: {
        maxOutputTokens: 256,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response.text();

    user.chats.push({ role: "user", content: message });
    user.chats.push({ role: "model", content: response });
    await user.save();

    return res.status(200).json({ message: response });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return res.status(500).json({ message: "AI failed to respond", error });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = (req as ClerkRequest).auth;
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(401).send("User not found in database");
    }

    // Permissions are implicitly checked by finding the user via their auth ID
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = (req as ClerkRequest).auth;
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(401).send("User not found");
    }

    // @ts-ignore
    user.chats = [];
    await user.save();
    
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};