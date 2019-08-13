// get the initials
// Konstantin Sergeevich => K.S.
const getInitials = (name) => name.split(' ').reduce((prev, current) => {
  return `${prev}${current.charAt(0)}.`;
}, '');
export { getInitials }

// get the initials and append them to surname:
// Konovalov Konstantin Sergeevich => Konovalov K.S.
const shortenName = (name = '', surname = '') => {
  if (!name && surname) {
    return surname;
  }
  if (!name && !surname) {
    return '';
  }
  const initials = getInitials(name);
  return `${surname} ${initials}`;
};
export default shortenName;