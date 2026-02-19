import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

/**
 * Pagination Component - Navigate through paginated content
 *
 * Features:
 * - Previous/Next navigation
 * - Page number buttons
 * - Ellipsis for large page ranges
 * - Items per page selector
 * - Accessible with proper ARIA attributes
 *
 * @example
 * // Basic pagination
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 * />
 *
 * // With items per page
 * <Pagination
 *   currentPage={3}
 *   totalPages={20}
 *   itemsPerPage={10}
 *   totalItems={195}
 *   onPageChange={setPage}
 *   onItemsPerPageChange={setItemsPerPage}
 * />
 *
 * // Simple mode (just prev/next)
 * <Pagination.Simple
 *   currentPage={1}
 *   totalPages={5}
 *   onPageChange={setPage}
 * />
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
  className = '',
  ...props
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near start: show 2, 3, 4, ..., last
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end: show ..., last-3, last-2, last-1, last
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle: show ..., current-1, current, current+1, ..., last
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  return (
    <nav
      className={['l100-pagination', className].filter(Boolean).join(' ')}
      aria-label="Pagination"
      {...props}
    >
      <div className="l100-pagination__info">
        {totalItems && (
          <span className="l100-pagination__range">
            Showing {startItem}-{endItem} of {totalItems} items
          </span>
        )}
      </div>

      <div className="l100-pagination__controls">
        <button
          type="button"
          className="l100-pagination__button l100-pagination__button--prev"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>

        <div className="l100-pagination__pages" role="group" aria-label="Page numbers">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="l100-pagination__ellipsis">...{/* ellipsis */}</span>
            ) : (
              <button
                key={page}
                type="button"
                className={[
                  'l100-pagination__page',
                  page === currentPage && 'l100-pagination__page--active',
                ].filter(Boolean).join(' ')}
                onClick={() => handlePageClick(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          type="button"
          className="l100-pagination__button l100-pagination__button--next"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          Next
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {onItemsPerPageChange && (
        <div className="l100-pagination__per-page">
          <label htmlFor="items-per-page">Items per page:</label>
          <select
            id="items-per-page"
            className="l100-pagination__select"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

Pagination.propTypes = {
  /** Current active page (1-based) */
  currentPage: PropTypes.number.isRequired,
  /** Total number of pages */
  totalPages: PropTypes.number.isRequired,
  /** Page change handler */
  onPageChange: PropTypes.func.isRequired,
  /** Number of items per page */
  itemsPerPage: PropTypes.number,
  /** Total number of items */
  totalItems: PropTypes.number,
  /** Items per page change handler */
  onItemsPerPageChange: PropTypes.func,
  /** Available items per page options */
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Simple Pagination - Just prev/next buttons
 */
Pagination.Simple = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  ...props
}) => (
  <nav
    className={['l100-pagination', 'l100-pagination--simple', className].filter(Boolean).join(' ')}
    aria-label="Pagination"
    {...props}
  >
    <button
      type="button"
      className="l100-pagination__button l100-pagination__button--prev"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage <= 1}
      aria-label="Previous page"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Previous
    </button>

    <span className="l100-pagination__simple-info">
      Page {currentPage} of {totalPages}
    </span>

    <button
      type="button"
      className="l100-pagination__button l100-pagination__button--next"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
      aria-label="Next page"
    >
      Next
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </nav>
);

Pagination.Simple.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Pagination;
