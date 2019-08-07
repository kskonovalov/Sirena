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
