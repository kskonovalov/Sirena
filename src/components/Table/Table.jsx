import React from 'react';
import PropTypes from 'prop-types';

import Row from './Row';

const Table = props => {
  const { data, tableFields, setFilters, highlightedOnly } = props;

  const renderTHeadField = key => {
    const { visible, name, filterable, exact } = tableFields[key];
    return (
      visible && (
        <th key={key}>
          {name}{' '}
          {filterable && (
            <input
              type="text"
              placeholder={exact ? `Exact ${key}` : `Part of ${key}`}
              onChange={e =>
                setFilters({
                  [key]: {
                    value: e.target.value,
                    exact: exact || false
                  }
                })
              }
            />
          )}
        </th>
      )
    );
  };

  return (
    <table className="table table-striped table-hover table-sm">
      <thead>
        <tr>{Object.keys(tableFields).map(key => renderTHeadField(key))}</tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          Object.keys(data).map(key => {
            const { isVisible, isHighlighted } = data[key];
            return (
              isVisible &&
              (!highlightedOnly || isHighlighted) && (
                <Row
                  key={`${key}${data[key].bsonum}`}
                  tableFields={tableFields}
                  data={data[key]}
                  highlightedOnly={highlightedOnly}
                />
              )
            );
          })
        ) : (
          <tr>
            <td>
              Nothing found. Try to change rules, or select different date
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  tableFields: PropTypes.objectOf(PropTypes.object).isRequired,
  setFilters: PropTypes.func.isRequired,
  highlightedOnly: PropTypes.bool
};
Table.defaultProps = {
  data: {},
  highlightedOnly: false
};

export default Table;
