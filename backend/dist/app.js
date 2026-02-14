import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { syncUserToDatabase } from './middleware/syncUser.js';
import appRouter from './routes/index.js';
config();
const app = express();
// --- CORS CONFIGURATION UPDATE ---
app.use(cors({
    origin: [
        "http://localhost:5173", // Local development
        "https://delta-ai-navy.vercel.app" // Your new Vercel Frontend
    ],
    credentials: true
}));
// ---------------------------------
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
app.use("/api/v1", 
// Clerk middleware checks the token
ClerkExpressRequireAuth(), 
// Sync middleware ensures user exists in MongoDB
syncUserToDatabase, appRouter);
export default app;
//# sourceMappingURL=app.js.map