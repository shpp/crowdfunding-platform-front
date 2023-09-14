import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useTranslations } from 'next-intl';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const t = useTranslations('header');
  return (
    <div className="wrapper">
      <Header
        links={[
          { href: '/about', text: t('about') },
          { href: '/', text: t('projects') },
          { href: { pathname: '/', query: { filter: 'completed' } }, text: t('completed') },
          { href: '#contacts', text: t('contacts') },
        ]}
      />
      <main>{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
