import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

/**
 * Generic data-fetching hook backed by the shared API cache.
 *
 * @param {string|null} url  Pass null to skip fetching.
 * @returns {{ data: any; loading: boolean; error: string|null }}
 */
export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: !!url, error: null });

  useEffect(() => {
    if (!url) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    apiFetch(url)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message });
      });

    return () => { cancelled = true; };
  }, [url]);

  return state;
}
