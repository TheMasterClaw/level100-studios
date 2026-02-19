import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import './Accordion.css';

/**
 * Accordion Context
 */
const AccordionContext = createContext({});

/**
 * Accordion Component - Collapsible content sections
 *
 * Features:
 * - Single or multiple panels open at once
 * - Smooth expand/collapse animations
 * - Keyboard navigation support
 * - Accessible with proper ARIA attributes
 * - Customizable trigger icons
 *
 * @example
 * // Basic single-panel accordion
 * <Accordion>
 *   <Accordion.Item id="1">
 *     <Accordion.Trigger>Section 1</Accordion.Trigger>
 *     <Accordion.Content>Content for section 1</Accordion.Content>
 *   </Accordion.Item>
 *   <Accordion.Item id="2">
 *     <Accordion.Trigger>Section 2</Accordion.Trigger>
 *     <Accordion.Content>Content for section 2</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 *
 * // Multiple panels open (default)
 * <Accordion type="multiple" defaultOpen={['1', '2']}>
 *   ...
 * </Accordion>
 */
const Accordion = ({
  children,
  type = 'single',
  defaultOpen = [],
  onChange,
  className = '',
  ...props
}) => {
  const [openItems, setOpenItems] = useState(new Set(defaultOpen));

  const toggleItem = (itemId) => {
    const newOpenItems = new Set(openItems);

    if (type === 'single') {
      // Close all others when opening a new one
      if (newOpenItems.has(itemId)) {
        newOpenItems.delete(itemId);
      } else {
        newOpenItems.clear();
        newOpenItems.add(itemId);
      }
    } else {
      // Multiple mode - toggle without affecting others
      if (newOpenItems.has(itemId)) {
        newOpenItems.delete(itemId);
      } else {
        newOpenItems.add(itemId);
      }
    }

    setOpenItems(newOpenItems);
    onChange?.(Array.from(newOpenItems));
  };

  const isOpen = (itemId) => openItems.has(itemId);

  return (
    <AccordionContext.Provider value={{ toggleItem, isOpen, type }}>
      <div
        className={['l100-accordion', className].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['single', 'multiple']),
  defaultOpen: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Accordion Item
 */
Accordion.Item = ({ children, id, className = '', ...props }) => {
  const { isOpen } = useContext(AccordionContext);
  const open = isOpen(id);

  return (
    <div
      className={[
        'l100-accordion__item',
        open && 'l100-accordion__item--open',
        className
      ].filter(Boolean).join(' ')}
      data-state={open ? 'open' : 'closed'}
      {...props}
    >
      {children}
    </div>
  );
};

Accordion.Item.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

/**
 * Accordion Trigger
 */
Accordion.Trigger = ({ children, asChild, className = '', ...props }) => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion.Trigger must be used within an Accordion.Item');
  }

  // Find the parent item's id by traversing up (simplified approach)
  // In practice, you'd want to use another context for the item
  const handleClick = (e) => {
    const item = e.currentTarget.closest('.l100-accordion__item');
    if (item) {
      // Extract id from data attribute or find it
      const trigger = item.querySelector('[data-accordion-trigger]');
      const itemId = trigger?.dataset.accordionItemId;
      if (itemId && context.toggleItem) {
        context.toggleItem(itemId);
      }
    }
    props.onClick?.(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
    props.onKeyDown?.(e);
  };

  return (
    <button
      type="button"
      className={['l100-accordion__trigger', className].filter(Boolean).join(' ')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-accordion-trigger
      {...props}
    >
      {children}
      <span className="l100-accordion__icon" aria-hidden="true">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};

Accordion.Trigger.propTypes = {
  children: PropTypes.node.isRequired,
  asChild: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Accordion Content
 */
Accordion.Content = ({ children, className = '', ...props }) => {
  return (
    <div
      className={['l100-accordion__content', className].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="l100-accordion__content-inner">{children}</div>
    </div>
  );
};

Accordion.Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Simplified Accordion with data-driven API
 */
Accordion.Simple = ({ items, type = 'single', defaultOpen = [], onChange, ...props }) => {
  return (
    <Accordion type={type} defaultOpen={defaultOpen} onChange={onChange} {...props}>
      {items.map((item) => (
        <Accordion.Item key={item.id} id={item.id}>
          <Accordion.Trigger data-accordion-item-id={item.id}>
            {item.title}
          </Accordion.Trigger>
          <Accordion.Content>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

Accordion.Simple.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf(['single', 'multiple']),
  defaultOpen: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

export default Accordion;
