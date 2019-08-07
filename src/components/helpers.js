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
  // return fetch(url, {
  //   method: 'POST',
  //   body: formData
  // });
  return fetch(url);
};
export { getDataFromApi };

// get the initials and append them to surname:
// Konovalov Konstantin Sergeevich => Konovalov K.S.
const shortenName = (name = '', surname = '') => {
  if(!name && surname) {
    return surname;
  }
  if(!name && !surname) {
    return '';
  }
  const initials = name.split(' ').reduce((prev, current) => {
    return `${prev}${current.charAt(0)}.`;
  }, '');
  return `${surname} ${initials}`;
};
export { shortenName };

// to get filter data
const processData = (data, tableFields, filters) => {
  const processedData = [];
  let isVisible;
  let value;
  let newFields;

  Object.keys(data).forEach(dataKey => {
    // check for row to be visible
    isVisible = true;
    newFields = [];
    Object.keys(tableFields).forEach(fieldKey => {
      value = data[dataKey][fieldKey];

      if(typeof(tableFields[fieldKey].filter) === 'function') {
        value = tableFields[fieldKey].filter(data[dataKey][fieldKey], data[dataKey]);
      }

      newFields[fieldKey] = value;
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
    const isHighlighted = data[dataKey].filter;

    processedData.push({
      ...newFields,
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
      const money = parseFloat(data[id].money);
      if (!Number.isNaN(money)) {
        sum += money;
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
      const money = parseFloat(data[id].money);
      if (!Number.isNaN(money)) {
        sum += money;
      }
    }
    return sum;
  }, 0);
  result = Math.round(result * 100) / 100;
  return result;
};
export { calculateHighlightedMoney };