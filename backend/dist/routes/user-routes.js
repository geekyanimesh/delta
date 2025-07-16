import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers.js";
import { validate, signupValidator, loginValidator } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map