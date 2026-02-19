import React from 'react';
import PropTypes from 'prop-types';
import './Progress.css';

/**
 * Progress Component - Visual indicator for completion status
 * 
 * Features:
 * - Determinate progress (0-100%)
 * - Indeterminate mode for unknown duration tasks
 * - Multiple sizes (small, medium, large)
 * - Multiple color variants (default, primary, success, warning, error)
 * - Optional label showing percentage or custom text
 * - Striped animated style for visual feedback
 * - Accessible with ARIA attributes
 * 
 * @example
 * // Basic usage
 * <Progress value={45} />
 * 
 * // With label
 * <Progress value={75} showLabel />
 * 
 * // Custom label
 * <Progress value={30} label="Uploading..." />
 * 
 * // Success state
 * <Progress value={100} variant="success" label="Complete!" />
 * 
 * // Indeterminate (loading with unknown duration)
 * <Progress indeterminate label="Processing..." />
 */
const Progress = React.forwardRef(({
  value,
  max = 100,
  min = 0,
  size = 'medium',
  variant = 'default',
  showLabel = false,
  label,
  labelPosition = 'right',
  striped = false,
  animated = false,
  indeterminate = false,
  className = '',
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}, ref) => {
  const progressId = id || `progress-${Math.random().toString(36).substr(2, 9)}`;
  
  // Clamp value between min and max
  const clampedValue = Math.max(min, Math.min(max, value));
  const percentage = ((clampedValue - min) / (max - min)) * 100;
  
  const containerClasses = [
    'l100-progress',
    `l100-progress--${size}`,
    indeterminate && 'l100-progress--indeterminate',
    className,
  ].filter(Boolean).join(' ');
  
  const barClasses = [
    'l100-progress__bar',
    `l100-progress__bar--${variant}`,
    striped && 'l100-progress__bar--striped',
    animated && 'l100-progress__bar--animated',
    indeterminate && 'l100-progress__bar--indeterminate',
  ].filter(Boolean).join(' ');
  
  const renderLabel = () => {
    if (!showLabel && !label) return null;
    
    const labelText = label !== undefined 
      ? label 
      : `${Math.round(percentage)}%`;
    
    return (
      <span className="l100-progress__label" id={`${progressId}-label`}>
        {labelText}
      </span>
    );
  };
  
  return (
    <div 
      className={containerClasses}
      ref={ref}
      {...rest}
    >
      {labelPosition === 'top' && renderLabel()}
      
      <div 
        className="l100-progress__track"
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || (showLabel || label ? `${progressId}-label` : undefined)}
        id={progressId}
      >
        <div 
          className={barClasses}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
      
      {(labelPosition === 'right' || labelPosition === 'bottom') && renderLabel()}
    </div>
  );
});

Progress.displayName = 'Progress';

Progress.propTypes = {
  /** Current progress value */
  value: PropTypes.number,
  /** Maximum value (default: 100) */
  max: PropTypes.number,
  /** Minimum value (default: 0) */
  min: PropTypes.number,
  /** Size of the progress bar */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Color variant */
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  /** Show percentage label */
  showLabel: PropTypes.bool,
  /** Custom label text (overrides percentage) */
  label: PropTypes.string,
  /** Position of the label */
  labelPosition: PropTypes.oneOf(['top', 'right', 'bottom']),
  /** Add striped pattern */
  striped: PropTypes.bool,
  /** Animate the striped pattern */
  animated: PropTypes.bool,
  /** Indeterminate mode for unknown duration */
  indeterminate: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** HTML id attribute */
  id: PropTypes.string,
  /** ARIA label for accessibility */
  'aria-label': PropTypes.string,
  /** ID of element labeling this progress bar */
  'aria-labelledby': PropTypes.string,
};

export default Progress;
