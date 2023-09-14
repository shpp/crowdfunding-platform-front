module.exports = {
  i18n: {
    defaultLocale: 'uk',
    locales: ['uk', 'en'],
    localeDetection: false
  },
  transpilePackages: ['next-intl'],
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
