import { nameFilter, booleanFilter, dateMsToDateFilter } from '../components/fieldFilters';

export const tableFieldsConfig = {
  id: {
    name: 'ID',
    visible: false,
    index: 1,
  },
  name: {
    name: 'Name',
    visible: true,
    filterable: true,
    filter: nameFilter,
    index: 2,
  },
  money: {
    name: 'Money',
    visible: true,
    index: 3,
  },
  zip: {
    name: 'Zip code',
    visible: true,
    filterable: true,
    exact: true,
    index: 4,
  },
  date: {
    name: 'Date',
    visible: true,
    filter: dateMsToDateFilter,
    index: 5,
  },
  featured: {
    name: 'Fits by condition',
    visible: false,
    filter: booleanFilter,
    index: 6,
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

const apiUrl = process.env.NODE_ENV === 'production' ? 'http://kskonovalov.me/samples/sirena/api/' : 'http://localhost:80/testapi/';

export { apiUrl };