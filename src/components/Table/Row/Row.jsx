import React from 'react';
import PropTypes from 'prop-types';
import { shortenName } from './helpers';

const Row = props => {
  const { tableFields, data } = props;

  const renderField = key => {
    if (tableFields[key].visible) {
      const value =
        key === 'name' && typeof data.surname !== 'undefined'
          ? shortenName(data.name, data.surname)
          : data[key];
      return <td key={key}>{value}</td>;
    }
    return null;
  };

  return (
    <tr className={data.isHighlighted ? 'table-success' : ''}>
      {Object.keys(tableFields).map(key => renderField(key))}
    </tr>
  );
};

Row.propTypes = {
  tableFields: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

Row.defaultProps = {
  data: {}
};

export default Row;
