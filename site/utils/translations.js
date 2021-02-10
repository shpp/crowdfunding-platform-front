const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'uk',
  otherLanguages: ['en'],
  serverLanguageDetection: false,
  localeSubpaths: {
    en: 'en'
  }
});
