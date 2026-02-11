import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <nav
      style={{
        width: "100%",
        height: "70px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #eaeaea",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxSizing: "border-box",
      }}
    >
      {/* LEFT: Logo Section */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px", // Space between logo and text
          textDecoration: "none",
        }}
      >
        {/* --- YOUR CUSTOM LOGO HERE --- */}
        <img 
            src="/detlaLogo.png" // <--- REPLACE THIS with your actual file name
            alt="Delta Logo"
            style={{ 
                height: "122px", // Adjust height to fit navbar
                width: "auto"   // Auto width keeps aspect ratio
            }} 
        />
      </Link>

      {/* RIGHT: Auth Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <SignedOut>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              backgroundColor: "#000",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "600",
              transition: "opacity 0.2s",
            }}
          >
            Sign up
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;