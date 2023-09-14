import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <div>
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
      <Header
        links={pathname === '/admin/login' ? [] : [
          { href: '/admin/project/add', text: 'Створити проект' },
          { href: '/admin/projects', text: 'Проекти' },
          { href: '/admin/transactions', text: 'Транзакції' },
          { href: '/admin/subscriptions', text: 'Підписки' },
        ]}
        brand="Підтримай"
      />
      <main>{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
