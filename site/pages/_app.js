import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import NextNProgress from 'nextjs-progressbar';
import * as Sentry from '@sentry/react';

import { appWithTranslation } from 'next-i18next';

// add stylesheets with this awful way because of awful next.js
import 'axios-progress-bar/dist/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/main.css';
import '../assets/styles/card.css';
import '../assets/styles/project.css';
import '../assets/styles/help.css';
import '../assets/styles/footer.css';
import '../assets/styles/admin.css';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

// TODO: use NEXT SEO with translations
const MyApp = ({ Component, pageProps }) => (
  <>
    <DefaultSeo
      title="Ш++ збір коштів"
      description="Підтримай Ш++ - незалежний соціально-культурний проект у Кропивницькому"
      openGraph={{
        type: 'website',
        locale: 'uk',
        url: process.env.NEXT_PUBLIC_APP_URL,
        site_name: 'Ш++ збір коштів',
        description: 'Підтримай Ш++ - незалежний соціально-культурний проект у Кропивницькому',
        images: [
          { url: `${process.env.NEXT_PUBLIC_APP_URL}/cover-image.jpg` },
          { url: `${process.env.NEXT_PUBLIC_APP_URL}/cover-image-1.png` }
        ]
      }}
      twitter={{
        handle: '@shplusplus',
        site: '@shplusplus',
        cardType: 'summary_large_image',
      }}
    />
    <Head>
      <title>Ш++ збір коштів</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <script src="https://static.liqpay.ua/libjs/checkout.js" />
      <script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}`} />
      <script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}', {
          page_path: window.location.pathname,
        });`}
      </script>
    </Head>
    <NextNProgress color="#27ae60" height={2} />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </>
);

MyApp.getInitialProps = async (appContext) => {
  let pageProps = await App.getInitialProps(appContext) ?? { };

  if (appContext.Component.getInitialProps) {
    pageProps = { ...pageProps, ...await appContext.Component.getInitialProps(appContext.ctx) };
  }

  return {
    pageProps,
    namespacesRequired: ['common', 'header', 'help', 'footer']
  };
};

export const runtime = process.env.RUNTIME;

export default appWithTranslation(MyApp);
