import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="wrapper">
    <style jsx global>
      {`
      html  {
        height: 100%; 
      }
      body { 
        padding: 0;
        margin: 0;
        font-family: 'Open Sans',sans-serif;
        color: #2c3e50;
        background-color: #f5f5f5;
        box-sizing: border-box;
        height: 100%
      }
      main {
        padding: 50px;
      }
      * {
        box-sizing: inherit;
      }
      .wrapper {
        min-height: 100%;
        margin: 0 auto -100px; 
      }
    `}
    </style>
    <Header links={[
      { href: '/about', text: 'Про нас' },
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
