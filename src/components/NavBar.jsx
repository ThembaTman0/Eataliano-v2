import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { useTheme } from '../context/ThemeContext';
import { BASE_URL } from '../api';
import {
  ForkIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
  ChevronRightIcon,
  CloseIcon,
} from './Icons';

const CUISINES = [
  'Italian', 'Japanese', 'Chinese', 'Mexican',
  'Indian', 'French', 'American', 'Thai',
  'Greek', 'Spanish', 'British', 'Moroccan',
];

/**
 * Site-wide sticky navigation bar.
 */
export function NavBar() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [query, setQuery]         = useState('');
  const [dropOpen, setDropOpen]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const inputRef                   = useRef(null);
  const debouncedQuery             = useDebounce(query, 380);

  const { data: suggestions } = useFetch(
    debouncedQuery.length >= 2
      ? `${BASE_URL}/search.php?s=${encodeURIComponent(debouncedQuery)}`
      : null
  );

  const submitSearch = (q = query) => {
    const term = q.trim();
    if (!term) return;
    navigate(`/search/${encodeURIComponent(term)}`);
    setQuery('');
    setDropOpen(false);
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        height: 'var(--nav-height)',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background var(--transition)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            color: 'var(--accent)',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3rem',
            fontWeight: 700,
            flexShrink: 0,
            transition: 'opacity var(--transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.78')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <ForkIcon />
          Eataliano
        </Link>

        {/* ── Cuisines dropdown ── */}
        <div
          style={{ position: 'relative', flexShrink: 0 }}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text)',
              padding: '6px 12px',
              borderRadius: 'var(--radius)',
              background: menuOpen ? 'var(--accent-light)' : 'transparent',
              transition: 'background var(--transition)',
              cursor: 'pointer',
            }}
          >
            Cuisines
            <span
              style={{
                display: 'flex',
                transform: menuOpen ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              <ChevronRightIcon width={14} height={14} />
            </span>
          </button>

          {menuOpen && (
            <div
              className="scale-in"
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                left: 0,
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 12px 48px var(--shadow)',
                border: '1px solid var(--border)',
                padding: '8px',
                minWidth: 220,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 3,
              }}
            >
              {CUISINES.map((c) => (
                <button
                  key={c}
                  onClick={() => { navigate(`/cuisine/${c}`); setMenuOpen(false); }}
                  style={{
                    textAlign: 'left',
                    padding: '9px 13px',
                    borderRadius: 8,
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    color: 'var(--text)',
                    transition: 'background var(--transition), color var(--transition)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent-light)';
                    e.currentTarget.style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text)';
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Search ── */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--input-bg)',
              border: `1.5px solid ${dropOpen ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 99,
              padding: '8px 18px',
              maxWidth: 500,
              boxShadow: dropOpen ? '0 0 0 3px var(--accent-light)' : 'none',
              transition: 'border-color var(--transition), box-shadow var(--transition)',
            }}
          >
            <span style={{ color: 'var(--text-muted)', display: 'flex', flexShrink: 0 }}>
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setDropOpen(true); }}
              onFocus={() => setDropOpen(true)}
              onBlur={() => setTimeout(() => setDropOpen(false), 180)}
              onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
              placeholder="Search any recipe…"
              aria-label="Search recipes"
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
            {query && (
              <button
                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                style={{ color: 'var(--text-muted)', display: 'flex', cursor: 'pointer' }}
                aria-label="Clear search"
              >
                <CloseIcon width={16} height={16} />
              </button>
            )}
          </div>

          {/* Suggestions dropdown */}
          {dropOpen && suggestions?.meals?.length > 0 && (
            <div
              className="scale-in"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                width: '100%',
                maxWidth: 500,
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 12px 48px var(--shadow)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                zIndex: 300,
              }}
            >
              {suggestions.meals.slice(0, 6).map((m) => (
                <button
                  key={m.idMeal}
                  onMouseDown={() => {
                    navigate(`/recipe/${m.idMeal}`);
                    setDropOpen(false);
                    setQuery('');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: '100%',
                    padding: '10px 16px',
                    textAlign: 'left',
                    transition: 'background var(--transition)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-alt)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <img
                    src={`${m.strMealThumb}/preview`}
                    alt=""
                    style={{ width: 42, height: 42, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'var(--text)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {m.strMeal}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {[m.strCategory, m.strArea].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                </button>
              ))}

              {/* See all */}
              <button
                onMouseDown={() => submitSearch()}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  borderTop: '1px solid var(--border)',
                  transition: 'background var(--transition)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                See all results for "{query}"
              </button>
            </div>
          )}
        </div>

        {/* ── Dark mode toggle ── */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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
            flexShrink: 0,
            transition: 'background var(--transition), border-color var(--transition), color var(--transition)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-light)';
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--surface)';
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text)';
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}
