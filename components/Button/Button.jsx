import React from 'react';
import './Button.css';

/**
 * Button Component
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'danger' | 'ghost'
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {boolean} disabled
 * @param {function} onClick
 * @param {ReactNode} children
 */
export default function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  className = '',
  ...props
}) {
  const classes = [
    'l100-btn',
    `l100-btn--${variant}`,
    `l100-btn--${size}`,
    disabled && 'l100-btn--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
