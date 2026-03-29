export const toBanglaNumber = (num: number | string) => {
  const en = '0123456789';
  const bn = '০১২৩৪৫৬৭৮৯';

  return num
    .toString()
    .split('')
    .map(char => (en.includes(char) ? bn[en.indexOf(char)] : char))
    .join('');
};

export default toBanglaNumber;
