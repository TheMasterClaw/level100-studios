import React from 'react';
import { useTheme } from '../ThemeProvider/ThemeProvider.jsx';
import './ThemeToggle.css';

/**
 * ThemeToggle Component
 * 
 * A button that toggles between light and dark themes.
 * 
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {string} variant - 'default' | 'ghost' | 'icon'
 * @param {string} className - Additional CSS classes
 */
export default function ThemeToggle({
  size = 'medium',
  variant = 'default',
  className = '',
  ...props
}) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const classes = [
    'l100-theme-toggle',
    `l100-theme-toggle--${size}`,
    `l100-theme-toggle--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      {...props}
    >
      <span className="l100-theme-toggle__icon" aria-hidden="true">
        {isDark ? (
          // Sun icon for switching to light
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          // Moon icon for switching to dark
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </span>
      {variant !== 'icon' && (
        <span className="l100-theme-toggle__label">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
}
