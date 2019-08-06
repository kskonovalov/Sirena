import React from 'react';
import PropTypes from 'prop-types';

// get the initials: Александр Иванович => А.И,
const shortenName = (name, surname) => {
  const initials = name.split(' ').reduce((prev, current) => {
    return `${prev} ${current.charAt(0)}.`;
  }, '');
  return `${surname} ${initials}`;
};

const Row = props => {
  const { tableFields, data, highlightedOnly } = props;

  const renderField = key => {
    let value;
    if (tableFields[key].visible) {
      if (key === 'name' && typeof data.surname !== 'undefined') {
        value = shortenName(data.name, data.surname);
      } else {
        value = data[key];
      }
      return <td key={key}>{value}</td>;
    }
    return null;
  };

  return data.isVisible && (!highlightedOnly || data.isHighlighted) ? (
    <tr className={data.isHighlighted ? 'table-success' : ''}>
      {Object.keys(tableFields).map(key => renderField(key))}
    </tr>
  ) : null;
};

Row.propTypes = {
  tableFields: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  highlightedOnly: PropTypes.bool
};

Row.defaultProps = {
  data: {},
  highlightedOnly: false
};

export default Row;
