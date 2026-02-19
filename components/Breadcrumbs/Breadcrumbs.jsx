import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumbs.css';

/**
 * Breadcrumbs Component - Navigation path indicator
 *
 * Features:
 * - Visual hierarchy showing current location
 * - Clickable parent navigation
 * - Support for icons in items
 * - Collapsible middle items for long paths
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic breadcrumbs
 * <Breadcrumbs>
 *   <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
 *   <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
 *   <Breadcrumbs.Item current>Item</Breadcrumbs.Item>
 * </Breadcrumbs>
 *
 * // With icons
 * <Breadcrumbs>
 *   <Breadcrumbs.Item href="/" icon="🏠">Home</Breadcrumbs.Item>
 *   <Breadcrumbs.Item href="/settings" icon="⚙️">Settings</Breadcrumbs.Item>
 * </Breadcrumbs>
 *
 * // Data-driven
 * <Breadcrumbs items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Category', href: '/category' },
 *   { label: 'Item', current: true }
 * ]} />
 */
const Breadcrumbs = ({ children, items, separator = '/', className = '', ...props }) => {
  const classes = ['l100-breadcrumbs', className].filter(Boolean).join(' ');

  // Data-driven mode
  if (items) {
    return (
      <nav className={classes} aria-label="Breadcrumb" {...props}>
        <ol className="l100-breadcrumbs__list">
          {items.map((item, index) => (
            <li
              key={index}
              className={[
                'l100-breadcrumbs__item',
                item.current && 'l100-breadcrumbs__item--current',
              ].filter(Boolean).join(' ')}
            >
              {index > 0 && (
                <span className="l100-breadcrumbs__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
              {item.current ? (
                <span
                  className="l100-breadcrumbs__link l100-breadcrumbs__link--current"
                  aria-current="page"
                >
                  {item.icon && <span className="l100-breadcrumbs__icon">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <a className="l100-breadcrumbs__link" href={item.href}>
                  {item.icon && <span className="l100-breadcrumbs__icon">{item.icon}</span>}
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // Compositional mode
  const childrenArray = React.Children.toArray(children);

  return (
    <nav className={classes} aria-label="Breadcrumb" {...props}>
      <ol className="l100-breadcrumbs__list">
        {childrenArray.map((child, index) => (
          <li key={index} className="l100-breadcrumbs__item">
            {index > 0 && (
              <span className="l100-breadcrumbs__separator" aria-hidden="true">
                {separator}
              </span>
            )}
            {child}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  /** Breadcrumb items (compositional mode) */
  children: PropTypes.node,
  /** Breadcrumb items (data-driven mode) */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
      current: PropTypes.bool,
    })
  ),
  /** Separator character or element */
  separator: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Breadcrumb Item
 */
Breadcrumbs.Item = ({ children, href, icon, current = false, className = '', ...props }) => {
  const classes = [
    'l100-breadcrumbs__link',
    current && 'l100-breadcrumbs__link--current',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className="l100-breadcrumbs__icon">{icon}</span>}
      {children}
    </>
  );

  if (current) {
    return (
      <span className={classes} aria-current="page" {...props}>
        {content}
      </span>
    );
  }

  return (
    <a className={classes} href={href} {...props}>
      {content}
    </a>
  );
};

Breadcrumbs.Item.propTypes = {
  /** Item label */
  children: PropTypes.node.isRequired,
  /** Link URL */
  href: PropTypes.string,
  /** Optional icon */
  icon: PropTypes.node,
  /** Whether this is the current page */
  current: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Breadcrumbs;
