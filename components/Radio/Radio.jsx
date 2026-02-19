import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import './Radio.css';

/**
 * Radio Context
 */
const RadioContext = createContext({});

/**
 * Radio Group Component - Container for radio options
 *
 * Features:
 * - Single-select behavior
 * - Controlled and uncontrolled modes
 * - Horizontal and vertical orientations
 * - Support for disabled state
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic radio group
 * <RadioGroup name="size" defaultValue="md">
 *   <Radio value="sm">Small</Radio>
 *   <Radio value="md">Medium</Radio>
 *   <Radio value="lg">Large</Radio>
 * </RadioGroup>
 *
 * // With helper text
 * <RadioGroup name="plan" defaultValue="pro">
 *   <Radio value="free" helperText="For individuals">Free</Radio>
 *   <Radio value="pro" helperText="For teams">Pro</Radio>
 * </RadioGroup>
 *
 * // Horizontal layout
 * <RadioGroup orientation="horizontal" name="color" defaultValue="red">
 *   <Radio value="red">Red</Radio>
 *   <Radio value="blue">Blue</Radio>
 * </RadioGroup>
 */
const RadioGroup = ({
  children,
  name,
  defaultValue,
  value: controlledValue,
  onChange,
  orientation = 'vertical',
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (newValue) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <RadioContext.Provider
      value={{
        name,
        selectedValue,
        onChange: handleChange,
        disabled,
        required,
      }}
    >
      <div
        className={[
          'l100-radio-group',
          `l100-radio-group--${orientation}`,
          disabled && 'l100-radio-group--disabled',
          className,
        ].filter(Boolean).join(' ')}
        role="radiogroup"
        aria-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </RadioContext.Provider>
  );
};

RadioGroup.propTypes = {
  /** Radio options */
  children: PropTypes.node.isRequired,
  /** Group name (used for form submission) */
  name: PropTypes.string.isRequired,
  /** Default selected value (uncontrolled) */
  defaultValue: PropTypes.string,
  /** Selected value (controlled) */
  value: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  /** Layout orientation */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Whether the entire group is disabled */
  disabled: PropTypes.bool,
  /** Whether selection is required */
  required: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Radio Component - Single radio option
 */
const Radio = ({
  children,
  value,
  disabled = false,
  helperText,
  className = '',
  ...props
}) => {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error('Radio must be used within a RadioGroup');
  }

  const {
    name,
    selectedValue,
    onChange,
    disabled: groupDisabled,
    required,
  } = context;

  const isSelected = selectedValue === value;
  const isDisabled = disabled || groupDisabled;
  const id = `${name}-${value}`;

  const handleChange = () => {
    if (!isDisabled) {
      onChange(value);
    }
  };

  const handleKeyDown = (e) => {
    if (isDisabled) return;

    const radios = Array.from(
      e.currentTarget.closest('[role="radiogroup"]').querySelectorAll('[role="radio"]')
    );
    const index = radios.indexOf(e.currentTarget);

    let nextIndex = index;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = index + 1;
        if (nextIndex >= radios.length) nextIndex = 0;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = index - 1;
        if (nextIndex < 0) nextIndex = radios.length - 1;
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        onChange(value);
        return;
      default:
        return;
    }

    e.preventDefault();
    radios[nextIndex].focus();
    radios[nextIndex].click();
  };

  return (
    <label
      className={[
        'l100-radio',
        isSelected && 'l100-radio--selected',
        isDisabled && 'l100-radio--disabled',
        className,
      ].filter(Boolean).join(' ')}
      htmlFor={id}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isSelected}
        disabled={isDisabled}
        required={required}
        onChange={handleChange}
        className="l100-radio__input"
        {...props}
      />
      <span
        className="l100-radio__control"
        role="radio"
        aria-checked={isSelected}
        tabIndex={isSelected ? 0 : -1}
        onKeyDown={handleKeyDown}
      >
        <span className="l100-radio__indicator" />
      </span>
      <span className="l100-radio__content">
        <span className="l100-radio__label">{children}</span>
        {helperText && (
          <span className="l100-radio__helper">{helperText}</span>
        )}
      </span>
    </label>
  );
};

Radio.propTypes = {
  /** Option label */
  children: PropTypes.node.isRequired,
  /** Option value */
  value: PropTypes.string.isRequired,
  /** Whether this option is disabled */
  disabled: PropTypes.bool,
  /** Helper text displayed below label */
  helperText: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export { RadioGroup, Radio };
export default RadioGroup;
