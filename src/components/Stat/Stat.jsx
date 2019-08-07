import React from 'react';
import PropTypes from 'prop-types';

const Stat = props => {
  const {
    count,
    total,
    visible,
    totalMoney,
    highlightedMoney
  } = props;
  return (
    <div className={`alert alert-info col-12}`}>
      <p>
        Loaded {count} from {total} entries. Displayed {visible} from{' '}
        {count} entries.
      </p>
      <p>
        Sum: <b>{totalMoney}</b>$, fits by condition:{' '}
        <b>{highlightedMoney}</b>${' '}
      </p>
    </div>
  );
};

Stat.propTypes = {
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  total: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  visible: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  totalMoney: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  highlightedMoney: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};
Stat.defaultProps = {
  count: 0,
  total: 0,
  visible: 0,
  totalMoney: 0,
  highlightedMoney: 0
};

export default Stat;
