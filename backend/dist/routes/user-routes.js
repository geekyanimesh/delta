import { Router } from "express";
import { getAllUsers, verifyUser } from "../controllers/user-controllers.js"; // Import the controllers we made
const userRouter = Router();
// Route 1: Get all users (Optional / For Admin or Debugging)
userRouter.get("/", getAllUsers);
// Route 2: Verify & Get User Profile
// Your Frontend will call this to get the MongoDB _id
userRouter.get("/auth-status", verifyUser);
export default userRouter;
//# sourceMappingURL=user-routes.js.map