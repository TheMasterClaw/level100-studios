/**
 * ToastContainer Component
 * 
 * Manages the display and positioning of multiple toast notifications.
 * Handles toast stacking, positioning, and lifecycle management.
 * 
 * @param {string} position - 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
 * @param {number} maxToasts - Maximum number of toasts to show at once (default: 5)
 * @param {Array} toasts - Array of toast objects to display
 * @param {function} onDismiss - Callback when a toast is dismissed
 * @param {function} onPause - Callback when a toast timer is paused
 * @param {function} onResume - Callback when a toast timer resumes
 */
import React from 'react';
import Toast from './Toast';
import './ToastContainer.css';

export default function ToastContainer({
  position = 'top-right',
  maxToasts = 5,
  toasts = [],
  onDismiss,
  onPause,
  onResume,
  className = '',
}) {
  // Limit visible toasts
  const visibleToasts = toasts.slice(0, maxToasts);

  const classes = [
    'l100-toast-container',
    `l100-toast-container--${position}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} aria-live="polite" aria-atomic="true">
      {visibleToasts.map((toast, index) => (
        <div
          key={toast.id}
          className="l100-toast-container__item"
          style={{
            '--toast-index': index,
          }}
        >
          <Toast
            {...toast}
            onDismiss={onDismiss}
            onPause={onPause}
            onResume={onResume}
          />
        </div>
      ))}
    </div>
  );
}
