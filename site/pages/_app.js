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
      .liqpay-form {
        display: none;
      }
      .text-small {
        color: #646464;
        font-size: 12px;
      }
      h2 {
        display: inline-block;
        font-size: 18px;
      }
      h3 {
        font-size: 16px;
      }
      body {
        font-size: 14px;
      }
      .container {
        max-width: 750px;
        margin: 50px auto;
        background-color: white;
        padding: 5px 20px;
        line-height: 1.75;
        position: relative;
       }
      `}

    </style>
  </div>
);

export default withGA('UA-159546538-1', Router)(MyApp);
