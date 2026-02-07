import { Router } from "express";
import { Webhook } from "svix";
import User from "../models/User.js";
const userRouter = Router();
userRouter.post("/clerk-webhook", async (req, res) => {
    try {
        const payload = JSON.stringify(req.body);
        const headers = req.headers;
        // Verify the webhook signature using your Clerk Webhook Secret
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const evt = wh.verify(payload, headers);
        const { id, first_name, last_name, email_addresses } = evt.data;
        const eventType = evt.type;
        if (eventType === "user.created") {
            const newUser = new User({
                clerkId: id,
                name: `${first_name} ${last_name}`,
                email: email_addresses[0].email_address,
            });
            await newUser.save();
        }
        return res.status(200).json({ success: true });
    }
    catch (err) {
        return res.status(400).json({ message: "Webhook verification failed" });
    }
});
//# sourceMappingURL=user-routes.js.map