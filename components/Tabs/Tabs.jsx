import React, { useState, createContext, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Tabs.css';

/**
 * Tabs Context
 */
const TabsContext = createContext({});

/**
 * Tabs Component - Organized tabbed content interface
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Controlled and uncontrolled modes
 * - Keyboard navigation (arrow keys, home, end)
 * - Accessible with proper ARIA attributes
 * - Customizable trigger appearance
 * - Animated content transitions
 *
 * @example
 * // Basic tabs
 * <Tabs defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content for tab 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content for tab 2</Tabs.Content>
 * </Tabs>
 *
 * // Vertical orientation
 * <Tabs orientation="vertical" defaultValue="tab1">
 *   ...
 * </Tabs>
 *
 * // Controlled tabs
 * <Tabs value={activeTab} onValueChange={setActiveTab}>
 *   ...
 * </Tabs>
 */
const Tabs = ({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = 'horizontal',
  className = '',
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeTab = isControlled ? controlledValue : uncontrolledValue;

  const setValue = useCallback(
    (newValue) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setValue, orientation }}>
      <div
        className={[
          'l100-tabs',
          `l100-tabs--${orientation}`,
          className,
        ].filter(Boolean).join(' ')}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
};

/**
 * Tabs List - Container for tab triggers
 */
Tabs.List = ({ children, className = '', ...props }) => {
  const { orientation } = useContext(TabsContext);

  return (
    <div
      className={['l100-tabs__list', className].filter(Boolean).join(' ')}
      role="tablist"
      aria-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  );
};

Tabs.List.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Tabs Trigger - Clickable tab button
 */
Tabs.Trigger = ({ children, value, disabled = false, className = '', ...props }) => {
  const { activeTab, setValue, orientation } = useContext(TabsContext);
  const isActive = activeTab === value;

  const handleClick = () => {
    if (!disabled) {
      setValue(value);
    }
  };

  const handleKeyDown = (e) => {
    const triggers = Array.from(
      e.currentTarget.parentElement.querySelectorAll('[role="tab"]')
    );
    const index = triggers.indexOf(e.currentTarget);

    let nextIndex = index;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = index + 1;
        if (nextIndex >= triggers.length) nextIndex = 0;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = index - 1;
        if (nextIndex < 0) nextIndex = triggers.length - 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = triggers.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    triggers[nextIndex].focus();
    triggers[nextIndex].click();
  };

  return (
    <button
      type="button"
      role="tab"
      className={[
        'l100-tabs__trigger',
        isActive && 'l100-tabs__trigger--active',
        disabled && 'l100-tabs__trigger--disabled',
        className,
      ].filter(Boolean).join(' ')}
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? 'active' : 'inactive'}
      data-orientation={orientation}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  );
};

Tabs.Trigger.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Tabs Content - Panel for tab content
 */
Tabs.Content = ({ children, value, className = '', ...props }) => {
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      className={['l100-tabs__content', className].filter(Boolean).join(' ')}
      role="tabpanel"
      data-state={isActive ? 'active' : 'inactive'}
      {...props}
    >
      {children}
    </div>
  );
};

Tabs.Content.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

/**
 * Simple Tabs with data-driven API
 */
Tabs.Simple = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  className = '',
  ...props
}) => {
  const activeValue = value || defaultValue || tabs[0]?.value;

  return (
    <Tabs
      value={value}
      defaultValue={activeValue}
      onValueChange={onValueChange}
      orientation={orientation}
      className={className}
      {...props}
    >
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
          >
            {tab.icon && <span className="l100-tabs__icon">{tab.icon}</span>}
            {tab.label}
            {tab.badge && <span className="l100-tabs__badge">{tab.badge}</span>}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value}>
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs>
  );
};

Tabs.Simple.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.node,
      badge: PropTypes.node,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
};

export default Tabs;
