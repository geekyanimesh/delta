import React from 'react';
import TypingAnim from "../components/typer/TypingAnim";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div 
      style={{
        width: '100%',
        height: 'calc(100vh - 70px)', // Height minus header
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        position: 'relative', // Necessary for absolute footer positioning
      }}
    >
      {/* Center Content Section */}
      <div style={{ 
        transform: 'scale(0.85)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <div style={{ 
          fontSize: '3.5rem', 
          fontWeight: 700, 
          marginBottom: '20px',
          minHeight: '80px', 
          color: '#000000', 
        }}>
          <TypingAnim />
        </div>

        <p style={{ 
          fontSize: '1.25rem', 
          color: '#333333', 
          lineHeight: '1.6',
          marginBottom: '50px',
        }}>
          Your intelligent companion for the future. <br/>
          Built for speed, precision, and simplicity.
        </p>

        <Link to="/chat">
          <button style={{
            padding: '16px 50px',
            backgroundColor: '#000000',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50px',
            fontSize: '18px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          }}>
            Get Started
          </button>
        </Link>
      </div>

      {/* --- REFINED FOOTER --- */}
      <footer style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        borderTop: '1px solid #f0f0f0' // Very subtle line
      }}>
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#666' }}>
          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
          <Link to="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</Link>
          <Link to="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms</Link>
          <a href="mailto:support@delta.ai" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</a>
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#999', fontWeight: 400 }}>
          © 2026 Delta Systems. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Home;