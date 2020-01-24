import Head from 'next/head';
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
      * {
        box-sizing: inherit;
      }
      .wrapper {
        min-height: 100%;
        margin: 0 auto -100px; 
      }
    `}
    </style>
    <Head>
      <title>Ш++ Crowdfunding portal</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
