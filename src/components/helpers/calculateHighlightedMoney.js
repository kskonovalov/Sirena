// get money of highlighted items
const calculateHighlightedMoney = data => {
  let result = Object.keys(data).reduce((prev, id) => {
    let sum = prev;
    if (data[id].isVisible && data[id].isHighlighted) {
      const money = parseFloat(data[id].money);
      if (!Number.isNaN(money)) {
        sum += money;
      }
    }
    return sum;
  }, 0);
  result = Math.round(result * 100) / 100;
  return result;
};
export default calculateHighlightedMoney;
