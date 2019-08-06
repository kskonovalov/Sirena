import { tableFieldsConfig } from '../config';

// table columns to display
const getDefaultTableFields = cookies => {
  // defined in cookies
  return cookies.defaultTableFields &&
    // simple check, if count of fields is the same as in config
    Object.keys(cookies.defaultTableFields).length ===
      Object.keys(tableFieldsConfig).length
    ? cookies.defaultTableFields
    : tableFieldsConfig;
};
export { getDefaultTableFields };

// to get data from api
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
export { getDataFromApi };

// to get filter data
const processData = (data, tableFields, filters) => {
  const processedData = [];
  let isVisible;
  let value;

  Object.keys(data).forEach(dataKey => {
    // check for row to be visible
    isVisible = true;
    Object.keys(tableFields).forEach(fieldKey => {
      value = data[dataKey][fieldKey];
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
            !value.toLowerCase().includes(filters[fieldKey].value.toLowerCase())
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

    processedData.push({
      ...data[dataKey],
      isHighlighted,
      isVisible
    });
  });
  return processedData;
};
export { processData };

// get total money
const calculateTotalMoney = (data) => {
  let result = Object.keys(data).reduce((prev, id) => {
    let sum = prev;
    if (data[id].isVisible) {
      const amount = parseFloat(data[id].amount);
      if (!amount.isNaN) {
        if (data[id].optype === 'SALE') {
          sum += amount;
        } else if (data[id].optype === 'REFUND') {
          sum -= amount;
        }
      }
    }
    return sum;
  }, 0);
  result = Math.round(result * 100) / 100;
  return result;
};
export { calculateTotalMoney };

// get money of highlighted items
const calculateHighlightedMoney = (data) => {
  let result = Object.keys(data).reduce((prev, id) => {
    let sum = prev;
    if (data[id].isVisible && data[id].isHighlighted) {
      const amount = parseFloat(data[id].amount);
      if (!amount.isNaN) {
        if (data[id].optype === 'SALE') {
          sum += amount;
        } else if (data[id].optype === 'REFUND') {
          sum -= amount;
        }
      }
    }
    return sum;
  }, 0);
  result = Math.round(result * 100) / 100;
  return result;
};
export { calculateHighlightedMoney };