const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  pageExtensions: ['jsx', 'js'],
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    }
    return `${new Date().getTime()}`;
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {}
};
