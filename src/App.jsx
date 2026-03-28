import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

/* ─── Lazy-loaded pages ──────────────────────────────────────────────────── */
const Home    = lazy(() => import('./pages/Home'));
const Cuisine = lazy(() => import('./pages/Cuisine'));
const Search  = lazy(() => import('./pages/Search'));
const Recipe  = lazy(() => import('./pages/Recipe'));

/* ─── Page loading fallback ──────────────────────────────────────────────── */
function PageFallback() {
  return (
    <div
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '48px 24px',
      }}
    >
      <div className="skeleton" style={{ height: 400, borderRadius: 'var(--radius-xl)', marginBottom: 32 }} />
      <div className="skeleton" style={{ height: 28, width: '55%', marginBottom: 14 }} />
      <div className="skeleton" style={{ height: 16, width: '35%' }} />
    </div>
  );
}

/* ─── Animated route outlet ──────────────────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                element={<Home />} />
        <Route path="/cuisine/:type"   element={<Cuisine />} />
        <Route path="/search/:search"  element={<Search />} />
        <Route path="/recipe/:name"    element={<Recipe />} />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div
              style={{
                textAlign: 'center',
                padding: '100px 24px',
              }}
            >
              <span style={{ fontSize: '4rem', display: 'block', marginBottom: 20 }}>🍽️</span>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: 12,
                  color: 'var(--text)',
                }}
              >
                Page not found
              </h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>
                The page you're looking for doesn't exist.
              </p>
              <a
                href="/"
                style={{
                  display: 'inline-block',
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '12px 28px',
                  borderRadius: 99,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'background var(--transition)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Go home
              </a>
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <NavBar />

          <main style={{ flex: 1 }}>
            <Suspense fallback={<PageFallback />}>
              <AnimatedRoutes />
            </Suspense>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
