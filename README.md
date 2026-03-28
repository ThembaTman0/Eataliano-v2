# 🍽️ Eataliano v2

> A modern recipe discovery app — explore thousands of dishes from every cuisine on earth.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-FF0055?style=flat-square&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-6-DB7093?style=flat-square&logo=styledcomponents&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📸 Preview

<!-- Replace with your own screenshot or Vercel/Netlify preview URL -->
> Live demo: [eataliano.vercel.app](https://eataliano.vercel.app) &nbsp;·&nbsp; [Screenshots](#)

---

## ✨ Features

- 🔍 **Live search** with debounced autocomplete and meal thumbnails in the dropdown
- 🌍 **Browse by cuisine** — Italian, Japanese, Mexican, Indian, French, Thai, and more
- 🃏 **Horizontal carousels** — Popular Picks, Vegetarian Delights, From the Sea
- 📖 **Full recipe detail** — tabbed ingredients & step-by-step instructions
- ▶️ **YouTube integration** — watch the recipe video directly from the detail page
- 🌙 **Dark / Light mode** — persisted to `localStorage`, respects OS preference
- 💀 **Shimmer skeletons** — smooth loading states on every page
- ⚡ **In-memory TTL cache** — 5-minute response cache to avoid redundant API calls
- 📱 **Responsive** — works across desktop, tablet, and mobile
- 🚫 **No API key required** — powered by the free [TheMealDB](https://www.themealdb.com/) API

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 18 |
| Routing | React Router v6 |
| Animations | Framer Motion 10 |
| Styling | Styled Components v6 + CSS Variables |
| API | [TheMealDB](https://www.themealdb.com/api.php) (free, no key) |
| Icons | Custom inline SVG library |
| Fonts | Playfair Display · DM Sans (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/eataliano.git
cd eataliano

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will be available at `http://localhost:3000`.

> **No `.env` file needed.** TheMealDB is completely free with no API key.

### Build for production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── api/
│   └── index.js              # TheMealDB wrapper + in-memory TTL cache
├── context/
│   └── ThemeContext.jsx       # Dark/light mode — persisted + OS-aware
├── hooks/
│   ├── useFetch.js            # Cancellable data-fetching hook
│   ├── useDebounce.js         # Search input debounce
│   └── useRandomMeals.js      # Parallel random-meal fetcher
├── theme/
│   └── index.js               # Design tokens + applyTheme()
├── components/
│   ├── Icons.jsx              # Inline SVG icon library (no icon fonts)
│   ├── Skeleton.jsx           # Shimmer placeholder components
│   ├── ErrorState.jsx         # Error display with retry
│   ├── RecipeCard.jsx         # Card — hover lift, zoom, badges
│   ├── ScrollSection.jsx      # Horizontal carousel with scroll buttons
│   ├── CuisineGrid.jsx        # 12-cuisine browse grid
│   ├── NavBar.jsx             # Sticky nav + autocomplete search + theme toggle
│   └── Footer.jsx             # Footer with links and attribution
├── pages/
│   ├── Home.jsx               # Hero + carousels + cuisine grid
│   ├── Cuisine.jsx            # Cuisine-filtered recipe grid
│   ├── Search.jsx             # Search results + empty state
│   └── Recipe.jsx             # Full detail — tabs, ingredients, instructions
├── App.jsx                    # Root — ThemeProvider + Router + lazy pages + 404
├── index.js                   # React 18 createRoot entry
└── index.css                  # Global reset, CSS variables, keyframes
```

---

## 🔄 v1 → v2 Changelog

| Area | Change |
|---|---|
| **React** | 17 + `ReactDOM.render` → **18 + `createRoot`** |
| **API** | Key-gated Spoonacular → **free TheMealDB** (no `.env` needed) |
| **Caching** | Stale `localStorage` with no expiry → **in-memory TTL cache (5 min)** |
| **Routing** | Added lazy-loaded pages, animated transitions, and a **404 route** |
| **Dark mode** | None → **full light/dark theme** with CSS variables + persistence |
| **Search** | Basic navigate-on-submit → **debounced autocomplete** with suggestion dropdown |
| **Loading states** | Blank screens → **shimmer skeleton** placeholders |
| **Performance** | Synchronous fetches → `Promise.allSettled` **parallel fetches** + `Suspense` |
| **Typography** | Generic system fonts → **Playfair Display + DM Sans** |
| **Code quality** | 3 near-identical carousel components → **1 reusable `ScrollSection`** |
| **Bugs fixed** | "Intructions" typo · deprecated `<center>` tag · `console.log` leaks · broken `href="#"` |

---

## 🌐 Deployment

The easiest way to deploy is [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

**Vercel (recommended)**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm run build
# Drag and drop the /build folder into Netlify's UI
# or use the Netlify CLI
```

---

## 📜 License

MIT © [Themba Ngobeni](https://github.com/ThembaTman0)

---

## 🙏 Acknowledgements

- [TheMealDB](https://www.themealdb.com/) — free recipe API
- [Framer Motion](https://www.framer.com/motion/) — animation library
- [Google Fonts](https://fonts.google.com/) — Playfair Display & DM Sans
