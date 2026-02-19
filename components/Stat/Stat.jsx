import React from 'react';
import PropTypes from 'prop-types';
import './Stat.css';

/**
 * Stat Component - Display statistics and metrics
 *
 * Features:
 * - Clear display of label and value
 * - Support for trend indicators (up/down)
 * - Multiple size variants
 * - Helper text for context
 * - Accessible with proper semantic markup
 *
 * @example
 * // Basic stat
 * <Stat label="Total Users" value="12,345" />
 *
 * // With trend
 * <Stat label="Revenue" value="$45.2K" trend="up" trendValue="12%" />
 *
 * // With helper text
 * <Stat
 *   label="Active Sessions"
 *   value="1,234"
 *   helperText="In the last 24 hours"
 * />
 *
 * // Large size
 * <Stat size="lg" label="Total Revenue" value="$1.2M" />
 *
 * // In a group
 * <Stat.Group>
 *   <Stat label="Users" value="12K" />
 *   <Stat label="Revenue" value="$45K" />
 *   <Stat label="Growth" value="23%" trend="up" />
 * </Stat.Group>
 */
const Stat = ({
  label,
  value,
  trend,
  trendValue,
  helperText,
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'l100-stat',
    `l100-stat--${size}`,
    trend && `l100-stat--trend-${trend}`,
    className,
  ].filter(Boolean).join(' ');

  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 2L6 10M6 2L2 6M6 2L10 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (trend === 'down') {
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 10L6 2M6 10L2 6M6 10L10 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={classes} {...props}>
      <dt className="l100-stat__label">{label}</dt>
      <dd className="l100-stat__value-wrapper">
        <span className="l100-stat__value">{value}</span>
        {trend && trendValue && (
          <span className="l100-stat__trend">
            <span className="l100-stat__trend-icon">{getTrendIcon()}</span>
            <span className="l100-stat__trend-value">{trendValue}</span>
          </span>
        )}
      </dd>
      {helperText && <span className="l100-stat__helper">{helperText}</span>}
    </div>
  );
};

Stat.propTypes = {
  /** Statistic label */
  label: PropTypes.string.isRequired,
  /** Statistic value */
  value: PropTypes.node.isRequired,
  /** Trend direction */
  trend: PropTypes.oneOf(['up', 'down']),
  /** Trend value text */
  trendValue: PropTypes.string,
  /** Helper text for context */
  helperText: PropTypes.string,
  /** Size of the stat */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Stat Group - Container for multiple stats
 */
Stat.Group = ({ children, columns = 3, className = '', ...props }) => {
  const classes = [
    'l100-stat__group',
    className,
  ].filter(Boolean).join(' ');

  const style = {
    '--stat-columns': columns,
  };

  return (
    <dl className={classes} style={style} {...props}>
      {children}
    </dl>
  );
};

Stat.Group.propTypes = {
  /** Stat elements */
  children: PropTypes.node.isRequired,
  /** Number of columns */
  columns: PropTypes.number,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Stat;
