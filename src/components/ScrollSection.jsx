import React, { useRef } from 'react';
import { ChevronRightIcon } from './Icons';
import { RecipeCard } from './RecipeCard';
import { CardSkeleton } from './Skeleton';

/**
 * A titled section with a horizontally scrollable carousel of recipe cards.
 *
 * @param {{
 *   title: string;
 *   meals: object[];
 *   loading: boolean;
 *   error?: string | null;
 * }} props
 */
export function ScrollSection({ title, meals, loading, error }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    rowRef.current?.scrollBy({ left: direction * 280, behavior: 'smooth' });
  };

  return (
    <section style={{ margin: '56px 0' }}>
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h2>

          {/* Scroll Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                aria-label={dir === -1 ? 'Scroll left' : 'Scroll right'}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text)',
                  transform: dir === -1 ? 'rotate(180deg)' : 'none',
                  transition: 'background var(--transition), color var(--transition), border-color var(--transition)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surface)';
                  e.currentTarget.style.color = 'var(--text)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <ChevronRightIcon width={16} height={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Row */}
        <div
          ref={rowRef}
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            paddingBottom: 8,
          }}
        >
          {error && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '40px 0' }}>
              Could not load recipes: {error}
            </p>
          )}

          {loading &&
            Array.from({ length: 7 }).map((_, i) => (
              <div key={i} style={{ minWidth: 240, flex: '0 0 240px' }}>
                <CardSkeleton />
              </div>
            ))}

          {!loading &&
            !error &&
            meals.map((meal, i) => (
              <div key={meal.idMeal} style={{ minWidth: 240, flex: '0 0 240px' }}>
                <RecipeCard meal={meal} animationDelay={i * 0.05} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
