// get the initials and append them to surname:
// Konovalov Konstantin Sergeevich => Konovalov K.S.
const shortenName = (name = '', surname = '') => {
  if(!name && surname) {
    return surname;
  }
  if(!name && !surname) {
    return '';
  }
  const initials = name.split(' ').reduce((prev, current) => {
    return `${prev}${current.charAt(0)}.`;
  }, '');
  return `${surname} ${initials}`;
};
export { shortenName };