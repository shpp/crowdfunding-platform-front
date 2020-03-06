import Router from 'next/router';
import React from 'react';
import withGA from 'next-ga';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

import colors from '../theme/colors';
import '../assets/empty.css';
import 'axios-progress-bar/dist/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <DefaultSeo
      openGraph={{
        type: 'website',
        locale: 'uk',
        url: process.env.APP_URL,
        site_name: 'Ш++ збір коштів',
        description: 'Підтримай Ш++ - незалежний соціально-культурний проект у Кропивницькому',
        image: '/cover-image.png'
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
    </Head>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
    <style jsx global>
      {`
      .text-green {
        color: ${colors.green};
      }
      .text-danger {
        color: ${colors.red};
      }
      a {
        color: ${colors.green};
      }
      `}

    </style>
  </div>
);

export default withGA('UA-159546538-1', Router)(MyApp);
