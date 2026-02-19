import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

/**
 * Slider Component - Select a value from a range
 *
 * Features:
 * - Horizontal value selection
 * - Support for custom min/max/step values
 * - Optional marks/labels at specific points
 * - Disabled state
 * - Keyboard navigation (arrow keys)
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic slider
 * <Slider
 *   value={50}
 *   onChange={(value) => setValue(value)}
 * />
 *
 * // With custom range
 * <Slider
 *   min={0}
 *   max={100}
 *   step={10}
 *   value={value}
 *   onChange={setValue}
 * />
 *
 * // With marks
 * <Slider
 *   value={value}
 *   onChange={setValue}
 *   marks={[
 *     { value: 0, label: '0%' },
 *     { value: 50, label: '50%' },
 *     { value: 100, label: '100%' },
 *   ]}
 * />
 */
const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks,
  disabled = false,
  showValue = true,
  valueFormatter = (v) => `${v}`,
  className = '',
  ...props
}) => {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? min);

  // Update internal value when prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const percentage = ((internalValue - min) / (max - min)) * 100;

  const getValueFromPosition = useCallback((clientX) => {
    if (!trackRef.current) return internalValue;

    const rect = trackRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    let newValue = min + position * (max - min);

    // Apply step
    newValue = Math.round(newValue / step) * step;
    // Clamp to min/max
    newValue = Math.max(min, Math.min(max, newValue));

    return newValue;
  }, [min, max, step, internalValue]);

  const handleMouseDown = (e) => {
    if (disabled) return;
    setIsDragging(true);
    const newValue = getValueFromPosition(e.clientX);
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || disabled) return;
      const newValue = getValueFromPosition(e.clientX);
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, disabled, getValueFromPosition, onChange]);

  const handleKeyDown = (e) => {
    if (disabled) return;

    let newValue = internalValue;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, internalValue - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, internalValue + step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const classes = [
    'l100-slider',
    disabled && 'l100-slider--disabled',
    isDragging && 'l100-slider--dragging',
    marks && 'l100-slider--with-marks',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="l100-slider__container">
        <div
          ref={trackRef}
          className="l100-slider__track"
          onMouseDown={handleMouseDown}
        >
          <div
            className="l100-slider__fill"
            style={{ width: `${percentage}%` }}
          />
          <button
            type="button"
            className="l100-slider__thumb"
            style={{ left: `${percentage}%` }}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={internalValue}
            aria-orientation="horizontal"
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label={marks?.find(m => m.value === internalValue)?.label || `${internalValue}`}
          />
        </div>

        {showValue && (
          <span className="l100-slider__value">{valueFormatter(internalValue)}</span>
        )}
      </div>

      {marks && (
        <div className="l100-slider__marks">
          {marks.map((mark) => {
            const markPercentage = ((mark.value - min) / (max - min)) * 100;
            return (
              <div
                key={mark.value}
                className="l100-slider__mark"
                style={{ left: `${markPercentage}%` }}
              >
                {mark.label && (
                  <span className="l100-slider__mark-label">{mark.label}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

Slider.propTypes = {
  /** Current value */
  value: PropTypes.number,
  /** Change handler */
  onChange: PropTypes.func,
  /** Minimum value */
  min: PropTypes.number,
  /** Maximum value */
  max: PropTypes.number,
  /** Step increment */
  step: PropTypes.number,
  /** Marks/labels at specific points */
  marks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string,
    })
  ),
  /** Whether slider is disabled */
  disabled: PropTypes.bool,
  /** Show current value */
  showValue: PropTypes.bool,
  /** Format function for displayed value */
  valueFormatter: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Range Slider - Select a range between two values
 */
Slider.Range = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = '',
  ...props
}) => {
  const [start, end] = value || [min, max];
  const startPercentage = ((start - min) / (max - min)) * 100;
  const endPercentage = ((end - min) / (max - min)) * 100;

  const handleStartChange = (newStart) => {
    if (newStart <= end) {
      onChange?.([newStart, end]);
    }
  };

  const handleEndChange = (newEnd) => {
    if (newEnd >= start) {
      onChange?.([start, newEnd]);
    }
  };

  return (
    <div className={['l100-slider l100-slider--range', className].filter(Boolean).join(' ')} {...props}>
      <div className="l100-slider__container">
        <div className="l100-slider__track l100-slider__track--range">
          <div
            className="l100-slider__fill"
            style={{
              left: `${startPercentage}%`,
              width: `${endPercentage - startPercentage}%`,
            }}
          />
          <button
            type="button"
            className="l100-slider__thumb"
            style={{ left: `${startPercentage}%` }}
            disabled={disabled}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={start}
            role="slider"
            tabIndex={disabled ? -1 : 0}
          />
          <button
            type="button"
            className="l100-slider__thumb"
            style={{ left: `${endPercentage}%` }}
            disabled={disabled}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={end}
            role="slider"
            tabIndex={disabled ? -1 : 0}
          />
        </div>

        <span className="l100-slider__value">
          {start} - {end}
        </span>
      </div>
    </div>
  );
};

Slider.Range.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Slider;
