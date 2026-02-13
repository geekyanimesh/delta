import { createContext, useContext, useEffect, useState } from "react";
// 1. Fix: Use "type" import for ReactNode to solve the verbatimModuleSyntax error
import type { ReactNode } from "react";
// 2. Fix: Import Clerk hooks instead of manual api-communicator functions
import { useUser, useClerk } from "@clerk/clerk-react";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: () => Promise<void>;
  signup: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 3. Fix: Use Clerk's hooks to manage state automatically
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const clerk = useClerk();

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync Clerk state with your local app state
  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser) {
      setUser({
        name: clerkUser.fullName || clerkUser.firstName || "User",
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
      });
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  // 4. Fix: Map login/signup/logout to Clerk's functions
  const login = async () => {
    // Opens the Clerk Login Modal
    clerk.openSignIn(); 
  };

  const signup = async () => {
    // Opens the Clerk Signup Modal
    clerk.openSignUp();
  };

  const logout = async () => {
    await clerk.signOut();
    window.location.reload();
  };

  const value: UserAuth = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when Clerk is ready to avoid "flickering" */}
      {isLoaded ? children : null} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};