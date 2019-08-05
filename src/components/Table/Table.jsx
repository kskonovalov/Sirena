import React from 'react';
import PropTypes from 'prop-types';

import Row from './Row';

const Table = props => {
  const { data, tableFields, setFilters, highlightedOnly } = props;

  const renderHeadField = key => {
    if (tableFields[key].visible) {
      if (tableFields[key].filterable) {
        return (
          <th key={key}>
            {tableFields[key].name}{' '}
            <input
              type="text"
              placeholder={
                tableFields[key].exact
                  ? `Точное значение ${key}`
                  : `Часть ${key}`
              }
              onChange={e =>
                setFilters({
                  [key]: {
                    value: e.target.value,
                    exact: tableFields[key].exact || false
                  }
                })
              }
            />
          </th>
        );
      }
      return <th key={key}>{tableFields[key].name}</th>;
    }
    return null;
  };

  return (
    <table className="table table-striped table-hover table-sm">
      <thead>
        <tr>{Object.keys(tableFields).map(key => renderHeadField(key))}</tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          Object.keys(data).map(key => (
            <Row
              key={`${key}${data[key].bsonum}`}
              tableFields={tableFields}
              data={data[key]}
              highlightedOnly={highlightedOnly}
            />
          ))
        ) : (
          <tr>
            <td>
              Ничего не нашлось, попробуйте изменить условия поиска или выбрать
              другую дату
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  tableFields: PropTypes.objectOf(
    PropTypes.object
  ).isRequired,
  setFilters: PropTypes.func.isRequired,
  highlightedOnly: PropTypes.bool
};
Table.defaultProps = {
  data: {},
  highlightedOnly: false
};

export default Table;
