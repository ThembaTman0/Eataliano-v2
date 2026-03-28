import React from 'react';
import { Link } from 'react-router-dom';

const CUISINES = [
  { name: 'Italian',   emoji: '🍝', accent: '#c0392b' },
  { name: 'Japanese',  emoji: '🍣', accent: '#2c3e50' },
  { name: 'Mexican',   emoji: '🌮', accent: '#d35400' },
  { name: 'Indian',    emoji: '🍛', accent: '#8e44ad' },
  { name: 'Chinese',   emoji: '🥡', accent: '#e74c3c' },
  { name: 'French',    emoji: '🥐', accent: '#2980b9' },
  { name: 'Thai',      emoji: '🍜', accent: '#27ae60' },
  { name: 'American',  emoji: '🍔', accent: '#f39c12' },
  { name: 'Greek',     emoji: '🫒', accent: '#16a085' },
  { name: 'Spanish',   emoji: '🥘', accent: '#c0392b' },
  { name: 'British',   emoji: '🫖', accent: '#2c3e50' },
  { name: 'Moroccan',  emoji: '🫙', accent: '#e67e22' },
];

/**
 * Grid of cuisine buttons, each linking to /cuisine/:name.
 */
export function CuisineGrid() {
  return (
    <section
      style={{
        background: 'var(--surface-alt)',
        padding: '60px 0',
        margin: '40px 0',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <h2
          className="fade-up"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 8,
            letterSpacing: '-0.01em',
          }}
        >
          Browse by Cuisine
        </h2>
        <p
          className="fade-up-d1"
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            marginBottom: 32,
          }}
        >
          Explore flavours from every corner of the world
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 14,
          }}
        >
          {CUISINES.map((c, i) => (
            <CuisineButton key={c.name} cuisine={c} delay={i * 0.04} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CuisineButton({ cuisine, delay }) {
  return (
    <Link
      to={`/cuisine/${cuisine.name}`}
      className="fade-up"
      style={{ animationDelay: `${delay}s`, textDecoration: 'none' }}
    >
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '26px 14px',
          textAlign: 'center',
          border: '1.5px solid var(--border)',
          cursor: 'pointer',
          transition: 'border-color var(--transition), transform var(--transition), box-shadow var(--transition)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = cuisine.accent;
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.13)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span style={{ fontSize: '2rem', display: 'block', marginBottom: 10 }}>
          {cuisine.emoji}
        </span>
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--text)',
            letterSpacing: '0.01em',
          }}
        >
          {cuisine.name}
        </span>
      </div>
    </Link>
  );
}
