/**
 * ThemeProvider Component
 * 
 * Provides theme context for dark/light mode across the application.
 * Automatically detects system preference and persists user choice to localStorage.
 * 
 * @example
 * // In your root component:
 * import { ThemeProvider } from '@level100/studios';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="dark" storageKey="l100-theme">
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // In any child component:
 * import { useTheme } from '@level100/studios';
 * 
 * function MyComponent() {
 *   const { theme, setTheme, toggleTheme } = useTheme();
 *   
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {theme}
 *     </button>
 *   );
 * }
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import './ThemeProvider.css';

// Theme context
const ThemeContext = createContext(null);

/**
 * Hook to access theme context
 * @returns {Object} Theme context value
 * @throws {Error} If used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * ThemeProvider component
 * @param {ReactNode} children - Child components
 * @param {string} defaultTheme - Default theme ('dark' | 'light' | 'system')
 * @param {string} storageKey - localStorage key for persistence
 * @param {boolean} enableSystem - Enable system preference detection
 */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'l100-theme',
  enableSystem = true,
  forcedTheme,
}) {
  // Get initial theme from localStorage or default
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return defaultTheme;
    
    const stored = localStorage.getItem(storageKey);
    if (stored) return stored;
    
    if (enableSystem) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    }
    
    return defaultTheme;
  });

  // Determine the actual theme (resolves 'system' to actual value)
  const resolvedTheme = theme === 'system' 
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  // Update theme
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
  }, [storageKey]);

  // Toggle between dark and light
  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    const actualTheme = forcedTheme || resolvedTheme;
    
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
    root.setAttribute('data-theme', actualTheme);
  }, [resolvedTheme, forcedTheme]);

  // Listen for system preference changes
  useEffect(() => {
    if (!enableSystem || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Just trigger a re-render, the resolvedTheme will update
      setThemeState('system');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystem, theme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    resolvedTheme: forcedTheme || resolvedTheme,
    themes: enableSystem ? ['light', 'dark', 'system'] : ['light', 'dark'],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
