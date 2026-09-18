import React, { useState, useEffect } from 'react';

const FLICKER_CHARS = '█▓▒░▌▐▀▄';

function GlitchText({ text, className = '' }) {
  const [glitched, setGlitched] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.08) {
        const chars = text.split('');
        const idx = Math.floor(Math.random() * chars.length);
        chars[idx] = FLICKER_CHARS[Math.floor(Math.random() * FLICKER_CHARS.length)];
        setGlitched(chars.join(''));
        setTimeout(() => setGlitched(text), 80 + Math.random() * 120);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{glitched}</span>;
}

export default function StartScreen({ onStart }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      onStart();
    }, 800);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#050508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Courier New", Courier, monospace',
        color: '#e8e4d4',
        transition: 'opacity 0.8s ease',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '0.3em',
            marginBottom: '0.2em',
            textShadow: '0 0 40px rgba(232,228,212,0.3), 0 0 80px rgba(232,228,212,0.1)',
          }}
        >
          <GlitchText text="METRO ANOMALY" />
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
            color: '#888',
            letterSpacing: '0.15em',
            marginBottom: '3em',
            textTransform: 'uppercase',
          }}
        >
          Identify the anomaly. You have one bullet.
        </p>

        {/* Divider */}
        <div
          style={{
            width: '200px',
            height: '1px',
            backgroundColor: '#333',
            margin: '0 auto 2.5em',
          }}
        />

        {/* Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1em 3em',
            fontSize: '0.85rem',
            color: '#666',
            marginBottom: '3em',
            textAlign: 'left',
          }}
        >
          <div>
            <span style={{ color: '#aaa' }}>W A S D</span> — Move
          </div>
          <div>
            <span style={{ color: '#aaa' }}>MOUSE</span> — Look
          </div>
          <div>
            <span style={{ color: '#aaa' }}>LEFT CLICK</span> — Shoot
          </div>
          <div>
            <span style={{ color: '#aaa' }}>ESC</span> — Pause
          </div>
        </div>

        {/* Warning text */}
        <p
          style={{
            fontSize: '0.75rem',
            color: '#553333',
            marginBottom: '2em',
            letterSpacing: '0.1em',
          }}
        >
          ⚠ ONE OF THEM IS NOT HUMAN ⚠
        </p>

        {/* Start button */}
        <button
          onClick={handleStart}
          style={{
            background: 'transparent',
            border: '1px solid #444',
            color: '#e8e4d4',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '1.1rem',
            letterSpacing: '0.25em',
            padding: '1em 3em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#888';
            e.target.style.color = '#fff';
            e.target.style.boxShadow = '0 0 30px rgba(232,228,212,0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#444';
            e.target.style.color = '#e8e4d4';
            e.target.style.boxShadow = 'none';
          }}
        >
          Enter the Metro
        </button>

        {/* Version tag */}
        <p
          style={{
            fontSize: '0.65rem',
            color: '#333',
            marginTop: '3em',
            letterSpacing: '0.1em',
          }}
        >
          DEMO v0.1 — DESKTOP ONLY
        </p>
      </div>
    </div>
  );
}
