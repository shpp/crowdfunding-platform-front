export function formatDate(date, lang) {
  const months = {
    uk: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
    en: ['of Jan.', 'of Feb.', 'of Mar.', 'of Apr.', 'of May.', 'of Jun.', 'of Jul.', 'of Aug.', 'of Sep.', 'of Oct.', 'of Nov.', 'of Dec.'],
  };
  // eslint-disable-next-line no-param-reassign
  date = new Date(date);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const yearStr = new Date().getFullYear() === year ? '' : `${year}${lang === 'uk' ? 'р.' : ''}`;
  return `${day} ${months[lang][month]} ${yearStr}`;
}

export const formatMoney = (x, lang) => `${new Intl.NumberFormat(lang).format(x)} ${lang === 'uk' ? 'грн' : '$'}`;

export const sumValues = (acc, { category, amount }) => ({
  ...acc,
  [category]: amount + (acc[category] || 0)
});

export const objToArray = (obj, keyname, valuename) => Object.keys(obj).map((k) => ({
  [keyname]: k,
  [valuename]: obj[k]
}));

export const isMobile = () => (typeof window !== 'undefined' ? window.matchMedia('only screen and (max-width: 460px)').matches : false);
export const isTablet = () => (typeof window !== 'undefined' ? window.matchMedia('only screen and (max-width: 768px)').matches : false);

export const kowoAge = Math.floor(
  (Date.now() - new Date('2015-02-01').getTime()) / (1000 * 60 * 60 * 24 * 365)
);
