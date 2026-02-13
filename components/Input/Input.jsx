import React from 'react';
import './Input.css';

/**
 * Input Component
 * 
 * @param {string} type - input type
 * @param {string} label - input label
 * @param {string} error - error message
 * @param {string} size - 'small' | 'medium' | 'large'
 */
export default function Input({
  type = 'text',
  label,
  error,
  size = 'medium',
  className = '',
  ...props
}) {
  const classes = [
    'l100-input',
    `l100-input--${size}`,
    error && 'l100-input--error',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="l100-input-wrapper">
      {label && <label className="l100-input__label">{label}</label>}
      <input
        type={type}
        className={classes}
        {...props}
      />
      {error && <span className="l100-input__error">{error}</span>}
    </div>
  );
}
