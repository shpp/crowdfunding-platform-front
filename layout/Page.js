import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div>
    <style jsx global>{`
      body { 
        padding: 0;
        margin: 0;
        font-family: 'Open Sans',sans-serif;
        color: #2c3e50;
        background-color: #f5f5f5;
        box-sizing: border-box;
      }
      * {
        box-sizing: inherit;
      }
    `}</style>
    <Head>
      <title>Ш++ Crowdfunding portal</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
      <Header />
      {children}
      <Footer />

  </div>
);

export default Layout;
