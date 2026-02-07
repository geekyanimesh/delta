import { useEffect } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import axios from "axios";
import { 
  SignIn, 
  SignUp, 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn,
  useUser,
  useAuth 
} from "@clerk/clerk-react";

// --- NEW COMPONENT: Syncs Clerk User to MongoDB ---
const AuthSync = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncToBackend = async () => {
      // Only sync if user is fully loaded and logged in
      if (isLoaded && user) {
        try {
          const token = await getToken();
          
          // Send user data to your backend to create/update them in MongoDB
          await axios.post(
            "/user/sync", 
            {
              name: user.fullName,
              email: user.primaryEmailAddress?.emailAddress,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach Clerk Token
              },
            }
          );
          console.log("✅ User Synced with MongoDB");
        } catch (error) {
          console.error("❌ Sync Failed", error);
        }
      }
    };

    syncToBackend();
  }, [isLoaded, user, getToken]);

  return null; // This component is invisible
};
// --------------------------------------------------

function App() {
  return (
    <main>
      {/* 1. Run the Sync Logic */}
      <AuthSync />
      
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* 2. Clerk Authentication Routes */}
        <Route 
          path="/login/*" 
          element={
            <div className="flex justify-center mt-20">
              <SignIn routing="path" path="/login" />
            </div>
          } 
        />
        <Route 
          path="/signup/*" 
          element={
            <div className="flex justify-center mt-20">
              <SignUp routing="path" path="/signup" />
            </div>
          } 
        />

        {/* 3. Protected Chat Route */}
        <Route
          path="/chat"
          element={
            <>
              <SignedIn>
                <Chat />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;