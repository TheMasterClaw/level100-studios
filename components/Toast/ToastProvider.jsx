/**
 * ToastProvider Component
 * 
 * Context provider for application-wide toast notifications.
 * Wrap your app with ToastProvider to access toasts from anywhere via useToastContext.
 * 
 * @example
 * // In your root component:
 * import { ToastProvider } from '@level100/studios';
 * 
 * function App() {
 *   return (
 *     <ToastProvider position="top-right" maxToasts={5}>
 *       <YourApp />
 *     </ToastProvider>
 *   );
 * }
 * 
 * // In any child component:
 * import { useToastContext } from '@level100/studios';
 * 
 * function MyComponent() {
 *   const { showSuccess, showError } = useToastContext();
 *   
 *   const handleSave = async () => {
 *     try {
 *       await saveData();
 *       showSuccess('Data saved successfully');
 *     } catch (err) {
 *       showError('Failed to save data');
 *     }
 *   };
 *   
 *   return <button onClick={handleSave}>Save</button>;
 * }
 */
import React, { createContext, useContext } from 'react';
import { useToast } from './useToast';
import ToastContainer from './ToastContainer';

// Create context
const ToastContext = createContext(null);

/**
 * Hook to access toast context
 * @returns {Object} Toast context value
 * @throws {Error} If used outside of ToastProvider
 */
export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

/**
 * ToastProvider component
 * @param {ReactNode} children - Child components
 * @param {string} position - Toast container position
 * @param {number} maxToasts - Maximum number of toasts
 */
export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer
        position={position}
        maxToasts={maxToasts}
        toasts={toast.toasts}
        onDismiss={toast.dismissToast}
        onPause={() => {}}
        onResume={() => {}}
      />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
