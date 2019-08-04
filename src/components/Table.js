import React  from 'react';
import PropTypes from 'prop-types';

import Row from './Row';

const Table = props => {
  const data = props.data;
  const tableFields = props.tableFields;


  const renderHeadField = (key) => {
      if(tableFields[key]['visible']) {
        if(tableFields[key]['filterable']) {
          return <th key={key}>
            {tableFields[key]['name']} <input
            type='text'
            onChange={
              (e) => props.setFilters(
                {
                  [key]: e.target.value
                }
              )}/></th>;
        }
        return <th key={key}>{tableFields[key]['name']}</th>;
      }
  };


    return (
      <table className='table table-striped table-hover table-sm'>
        <thead>
        <tr>
          {Object.keys(tableFields).map(key => renderHeadField(key))}
        </tr>
        </thead>
        <tbody>
        {
          data.length > 0 ?
          Object.keys(data).map(key =>
            <Row key={`${key}${data[key]['bsonum']}`} tableFields={tableFields} data={data[key]} highlightedOnly={props.highlightedOnly} />
          )
            :
            <tr><td>Ничего не нашлось, попробуйте изменить условия поиска или выбрать другую дату</td></tr>
        }
        </tbody>
      </table>
    );

};

Table.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  tableFields: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default Table;
