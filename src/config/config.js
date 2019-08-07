import { nameFilter, booleanFilter } from '../components/fieldFilters';

export const tableFieldsConfig = {
  id: {
    name: 'ID',
    visible: false,
  },
  name: {
    name: 'Name',
    visible: true,
    filterable: true,
    filter: nameFilter
  },
  money: {
    name: 'Money',
    visible: true,
  },
  zip: {
    name: 'Zip code',
    visible: true,
    filterable: true,
    exact: true,
  },
  date: {
    name: 'Date',
    visible: true,
  },
  filter: {
    name: 'Fits by condition',
    visible: false,
    filter: booleanFilter,
  },
};

export const selectLimits = [
  {
    label: 'All',
    value: '-1',
  },
  {
    label: '10',
    value: '10',
  },
  {
    label: '25',
    value: '25',
  },
  {
    label: '100',
    value: '100',
  },
];

const apiUrl = 'money.json';
export { apiUrl };