// here can be any check if need
const checkForHighlighted = item => {
  return typeof item.featured !== 'undefined' ? item.featured : false;
};

export default checkForHighlighted;