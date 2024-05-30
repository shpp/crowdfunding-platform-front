module.exports = {
  distDir: 'build',
  pageExtensions: ['jsx', 'js'],
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    SHEETS_URL: process.env.NEXT_PUBLIC_SHEETS_URL,
    HASH_SALT: process.env.NEXT_PUBLIC_HASH_SALT,
    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    ALTERNATIVE_DONATE_LINK: process.env.NEXT_PUBLIC_ALTERNATIVE_DONATE_LINK,
    GOOGLE_ANALYTICS_KEY: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    WEB_URL: process.env.WEB_URL,
    USE_COGNITO: process.env.USE_COGNITO,
  },
};
