// eslint-disable-next-line import/prefer-default-export
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
