import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

/**
 * Table Component - Display tabular data
 *
 * Features:
 * - Clean, accessible table markup
 * - Support for sortable columns
 * - Row selection
 * - Empty state handling
 * - Responsive design
 * - Custom cell rendering
 *
 * @example
 * // Basic table
 * <Table>
 *   <Table.Head>
 *     <Table.Row>
 *       <Table.Header>Name</Table.Header>
 *       <Table.Header>Email</Table.Header>
 *     </Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>John</Table.Cell>
 *       <Table.Cell>john@example.com</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 *
 * // Data-driven
 * <Table.Simple
 *   columns={[
 *     { key: 'name', title: 'Name' },
 *     { key: 'email', title: 'Email' },
 *   ]}
 *   data={[
 *     { name: 'John', email: 'john@example.com' },
 *   ]}
 * />
 */
const Table = ({ children, className = '', ...props }) => {
  return (
    <div className="l100-table__wrapper">
      <table className={['l100-table', className].filter(Boolean).join(' ')} {...props}>
        {children}
      </table>
    </div>
  );
};

Table.propTypes = {
  /** Table content (Head, Body) */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Table Head
 */
Table.Head = ({ children, className = '', ...props }) => (
  <thead className={['l100-table__head', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </thead>
);

Table.Head.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Table Body
 */
Table.Body = ({ children, className = '', ...props }) => (
  <tbody className={['l100-table__body', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </tbody>
);

Table.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Table Row
 */
Table.Row = ({ children, className = '', selected = false, ...props }) => {
  const classes = [
    'l100-table__row',
    selected && 'l100-table__row--selected',
    className,
  ].filter(Boolean).join(' ');

  return (
    <tr className={classes} {...props}>
      {children}
    </tr>
  );
};

Table.Row.propTypes = {
  /** Row cells */
  children: PropTypes.node.isRequired,
  /** Whether row is selected */
  selected: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Table Header Cell
 */
Table.Header = ({ children, className = '', sortable = false, sortDirection, onSort, ...props }) => {
  const classes = [
    'l100-table__header',
    sortable && 'l100-table__header--sortable',
    sortDirection && `l100-table__header--sort-${sortDirection}`,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (sortable && onSort) {
      onSort();
    }
  };

  return (
    <th className={classes} onClick={handleClick} {...props}>
      <span className="l100-table__header-content">
        {children}
        {sortable && (
          <span className="l100-table__sort-indicator">
            {sortDirection === 'asc' && '▲'}
            {sortDirection === 'desc' && '▼'}
            {!sortDirection && '⇅'}
          </span>
        )}
      </span>
    </th>
  );
};

Table.Header.propTypes = {
  /** Header content */
  children: PropTypes.node,
  /** Whether column is sortable */
  sortable: PropTypes.bool,
  /** Current sort direction */
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  /** Sort handler */
  onSort: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Table Cell
 */
Table.Cell = ({ children, className = '', ...props }) => (
  <td className={['l100-table__cell', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </td>
);

Table.Cell.propTypes = {
  /** Cell content */
  children: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Simple Data-Driven Table
 */
Table.Simple = ({ columns, data, emptyText = 'No data', className = '', ...props }) => {
  if (!data || data.length === 0) {
    return (
      <div className="l100-table__empty">
        {emptyText}
      </div>
    );
  }

  return (
    <Table className={className} {...props}>
      <Table.Head>
        <Table.Row>
          {columns.map((col) => (
            <Table.Header key={col.key}>
              {col.title}
            </Table.Header>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map((row, index) => (
          <Table.Row key={index}>
            {columns.map((col) => (
              <Table.Cell key={col.key}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

Table.Simple.propTypes = {
  /** Column definitions */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  /** Table data */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Text to show when no data */
  emptyText: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Table;
