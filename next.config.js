module.exports = {
  distDir: '_next',
  pageExtensions: ['jsx', 'js'],
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    WEB_URL: process.env.WEB_URL,
    USE_COGNITO: process.env.USE_COGNITO,
  },
};
