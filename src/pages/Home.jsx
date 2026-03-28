import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollSection } from "../components/ScrollSection";
import { CuisineGrid } from "../components/CuisineGrid";
import { useRandomMeals } from "../hooks/useRandomMeals";
import { SearchIcon, StarIcon } from "../components/Icons";

/* ─── Page animation ─────────────────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/* ─── Hero ───────────────────────────────────────────────────────────────── */
const QUICK_TAGS = [
  "Pasta",
  "Sushi",
  "Tacos",
  "Curry",
  "Burger",
  "Ramen",
  "Pizza",
  "Dumplings",
];

function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    const term = query.trim();
    if (term) {
      navigate(`/search/${encodeURIComponent(term)}`);
      setQuery("");
    }
  };

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(60px, 10vw, 110px) 24px clamp(60px, 8vw, 90px)",
        background:
          "linear-gradient(145deg, var(--surface-alt) 0%, var(--bg) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -100,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "var(--accent)",
          opacity: 0.055,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: "28%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "var(--accent)",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 700 }}>
          {/* Pill */}
          <div
            className="fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "var(--accent-light)",
              color: "var(--accent)",
              padding: "6px 16px",
              borderRadius: 99,
              marginBottom: 26,
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            <StarIcon /> Your Recipe Companion
          </div>

          {/* Headline */}
          <h1
            className="fade-up-d1"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)",
              fontWeight: 900,
              lineHeight: 1.07,
              letterSpacing: "-0.025em",
              color: "var(--text)",
              marginBottom: 22,
            }}
          >
            Discover{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              Extraordinary
            </em>
            <br />
            Recipes Daily
          </h1>

          {/* Sub-headline */}
          <p
            className="fade-up-d2"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
              color: "var(--text-muted)",
              lineHeight: 1.75,
              maxWidth: 520,
              marginBottom: 36,
            }}
          >
            Explore thousands of curated recipes from every corner of the globe
            from quick weeknight dinners to lavish weekend feasts.
          </p>

          {/* Search bar */}
          <div
            className="fade-up-d3"
            style={{
              display: "flex",
              background: "var(--surface)",
              borderRadius: 99,
              padding: "7px 7px 7px 22px",
              boxShadow: "0 8px 40px var(--shadow)",
              maxWidth: 540,
              border: "1.5px solid var(--border)",
              marginBottom: 22,
            }}
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Try 'Chicken Tikka Masala'…"
              aria-label="Search recipes"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "var(--text)",
                fontSize: "0.95rem",
                fontFamily: "var(--font-sans)",
                minWidth: 0,
              }}
            />
            <button
              onClick={submit}
              style={{
                background: "var(--accent)",
                color: "#fff",
                borderRadius: 99,
                padding: "12px 26px",
                fontSize: "0.9rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
                transition: "background var(--transition), transform 0.1s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--accent)")
              }
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.96)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <SearchIcon width={16} height={16} />
              Search
            </button>
          </div>

          {/* Quick tags */}
          <div
            className="fade-up-d4"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              Popular:
            </span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/search/${tag}`)}
                style={{
                  padding: "5px 14px",
                  borderRadius: 99,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  border: "1.5px solid var(--border)",
                  color: "var(--text-muted)",
                  background: "var(--surface)",
                  transition: "all var(--transition)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.background = "var(--accent-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Home Page ──────────────────────────────────────────────────────────── */
export default function Home() {
  const popular = useRandomMeals({ count: 12 });
  const vegetarian = useRandomMeals({ count: 10, category: "Vegetarian" });
  const seafood = useRandomMeals({ count: 10, category: "Seafood" });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />

      <ScrollSection
        title="✨ Popular Picks"
        meals={popular.meals}
        loading={popular.loading}
        error={popular.error}
      />

      <CuisineGrid />

      <ScrollSection
        title="🥗 Vegetarian Delights"
        meals={vegetarian.meals}
        loading={vegetarian.loading}
        error={vegetarian.error}
      />

      <ScrollSection
        title="🐟 From the Sea"
        meals={seafood.meals}
        loading={seafood.loading}
        error={seafood.error}
      />
    </motion.div>
  );
}
