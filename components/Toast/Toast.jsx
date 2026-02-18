/**
 * Toast Component
 * 
 * Displays temporary notification messages that auto-dismiss after a timeout.
 * Used for success messages, errors, warnings, and informational alerts.
 * 
 * @param {string} id - Unique toast identifier
 * @param {string} variant - 'success' | 'error' | 'warning' | 'info'
 * @param {string} title - Toast title (optional)
 * @param {string} message - Toast message content
 * @param {number} duration - Auto-dismiss duration in ms (default: 5000)
 * @param {boolean} dismissible - Whether toast can be manually dismissed
 * @param {function} onDismiss - Callback when toast is dismissed
 * @param {function} onPause - Callback when hover pauses timer
 * @param {function} onResume - Callback when mouse leaves
 */
import React, { useEffect, useState, useCallback } from 'react';
import './Toast.css';

const icons = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

export default function Toast({
  id,
  variant = 'info',
  title,
  message,
  duration = 5000,
  dismissible = true,
  onDismiss,
  onPause,
  onResume,
  className = '',
}) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss?.(id);
    }, 300); // Wait for exit animation
  }, [id, onDismiss]);

  useEffect(() => {
    if (duration <= 0 || isPaused) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;
      
      setProgress(newProgress);

      if (now >= endTime) {
        clearInterval(interval);
        handleDismiss();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, isPaused, handleDismiss]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    onPause?.(id);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    onResume?.(id);
  };

  const classes = [
    'l100-toast',
    `l100-toast--${variant}`,
    isExiting && 'l100-toast--exiting',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="l100-toast__icon">
        {icons[variant]}
      </div>
      
      <div className="l100-toast__content">
        {title && <div className="l100-toast__title">{title}</div>}
        <div className="l100-toast__message">{message}</div>
      </div>

      {dismissible && (
        <button
          className="l100-toast__close"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {duration > 0 && (
        <div
          className="l100-toast__progress"
          style={{
            transform: `scaleX(${progress / 100})`,
            transformOrigin: 'left',
            transition: isPaused ? 'none' : 'transform 0.05s linear',
          }}
        />
      )}
    </div>
  );
}
