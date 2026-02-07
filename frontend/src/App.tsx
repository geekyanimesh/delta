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

const AuthSync = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncToBackend = async () => {
      if (isLoaded && user) {
        try {
          const token = await getToken();
          await axios.post(
            "/user/sync", 
            {
              name: user.fullName,
              email: user.primaryEmailAddress?.emailAddress,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
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

  return null;
};

function App() {
  return (
    <main>
      <AuthSync />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* UPDATED: Login Route 
           Used inline styles to force center alignment vertically and horizontally 
        */}
        <Route 
          path="/login/*" 
          element={
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              height: "80vh", // Takes up 80% of the screen height
              width: "100%" 
            }}>
              <SignIn routing="path" path="/login" />
            </div>
          } 
        />

        {/* UPDATED: Signup Route */}
        <Route 
          path="/signup/*" 
          element={
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              height: "80vh",
              width: "100%" 
            }}>
              <SignUp routing="path" path="/signup" />
            </div>
          } 
        />

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