# 🍽️ Eataliano v2

A modern React recipe discovery app powered by [TheMealDB](https://www.themealdb.com/) no API key required.

---

## Getting started

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Build for production
npm run build
```

---

## Project structure

```
src/
├── api/
│   └── index.js          # TheMealDB wrapper + in-memory TTL cache
├── context/
│   └── ThemeContext.jsx   # Persisted dark/light mode context
├── hooks/
│   ├── useFetch.js        # Generic cancellable data-fetching hook
│   ├── useDebounce.js     # Debounce hook for search input
│   └── useRandomMeals.js  # Parallel random-meal fetcher
├── theme/
│   └── index.js           # Design tokens + applyTheme()
├── components/
│   ├── Icons.jsx           # Inline SVG icon library
│   ├── Skeleton.jsx        # Shimmer placeholder components
│   ├── ErrorState.jsx      # Full-section error display
│   ├── RecipeCard.jsx      # Recipe card with hover effects
│   ├── ScrollSection.jsx   # Horizontal carousel section
│   ├── CuisineGrid.jsx     # Cuisine browse grid
│   ├── NavBar.jsx          # Sticky nav with search + dark mode
│   └── Footer.jsx          # Site footer
├── pages/
│   ├── Home.jsx            # Hero + three carousel sections
│   ├── Cuisine.jsx         # Cuisine filtered grid
│   ├── Search.jsx          # Search results grid
│   └── Recipe.jsx          # Full recipe detail page
├── App.jsx                 # Router + ThemeProvider + lazy pages
├── index.js                # React 18 createRoot entry
└── index.css               # Global reset, CSS variables, keyframes
```

---

## What's new in v2

| Area            | Change                                                                       |
| --------------- | ---------------------------------------------------------------------------- |
| **React**       | Upgraded from React 17 + `ReactDOM.render` → React 18 + `createRoot`         |
| **API**         | Switched from key-gated Spoonacular → free TheMealDB. No `.env` needed.      |
| **Caching**     | Replaced stale `localStorage` hacks with an in-memory TTL cache (5 min)      |
| **Routing**     | Added lazy-loaded pages, `AnimatePresence` page transitions, and a 404 route |
| **Dark mode**   | Full light/dark theme with CSS variables, persisted to `localStorage`        |
| **Search**      | Debounced autocomplete with thumbnails in a suggestions dropdown             |
| **UI**          | Playfair Display + DM Sans typography, shimmer skeletons, hover effects      |
| **Performance** | `loading="lazy"` images, `Promise.allSettled` parallel fetches, `Suspense`   |
| **Bugs**        | Fixed: "Intructions" typo, `<center>` tag, `console.log` leaks, `href="#"`   |
| **Code**        | 3 near-identical carousel components → 1 `ScrollSection` component           |

---

## API

TheMealDB is completely free with no rate limits for reasonable use.
Docs: https://www.themealdb.com/api.php
