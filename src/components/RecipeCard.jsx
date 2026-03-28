import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobeIcon } from './Icons';

/**
 * A responsive recipe card with hover lift and image zoom.
 *
 * @param {{
 *   meal: object;
 *   animationDelay?: number;
 * }} props
 */
export function RecipeCard({ meal, animationDelay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="fade-up"
      style={{ animationDelay: `${animationDelay}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/recipe/${meal.idMeal}`} style={{ display: 'block' }}>
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            background: 'var(--surface)',
            boxShadow: hovered
              ? '0 16px 56px var(--shadow)'
              : 'var(--card-shadow)',
            transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
            transition: 'transform var(--transition), box-shadow var(--transition)',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
                transition: 'opacity var(--transition)',
                opacity: hovered ? 1 : 0.85,
              }}
            />

            {/* Category badge */}
            {meal.strCategory && (
              <span
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '3px 10px',
                  borderRadius: 99,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                {meal.strCategory}
              </span>
            )}

            {/* Area tag */}
            {meal.strArea && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  color: 'rgba(255,255,255,0.92)',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                }}
              >
                <GlobeIcon /> {meal.strArea}
              </span>
            )}
          </div>

          {/* Text */}
          <div style={{ padding: '14px 16px 18px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: hovered ? 'var(--accent)' : 'var(--text)',
                lineHeight: 1.45,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                transition: 'color var(--transition)',
              }}
            >
              {meal.strMeal}
            </h3>
          </div>
        </div>
      </Link>
    </article>
  );
}
