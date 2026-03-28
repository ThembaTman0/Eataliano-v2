import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme, applyTheme } from '../theme';

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem('eataliano-theme');
      if (stored) return stored === 'dark';
    } catch {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    applyTheme(isDark ? darkTheme : lightTheme);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    try { localStorage.setItem('eataliano-theme', isDark ? 'dark' : 'light'); } catch {}
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
