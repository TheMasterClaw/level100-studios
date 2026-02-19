import React from 'react';
import PropTypes from 'prop-types';
import './Kbd.css';

/**
 * Kbd Component - Keyboard key representation
 *
 * Features:
 * - Visual representation of keyboard keys
 * - Support for single keys and key combinations
 * - Multiple size variants
 * - Accessible with proper semantic markup
 *
 * @example
 * // Single key
 * <Kbd>Enter</Kbd>
 *
 * // Key combination
 * <Kbd.Combo>
 *   <Kbd>Ctrl</Kbd>
 *   <Kbd>C</Kbd>
 * </Kbd.Combo>
 *
 * // Common shortcuts
 * <Kbd.Shortcut cmd>C</Kbd.Shortcut>  // ⌘C on Mac, Ctrl+C on Windows
 * <Kbd.Shortcut shift>Tab</Kbd.Shortcut>  // Shift+Tab
 *
 * // Sizes
 * <Kbd size="sm">Esc</Kbd>
 * <Kbd size="lg">Space</Kbd>
 */
const Kbd = ({ children, size = 'md', className = '', ...props }) => {
  const classes = [
    'l100-kbd',
    `l100-kbd--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <kbd className={classes} {...props}>
      {children}
    </kbd>
  );
};

Kbd.propTypes = {
  /** Content to display (key name) */
  children: PropTypes.node.isRequired,
  /** Size of the key */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Key Combination container
 */
Kbd.Combo = ({ children, separator = '+', className = '', ...props }) => {
  // Process children to add separators
  const childrenArray = React.Children.toArray(children);

  return (
    <span className={['l100-kbd__combo', className].filter(Boolean).join(' ')} {...props}>
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < childrenArray.length - 1 && (
            <span className="l100-kbd__separator">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

Kbd.Combo.propTypes = {
  /** Kbd elements to combine */
  children: PropTypes.node.isRequired,
  /** Separator between keys */
  separator: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Platform-aware shortcut helper
 */
Kbd.Shortcut = ({
  children,
  cmd = false,
  shift = false,
  alt = false,
  ctrl = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  const keys = [];

  if (cmd) {
    keys.push(<Kbd key="mod" size={size}>{isMac ? '⌘' : 'Ctrl'}</Kbd>);
  }

  if (ctrl && !isMac) {
    keys.push(<Kbd key="ctrl" size={size}>Ctrl</Kbd>);
  }

  if (alt) {
    keys.push(<Kbd key="alt" size={size}>{isMac ? '⌥' : 'Alt'}</Kbd>);
  }

  if (shift) {
    keys.push(<Kbd key="shift" size={size}>⇧</Kbd>);
  }

  keys.push(
    <Kbd key="main" size={size}>{children}</Kbd>
  );

  return (
    <Kbd.Combo className={className} {...props}>
      {keys}
    </Kbd.Combo>
  );
};

Kbd.Shortcut.propTypes = {
  /** Main key */
  children: PropTypes.node.isRequired,
  /** Include Command/Ctrl key */
  cmd: PropTypes.bool,
  /** Include Shift key */
  shift: PropTypes.bool,
  /** Include Option/Alt key */
  alt: PropTypes.bool,
  /** Include Ctrl key (non-Mac only) */
  ctrl: PropTypes.bool,
  /** Size of keys */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Kbd;
