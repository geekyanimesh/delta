// backend/utils/listModels.ts
import dotenv from "dotenv";
dotenv.config();
async function listModels() {
    try {
        const apiKey = process.env.GEMINI_API_KEYS;
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }
        const models = data.models || [];
        console.log("Available Gemini models:");
        models.forEach((model) => {
            console.log(`- ${model.name}`);
        });
    }
    catch (error) {
        console.error("Failed to list models:", error);
    }
}
listModels();
//# sourceMappingURL=listModel.js.map