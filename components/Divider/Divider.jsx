import React from 'react';
import PropTypes from 'prop-types';
import './Divider.css';

/**
 * Divider Component - Visual separator for content sections
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Multiple visual styles (solid, dashed, dotted)
 * - Optional text/label support
 * - Configurable thickness and spacing
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic horizontal divider
 * <Divider />
 *
 * // Divider with text
 * <Divider>OR</Divider>
 *
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * // Dashed style
 * <Divider variant="dashed" />
 *
 * // Thick divider with spacing
 * <Divider thickness="thick" spacing="lg" />
 */
const Divider = ({
  children,
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  spacing = 'md',
  className = '',
  ...props
}) => {
  const hasContent = children !== undefined && children !== null;

  const classes = [
    'l100-divider',
    `l100-divider--${orientation}`,
    `l100-divider--${variant}`,
    `l100-divider--${thickness}`,
    `l100-divider--spacing-${spacing}`,
    hasContent && 'l100-divider--with-content',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role={orientation === 'horizontal' ? 'separator' : 'separator'}
      aria-orientation={orientation}
      {...props}
    >
      {hasContent && (
        <span className="l100-divider__content">{children}</span>
      )}
    </div>
  );
};

Divider.propTypes = {
  /** Content to display in the middle of the divider */
  children: PropTypes.node,
  /** Divider orientation */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Visual style of the divider line */
  variant: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
  /** Thickness of the divider line */
  thickness: PropTypes.oneOf(['thin', 'medium', 'thick']),
  /** Spacing around the divider */
  spacing: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Horizontal Divider - Shorthand
 */
Divider.Horizontal = ({ children, ...props }) => (
  <Divider orientation="horizontal" {...props}>
    {children}
  </Divider>
);

Divider.Horizontal.propTypes = {
  children: PropTypes.node,
};

/**
 * Vertical Divider - Shorthand
 */
Divider.Vertical = ({ children, ...props }) => (
  <Divider orientation="vertical" {...props}>
    {children}
  </Divider>
);

Divider.Vertical.propTypes = {
  children: PropTypes.node,
};

/**
 * Text Divider - Pre-styled for text labels
 */
Divider.Text = ({ children, ...props }) => (
  <Divider
    orientation="horizontal"
    variant="solid"
    spacing="md"
    {...props}
  >
    {children}
  </Divider>
);

Divider.Text.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Divider;
