import React from 'react';

/**
 * A single skeleton placeholder for a recipe card.
 */
export function CardSkeleton() {
  return (
    <div
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--surface)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div className="skeleton" style={{ height: 220 }} />
      <div style={{ padding: '14px 16px 20px' }}>
        <div className="skeleton" style={{ height: 14, width: '80%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 12, width: '50%' }} />
      </div>
    </div>
  );
}

/**
 * A row of N skeleton cards in a CSS grid.
 */
export function SkeletonGrid({ count = 8 }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 24,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton for the recipe detail page.
 */
export function RecipeDetailSkeleton() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div className="skeleton" style={{ height: 420, borderRadius: 'var(--radius-lg)', marginBottom: 36 }} />
      <div className="skeleton" style={{ height: 32, width: '55%', marginBottom: 14 }} />
      <div className="skeleton" style={{ height: 16, width: '30%', marginBottom: 36 }} />
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        <div className="skeleton" style={{ height: 44, width: 160, borderRadius: 99 }} />
        <div className="skeleton" style={{ height: 44, width: 160, borderRadius: 99 }} />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 14, width: `${70 + (i % 3) * 10}%`, marginBottom: 12 }} />
      ))}
    </div>
  );
}
