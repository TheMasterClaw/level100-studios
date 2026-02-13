import React from 'react';
import './Card.css';

/**
 * Card Component
 * 
 * @param {string} variant - 'default' | 'elevated' | 'outlined'
 * @param {ReactNode} children
 * @param {string} className
 */
export default function Card({
  variant = 'default',
  children,
  className = '',
  ...props
}) {
  const classes = [
    'l100-card',
    `l100-card--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

/**
 * Card Header
 */
export function CardHeader({ children, className = '' }) {
  return <div className={`l100-card__header ${className}`}>{children}</div>;
}

/**
 * Card Body
 */
export function CardBody({ children, className = '' }) {
  return <div className={`l100-card__body ${className}`}>{children}</div>;
}

/**
 * Card Footer
 */
export function CardFooter({ children, className = '' }) {
  return <div className={`l100-card__footer ${className}`}>{children}</div>;
}
