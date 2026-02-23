import React, { forwardRef } from 'react';
import './Textarea.css';

/**
 * Textarea Component
 * 
 * Multi-line text input for longer form content.
 * 
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {number} rows - Number of visible rows (default: 4)
 * @param {number} maxLength - Maximum character length
 * @param {boolean} resize - Allow resizing (default: true)
 * @param {React.Ref} ref - Forwarded ref
 */
const Textarea = forwardRef(function Textarea({
  label,
  error,
  size = 'medium',
  rows = 4,
  maxLength,
  resize = true,
  className = '',
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  name,
  id,
  ...props
}, ref) {
  const characterCount = value?.length || defaultValue?.length || 0;
  const hasMaxLength = maxLength !== undefined;
  const isOverLimit = hasMaxLength && characterCount > maxLength;

  const classes = [
    'l100-textarea',
    `l100-textarea--${size}`,
    !resize && 'l100-textarea--no-resize',
    error && 'l100-textarea--error',
    isOverLimit && 'l100-textarea--over-limit',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="l100-textarea-wrapper">
      {label && (
        <label className="l100-textarea__label" htmlFor={id || name}>
          {label}
          {required && <span className="l100-textarea__required">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={id || name}
        name={name}
        rows={rows}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={classes}
        aria-invalid={!!error || isOverLimit}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      <div className="l100-textarea__footer">
        {error && (
          <span className="l100-textarea__error" id={`${name}-error`}>
            {error}
          </span>
        )}
        {hasMaxLength && (
          <span className={`l100-textarea__counter ${isOverLimit ? 'l100-textarea__counter--error' : ''}`}>
            {characterCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
