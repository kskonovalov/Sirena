import { shortenName } from './helpers';

const nameFilter = (field, item) => {
  if (typeof item.surname !== 'undefined') {
    return shortenName(field, item.surname);
  }
  return item;
};
export { nameFilter };

const booleanFilter = field => {
  return field ? '+' : '-';
};
export { booleanFilter };

const dateMsToDateFilter = field => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(field * 1000).toLocaleDateString("en-US", options);
};
export { dateMsToDateFilter };
