export function formatDate(date) {
  const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
  // eslint-disable-next-line no-param-reassign
  date = new Date(date);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const yearStr = new Date().getFullYear() === year ? '' : `${year}р.`;
  return `${day} ${months[month]} ${yearStr}`;
}
export const formatMoney = (x) => `${new Intl.NumberFormat('ru-RU').format(x)} грн`;
export const isLastThreeMonths = (date) => {
  const today = new Date();
  const startOfCurrentMonth = +new Date(today.getFullYear(), today.getMonth(), 1);
  return +date >= (+startOfCurrentMonth - 3 * 31 * 24 * 60 * 60 * 1000) && +date <= startOfCurrentMonth;
};

export const sumValues = (acc, { category, amount }) => ({
  ...acc,
  [category]: amount + (acc[category] || 0)
});

export const objToArray = (obj, keyname, valuename) => Object.keys(obj).map((k) => ({
  [keyname]: k,
  [valuename]: obj[k]
}));

export function getAverageStats(rawstats, type) {
  const reports = rawstats.filter((r) => r.type === type);
  const months = new Set(reports.map(({ month }) => month)).size;
  return objToArray(reports.reduce(sumValues, {}), 'category', 'amount')
    .map((i) => ({ ...i, amount: Math.round(i.amount / months) }))
    .sort((a, b) => b.amount - a.amount);
}

export const isMobile = () => window.matchMedia('only screen and (max-width: 460px)').matches;
export const isTablet = () => window.matchMedia('only screen and (max-width: 768px)').matches;
