import React from 'react';
import './Badge.css';

/**
 * Badge Component
 * 
 * Small status indicator for highlighting items, showing counts, or indicating states.
 * 
 * @param {string} variant - 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
 * @param {string} size - 'small' | 'medium'
 * @param {boolean} dot - Show only a dot without text
 * @param {boolean} pill - Use pill-shaped rounded corners
 * @param {ReactNode} children - Badge content (text or number)
 * @param {string} className - Additional CSS classes
 */
export default function Badge({
  variant = 'default',
  size = 'medium',
  dot = false,
  pill = false,
  children,
  className = '',
  ...props
}) {
  const classes = [
    'l100-badge',
    `l100-badge--${variant}`,
    `l100-badge--${size}`,
    dot && 'l100-badge--dot',
    pill && 'l100-badge--pill',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {dot ? <span className="l100-badge__dot" /> : children}
    </span>
  );
}
