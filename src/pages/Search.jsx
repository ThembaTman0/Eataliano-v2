import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { BASE_URL } from '../api';
import { RecipeCard } from '../components/RecipeCard';
import { SkeletonGrid } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { ChevronRightIcon, SearchIcon } from '../components/Icons';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0,        transition: { duration: 0.2 } },
};

const SUGGESTIONS = ['Pasta', 'Chicken', 'Beef', 'Salad', 'Soup', 'Cake', 'Sushi', 'Curry'];

export default function Search() {
  const { search }               = useParams();
  const navigate                 = useNavigate();
  const query                    = decodeURIComponent(search || '');
  const { data, loading, error } = useFetch(
    query ? `${BASE_URL}/search.php?s=${encodeURIComponent(query)}` : null
  );
  const meals                    = data?.meals;

  const [refinement, setRefinement] = useState('');

  const refine = () => {
    const term = refinement.trim();
    if (term) navigate(`/search/${encodeURIComponent(term)}`);
  };

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
          style={{ fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'color var(--transition)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          Home
        </Link>
        <ChevronRightIcon width={13} height={13} style={{ color: 'var(--text-muted)' }} />
        <span style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500 }}>
          Search
        </span>
      </nav>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom: 40 }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: 'var(--text)',
          }}
        >
          Results for{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>"{query}"</em>
        </h1>
        {!loading && meals && (
          <p style={{ color: 'var(--text-muted)', marginTop: 10, fontSize: '0.95rem' }}>
            {meals.length} recipe{meals.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* Inline refine bar */}
      <div
        className="fade-up-d1"
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 44,
          maxWidth: 480,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'var(--input-bg)',
            border: '1.5px solid var(--border)',
            borderRadius: 99,
            padding: '9px 18px',
          }}
        >
          <SearchIcon width={15} height={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            type="search"
            value={refinement}
            onChange={(e) => setRefinement(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && refine()}
            placeholder="Try a different term…"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: 'var(--text)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-sans)',
              minWidth: 0,
            }}
          />
        </div>
        <button
          onClick={refine}
          style={{
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: 99,
            padding: '9px 22px',
            fontWeight: 600,
            fontSize: '0.875rem',
            flexShrink: 0,
            transition: 'background var(--transition)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          Search
        </button>
      </div>

      {/* States */}
      {loading && <SkeletonGrid count={8} />}
      {error   && <ErrorState message={error} />}

      {/* Empty state */}
      {!loading && !error && !meals && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: 16 }}>🔍</span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: 8,
              color: 'var(--text)',
            }}
          >
            No results for "{query}"
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.95rem' }}>
            Try one of these popular searches:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => navigate(`/search/${s}`)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 99,
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all var(--transition)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text)';
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results grid */}
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
