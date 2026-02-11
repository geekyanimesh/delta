import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Optional: You might want to remove this in production or restrict it to admins
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. The Heavy Lifting is done!
    // The middleware already found/created the user and put it in 'req.dbUser'
    const user = (req as any).dbUser;

    if (!user) {
      return res.status(401).json({ message: "User authentication failed" });
    }

    // 2. Return the MongoDB user (which includes the _id we need for chats)
    return res.status(200).json({ message: "OK", user });
    
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};