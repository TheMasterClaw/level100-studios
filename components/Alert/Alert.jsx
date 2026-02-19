import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

/**
 * Alert Component - Display important messages and notifications
 *
 * Features:
 * - Multiple severity levels (info, success, warning, error)
 * - Optional title and description
 * - Dismissible alerts
 * - Icon support
 * - Action button support
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic alert
 * <Alert severity="info">This is an informational message</Alert>
 *
 * // With title
 * <Alert severity="success" title="Success!">
 *   Your changes have been saved.
 * </Alert>
 *
 * // Dismissible
 * <Alert severity="warning" onClose={() => handleClose()}>
 *   Please review your settings.
 * </Alert>
 *
 * // With action
 * <Alert
 *   severity="error"
 *   title="Connection failed"
 *   action={{ label: 'Retry', onClick: handleRetry }}
 * >
 *   Unable to connect to the server.
 * </Alert>
 */
const Alert = ({
  children,
  severity = 'info',
  title,
  icon,
  onClose,
  action,
  className = '',
  ...props
}) => {
  const getDefaultIcon = () => {
    switch (severity) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  const classes = [
    'l100-alert',
    `l100-alert--${severity}`,
    onClose && 'l100-alert--dismissible',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="alert"
      aria-live={severity === 'error' ? 'assertive' : 'polite'}
      {...props}
    >
      <div className="l100-alert__icon" aria-hidden="true">
        {icon || getDefaultIcon()}
      </div>
      <div className="l100-alert__content">
        {title && <div className="l100-alert__title">{title}</div>}
        <div className="l100-alert__message">{children}</div>
        {action && (
          <button
            type="button"
            className="l100-alert__action"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
      
      {onClose && (
        <button
          type="button"
          className="l100-alert__close"
          onClick={onClose}
          aria-label="Close alert"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L8 8M8 8L12 12M8 8L12 4M8 8L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  /** Alert content/message */
  children: PropTypes.node.isRequired,
  /** Severity level determining color and icon */
  severity: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  /** Optional alert title */
  title: PropTypes.string,
  /** Custom icon (overrides default) */
  icon: PropTypes.node,
  /** Close handler (shows close button when provided) */
  onClose: PropTypes.func,
  /** Action button configuration */
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Alert Group - Container for multiple alerts
 */
Alert.Group = ({ children, className = '', ...props }) => (
  <div className={['l100-alert__group', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);

Alert.Group.propTypes = {
  /** Alert elements */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Alert;
