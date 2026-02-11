import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import TypingAnim from "../components/typer/TypingAnim";
// Import your separate components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* 1. Render the Header Component */}
      <Header />

      {/* 2. Main Content Area */}
      <main
        style={{
          flex: 1, // Takes up all remaining space between Header and Footer
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "70px", // Pushes content down below the fixed Header
          textAlign: "center",
          paddingBottom: "40px",
        }}
      >
        {/* Typing Animation Section */}
        <div
          style={{
            fontSize: "4rem",
            fontWeight: 700,
            marginBottom: "20px",
            color: "#2563eb", // DeepSeek Blue
            letterSpacing: "-1px",
            minHeight: "80px", // Prevents jumping
          }}
        >
          <TypingAnim />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "1.25rem",
            color: "#444",
            marginBottom: "50px",
            fontWeight: "500",
          }}
        >
          Into the unknown
        </p>

        {/* The "Get Started" Box (DeepSeek Style) */}
        <Link to={isSignedIn ? "/chat" : "/login"} style={{ textDecoration: "none" }}>
          <div
            style={{
              width: "300px",
              padding: "25px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)", // Soft shadow
              border: "1px solid #f0f0f0",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(37, 99, 235, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
            }}
          >
            <div>
              <div
                style={{
                  color: "#111",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  marginBottom: "5px",
                }}
              >
                Start Now
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  lineHeight: "1.4",
                }}
              >
                Free access to DeltaAI.
                <br />
                Experience the future.
              </div>
            </div>

            {/* Arrow Icon */}
            <div
              style={{
                backgroundColor: "#f5f7ff",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563eb",
              }}
            >
              ➝
            </div>
          </div>
        </Link>
      </main>

      {/* 3. Render the Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;