let apiUrl = '';
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:80/api/';
} else {
  apiUrl = 'https://tst.flynow.ru/sirena/api/';
}
export { apiUrl };

export const tableFieldsDefault = {
  'bsonum': {
    name: 'bsonum',
    visible: false
  },
  'name': {
    name: 'Имя',
    visible: true,
    filterable: true
  },
  'ofare': {
    name: 'ofare',
    visible: false
  },
  'amount': {
    name: 'amount',
    visible: true
  },
  'bookStamp': {
    name: 'Book Stamp',
    visible: false
  },
  'dateTime': {
    name: 'Дата',
    visible: true
  },
  'generalCarrier': {
    name: 'General carrier',
    visible: false
  },
  'optype': {
    name: 'optype',
    visible: true
  },
  'type': {
    name: 'type',
    visible: true
  },
};

export const selectLimits = [
  {
    label: 'Все',
    value: '-1'
  },
  {
    label: '10',
    value: '10'
  },
  {
    label: '25',
    value: '25'
  },
  {
    label: '100',
    value: '100'
  },
  {
    label: '500',
    value: '500'
  }
];

let defaultDate = '';
if (process.env.NODE_ENV === 'development') {
  defaultDate = new Date('2019-07-13');
} else {
  defaultDate = new Date();
}
export { defaultDate };