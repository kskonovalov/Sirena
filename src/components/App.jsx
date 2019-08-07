import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import 'react-datepicker/dist/react-datepicker.css';

import Controls from './Controls';
import Stat from './Stat';
import Table from './Table';
import FilterTableFields from './FilterTableFields';

import { getApiUrl, selectLimits } from '../config';
import {
  getDataFromApi,
  getDefaultTableFields,
  processData,
  calculateTotalMoney,
  calculateHighlightedMoney
} from './helpers';

function App() {
  // cookies
  const [cookies, setCookie] = useCookies([]);
  // params sent to api
  // limit
  const defaultLimit = cookies.limit ? cookies.limit : selectLimits[0].value;
  const [limit, setLimit] = useState(defaultLimit);
  // save limit to cookie
  useEffect(() => {
    setCookie('limit', limit);
  }, [limit, setCookie]);

  // date
  const defaultDate = cookies.date ? new Date(cookies.date) : new Date();
  const [date, setDate] = useState(defaultDate);
  // save date to cookie
  useEffect(() => {
    setCookie('date', date);
  }, [date, setCookie]);

  // raw data from api
  const [data, setData] = useState([]);

  // updated data
  const [processedData, setProcessedData] = useState([]);
  const [filters, setFilters] = useState({});

  // some data stats received from api
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  // money summ
  const [totalMoney, setTotalMoney] = useState(0);
  const [highlightedMoney, setHighlightedMoney] = useState(0);

  // display highlighted only
  const defaultHighlighted =
    cookies.highlightedOnly && cookies.highlightedOnly === 'true';
  const [highlightedOnly, toggleHighlightedOnly] = useState(defaultHighlighted);
  // save 'highlightedOnly' flag to cookie
  useEffect(() => {
    setCookie('highlightedOnly', highlightedOnly);
  }, [highlightedOnly, setCookie]);

  // table columns to display
  const defaultTableFields = getDefaultTableFields(cookies);
  const [tableFields, updateTableFields] = useState(defaultTableFields);
  // save date to cookie
  // useEffect(() => {
  //   setCookie('defaultTableFields', tableFields);
  // }, [tableFields, setCookie]);

  // run 'get data from api' method
  useEffect(() => {
    // clear current data
    setData([]);
    setTotal(0);
    setCount(0);
    // save date to cookie
    setCookie('date', date);
    (async () => {
      const result = await getDataFromApi(getApiUrl(), limit, date);
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
    setProcessedData(processData(data, tableFields, filters));
  }, [tableFields, data, filters]);

  // get stats of money
  useEffect(() => {
    // total money
    setTotalMoney(calculateTotalMoney(processedData));
    // highlighted money
    setHighlightedMoney(calculateHighlightedMoney(processedData));
  }, [processedData]);

  const visible = processedData.reduce((sum, item) => {
    return item.isVisible && (!highlightedOnly || item.isHighlighted)
      ? sum + 1
      : sum;
  }, 0);
  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-3">
          <h1>Sirena</h1>
        </div>
        <div className="alert alert-info col-5 text-center">
          Demo project!
        </div>
        <div className="col-12">
          <Controls
            setLimit={setLimit}
            limit={limit}
            date={date}
            setDate={setDate}
            highlightedOnly={highlightedOnly}
            toggleHighlightedOnly={toggleHighlightedOnly}
          />
          <Stat
            count={count}
            total={total}
            visible={visible}
            totalMoney={totalMoney}
            highlightedMoney={highlightedMoney}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          Display/hide columns:{' '}
          <FilterTableFields
            tableFields={tableFields}
            updateTableFields={updateTableFields}
          />
          <Table
            data={processedData}
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
