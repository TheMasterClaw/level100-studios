import React from 'react';
import PropTypes from 'prop-types';
import './Skeleton.css';

/**
 * Skeleton Component - Loading placeholder for content
 *
 * Features:
 * - Multiple variants for different content types (text, circle, rectangle, card)
 * - Configurable dimensions (width, height)
 * - Animated pulse effect for loading indication
 * - Composable for complex layouts (Skeleton.Text, Skeleton.Circle, etc.)
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic text skeleton
 * <Skeleton />
 *
 * // Circle skeleton (for avatars)
 * <Skeleton variant="circle" width={40} height={40} />
 *
 * // Card skeleton with multiple lines
 * <Skeleton.Card>
 *   <Skeleton variant="circle" width={40} height={40} />
 *   <div>
 *     <Skeleton width="60%" />
 *     <Skeleton width="40%" />
 *   </div>
 * </Skeleton.Card>
 *
 * // Article skeleton layout
 * <Skeleton.Article />
 */
const Skeleton = React.forwardRef(({
  variant = 'text',
  width,
  height,
  animated = true,
  className = '',
  style = {},
  ...props
}, ref) => {
  const classes = [
    'l100-skeleton',
    `l100-skeleton--${variant}`,
    animated && 'l100-skeleton--animated',
    className,
  ].filter(Boolean).join(' ');

  const customStyle = {
    width: width,
    height: height,
    ...style,
  };

  return (
    <span
      ref={ref}
      className={classes}
      style={customStyle}
      role="status"
      aria-label="Loading..."
      aria-busy="true"
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';

Skeleton.propTypes = {
  /** Visual variant of the skeleton */
  variant: PropTypes.oneOf(['text', 'circle', 'rectangle', 'card']),
  /** Width (CSS value: px, %, rem, etc.) */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Height (CSS value: px, %, rem, etc.) */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Enable pulse animation */
  animated: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Custom inline styles */
  style: PropTypes.object,
};

/**
 * Circle variant - Perfect for avatars and profile images
 */
Skeleton.Circle = React.forwardRef(({ size = 40, ...props }, ref) => (
  <Skeleton
    ref={ref}
    variant="circle"
    width={size}
    height={size}
    {...props}
  />
));
Skeleton.Circle.displayName = 'Skeleton.Circle';
Skeleton.Circle.propTypes = {
  size: PropTypes.number,
};

/**
 * Text variant - For lines of text
 */
Skeleton.Text = React.forwardRef(({ lines = 1, lastLineWidth = '80%', ...props }, ref) => {
  if (lines === 1) {
    return <Skeleton ref={ref} variant="text" {...props} />;
  }

  return (
    <div className="l100-skeleton__text-group" ref={ref}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? lastLineWidth : '100%'}
          {...props}
        />
      ))}
    </div>
  );
});
Skeleton.Text.displayName = 'Skeleton.Text';
Skeleton.Text.propTypes = {
  lines: PropTypes.number,
  lastLineWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

/**
 * Card variant - For card-like containers
 */
Skeleton.Card = React.forwardRef(({ children, ...props }, ref) => (
  <div ref={ref} className="l100-skeleton__card">
    <Skeleton variant="card" {...props}>
      {children}
    </Skeleton>
  </div>
));
Skeleton.Card.displayName = 'Skeleton.Card';
Skeleton.Card.propTypes = {
  children: PropTypes.node,
};

/**
 * Pre-built article layout skeleton
 */
Skeleton.Article = React.forwardRef(({ hasImage = true, textLines = 4, ...props }, ref) => (
  <div ref={ref} className="l100-skeleton__article" {...props}>
    {hasImage && (
      <Skeleton
        variant="rectangle"
        width="100%"
        height={200}
        style={{ marginBottom: '1rem' }}
      />
    )}
    <Skeleton.Text lines={textLines} />
  </div>
));
Skeleton.Article.displayName = 'Skeleton.Article';
Skeleton.Article.propTypes = {
  hasImage: PropTypes.bool,
  textLines: PropTypes.number,
};

/**
 * Pre-built list item skeleton
 */
Skeleton.ListItem = React.forwardRef(({ showAvatar = true, lines = 2, ...props }, ref) => (
  <div ref={ref} className="l100-skeleton__list-item" {...props}>
    {showAvatar && (
      <Skeleton.Circle size={40} style={{ marginRight: '0.75rem' }} />
    )}
    <div style={{ flex: 1 }}>
      <Skeleton.Text lines={lines} />
    </div>
  </div>
));
Skeleton.ListItem.displayName = 'Skeleton.ListItem';
Skeleton.ListItem.propTypes = {
  showAvatar: PropTypes.bool,
  lines: PropTypes.number,
};

export default Skeleton;
