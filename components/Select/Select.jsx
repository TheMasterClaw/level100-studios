/**
 * Select Component
 * 
 * A dropdown select component for choosing from a list of options.
 * Supports single and multi-select, searchable options, and custom rendering.
 * 
 * @param {string} value - Currently selected value(s)
 * @param {Array} options - Array of {value, label, disabled?, icon?} objects
 * @param {string} placeholder - Placeholder text when no selection
 * @param {string} label - Label text above the select
 * @param {string} error - Error message to display
 * @param {boolean} disabled - Whether the select is disabled
 * @param {boolean} searchable - Enable search/filter functionality
 * @param {boolean} clearable - Show clear selection button
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {function} onChange - Callback when selection changes
 * @param {function} onSearch - Callback when search input changes (for async)
 * @param {function} renderOption - Custom option renderer
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Select.css';

export default function Select({
  value,
  options = [],
  placeholder = 'Select an option...',
  label,
  error,
  disabled = false,
  searchable = false,
  clearable = false,
  size = 'medium',
  className = '',
  onChange,
  onSearch,
  renderOption,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = searchable && searchTerm
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  }, [disabled, isOpen]);

  const handleSelect = useCallback((optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  }, [onChange]);

  const handleClear = useCallback((e) => {
    e.stopPropagation();
    onChange?.('');
    setSearchTerm('');
  }, [onChange]);

  const handleSearchChange = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch?.(term);
    setHighlightedIndex(-1);
  }, [onSearch]);

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        break;
      case 'Tab':
        setIsOpen(false);
        setSearchTerm('');
        break;
      default:
        break;
    }
  }, [isOpen, filteredOptions, highlightedIndex, handleSelect]);

  const classes = [
    'l100-select',
    `l100-select--${size}`,
    isOpen && 'l100-select--open',
    disabled && 'l100-select--disabled',
    error && 'l100-select--error',
    className,
  ].filter(Boolean).join(' ');

  const dropdownClasses = [
    'l100-select__dropdown',
    isOpen && 'l100-select__dropdown--open',
  ].filter(Boolean).join(' ');

  return (
    <div className="l100-select-wrapper">
      {label && (
        <label className="l100-select__label" id={`${label}-label`}>
          {label}
        </label>
      )}
      
      <div
        ref={containerRef}
        className={classes}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={label ? `${label}-label` : undefined}
        aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
      >
        <div 
          className="l100-select__trigger"
          onClick={handleToggle}
        >
          {isOpen && searchable ? (
            <input
              ref={inputRef}
              type="text"
              className="l100-select__search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={placeholder}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className={`l100-select__value ${!selectedOption ? 'l100-select__value--placeholder' : ''}`}>
              {selectedOption?.icon && (
                <span className="l100-select__icon">{selectedOption.icon}</span>
              )}
              {selectedOption?.label || placeholder}
            </span>
          )}
          
          <div className="l100-select__actions">
            {clearable && value && !disabled && (
              <button
                type="button"
                className="l100-select__clear"
                onClick={handleClear}
                aria-label="Clear selection"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            <span className={`l100-select__arrow ${isOpen ? 'l100-select__arrow--open' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
        </div>

        <div className={dropdownClasses} role="listbox">
          {filteredOptions.length === 0 ? (
            <div className="l100-select__empty">No options available</div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;
              const isDisabled = option.disabled;

              return (
                <div
                  key={option.value}
                  id={`option-${index}`}
                  className={[
                    'l100-select__option',
                    isSelected && 'l100-select__option--selected',
                    isHighlighted && 'l100-select__option--highlighted',
                    isDisabled && 'l100-select__option--disabled',
                  ].filter(Boolean).join(' ')}
                  onClick={() => !isDisabled && handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                >
                  {renderOption ? (
                    renderOption(option, { isSelected, isHighlighted })
                  ) : (
                    <>
                      {option.icon && (
                        <span className="l100-select__option-icon">{option.icon}</span>
                      )}
                      <span className="l100-select__option-label">{option.label}</span>
                      {isSelected && (
                        <span className="l100-select__check">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {error && <span className="l100-select__error">{error}</span>}
    </div>
  );
}
