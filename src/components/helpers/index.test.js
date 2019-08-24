import {
  shortenName,
  calculateTotalMoney,
  calculateHighlightedMoney,
  updDaysInDate
} from './index';

describe ('helpers: Get initials from full name test', () => {
  it('Should correctly work on my name', () => {
    const name = 'Konstantin Sergeevich';
    const surname = 'Konovalov';
    const initials = 'Konovalov K.S.';
    expect(initials).toEqual(shortenName(name, surname));
  });
  it('Should not break on null', () => {
    const name = null;
    const surname = null;
    const initials = '';
    expect(initials).toEqual(shortenName(name, surname));
  });
});

describe('helpers: calculate money tests', () => {
  const data = [
    {
      money: 100,
      isVisible: true,
      isHighlighted: true,
    },
    {
      money: 200,
      isVisible: true,
      isHighlighted: false,
    },
    {
      money: 500,
      isVisible: false,
      isHighlighted: true,
    },
  ];
  const totalMoney = 300;
  const totalHighlightedMoney = 100;
  it('calculateTotalMoney test', () => {
    expect(calculateTotalMoney(data)).toEqual(totalMoney);
  });
  it('calculateHighlightedMoney test', () => {
    expect(calculateHighlightedMoney(data)).toEqual(totalHighlightedMoney);
  });
});

describe('helpers: update days in date', () => {
  const date = '2019-07-27';
  it('plus one day test', () => {
    expect(updDaysInDate(date, 1, 'inc')).toEqual(new Date('2019-07-28'));
  });
  it('minus one day test', () => {
    expect(updDaysInDate(date, 1, 'dec')).toEqual(new Date('2019-07-26'));
  });
  it('should move to next month if need', () => {
    expect(updDaysInDate(date, 10, 'inc')).toEqual(new Date('2019-08-06'));
  });
});