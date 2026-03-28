import { useEffect, useState } from 'react';
import { getRandomMeals, getMealsByCategory } from '../api';

/**
 * Fetch N random meals, or filter by MealDB category if provided.
 *
 * @param {{ count?: number; category?: string }} options
 * @returns {{ meals: object[]; loading: boolean; error: string|null }}
 */
export function useRandomMeals({ count = 10, category } = {}) {
  const [meals,   setMeals]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetch = category
      ? getMealsByCategory(category).then((d) => d?.meals?.slice(0, count) ?? [])
      : getRandomMeals(count);

    fetch
      .then((data) => { if (!cancelled) { setMeals(data); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [count, category]);

  return { meals, loading, error };
}
