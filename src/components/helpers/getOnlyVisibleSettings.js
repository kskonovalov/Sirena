/**
 * get only visible settings for columns
 * @param tableFieldsConfig
 */
const getOnlyVisibleSettings = tableFieldsConfig => {
  const newObject = {};
  Object.keys(tableFieldsConfig).forEach(key => {
    newObject[key] = {
      visible: tableFieldsConfig[key].visible
    };
  });
  return newObject;
};
export default getOnlyVisibleSettings;