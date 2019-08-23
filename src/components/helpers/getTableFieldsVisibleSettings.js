/**
 * table columns to display
 * get visible settings from cookies and return object with updated visibility
 * @param tableFieldsConfig
 * @param cookies
 */
const getTableFieldsVisibleSettings = (tableFieldsConfig, cookies) => {
  const newObject = {};
  Object.keys(tableFieldsConfig).forEach(key => {
    newObject[key] =
      typeof cookies.tableFieldsVisibleSettings !== 'undefined' &&
      typeof cookies.tableFieldsVisibleSettings[key] !== 'undefined' &&
      typeof cookies.tableFieldsVisibleSettings[key].visible !== 'undefined'
        ? {
          ...tableFieldsConfig[key],
          visible: cookies.tableFieldsVisibleSettings[key].visible
        }
        : tableFieldsConfig[key];
  });
  return newObject;
};

export default getTableFieldsVisibleSettings;