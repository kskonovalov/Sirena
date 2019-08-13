// to get filter data
import checkForHighlighted from './checkForHighlighted';

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

      if (typeof tableFields[fieldKey].filter === 'function') {
        value = tableFields[fieldKey].filter(
          data[dataKey][fieldKey],
          data[dataKey]
        );
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
    const isHighlighted = checkForHighlighted(data[dataKey]);

    processedData.push({
      ...newFields,
      isHighlighted,
      isVisible
    });
  });
  return processedData;
};
export default processData;