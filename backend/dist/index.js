import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { Router } from "express";
import userRoutes from "./routes/user-routes.js";
import chatRoutes from "./routes/chats-routes.js";
const PORT = process.env.PORT || 5000;
console.log("Trying to start the server...");
const appRouter = Router();
appRouter.use("/user", userRoutes);
appRouter.use("/", chatRoutes);
connectToDatabase()
    .then(() => {
    console.log("Database connection successful ");
    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Failed to connect to DB ", err);
});
//# sourceMappingURL=index.js.map