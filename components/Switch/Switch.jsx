import React from 'react';
import PropTypes from 'prop-types';
import './Switch.css';

/**
 * Switch Component - A toggle switch for binary settings
 * 
 * Features:
 * - Accessible with keyboard navigation
 * - Smooth animated transitions
 * - Multiple sizes (small, medium, large)
 * - Support for labels and helper text
 * - Disabled state styling
 * - Loading state for async operations
 * 
 * @example
 * <Switch
 *   checked={darkMode}
 *   onChange={setDarkMode}
 *   label="Dark Mode"
 *   helperText="Toggle between light and dark themes"
 * />
 */
const Switch = React.forwardRef(({
  checked,
  onChange,
  label,
  helperText,
  size = 'medium',
  disabled = false,
  loading = false,
  id,
  name,
  className = '',
  labelPosition = 'right',
  ...rest
}, ref) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  
  const handleChange = (e) => {
    if (disabled || loading) return;
    onChange?.(e.target.checked);
  };

  const handleKeyDown = (e) => {
    if (disabled || loading) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  const switchClasses = [
    'l100-switch',
    `l100-switch--${size}`,
    checked && 'l100-switch--checked',
    disabled && 'l100-switch--disabled',
    loading && 'l100-switch--loading',
    labelPosition === 'left' && 'l100-switch--label-left',
    className,
  ].filter(Boolean).join(' ');

  const renderSwitch = () => (
    <span className="l100-switch__track" role="switch" aria-checked={checked}>
      <span className="l100-switch__thumb">
        {loading && <span className="l100-switch__spinner" />}
      </span>
    </span>
  );

  const renderLabel = () => {
    if (!label && !helperText) return null;
    
    return (
      <span className="l100-switch__label-container">
        {label && (
          <span className="l100-switch__label">
            {label}
          </span>
        )}
        {helperText && (
          <span className="l100-switch__helper">
            {helperText}
          </span>
        )}
      </span>
    );
  };

  return (
    <label 
      htmlFor={switchId} 
      className={switchClasses}
      ref={ref}
    >
      <input
        type="checkbox"
        id={switchId}
        name={name}
        checked={checked}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        className="l100-switch__input"
        {...rest}
      />
      
      {labelPosition === 'left' && renderLabel()}
      {renderSwitch()}
      {labelPosition === 'right' && renderLabel()}
    </label>
  );
});

Switch.displayName = 'Switch';

Switch.propTypes = {
  /** Current checked state */
  checked: PropTypes.bool.isRequired,
  /** Callback when switch is toggled */
  onChange: PropTypes.func.isRequired,
  /** Label text displayed next to the switch */
  label: PropTypes.string,
  /** Helper text displayed below the label */
  helperText: PropTypes.string,
  /** Size of the switch */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Whether the switch is disabled */
  disabled: PropTypes.bool,
  /** Whether the switch is in a loading state */
  loading: PropTypes.bool,
  /** HTML id attribute */
  id: PropTypes.string,
  /** HTML name attribute for form submission */
  name: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Position of the label relative to the switch */
  labelPosition: PropTypes.oneOf(['left', 'right']),
};

export default Switch;
