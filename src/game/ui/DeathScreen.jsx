import React, { useState, useEffect } from 'react';

export default function DeathScreen({ loopNumber, onRestart, onQuit }) {
  const [visible, setVisible] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);

  useEffect(() => {
    // Fade in after a brief delay (death animation plays first)
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 80 + Math.random() * 100);
    }, 800 + Math.random() * 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Courier New", Courier, monospace',
        backgroundColor: visible ? 'rgba(30, 5, 5, 0.92)' : 'transparent',
        transition: 'background-color 0.6s ease',
      }}
    >
      {/* Glitch scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,0,0,0.04) 1px, rgba(255,0,0,0.04) 3px)',
          pointerEvents: 'none',
          animation: textGlitch ? 'none' : undefined,
        }}
      />

      {visible && (
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            transform: textGlitch
              ? `translate(${(Math.random() - 0.5) * 6}px, ${(Math.random() - 0.5) * 4}px)`
              : 'none',
            transition: 'transform 0.05s',
          }}
        >
          {/* Main death text */}
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#cc2222',
              letterSpacing: '0.25em',
              marginBottom: '0.3em',
              textShadow: '0 0 30px rgba(200,30,30,0.5), 0 0 60px rgba(200,30,30,0.2)',
              filter: textGlitch ? 'blur(1px)' : 'none',
            }}
          >
            THE ANOMALY GOT YOU
          </h1>

          {/* Loop reached */}
          <p
            style={{
              fontSize: '0.9rem',
              color: '#884444',
              letterSpacing: '0.15em',
              marginBottom: '3em',
            }}
          >
            You reached Loop{' '}
            <span style={{ color: '#cc6666' }}>
              {String(loopNumber).padStart(2, '0')}
            </span>
          </p>

          {/* Divider */}
          <div
            style={{
              width: '120px',
              height: '1px',
              backgroundColor: '#442222',
              margin: '0 auto 2.5em',
            }}
          />

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1.5em', justifyContent: 'center' }}>
            <button
              onClick={onRestart}
              style={{
                background: 'transparent',
                border: '1px solid #663333',
                color: '#cc6666',
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '0.9rem',
                letterSpacing: '0.2em',
                padding: '0.8em 2em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#aa4444';
                e.target.style.color = '#ee6666';
                e.target.style.boxShadow = '0 0 20px rgba(200,50,50,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#663333';
                e.target.style.color = '#cc6666';
                e.target.style.boxShadow = 'none';
              }}
            >
              Try Again
            </button>

            <button
              onClick={onQuit}
              style={{
                background: 'transparent',
                border: '1px solid #333',
                color: '#666',
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '0.9rem',
                letterSpacing: '0.2em',
                padding: '0.8em 2em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#555';
                e.target.style.color = '#999';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#333';
                e.target.style.color = '#666';
              }}
            >
              Quit to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
