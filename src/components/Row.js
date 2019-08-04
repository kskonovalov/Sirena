import React  from 'react';
import PropTypes from 'prop-types';


const Row = props => {
  const tableFields = props.tableFields;
  const data = props.data;
  const highlightedOnly = props.highlightedOnly;

  const renderField = (key) => {
    let value;
    if(tableFields[key]['visible']) {
      if(key === 'name') {
        //get the initials: Александр Иванович => А.И,
        const initials = data['name'].split(' ').reduce((initials, current) => {
          return initials + current.charAt(0) + '.';
        }, '');
        value = data['surname'] + ' ' + initials;
      } else {
        value = data[key];
      }
      return <td key={key}>{value}</td>;
    }
  };

  return (
    (
      data.isVisible
      && (!highlightedOnly || data.isHighlighted)
    ) ?
    <tr className={data.isHighlighted ? 'table-success' : ''}>
      {Object.keys(tableFields).map(key => renderField(key)
      )}
    </tr>
      : null
  );
};

Row.propTypes = {
  tableFields: PropTypes.object.isRequired,
  data: PropTypes.object,
  filters: PropTypes.object
};

export default Row;
