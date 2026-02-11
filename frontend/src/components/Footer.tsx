import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        minHeight: "20vh",
        maxHeight: "30vh",
        marginTop: "auto",
        backgroundColor: "#ffffff", // Matches the page background
        borderTop: "1px solid #f0f0f0", // Subtle separator line
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxSizing: "border-box",
        fontSize: "13px",
        color: "#666",
      }}
    >
      {/* LEFT: Logo Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Your Custom Logo */}
        <img
          src="/delta-logo.png" // Make sure this file is in your /public folder
          alt="Delta Logo"
          style={{
            height: "25px", // Slightly smaller than header logo for elegance
            width: "auto",
            opacity: 0.8, // Subtle fade for footer style
          }}
        />
        <span
          style={{
            fontWeight: "600",
            color: "#444",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          DeltaAI
        </span>
      </div>

      {/* RIGHT: Copyright Text Only (Removed Terms & Privacy) */}
      <div style={{ color: "#999" }}>
        © 2026 Delta Systems. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;