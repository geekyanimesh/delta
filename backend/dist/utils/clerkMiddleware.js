import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
// This middleware will block any request that doesn't have a valid session
export const requireAuth = ClerkExpressRequireAuth({
// Optional: Add strict checking if needed
});
//# sourceMappingURL=clerkMiddleware.js.map