import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();
async function listAvailableModels() {
    const apiKey = process.env.GEMINI_API_KEYS;
    if (!apiKey) {
        console.error("❌ No API key found in .env variable GEMINI_API_KEYS");
        return;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        console.log("... Fetching available models ...");
        const result = await genAI.getGenerativeModel({ model: "gemini-pro" }).apiKey; // Dummy call to init or just use response
        // Actually, the SDK has a specific manager for this, but currently, 
        // the easiest way in the node SDK is often just to try the standard 'gemini-pro' 
        // or use the direct REST call if the SDK doesn't expose listModels easily in your version.
        // However, a more reliable way with the current SDK:
        // We can't easily "list" via the helper class in some versions, 
        // so let's use a raw fetch to the API to be 100% sure.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            console.log("\n✅ Available Models for your Key:");
            console.log("---------------------------------");
            data.models.forEach((model) => {
                // Only show models that support generating content
                if (model.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`Name: ${model.name.replace("models/", "")}`);
                    console.log(`Desc: ${model.description.substring(0, 60)}...`);
                    console.log("---------------------------------");
                }
            });
        }
        else {
            console.log("No models found or error:", data);
        }
    }
    catch (error) {
        console.error("Error fetching models:", error);
    }
}
listAvailableModels();
//# sourceMappingURL=list-models.js.map