import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { BASE_URL, parseIngredients, parseInstructions } from '../api';
import { RecipeDetailSkeleton } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import {
  ChevronRightIcon,
  ChefIcon,
  ClockIcon,
  GlobeIcon,
  YoutubeIcon,
  ArrowUpRightIcon,
} from '../components/Icons';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:    { opacity: 0,        transition: { duration: 0.2 } },
};

/* ─── Tab button ─────────────────────────────────────────────────────────── */
function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 22px',
        borderRadius: 10,
        fontSize: '0.875rem',
        fontWeight: 600,
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? '#fff' : 'var(--text-muted)',
        transition: 'all var(--transition)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = 'var(--text)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = 'var(--text-muted)';
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ─── Ingredient chip ────────────────────────────────────────────────────── */
function IngredientChip({ ingredient, measure }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--surface)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '13px 16px',
        transition: 'border-color var(--transition)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          flexShrink: 0,
        }}
      />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: '0.875rem',
            color: 'var(--text)',
            textTransform: 'capitalize',
          }}
        >
          {ingredient}
        </div>
        {measure && (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
            {measure}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Instruction step ───────────────────────────────────────────────────── */
function InstructionStep({ step, index }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        background: 'var(--surface)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '18px 20px',
        transition: 'border-color var(--transition)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div
        style={{
          minWidth: 34,
          height: 34,
          borderRadius: '50%',
          background: 'var(--accent-light)',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.82rem',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {index + 1}
      </div>
      <p
        style={{
          color: 'var(--text)',
          lineHeight: 1.75,
          fontSize: '0.95rem',
          paddingTop: 5,
        }}
      >
        {step}
      </p>
    </div>
  );
}

/* ─── Recipe Page ─────────────────────────────────────────────────────────── */
export default function Recipe() {
  const { name: id }              = useParams();
  const { data, loading, error }  = useFetch(id ? `${BASE_URL}/lookup.php?i=${id}` : null);
  const [tab, setTab]             = useState('ingredients');
  const meal                      = data?.meals?.[0];

  // Reset tab when navigating between recipes
  useEffect(() => { setTab('ingredients'); }, [id]);

  if (loading) return <RecipeDetailSkeleton />;
  if (error)   return <ErrorState message={error} />;
  if (!meal)   return null;

  const ingredients  = parseIngredients(meal);
  const instructions = parseInstructions(meal.strInstructions);

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        maxWidth: 920,
        margin: '0 auto',
        padding: '48px 24px 96px',
      }}
    >
      {/* Breadcrumb */}
      <nav
        aria-label="breadcrumb"
        style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28 }}
      >
        <Link
          to="/"
          style={{ fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'color var(--transition)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          Home
        </Link>
        <ChevronRightIcon width={13} height={13} style={{ color: 'var(--text-muted)' }} />
        <span
          style={{
            fontSize: '0.85rem',
            color: 'var(--text)',
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: 260,
          }}
        >
          {meal.strMeal}
        </span>
      </nav>

      {/* ── Hero image ── */}
      <div
        className="fade-up"
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          height: 'clamp(260px, 44vw, 500px)',
          marginBottom: 36,
        }}
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
          }}
        />

        {/* Tags row */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: 28,
            right: 28,
          }}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            {meal.strCategory && (
              <span
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 99,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {meal.strCategory}
              </span>
            )}
            {meal.strArea && (
              <span
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 99,
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <GlobeIcon width={12} height={12} /> {meal.strArea}
              </span>
            )}
            {meal.strTags &&
              meal.strTags
                .split(',')
                .slice(0, 3)
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(255,255,255,0.14)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: 99,
                      fontSize: '0.72rem',
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 4vw, 2.6rem)',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            {meal.strMeal}
          </h1>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        className="fade-up-d1"
        style={{
          display: 'inline-flex',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius)',
          padding: 4,
          marginBottom: 32,
          gap: 2,
        }}
      >
        <TabButton
          active={tab === 'ingredients'}
          onClick={() => setTab('ingredients')}
          icon={<ChefIcon />}
          label={`Ingredients (${ingredients.length})`}
        />
        <TabButton
          active={tab === 'instructions'}
          onClick={() => setTab('instructions')}
          icon={<ClockIcon />}
          label={`Instructions (${instructions.length})`}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tab === 'ingredients' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
              gap: 12,
            }}
          >
            {ingredients.map((item, i) => (
              <IngredientChip key={i} {...item} />
            ))}
          </div>
        )}

        {tab === 'instructions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {instructions.length > 0 ? (
              instructions.map((step, i) => (
                <InstructionStep key={i} step={step} index={i} />
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No instructions available for this recipe.
              </p>
            )}
          </div>
        )}
      </motion.div>

      {/* ── YouTube CTA ── */}
      {meal.strYoutube && (
        <div style={{ marginTop: 44 }}>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#ff0000',
              color: '#fff',
              padding: '13px 26px',
              borderRadius: 99,
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'opacity var(--transition), transform 0.15s',
              boxShadow: '0 4px 20px rgba(255,0,0,0.28)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.88';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <YoutubeIcon />
            Watch on YouTube
            <ArrowUpRightIcon />
          </a>
        </div>
      )}

      {/* ── Source link ── */}
      {meal.strSource && (
        <div style={{ marginTop: 16 }}>
          <a
            href={meal.strSource}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              border: '1.5px solid var(--border)',
              padding: '10px 20px',
              borderRadius: 99,
              transition: 'all var(--transition)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            Original recipe source
            <ArrowUpRightIcon />
          </a>
        </div>
      )}
    </motion.main>
  );
}
