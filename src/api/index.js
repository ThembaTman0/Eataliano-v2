/**
 * Eataliano API  wraps TheMealDB (free, no key required).
 * Includes an in-memory TTL cache to avoid hammering the endpoint.
 */

export const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/** @type {Map<string, { data: any; ts: number }>} */
const cache = new Map();

/**
 * Core fetcher with caching.
 * @param {string} url
 * @returns {Promise<any>}
 */
export async function apiFetch(url) {
  const now = Date.now();
  const hit = cache.get(url);
  if (hit && now - hit.ts < CACHE_TTL_MS) return hit.data;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: HTTP ${res.status} for ${url}`);

  const data = await res.json();
  cache.set(url, { data, ts: now });
  return data;
}

/**
 * Search recipes by name.
 * @param {string} query
 */
export const searchMeals = (query) =>
  apiFetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);

/**
 * Get a single meal by ID.
 * @param {string|number} id
 */
export const getMealById = (id) => apiFetch(`${BASE_URL}/lookup.php?i=${id}`);

/**
 * Get meals filtered by cuisine (area).
 * @param {string} area  e.g. "Italian"
 */
export const getMealsByCuisine = (area) =>
  apiFetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);

/**
 * Get meals filtered by category.
 * @param {string} category  e.g. "Vegetarian"
 */
export const getMealsByCategory = (category) =>
  apiFetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);

/**
 * Fetch N random meals in parallel (MealDB only returns 1 at a time).
 * Deduplicates by idMeal.
 * @param {number} count
 * @returns {Promise<object[]>}
 */
export async function getRandomMeals(count = 10) {
  const results = await Promise.allSettled(
    Array.from({ length: count }, () => apiFetch(`${BASE_URL}/random.php`)),
  );
  const seen = new Set();
  return results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value?.meals?.[0])
    .filter((m) => m && !seen.has(m.idMeal) && seen.add(m.idMeal));
}

/**
 * Parse ingredient/measure pairs out of a meal object.
 * @param {object} meal
 * @returns {{ ingredient: string; measure: string }[]}
 */
export function parseIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (ingredient) list.push({ ingredient, measure: measure || "" });
  }
  return list;
}

/**
 * Split raw instruction text into clean step strings.
 * @param {string|undefined} raw
 * @returns {string[]}
 */
export function parseInstructions(raw) {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((l) => l.replace(/^\d+\.?\s*/, "").trim())
    .filter(Boolean);
}
