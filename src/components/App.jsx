import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import Table from './Table';
import FilterTableFields from './FilterTableFields';

import { apiUrl, tableFieldsConfig, selectLimits } from '../config';

// method to get data from api
const getDataFromApi = async (url, limit, date) => {
  const payload = {
    limit,
    date
  };
  const formData = new FormData();
  formData.append('json', JSON.stringify(payload));
  return fetch(url, {
    method: 'POST',
    body: formData
  });
};

function App() {
  // cookies
  const [cookies, setCookie] = useCookies();

  // params sent to api
  const defaultLimit = cookies.limit ? cookies.limit : selectLimits[0].value;
  const [limit, setLimit] = useState(defaultLimit);
  const defaultDate = cookies.date ? new Date(cookies.date) : new Date();
  const [date, setDate] = useState(defaultDate);

  // raw data from api
  const [data, setData] = useState([]);

  // updated data
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});

  // some data stats received from api
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  // money summ
  const [totalMoney, setTotalMoney] = useState(0);
  const [highlightedMoney, setHighlightedMoney] = useState(0);

  // display highlighted only
  const defaultHighlighted = cookies.highlightedOnly && cookies.highlightedOnly === 'true';
  const [highlightedOnly, toggleHighlightedOnly] = useState(defaultHighlighted);

  // table columns to display
  const defaultTableFields =
    cookies.defaultTableFields &&
    Object.keys(cookies.defaultTableFields).length === Object.keys(tableFieldsConfig).length
      ? cookies.defaultTableFields
      : tableFieldsConfig;
  const [tableFields, updateTableFields] = useState(defaultTableFields);
  useEffect(() => {
    // save date to cookie
    setCookie('defaultTableFields', tableFields);
  }, [tableFields, setCookie]);

  // run 'get data from api' method
  useEffect(() => {
    // clear current data
    setData([]);
    setTotal(0);
    setCount(0);
    // save date to cookie
    setCookie('date', date);
    (async () => {
      const result = await getDataFromApi(apiUrl, limit, date);
      const response = await result.json();
      if (typeof response.data !== 'undefined' && response.data.length > 0) {
        setData(response.data);
      }
      if (response.total) {
        setTotal(response.total);
      }
      if (response.count) {
        setCount(response.count);
      }
    })();
  }, [date, limit, setCookie]);

  // filter data
  useEffect(() => {
    const tempData = [];
    let isVisible;
    let value;
    Object.keys(data).forEach(dataKey => {
      // check for row to be visible
      isVisible = true;
      Object.keys(tableFields).forEach(fieldKey => {
        // compute name
        value = data[dataKey][fieldKey];
        if (fieldKey === 'name') {
          value += data[dataKey].surname;
        }
        // check for visible
        // if filter for this field exists
        if (typeof filters[fieldKey] !== 'undefined') {
          // if filter has 'value' field
          if (
            typeof filters[fieldKey].value !== 'undefined' &&
            filters[fieldKey].value.length > 0
          ) {
            // if filter has 'exact' field
            if (
              typeof filters[fieldKey].exact !== 'undefined' &&
              filters[fieldKey].exact
            ) {
              if (
                !(
                  value.toLowerCase().trim() ===
                  filters[fieldKey].value.toLowerCase().trim()
                )
              ) {
                isVisible = false;
              }
            } else if (
              !value
                .toLowerCase()
                .includes(filters[fieldKey].value.toLowerCase())
            ) {
              // if value contains
              isVisible = false;
            }
          }
        }
      });
      // check for row to be highlighted

      const isHighlighted =
        // условие по наличным
        // HA|CA						type
        (data[dataKey].type.includes('НА') ||
          data[dataKey].type.includes('HA')) && // in ru & en
        data[dataKey].org === '' &&
        // !99C (L)					General carrier
        data[dataKey].generalCarrier !== '99C' &&
        // 921 (R)						Book Stamp
        data[dataKey].bookStamp.match(/^921/);
      tempData.push({
        ...data[dataKey],
        isHighlighted,
        isVisible
      });
    });
    setFilteredData(tempData);
  }, [tableFields, data, filters]);

  // calculate sum of money
  useEffect(() => {
    // get total money
    let result = Object.keys(filteredData).reduce((prev, id) => {
      let sum = prev;
      if (filteredData[id].isVisible) {
        const amount = parseFloat(filteredData[id].amount);
        if (!amount.isNaN) {
          if (filteredData[id].optype === 'SALE') {
            sum += amount;
          } else if (filteredData[id].optype === 'REFUND') {
            sum -= amount;
          }
        }
      }
      return sum;
    }, 0);
    result = Math.round(result * 100) / 100;
    setTotalMoney(result);

    // get filtered money
    result = Object.keys(filteredData).reduce((prev, id) => {
      let sum = prev;
      if (filteredData[id].isVisible && filteredData[id].isHighlighted) {
        const amount = parseFloat(filteredData[id].amount);
        if (!amount.isNaN) {
          if (filteredData[id].optype === 'SALE') {
            sum += amount;
          } else if (filteredData[id].optype === 'REFUND') {
            sum -= amount;
          }
        }
      }
      return sum;
    }, 0);
    result = Math.round(result * 100) / 100;
    setHighlightedMoney(result);
  }, [filteredData]);

  const stat = (
    <div className="alert alert-secondary col-6">
      <label htmlFor="setLimit">
        Загрузить{' '}
        <select
          onChange={e => {
            const newLimit = e.target.value;
            // save limit to cookie
            setCookie('limit', newLimit);
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
        строки из базы{' '}
      </label>{' '}
      за{' '}
      <DatePicker
        selected={date}
        onChange={value => setDate(value)}
        dateFormat="yyyy-MM-dd"
        timeFormat=""
      />
      <p>
        Из базы загружено {count} из {total} строк. Показано{' '}
        {filteredData.reduce((sum, item) => {
          return item.isVisible && (!highlightedOnly || item.isHighlighted)
            ? sum + 1
            : sum;
        }, 0)}{' '}
        из {count} строк.
      </p>
    </div>
  );

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-3">
          <h1>Sirena</h1>
        </div>
        <div className="alert alert-info col-5 text-center">
          Не содержит записей TRAIN_TICKET!
        </div>
        <div className="col-12">
          {stat}
          <p>
            Сумма: <b>{totalMoney}</b> &#x20bd;, подходящие по фильтрам:{' '}
            <b>{highlightedMoney}</b> &#x20bd;{' '}
            <input
              type="button"
              value={
                highlightedOnly ? 'Показать все' : 'Показать только подходящие'
              }
              onClick={() => {
                setCookie('highlightedOnly', !highlightedOnly);
                toggleHighlightedOnly(!highlightedOnly);
              }}
            />
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          Скрыть/показать колонки:{' '}
          <FilterTableFields
            tableFields={tableFields}
            updateTableFields={updateTableFields}
          />
          <Table
            data={filteredData}
            tableFields={tableFields}
            setFilters={setFilters}
            highlightedOnly={highlightedOnly}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
