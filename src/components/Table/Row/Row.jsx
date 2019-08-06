import React from 'react';
import PropTypes from 'prop-types';

const Row = props => {
  const { tableFields, data } = props;

  const renderField = key => {
    if (tableFields[key].visible) {
      return <td key={key}>{data[key]}</td>;
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
