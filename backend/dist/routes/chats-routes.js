// backend/routes/chats-routes.ts
import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { deleteUserChats, generateGeminiChatCompletion } from "../controllers/chat-controller.js";
import { sendChatsToUser } from "../controllers/chat-controller.js";
import { userLogout } from "../controllers/user-controllers.js";
const chatRoutes = Router();
chatRoutes.post("/new", verifyToken, generateGeminiChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteUserChats);
chatRoutes.get("/logout", verifyToken, userLogout);
export default chatRoutes;
//# sourceMappingURL=chats-routes.js.map