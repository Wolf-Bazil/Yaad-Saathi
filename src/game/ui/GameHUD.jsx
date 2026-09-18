import React from 'react';

export default function GameHUD({ loopNumber, hasAmmo, crosshairState }) {
  // crosshairState: 'default' | 'over_npc' | 'over_anomaly' | 'no_ammo'
  const crosshairColor =
    crosshairState === 'over_npc' || crosshairState === 'over_anomaly'
      ? '#ff3333'
      : crosshairState === 'no_ammo'
      ? '#555'
      : '#cccccc';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        fontFamily: '"Courier New", Courier, monospace',
      }}
    >
      {/* Loop counter — top left */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          fontSize: '1.1rem',
          color: '#888',
          letterSpacing: '0.2em',
          textShadow: '0 0 10px rgba(136,136,136,0.3)',
        }}
      >
        LOOP{' '}
        <span style={{ color: '#e8e4d4', fontSize: '1.4rem' }}>
          {String(loopNumber).padStart(2, '0')}
        </span>
      </div>

      {/* Bullet indicator — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8em',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: '#666', letterSpacing: '0.15em' }}>
          AMMO
        </span>
        {/* Bullet SVG */}
        <svg
          width="12"
          height="32"
          viewBox="0 0 12 32"
          style={{ filter: hasAmmo ? 'drop-shadow(0 0 4px rgba(232,228,212,0.4))' : 'none' }}
        >
          {/* Bullet casing */}
          <rect
            x="1"
            y="12"
            width="10"
            height="20"
            rx="1"
            fill={hasAmmo ? '#b8944c' : 'transparent'}
            stroke={hasAmmo ? '#b8944c' : '#444'}
            strokeWidth="1"
          />
          {/* Bullet tip */}
          <path
            d="M 2 12 L 6 0 L 10 12 Z"
            fill={hasAmmo ? '#d4a853' : 'transparent'}
            stroke={hasAmmo ? '#d4a853' : '#444'}
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Crosshair — center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Horizontal line */}
        <div
          style={{
            position: 'absolute',
            width: '20px',
            height: '2px',
            backgroundColor: crosshairColor,
            left: '-10px',
            top: '-1px',
            opacity: 0.8,
            transition: 'background-color 0.15s ease',
          }}
        />
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            width: '2px',
            height: '20px',
            backgroundColor: crosshairColor,
            left: '-1px',
            top: '-10px',
            opacity: 0.8,
            transition: 'background-color 0.15s ease',
          }}
        />
        {/* No ammo X indicator */}
        {crosshairState === 'no_ammo' && (
          <span
            style={{
              position: 'absolute',
              left: '14px',
              top: '-8px',
              fontSize: '0.6rem',
              color: '#553333',
            }}
          >
            ✕
          </span>
        )}
      </div>
    </div>
  );
}
