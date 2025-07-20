// backend/routes/chats-routes.ts
import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateGeminiChatCompletion } from "../controllers/chat-controller.js";

const chatRoutes = Router();

chatRoutes.post("/new", verifyToken, generateGeminiChatCompletion);

export default chatRoutes;
