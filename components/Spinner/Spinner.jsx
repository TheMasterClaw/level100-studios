import React from 'react';
import './Spinner.css';

/**
 * Spinner Component
 * 
 * Loading indicator for displaying async operation states.
 * Supports multiple sizes, variants, and can include a label.
 * 
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {string} variant - 'default' | 'primary' | 'success' | 'warning' | 'error' | 'light'
 * @param {string} label - Optional text label to display below the spinner
 * @param {boolean} centered - Center the spinner in its container
 * @param {string} className - Additional CSS classes
 */
export default function Spinner({
  size = 'medium',
  variant = 'default',
  label,
  centered = false,
  className = '',
  ...props
}) {
  const classes = [
    'l100-spinner',
    `l100-spinner--${size}`,
    `l100-spinner--${variant}`,
    centered && 'l100-spinner--centered',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="l100-spinner__ring" role="status" aria-label={label || 'Loading'}>
        <div className="l100-spinner__circle"></div>
        <div className="l100-spinner__circle"></div>
        <div className="l100-spinner__circle"></div>
        <div className="l100-spinner__circle"></div>
      </div>
      {label && <span className="l100-spinner__label">{label}</span>}
    </div>
  );
}
