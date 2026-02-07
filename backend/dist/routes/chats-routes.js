// backend/routes/chats-routes.ts
import { Router } from "express";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'; // 1. Import Clerk Middleware
// Controller Imports
import { deleteUserChats, generateGeminiChatCompletion, sendChatsToUser } from "../controllers/chat-controller.js";
const chatRoutes = Router();
// 2. Protect routes with Clerk's middleware
chatRoutes.post("/new", ClerkExpressRequireAuth(), generateGeminiChatCompletion);
chatRoutes.get("/all-chats", ClerkExpressRequireAuth(), sendChatsToUser);
chatRoutes.delete("/delete", ClerkExpressRequireAuth(), deleteUserChats);
// Note: Removed "/logout" route. 
// With Clerk, logout happens entirely on the frontend (clearing the session cookie).
// You don't need a backend route for it.
export default chatRoutes;
//# sourceMappingURL=chats-routes.js.map