import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { BASE_URL } from '../api';
import { RecipeCard } from '../components/RecipeCard';
import { SkeletonGrid } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { ChevronRightIcon } from '../components/Icons';

const CUISINE_EMOJIS = {
  Italian: '🍝', Japanese: '🍣', Chinese: '🥡', Mexican: '🌮',
  Indian: '🍛', French: '🥐', American: '🍔', Thai: '🍜',
  Greek: '🫒', Spanish: '🥘', British: '🫖', Moroccan: '🫙',
};

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0,        transition: { duration: 0.2 } },
};

export default function Cuisine() {
  const { type }                  = useParams();
  const { data, loading, error }  = useFetch(`${BASE_URL}/filter.php?a=${type}`);
  const meals                     = data?.meals;

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '48px 24px 80px',
      }}
    >
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
        <Link
          to="/"
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            transition: 'color var(--transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          Home
        </Link>
        <ChevronRightIcon width={13} height={13} style={{ color: 'var(--text-muted)' }} />
        <span style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500 }}>
          {type}
        </span>
      </nav>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom: 44 }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            color: 'var(--text)',
            lineHeight: 1.1,
          }}
        >
          {CUISINE_EMOJIS[type] || '🍽️'}{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{type}</em>{' '}
          Cuisine
        </h1>

        {!loading && meals && (
          <p style={{ color: 'var(--text-muted)', marginTop: 10, fontSize: '0.95rem' }}>
            {meals.length} recipes found
          </p>
        )}
      </div>

      {/* States */}
      {loading && <SkeletonGrid count={8} />}

      {error && <ErrorState message={error} />}

      {!loading && !error && !meals && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: 16 }}>🍽️</span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            No recipes found for "{type}"
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Try browsing a different cuisine.</p>
        </div>
      )}

      {/* Grid */}
      {meals && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {meals.map((meal, i) => (
            <RecipeCard key={meal.idMeal} meal={meal} animationDelay={Math.min(i * 0.04, 0.5)} />
          ))}
        </div>
      )}
    </motion.main>
  );
}
