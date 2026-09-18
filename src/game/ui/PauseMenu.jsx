import React from 'react';

export default function PauseMenu({ onResume, onRestart, onQuit }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Courier New", Courier, monospace',
        backgroundColor: 'rgba(5, 5, 8, 0.85)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#888',
            letterSpacing: '0.3em',
            marginBottom: '3em',
            textTransform: 'uppercase',
          }}
        >
          Paused
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          {[
            { label: 'Resume', action: onResume, primary: true },
            { label: 'Restart', action: onRestart, primary: false },
            { label: 'Quit to Menu', action: onQuit, primary: false },
          ].map(({ label, action, primary }) => (
            <button
              key={label}
              onClick={action}
              style={{
                background: 'transparent',
                border: `1px solid ${primary ? '#555' : '#333'}`,
                color: primary ? '#e8e4d4' : '#666',
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '0.95rem',
                letterSpacing: '0.2em',
                padding: '0.8em 3em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                minWidth: '220px',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = primary ? '#888' : '#555';
                e.target.style.color = primary ? '#fff' : '#999';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = primary ? '#555' : '#333';
                e.target.style.color = primary ? '#e8e4d4' : '#666';
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
