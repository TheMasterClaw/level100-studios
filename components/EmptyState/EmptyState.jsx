import React from 'react';
import PropTypes from 'prop-types';
import './EmptyState.css';

/**
 * EmptyState Component - Displayed when content is empty
 *
 * Features:
 * - Icon support for visual context
 * - Title and description
 * - Action button support
 * - Multiple sizes
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic empty state
 * <EmptyState
 *   icon="📭"
 *   title="No messages"
 *   description="Your inbox is empty"
 * />
 *
 * // With action
 * <EmptyState
 *   icon="🔍"
 *   title="No results found"
 *   description="Try adjusting your search"
 *   action={{ label: 'Clear search', onClick: handleClear }}
 * />
 *
 * // Compact size
 * <EmptyState
 *   size="sm"
 *   icon="📄"
 *   title="No documents"
 * />
 */
const EmptyState = ({
  icon,
  title,
  description,
  action,
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'l100-empty-state',
    `l100-empty-state--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" {...props}>
      {icon && (
        <div className="l100-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="l100-empty-state__content">
        {title && (
          <h3 className="l100-empty-state__title">{title}</h3>
        )}
        {description && (
          <p className="l100-empty-state__description">{description}</p>
        )}
        {action && (
          <button
            type="button"
            className="l100-empty-state__action"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  /** Icon to display (emoji, SVG, or component) */
  icon: PropTypes.node,
  /** Title text */
  title: PropTypes.string,
  /** Description text */
  description: PropTypes.string,
  /** Action button configuration */
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  /** Size of the empty state */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Pre-built empty states for common scenarios
 */

/** Empty state for search results */
EmptyState.Search = ({ query, onClear, ...props }) => (
  <EmptyState
    icon="🔍"
    title={query ? `No results for "${query}"` : 'No results found'}
    description="Try adjusting your search or filters"
    action={onClear ? { label: 'Clear search', onClick: onClear } : undefined}
    {...props}
  />
);

EmptyState.Search.propTypes = {
  query: PropTypes.string,
  onClear: PropTypes.func,
};

/** Empty state for lists */
EmptyState.List = ({ itemName = 'items', onCreate, ...props }) => (
  <EmptyState
    icon="📋"
    title={`No ${itemName} yet`}
    description={`Get started by creating your first ${itemName.slice(0, -1)}`}
    action={onCreate ? { label: `Create ${itemName.slice(0, -1)}`, onClick: onCreate } : undefined}
    {...props}
  />
);

EmptyState.List.propTypes = {
  itemName: PropTypes.string,
  onCreate: PropTypes.func,
};

/** Empty state for error states */
EmptyState.Error = ({ message, onRetry, ...props }) => (
  <EmptyState
    icon="⚠️"
    title="Something went wrong"
    description={message || 'An error occurred while loading content'}
    action={onRetry ? { label: 'Try again', onClick: onRetry } : undefined}
    {...props}
  />
);

EmptyState.Error.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

/** Empty state for 404/not found */
EmptyState.NotFound = ({ onBack, ...props }) => (
  <EmptyState
    icon="🚫"
    title="Page not found"
    description="The page you're looking for doesn't exist or has been moved"
    action={onBack ? { label: 'Go back', onClick: onBack } : undefined}
    {...props}
  />
);

EmptyState.NotFound.propTypes = {
  onBack: PropTypes.func,
};

export default EmptyState;
