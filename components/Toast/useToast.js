/**
 * useToast Hook
 * 
 * React hook for managing toast notifications.
 * Provides functions to show, update, and dismiss toasts.
 * 
 * @example
 * const { toasts, showToast, showSuccess, showError, showWarning, showInfo, dismissToast, dismissAll } = useToast();
 * 
 * // Show a toast
 * showToast({
 *   variant: 'success',
 *   title: 'Success!',
 *   message: 'Your changes have been saved.',
 * });
 * 
 * // Use convenience methods
 * showSuccess('Changes saved successfully');
 * showError('Failed to save changes', 'Error');
 * showWarning('Session expiring soon');
 * showInfo('New updates available');
 */
import { useState, useCallback, useRef } from 'react';

// Generate unique toast ID
const generateId = () => `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Default toast config
const defaultConfig = {
  duration: 5000,
  dismissible: true,
};

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const toastsRef = useRef(toasts);
  
  // Keep ref in sync for callback stability
  toastsRef.current = toasts;

  /**
   * Show a new toast
   * @param {Object} toast - Toast configuration
   * @returns {string} Toast ID
   */
  const showToast = useCallback((toast) => {
    const id = generateId();
    const newToast = {
      ...defaultConfig,
      ...toast,
      id,
      createdAt: Date.now(),
    };
    
    setToasts((prev) => [newToast, ...prev]);
    return id;
  }, []);

  /**
   * Show a success toast
   * @param {string} message - Toast message
   * @param {string} title - Optional title
   * @param {Object} options - Additional options
   * @returns {string} Toast ID
   */
  const showSuccess = useCallback((message, title, options = {}) => {
    return showToast({
      variant: 'success',
      title,
      message,
      ...options,
    });
  }, [showToast]);

  /**
   * Show an error toast
   * @param {string} message - Toast message
   * @param {string} title - Optional title
   * @param {Object} options - Additional options
   * @returns {string} Toast ID
   */
  const showError = useCallback((message, title, options = {}) => {
    return showToast({
      variant: 'error',
      title: title || 'Error',
      message,
      duration: 8000, // Errors stay longer
      ...options,
    });
  }, [showToast]);

  /**
   * Show a warning toast
   * @param {string} message - Toast message
   * @param {string} title - Optional title
   * @param {Object} options - Additional options
   * @returns {string} Toast ID
   */
  const showWarning = useCallback((message, title, options = {}) => {
    return showToast({
      variant: 'warning',
      title,
      message,
      duration: 7000,
      ...options,
    });
  }, [showToast]);

  /**
   * Show an info toast
   * @param {string} message - Toast message
   * @param {string} title - Optional title
   * @param {Object} options - Additional options
   * @returns {string} Toast ID
   */
  const showInfo = useCallback((message, title, options = {}) => {
    return showToast({
      variant: 'info',
      title,
      message,
      ...options,
    });
  }, [showToast]);

  /**
   * Dismiss a specific toast
   * @param {string} id - Toast ID to dismiss
   */
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Dismiss all toasts
   */
  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  /**
   * Update an existing toast
   * @param {string} id - Toast ID to update
   * @param {Object} updates - Properties to update
   */
  const updateToast = useCallback((id, updates) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  /**
   * Check if a toast with given ID exists
   * @param {string} id - Toast ID to check
   * @returns {boolean}
   */
  const hasToast = useCallback((id) => {
    return toastsRef.current.some((toast) => toast.id === id);
  }, []);

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissToast,
    dismissAll,
    updateToast,
    hasToast,
  };
}

export default useToast;
