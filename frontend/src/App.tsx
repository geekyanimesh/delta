import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { 
  SignIn, 
  SignUp, 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn,
  useAuth 
} from "@clerk/clerk-react";
import { checkAuthStatus } from "./helpers/api-communicator"; // Use our helper

function App() {
  const { getToken, isSignedIn } = useAuth();

  // This replaces your <AuthSync /> component
  useEffect(() => {
    const syncToBackend = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          if (token) {
            // This GET request triggers the middleware to create/sync the user
            const data = await checkAuthStatus(token);
            console.log("✅ User Synced & Verified:", data);
          }
        } catch (error) {
          console.error("❌ Sync Failed", error);
        }
      }
    };
    syncToBackend();
  }, [isSignedIn, getToken]);

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Login Route - Centered */}
        <Route 
          path="/login/*" 
          element={
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", width: "100%" }}>
              <SignIn routing="path" path="/login" />
            </div>
          } 
        />

        {/* Signup Route - Centered */}
        <Route 
          path="/signup/*" 
          element={
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", width: "100%" }}>
              <SignUp routing="path" path="/signup" />
            </div>
          } 
        />

        {/* Protected Chat Route */}
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