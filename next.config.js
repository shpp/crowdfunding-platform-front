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
  env: {
    AUTH_TOKEN: 'YWRtaW46MDk3OTdkNTBhYTRiZmYwMjhhZTY1YWQ2NDQ2YjhjYzU5YzlhMDg5OTk1NmRmNjNkOWVkZTgxYmJhOTZkOGJmZA==',
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    WEB_URL: process.env.WEB_URL,
    USE_COGNITO: process.env.USE_COGNITO,
  },
};
