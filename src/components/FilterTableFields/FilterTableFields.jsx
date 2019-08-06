import React from 'react';
import PropTypes from 'prop-types';

const FilterTableFields = props => {
  const { tableFields, updateTableFields } = props;

  const toggleField = field => {
    const newFields = {
      ...tableFields
    };
    newFields[field] = {
      ...newFields[field],
      visible: !tableFields[field].visible
    };
    updateTableFields(newFields);
  };

  return (
    <ul className="btn-group list-inline">
      {Object.keys(tableFields).map(key => (
        <li key={key} className="list-inline-item">
          <button
            type="button"
            className={`btn ${tableFields[key].visible ? 'btn-secondary active' : 'btn-light'}`}
            onClick={() => toggleField(key)}
          >{tableFields[key].name}</button>
        </li>
      ))}
    </ul>
  );
};

FilterTableFields.propTypes = {
  tableFields: PropTypes.objectOf(PropTypes.object).isRequired,
  updateTableFields: PropTypes.func.isRequired
};

export default FilterTableFields;
