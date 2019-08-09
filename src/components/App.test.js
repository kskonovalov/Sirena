import {
  shortenName,
  calculateTotalMoney,
  calculateHighlightedMoney
} from './helpers';

describe ('Get initials from full name test', () => {
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

describe('App component test', () => {
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
