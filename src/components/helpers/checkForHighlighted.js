/**
 * here can be any check if need
 * @param item
 * @returns {*}
 */
const checkForHighlighted = item => {
  return typeof item.featured !== 'undefined' ? item.featured : false;
};

export default checkForHighlighted;