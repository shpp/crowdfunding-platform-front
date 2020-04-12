import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => (
  <div>
    <style jsx global>
      {`
      body { 
        padding: 0;
        margin: 0;
        font-family: 'Open Sans',sans-serif;
        color: #2c3e50;
        background-color: #f5f5f5;
        box-sizing: border-box;
      }
      main {
        padding: 50px;
      }
      * {
        box-sizing: inherit;
      }
    `}
    </style>
    <Head>
      <title>Ш++ збір коштів | Адміністрування </title>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
    </Head>
    <Header links={[
      { href: '/admin/project/add', text: 'Додати' },
      { href: '/admin/projects', text: 'Проекти' },
      { href: '/admin/transactions', text: 'Транзакції' },
    ]}
    />
    <main>{children}</main>
    <Footer />
    <ToastContainer />
  </div>
);

export default Layout;
