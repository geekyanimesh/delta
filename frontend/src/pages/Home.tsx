import React from 'react';
import TypingAnim from "../components/typer/TypingAnim";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div 
      style={{
        width: '100%',
        height: 'calc(100vh - 70px)', // Subtract Header height to avoid scrollbar
        backgroundColor: '#ffffff',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        overflow: 'hidden',
        // REMOVED: position: absolute, top: 0, zIndex: 9999 (These were hiding the header)
      }}
    >
      
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* Main Content */}
      <div style={{ zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <img 
            src="detlaLogo.png" 
            alt="Delta" 
            style={{ 
              width: '200px', 
              filter: 'invert(1)', 
              display: 'block'
            }} 
          />
        </div>

        <div style={{ 
          fontSize: '30px', 
          fontWeight: 600, 
          marginBottom: '20px',
          minHeight: '60px', 
          color: '#333'      
        }}>
          <TypingAnim />
        </div>

        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          maxWidth: '600px', 
          lineHeight: '1.6',
          marginBottom: '50px' 
        }}>
          Experience the power of intelligent conversations. <br/>
          Built for speed, precision, and simplicity.
        </p>

        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/chat">
            <button style={{
              padding: '14px 40px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)'
            }}>
              Get Started
            </button>
          </Link>
          
          <button style={{
            padding: '14px 40px',
            backgroundColor: '#fff',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Learn More
          </button>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '30px', color: '#999', fontSize: '14px' }}>
        © 2026 Delta Systems
      </div>
    </div>
  )
}

export default Home;