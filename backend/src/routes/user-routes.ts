import { Router } from "express";
import { getAllUsers, syncUser } from "../controllers/user-controllers.js";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const userRoutes = Router();

userRoutes.get("/", getAllUsers);


userRoutes.post(
  "/sync", 
  ClerkExpressRequireAuth(), //  Protects the route
  syncUser
);

export default userRoutes;