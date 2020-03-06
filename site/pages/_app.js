import Router from 'next/router';
import React from 'react';
import withGA from 'next-ga';
import Head from 'next/head';

import colors from '../theme/colors';
import '../assets/empty.css';
import 'axios-progress-bar/dist/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <Head>
      <title>Ш++ збір коштів</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="Ш++ - збір коштів" />
      <meta property="og:url" content={process.env.APP_URL} />
      <meta property="fb:app_id" content="1566470086989294" />
      <meta property="og:image" content="/cover-image.png" />
      <meta property="og:site_name" content="Підтримай++ - спільнокошт" />
      <meta property="og:description" content="Підтримай Ш++ - незалежний соціально-культурний проект у Кропивницькому." />
    </Head>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
    <style jsx global>
      {`
      .text-green {
        color: ${colors.green};
      }
      .text-danger {
        color: ${colors.red}
      }
      `}

    </style>
  </div>
);

export default withGA('UA-159546538-1', Router)(MyApp);
