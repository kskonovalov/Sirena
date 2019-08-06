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
        Из базы загружено {count} из {total} строк. Показано {visible} из{' '}
        {count} строк.
      </p>
      <p>
        Сумма: <b>{totalMoney}</b> &#x20bd;, подходящие по фильтрам:{' '}
        <b>{highlightedMoney}</b> &#x20bd;{' '}
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
