import React from 'react';
import PropTypes from 'prop-types';

const FilterTableFields = props => {
  const tableFields = props.tableFields;

  const toggleField = (field) => {
    let newFields = {
      ...tableFields
    };
    newFields[field] = {
      ...newFields[field],
      visible: !tableFields[field]['visible']
    };
    props.updateTableFields(newFields);
  };

  return (
    <ul className='list-inline'>
      {Object.keys(tableFields).map(key => <li key={key} className='list-inline-item'>
        <label>
          <input type='checkbox' defaultChecked={tableFields[key]['visible'] ? 'checked' : ''} onChange={() => toggleField(key)}/>
          {tableFields[key]['name']}
        </label>
      </li>)}
    </ul>
  );
};

FilterTableFields.propTypes = {
  tableFields: PropTypes.object.isRequired,
  updateTableFields: PropTypes.func.isRequired
};

export default FilterTableFields;
