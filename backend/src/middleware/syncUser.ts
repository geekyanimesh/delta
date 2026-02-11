import { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node"; 
import User from "../models/User.js";

// --- FIX START ---
// We tell TypeScript: "Trust us, the Request object will have these properties."
declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string | null;
        sessionId: string | null;
        getToken: () => Promise<string | null>;
      };
      dbUser?: any; 
    }
  }
}
// --- FIX END ---

export const syncUserToDatabase = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    // Now TypeScript knows 'auth' exists!
    const { userId } = req.auth; 

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No Clerk ID found" });
    }

    // Check if user exists in MongoDB
    let user = await User.findOne({ clerkId: userId });

    // If found, attach to request and proceed
    if (user) {
      req.dbUser = user;
      return next();
    }

    // If NOT found, fetch details from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);
    
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) {
      return res.status(400).json({ message: "Error: Clerk user has no email" });
    }

    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User";

    // Create the new user in MongoDB
    user = await User.create({
      clerkId: userId,
      email: email,
      name: name,
      chats: [], 
    });

    req.dbUser = user;
    next();

  } catch (error) {
    console.error("User Sync Error:", error);
    res.status(500).json({ message: "Internal Server Error during User Sync" });
  }
};