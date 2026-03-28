import React from 'react';

/**
 * Full-section error display with optional retry callback.
 *
 * @param {{ message?: string; onRetry?: () => void }} props
 */
export function ErrorState({ message, onRetry }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
        gap: 16,
      }}
    >
      <span style={{ fontSize: '3.5rem' }}>⚠️</span>
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--text)',
        }}
      >
        Something went wrong
      </h2>
      {message && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 400 }}>
          {message}
        </p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: 8,
            padding: '10px 28px',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: 99,
            fontWeight: 600,
            fontSize: '0.875rem',
            transition: 'background var(--transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          Try again
        </button>
      )}
    </div>
  );
}
