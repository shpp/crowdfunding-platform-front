import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import { withTranslation } from '../utils/translations';

const Layout = ({ children, t }) => (
  <div className="wrapper">
    <Header links={[
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

Layout.getInitialProps = async () => ({
  namespacesRequired: ['header', 'help', 'footer'],
});

export default withTranslation('header')(Layout);
