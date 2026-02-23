import React from 'react';
import './Container.css';

/**
 * Container Component
 * 
 * Centers content with consistent max-width and padding.
 * 
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * @param {ReactNode} children - Child content
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element to render (default: 'div')
 */
export default function Container({
  size = 'lg',
  children,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const classes = [
    'l100-container',
    `l100-container--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
