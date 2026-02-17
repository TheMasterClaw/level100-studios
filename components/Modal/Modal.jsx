import React, { useEffect } from 'react';
import './Modal.css';

/**
 * Modal Component
 * 
 * A flexible dialog component for overlays, confirmations, and content presentation.
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Called when modal should close (backdrop click, escape key)
 * @param {string} size - 'small' | 'medium' | 'large' | 'fullscreen'
 * @param {boolean} closeOnBackdrop - Close when clicking the backdrop (default: true)
 * @param {boolean} closeOnEscape - Close when pressing Escape key (default: true)
 * @param {boolean} showCloseButton - Show X button in header (default: true)
 * @param {ReactNode} children - Modal content
 * @param {string} className - Additional CSS classes
 */
export default function Modal({
  isOpen = false,
  onClose,
  size = 'medium',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  children,
  className = '',
  ...props
}) {
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const classes = [
    'l100-modal',
    `l100-modal--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div 
      className="l100-modal__backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={classes} {...props}>
        {showCloseButton && (
          <button 
            className="l100-modal__close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

/**
 * ModalHeader Component
 * 
 * @param {ReactNode} children - Header content
 * @param {string} className - Additional CSS classes
 */
export function ModalHeader({ children, className = '', ...props }) {
  return (
    <div className={`l100-modal__header ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * ModalBody Component
 * 
 * @param {ReactNode} children - Body content
 * @param {string} className - Additional CSS classes
 */
export function ModalBody({ children, className = '', ...props }) {
  return (
    <div className={`l100-modal__body ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * ModalFooter Component
 * 
 * @param {ReactNode} children - Footer content (typically buttons)
 * @param {string} className - Additional CSS classes
 */
export function ModalFooter({ children, className = '', ...props }) {
  return (
    <div className={`l100-modal__footer ${className}`} {...props}>
      {children}
    </div>
  );
}
