// backend/models/User.ts
import mongoose from "mongoose";
import { randomUUID } from "crypto";
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // 1. New Field: The link to Clerk
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    // 2. Updated Field: Password is no longer required
    password: {
        type: String,
        required: false, // Changed from true
    },
    chats: [chatSchema],
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map