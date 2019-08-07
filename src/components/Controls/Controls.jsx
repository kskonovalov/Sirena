import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker/es';
import { selectLimits } from '../../config';

const Controls = props => {
  const {
    setLimit,
    limit,
    date,
    setDate,
    highlightedOnly,
    toggleHighlightedOnly
  } = props;
  return (
    <div className={`alert alert-secondary col-12}`}>
      <label htmlFor="setLimit">
        Load{' '}
        <select
          onChange={e => {
            const newLimit = e.target.value;
            setLimit(parseInt(newLimit, 10));
          }}
          id="setLimit"
          defaultValue={limit}
        >
          {selectLimits.map(el => (
            <option key={el.value} value={el.value}>
              {el.label}
            </option>
          ))}
        </select>{' '}
        entries from DB{' '}
      </label>{' '}
      from{' '}
      <DatePicker
        selected={date}
        onChange={value => setDate(value)}
        dateFormat="yyyy-MM-dd"
        timeFormat=""
      />{' '}
      and{' '}
      <input
        type="button"
        value={
          highlightedOnly ? 'Show all' : 'Show by filters'
        }
        onClick={() => {
          toggleHighlightedOnly(!highlightedOnly);
        }}
      />
    </div>
  );
};

Controls.propTypes = {
  setLimit: PropTypes.func.isRequired,
  limit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
  highlightedOnly: PropTypes.bool,
  toggleHighlightedOnly: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  limit: '-1',
  date: new Date(),
  highlightedOnly: false,
};

export default Controls;
