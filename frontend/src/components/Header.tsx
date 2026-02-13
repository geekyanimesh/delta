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
        backgroundColor: "rgba(5, 5, 5, 0.8)", 
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #27272a", 
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
          gap: "12px",
          textDecoration: "none",
        }}
      >
        <img 
            src="/detlaLogo.png" 
            alt="Delta Logo"
            style={{ 
                height: "150px", // Adjusted for better navbar scaling
                width: "auto",
                filter: "invert(1) brightness(2)" // Flips black logo to white
            }} 
        />
      </Link>

      {/* RIGHT: Auth Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <SignedOut>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#ffffff", // Pure white for visibility
              fontWeight: "600",
              fontSize: "17px",
            }}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              backgroundColor: "#ffffff", 
              color: "#000000",
              padding: "8px 20px",
              borderRadius: "50px",
              fontSize: "17px",
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