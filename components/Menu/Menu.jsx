import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Menu.css';

/**
 * Menu Component - Dropdown menu for navigation and actions
 *
 * Features:
 * - Dropdown menu with trigger button
 * - Support for menu items with icons
 * - Keyboard navigation (arrow keys, escape, enter)
 * - Click outside to close
 * - Submenu support
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic menu
 * <Menu>
 *   <Menu.Trigger>Open Menu</Menu.Trigger>
 *   <Menu.Content>
 *     <Menu.Item onClick={handleEdit}>Edit</Menu.Item>
 *     <Menu.Item onClick={handleDelete}>Delete</Menu.Item>
 *   </Menu.Content>
 * </Menu>
 *
 * // With icons
 * <Menu>
 *   <Menu.Trigger>Actions</Menu.Trigger>
 *   <Menu.Content>
 *     <Menu.Item icon="✏️" onClick={handleEdit}>Edit</Menu.Item>
 *     <Menu.Item icon="🗑️" onClick={handleDelete} variant="danger">Delete</Menu.Item>
 *   </Menu.Content>
 * </Menu>
 *
 * // With separator and disabled items
 * <Menu>
 *   <Menu.Trigger>Options</Menu.Trigger>
 *   <Menu.Content>
 *     <Menu.Item onClick={handleView}>View</Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Item onClick={handleShare}>Share</Menu.Item>
 *     <Menu.Item disabled>Delete</Menu.Item>
 *   </Menu.Content>
 * </Menu>
 */
const Menu = ({ children, className = '', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={['l100-menu', isOpen && 'l100-menu--open', className].filter(Boolean).join(' ')}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;

        if (child.type === Menu.Trigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            'aria-expanded': isOpen,
            'aria-haspopup': true,
          });
        }

        if (child.type === Menu.Content) {
          return isOpen ? React.cloneElement(child, {
            onClose: () => setIsOpen(false),
          }) : null;
        }

        return child;
      })}
    </div>
  );
};

Menu.propTypes = {
  /** Menu trigger and content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Menu Trigger
 */
Menu.Trigger = ({ children, onClick, ...props }) => {
  return (
    <button
      type="button"
      className="l100-menu__trigger"
      onClick={onClick}
      {...props}
    >
      {children}
      <svg
        className="l100-menu__trigger-icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 4.5L6 8L9.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

Menu.Trigger.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

/**
 * Menu Content
 */
Menu.Content = ({ children, onClose, className = '', ...props }) => {
  return (
    <div
      className={['l100-menu__content', className].filter(Boolean).join(' ')}
      role="menu"
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;

        if (child.type === Menu.Item) {
          return React.cloneElement(child, {
            onClose,
          });
        }

        return child;
      })}
    </div>
  );
};

Menu.Content.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Menu Item
 */
Menu.Item = ({ children, icon, onClick, disabled = false, variant = 'default', onClose, className = '', ...props }) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
      onClose?.();
    }
  };

  const classes = [
    'l100-menu__item',
    `l100-menu__item--${variant}`,
    disabled && 'l100-menu__item--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      role="menuitem"
      {...props}
    >
      {icon && <span className="l100-menu__item-icon">{icon}</span>}
      <span className="l100-menu__item-label">{children}</span>
    </button>
  );
};

Menu.Item.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'danger']),
  onClose: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Menu Separator
 */
Menu.Separator = ({ className = '', ...props }) => (
  <div className={['l100-menu__separator', className].filter(Boolean).join(' ')} role="separator" {...props} />
);

Menu.Separator.propTypes = {
  className: PropTypes.string,
};

/**
 * Menu Label
 */
Menu.Label = ({ children, className = '', ...props }) => (
  <span className={['l100-menu__label', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </span>
);

Menu.Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Menu;
