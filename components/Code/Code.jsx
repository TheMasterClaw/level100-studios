import React from 'react';
import PropTypes from 'prop-types';
import './Code.css';

/**
 * Code Component - Display inline code and code blocks
 *
 * Features:
 * - Inline code snippets
 * - Multi-line code blocks
 * - Syntax highlighting support (via className)
 * - Copy to clipboard functionality
 * - Multiple color schemes
 * - Accessible with proper semantic markup
 *
 * @example
 * // Inline code
 * Use the <Code>npm install</Code> command.
 *
 * // Code block
 * <Code block>{`function greet() {
 *   return "Hello, World!";
 * }`}</Code>
 *
 * // With language
 * <Code block language="javascript">{`const x = 1;`}</Code>
 *
 * // With copy button
 * <Code block copyable>{`config.json`}</Code>
 *
 * // Color variants
 * <Code color="primary">primary</Code>
 * <Code color="success">success</Code>
 */
const Code = ({
  children,
  block = false,
  language,
  copyable = false,
  color = 'default',
  className = '',
  ...props
}) => {
  const classes = [
    'l100-code',
    block && 'l100-code--block',
    color && `l100-code--${color}`,
    className,
  ].filter(Boolean).join(' ');

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(children);
    }
  };

  if (block) {
    return (
      <div className="l100-code__wrapper">
        {(language || copyable) && (
          <div className="l100-code__header">
            {language && <span className="l100-code__language">{language}</span>}
            {copyable && (
              <button
                type="button"
                className="l100-code__copy"
                onClick={handleCopy}
                aria-label="Copy code"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="8"
                    height="8"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="5"
                    y="5"
                    width="8"
                    height="8"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        <pre className={classes} {...props}>
          <code>{children}</code>
        </pre>
      </div>
    );
  }

  return (
    <code className={classes} {...props}>
      {children}
    </code>
  );
};

Code.propTypes = {
  /** Code content */
  children: PropTypes.node.isRequired,
  /** Whether to render as a block */
  block: PropTypes.bool,
  /** Language for syntax highlighting */
  language: PropTypes.string,
  /** Show copy button (block only) */
  copyable: PropTypes.bool,
  /** Color scheme */
  color: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Inline code shorthand
 */
Code.Inline = ({ children, ...props }) => (
  <Code block={false} {...props}>{children}</Code>
);

Code.Inline.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Code block shorthand
 */
Code.Block = ({ children, ...props }) => (
  <Code block={true} {...props}>{children}</Code>
);

Code.Block.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Code;
