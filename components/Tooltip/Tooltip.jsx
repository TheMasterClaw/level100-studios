import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

/**
 * Tooltip Component
 * 
 * Displays informative text when users hover over, focus on, or tap an element.
 * 
 * @param {ReactNode} children - The element that triggers the tooltip
 * @param {string} content - The tooltip text content
 * @param {string} placement - 'top' | 'bottom' | 'left' | 'right'
 * @param {string} variant - 'default' | 'light' | 'dark'
 * @param {number} delay - Delay before showing tooltip (ms)
 * @param {boolean} disabled - Disable the tooltip
 * @param {string} className - Additional CSS classes
 */
export default function Tooltip({
  children,
  content,
  placement = 'top',
  variant = 'default',
  delay = 200,
  disabled = false,
  className = '',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spacing = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - spacing;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + spacing;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - spacing;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + spacing;
        break;
      default:
        break;
    }

    // Viewport boundary checks
    const padding = 8;
    const maxLeft = window.innerWidth - tooltipRect.width - padding;
    const maxTop = window.innerHeight - tooltipRect.height - padding;

    left = Math.max(padding, Math.min(left, maxLeft));
    top = Math.max(padding, Math.min(top, maxTop));

    setPosition({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) calculatePosition();
    };

    const handleResize = () => {
      if (isVisible) calculatePosition();
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isVisible]);

  const showTooltip = () => {
    if (disabled || !content) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const classes = [
    'l100-tooltip',
    `l100-tooltip--${placement}`,
    `l100-tooltip--${variant}`,
    isVisible && 'l100-tooltip--visible',
    className,
  ].filter(Boolean).join(' ');

  return (
    <>
      <span
        ref={triggerRef}
        className="l100-tooltip__trigger"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        {...props}
      >
        {children}
      </span>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={classes}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            zIndex: 9999,
          }}
          role="tooltip"
        >
          <div className="l100-tooltip__content">{content}</div>
          <div className={`l100-tooltip__arrow l100-tooltip__arrow--${placement}`} />
        </div>
      )}
    </>
  );
}
