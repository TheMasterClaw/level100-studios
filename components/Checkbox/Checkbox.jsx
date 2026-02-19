import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

/**
 * Checkbox Context (for CheckboxGroup)
 */
const CheckboxContext = createContext(null);

/**
 * Checkbox Component - Individual checkbox input
 *
 * Features:
 * - Standalone or group usage
 * - Indeterminate state support
 * - Label and helper text
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Standalone checkbox
 * <Checkbox checked={value} onChange={handleChange}>
 *   Subscribe to newsletter
 * </Checkbox>
 *
 * // With helper text
 * <Checkbox
 *   checked={value}
 *   onChange={handleChange}
 *   helperText="Receive updates about new features"
 * >
 *   Enable notifications
 * </Checkbox>
 *
 * // Indeterminate state
 * <Checkbox indeterminate={true}>Select all</Checkbox>
 */
const Checkbox = ({
  children,
  checked,
  defaultChecked = false,
  onChange,
  indeterminate = false,
  disabled = false,
  required = false,
  helperText,
  className = '',
  value,
  name,
  id,
  ...props
}) => {
  const context = useContext(CheckboxContext);
  const isInGroup = context !== null;

  // Handle group-controlled state
  const isChecked = isInGroup
    ? context.selectedValues.includes(value)
    : checked !== undefined
      ? checked
      : undefined;

  const handleChange = (e) => {
    if (isInGroup) {
      context.onChange(value, e.target.checked);
    } else {
      onChange?.(e.target.checked);
    }
  };

  const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label
      className={[
        'l100-checkbox',
        isChecked && 'l100-checkbox--checked',
        indeterminate && 'l100-checkbox--indeterminate',
        disabled && 'l100-checkbox--disabled',
        className,
      ].filter(Boolean).join(' ')}
      htmlFor={inputId}
    >
      <input
        type="checkbox"
        id={inputId}
        name={isInGroup ? context.name : name}
        value={value}
        checked={isChecked}
        defaultChecked={!isInGroup ? defaultChecked : undefined}
        onChange={handleChange}
        disabled={disabled || (isInGroup && context.disabled)}
        required={required || (isInGroup && context.required)}
        className="l100-checkbox__input"
        {...props}
      />
      <span className="l100-checkbox__control" aria-hidden="true">
        <span className="l100-checkbox__indicator">
          {indeterminate ? (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="4" width="8" height="2" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 2.5L4 7L1.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </span>
      <span className="l100-checkbox__content">
        {children && <span className="l100-checkbox__label">{children}</span>}
        {helperText && (
          <span className="l100-checkbox__helper">{helperText}</span>
        )}
      </span>
    </label>
  );
};

Checkbox.propTypes = {
  /** Checkbox label */
  children: PropTypes.node,
  /** Controlled checked state */
  checked: PropTypes.bool,
  /** Default checked state (uncontrolled) */
  defaultChecked: PropTypes.bool,
  /** Change handler */
  onChange: PropTypes.func,
  /** Indeterminate state (visual only, overrides checked icon) */
  indeterminate: PropTypes.bool,
  /** Whether the checkbox is disabled */
  disabled: PropTypes.bool,
  /** Whether the checkbox is required */
  required: PropTypes.bool,
  /** Helper text displayed below label */
  helperText: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Checkbox value (used in groups) */
  value: PropTypes.string,
  /** Input name */
  name: PropTypes.string,
  /** Input id */
  id: PropTypes.string,
};

/**
 * CheckboxGroup Component - Container for multiple checkboxes
 *
 * @example
 * <CheckboxGroup
 *   name="interests"
 *   defaultValue={['tech', 'design']}
 *   onChange={(values) => console.log(values)}
 * >
 *   <Checkbox value="tech">Technology</Checkbox>
 *   <Checkbox value="design">Design</Checkbox>
 *   <Checkbox value="business">Business</Checkbox>
 * </CheckboxGroup>
 */
const CheckboxGroup = ({
  children,
  name,
  defaultValue = [],
  value: controlledValue,
  onChange,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedValues = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (value, isChecked) => {
    let newValues;
    if (isChecked) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter((v) => v !== value);
    }

    if (!isControlled) {
      setUncontrolledValue(newValues);
    }
    onChange?.(newValues);
  };

  return (
    <CheckboxContext.Provider
      value={{
        name,
        selectedValues,
        onChange: handleChange,
        disabled,
        required,
      }}
    >
      <div className={['l100-checkbox-group', className].filter(Boolean).join(' ')} {...props}>
        {children}
      </div>
    </CheckboxContext.Provider>
  );
};

CheckboxGroup.propTypes = {
  /** Checkbox items */
  children: PropTypes.node.isRequired,
  /** Group name */
  name: PropTypes.string.isRequired,
  /** Default selected values (uncontrolled) */
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  /** Selected values (controlled) */
  value: PropTypes.arrayOf(PropTypes.string),
  /** Change handler */
  onChange: PropTypes.func,
  /** Whether the entire group is disabled */
  disabled: PropTypes.bool,
  /** Whether selection is required */
  required: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export { Checkbox, CheckboxGroup };
export default Checkbox;
