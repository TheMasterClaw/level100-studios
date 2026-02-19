import React from 'react';
import PropTypes from 'prop-types';
import './Chip.css';

/**
 * Chip Component - Compact labels, tags, or filter elements
 *
 * Features:
 * - Multiple visual variants (filled, outlined, ghost)
 * - Multiple sizes (sm, md, lg)
 * - Support for icons (leading and trailing)
 * - Optional remove button
 * - Click interactions
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic chip
 * <Chip>Label</Chip>
 *
 * // With icon
 * <Chip icon="🏷️">Category</Chip>
 *
 * // Removable chip
 * <Chip onRemove={() => handleRemove()}>Filter</Chip>
 *
 * // Clickable chip
 * <Chip onClick={() => handleClick()} clickable>Selectable</Chip>
 *
 * // Color variants
 * <Chip variant="primary">Primary</Chip>
 * <Chip variant="success">Success</Chip>
 * <Chip variant="error">Error</Chip>
 */
const Chip = ({
  children,
  icon,
  trailingIcon,
  variant = 'filled',
  color = 'default',
  size = 'md',
  clickable = false,
  onClick,
  onRemove,
  disabled = false,
  className = '',
  ...props
}) => {
  const classes = [
    'l100-chip',
    `l100-chip--${variant}`,
    `l100-chip--${color}`,
    `l100-chip--${size}`,
    (clickable || onClick) && 'l100-chip--clickable',
    onRemove && 'l100-chip--removable',
    disabled && 'l100-chip--disabled',
    className,
  ].filter(Boolean).join(' ');

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove?.();
  };

  const content = (
    <>
      {icon && <span className="l100-chip__icon">{icon}</span>}
      <span className="l100-chip__label">{children}</span>
      {trailingIcon && !onRemove && (
        <span className="l100-chip__trailing-icon">{trailingIcon}</span>
      )}
      {onRemove && (
        <button
          type="button"
          className="l100-chip__remove"
          onClick={handleRemove}
          aria-label={`Remove ${children}`}
          disabled={disabled}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L6 6M6 6L10 10M6 6L10 2M6 6L2 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );

  if (onClick || clickable) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={classes} {...props}>
      {content}
    </span>
  );
};

Chip.propTypes = {
  /** Chip label content */
  children: PropTypes.node.isRequired,
  /** Leading icon */
  icon: PropTypes.node,
  /** Trailing icon (not shown if onRemove is provided) */
  trailingIcon: PropTypes.node,
  /** Visual style variant */
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  /** Color scheme */
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error']),
  /** Size of the chip */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether the chip is clickable */
  clickable: PropTypes.bool,
  /** Click handler (makes chip clickable) */
  onClick: PropTypes.func,
  /** Remove handler (shows remove button) */
  onRemove: PropTypes.func,
  /** Whether the chip is disabled */
  disabled: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Chip Group - Container for multiple chips
 */
Chip.Group = ({ children, className = '', ...props }) => {
  return (
    <div className={['l100-chip__group', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};

Chip.Group.propTypes = {
  /** Chip elements */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Chip;
