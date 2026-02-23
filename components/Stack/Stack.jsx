import React from 'react';
import './Stack.css';

/**
 * Stack Component
 * 
 * A layout primitive for managing vertical or horizontal spacing between elements.
 * 
 * @param {string} direction - 'vertical' | 'horizontal' | 'row' | 'column'
 * @param {number|string} gap - Spacing between items (1-24 or custom value)
 * @param {string} align - 'start' | 'center' | 'end' | 'stretch' | 'baseline'
 * @param {string} justify - 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
 * @param {boolean} wrap - Allow items to wrap (horizontal only)
 * @param {boolean} inline - Use inline-flex instead of flex
 * @param {ReactNode} children - Child elements to stack
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element to render (default: 'div')
 */
export default function Stack({
  direction = 'vertical',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  inline = false,
  children,
  className = '',
  as: Component = 'div',
  ...props
}) {
  // Normalize direction
  const flexDirection = direction === 'vertical' || direction === 'column' 
    ? 'column' 
    : 'row';

  // Normalize gap (number = spacing token, string = custom value)
  const gapValue = typeof gap === 'number' 
    ? `var(--l100-spacing-${gap}, ${gap * 0.25}rem)` 
    : gap;

  const classes = [
    'l100-stack',
    `l100-stack--align-${align}`,
    `l100-stack--justify-${justify}`,
    wrap && 'l100-stack--wrap',
    inline && 'l100-stack--inline',
    className,
  ].filter(Boolean).join(' ');

  const style = {
    '--l100-stack-gap': gapValue,
    '--l100-stack-direction': flexDirection,
    ...props.style,
  };

  return (
    <Component 
      className={classes} 
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * HStack - Horizontal stack shorthand
 */
export function HStack(props) {
  return <Stack direction="horizontal" {...props} />;
}

/**
 * VStack - Vertical stack shorthand
 */
export function VStack(props) {
  return <Stack direction="vertical" {...props} />;
}
