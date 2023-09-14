import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="wrapper">
    <Header links={[
      { href: '/help', text: 'Про нас' },
      { href: '/', text: 'Проекти' },
      { href: { pathname: '/', query: { filter: 'completed' } }, text: 'Вже зібрали' },
      { href: '#contacts', text: 'Контакти' },
    ]}
    />
    <main>{children}</main>
    <Footer />
    <ToastContainer />
  </div>
);

export default Layout;
