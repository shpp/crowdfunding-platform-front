import { i18n } from "./translations";

export function formatDate(date, lang) {
  // eslint-disable-next-line no-param-reassign
  date = new Date(date);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const yearStr =
    new Date().getFullYear() === year
      ? ""
      : `${year}${lang === "uk" ? "р." : ""}`;
  return `${day} ${i18n.t(`expiryMonths.${month}`)} ${yearStr}`;
}

export function getCloseDate(createdAt, lang) {
  const closeDate = Math.min(
    Date.now(),
    Number(new Date(createdAt)) + 1000 * 60 * 60 * 24 * 50
  );
  return formatDate(closeDate, lang);
}

export const formatMoney = (x, lang) =>
  `${new Intl.NumberFormat(lang).format(x)} ${lang === "uk" ? "грн" : "$"}`;

export const sumValues = (acc, { category, amount }) => ({
  ...acc,
  [category]: amount + (acc[category] || 0),
});

export const objToArray = (obj, keyname, valuename) =>
  Object.keys(obj).map((k) => ({
    [keyname]: k,
    [valuename]: obj[k],
  }));

export const isMobile = () =>
  typeof window !== "undefined"
    ? window.matchMedia("only screen and (max-width: 460px)").matches
    : false;
export const isTablet = () =>
  typeof window !== "undefined"
    ? window.matchMedia("only screen and (max-width: 768px)").matches
    : false;

export const kowoAge = Math.floor(
  (Date.now() - new Date("2015-02-01").getTime()) / (1000 * 60 * 60 * 24 * 365)
);
