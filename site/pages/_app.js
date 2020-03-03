import '../assets/empty.css';
import Router from 'next/router';
import React from 'react';
import withGA from 'next-ga';
import Head from 'next/head';
import colors from '../theme/colors';

const MyApp = ({ Component, pageProps }) => (
  <div>
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
        color: ${colors.red}
      }
      `}
    </style>
  </div>
);

export default withGA('UA-159546538-1', Router)(MyApp);
