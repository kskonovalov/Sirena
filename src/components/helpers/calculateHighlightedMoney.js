/**
 * get money of highlighted items
 * @param data
 * @returns {number}
 */
const calculateHighlightedMoney = data => {
  const result = Object.keys(data).reduce((prev, id) => {
    let sum = prev;
    if (data[id].isVisible && data[id].isHighlighted) {
      const money = parseFloat(data[id].money);
      if (!Number.isNaN(money)) {
        sum += money;
      }
    }
    return sum;
  }, 0);
  return Math.round(result * 100) / 100;
};
export default calculateHighlightedMoney;
