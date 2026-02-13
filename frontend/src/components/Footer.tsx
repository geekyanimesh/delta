import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        minHeight: "15vh",
        marginTop: "auto",
        backgroundColor: "#050505", 
        borderTop: "1px solid #27272a", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Changed to 'center' to align the copyright text
        padding: "0 40px",
        boxSizing: "border-box",
        fontSize: "15px",
      }}
    >
      {/* CENTERED: Copyright Text */}
      <div style={{ color: "#71717a", textAlign: "center" }}>
        © 2026 Delta AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;