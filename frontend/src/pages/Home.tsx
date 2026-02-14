import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import TypingAnim from "../components/typer/TypingAnim";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#050505", // Deep dark background
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "70px",
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
            color: "#3b82f6", // Brighter blue for dark mode visibility
            letterSpacing: "-1px",
            minHeight: "80px",
            textShadow: "0 0 20px rgba(59, 130, 246, 0.3)", // Glow effect
          }}
        >
          <TypingAnim />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "1.25rem",
            color: "#a1a1aa", // Muted gray-white
            marginBottom: "50px",
            fontWeight: "500",
          }}
        >
          Into the unknown
        </p>

        {/* The "Get Started" Box (Dark Style) */}
        <Link to={isSignedIn ? "/chat" : "/login"} style={{ textDecoration: "none" }}>
          <div
            style={{
              width: "300px",
              padding: "25px",
              backgroundColor: "#111111", // Dark card background
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)", 
              border: "1px solid #27272a", // Subtle border
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.2)";
              e.currentTarget.style.borderColor = "#3b82f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
              e.currentTarget.style.borderColor = "#27272a";
            }}
          >
            <div>
              <div
                style={{
                  color: "#ffffff", // Pure white for titles
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  marginBottom: "5px",
                }}
              >
                Start Now
              </div>
              <div
                style={{
                  color: "#9ca3af", // Soft gray for text
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
                backgroundColor: "#1e293b", // Darker blue-gray background for icon
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3b82f6",
              }}
            >
              ➝
            </div>
          </div>
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default Home;