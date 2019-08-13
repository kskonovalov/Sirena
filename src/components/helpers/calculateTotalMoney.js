// get total money
const calculateTotalMoney = data => {
  let result = Object.keys(data).reduce((prev, id) => {
    let sum = prev;
    if (data[id].isVisible) {
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
export default calculateTotalMoney;