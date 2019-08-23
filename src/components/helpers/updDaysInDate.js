/**
 * move date to +1 day or -1 day
 * @param date
 * @param days
 * @param actionType
 * @returns {Date}
 */
const updDaysInDate = (date, days, actionType) => {
  const newDate = new Date(date);
  switch (actionType) {
    case 'inc':
      return new Date(newDate.setDate(newDate.getDate() + days));
    case 'dec':
      return new Date(newDate.setDate(newDate.getDate() - days));
    default:
      return newDate;
  }
};
export default updDaysInDate;
