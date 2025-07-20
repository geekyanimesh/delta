import User from "../models/User.js";
import { configureGemini } from "../config/configureGemini.js";
export const generateGeminiChatCompletion = async (req, res) => {
    const userId = res.locals.jwtData?.id;
    const { message } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
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
        console.log("🔍 Gemini Raw Response:\n", JSON.stringify(result.response, null, 2));
        const response = await result.response.text();
        user.chats.push({ role: "user", content: message });
        user.chats.push({ role: "model", content: response });
        await user.save();
        return res.status(200).json({ message: response });
    }
    catch (error) {
        console.error("Gemini AI Error:", error);
        return res.status(500).json({ message: "AI failed to respond", error });
    }
};
//# sourceMappingURL=chat-controller.js.map