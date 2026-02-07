import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";

// Helper to get Clerk Auth from Request
interface ClerkRequest extends Request {
  auth: {
    userId: string;
  };
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// NEW: The Bridge between Clerk and MongoDB
export const syncUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get the Clerk ID from the verified token
    const { userId } = (req as ClerkRequest).auth;
    const { name, email } = req.body;

    // 2. Check if user exists in MongoDB
    let user = await User.findOne({ clerkId: userId });

    // 3. If not, create them
    if (!user) {
      user = new User({ 
        name, 
        email, 
        clerkId: userId, 
        chats: [] 
      });
      await user.save();
    }

    return res.status(200).json({ message: "User Synced", user });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};