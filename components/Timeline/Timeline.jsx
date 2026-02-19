import React from 'react';
import PropTypes from 'prop-types';
import './Timeline.css';

/**
 * Timeline Component - Display chronological events
 *
 * Features:
 * - Vertical timeline layout
 * - Support for icons, timestamps, and descriptions
 * - Alternating sides layout option
 * - Multiple item types (default, success, warning, error)
 * - Accessible with proper semantic markup
 *
 * @example
 * // Basic timeline
 * <Timeline>
 *   <Timeline.Item
 *     title="Project started"
 *     timestamp="2024-01-15"
 *   />
 *   <Timeline.Item
 *     title="First milestone"
 *     timestamp="2024-02-01"
 *     description="Completed initial setup"
 *   />
 * </Timeline>
 *
 * // With icons and types
 * <Timeline>
 *   <Timeline.Item
 *     title="Deployed"
 *     timestamp="2 hours ago"
 *     type="success"
 *     icon="🚀"
 *   />
 *   <Timeline.Item
 *     title="Build failed"
 *     timestamp="3 hours ago"
 *     type="error"
 *     icon="❌"
 *   />
 * </Timeline>
 */
const Timeline = ({ children, className = '', ...props }) => {
  return (
    <div className={['l100-timeline', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};

Timeline.propTypes = {
  /** Timeline items */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Timeline Item
 */
Timeline.Item = ({
  title,
  description,
  timestamp,
  icon,
  type = 'default',
  className = '',
  ...props
}) => {
  const classes = [
    'l100-timeline__item',
    `l100-timeline__item--${type}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="l100-timeline__marker">
        {icon ? (
          <span className="l100-timeline__icon">{icon}</span>
        ) : (
          <span className="l100-timeline__dot" />
        )}
      </div>
      <div className="l100-timeline__content">
        <div className="l100-timeline__header">
          <span className="l100-timeline__title">{title}</span>
          {timestamp && (
            <time className="l100-timeline__timestamp">{timestamp}</time>
          )}
        </div>
        {description && (
          <p className="l100-timeline__description">{description}</p>
        )}
      </div>
    </div>
  );
};

Timeline.Item.propTypes = {
  /** Item title */
  title: PropTypes.node.isRequired,
  /** Item description */
  description: PropTypes.node,
  /** Timestamp text */
  timestamp: PropTypes.string,
  /** Custom icon */
  icon: PropTypes.node,
  /** Item type affecting marker color */
  type: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Timeline;
