import Head from 'next/head';
import Header from './Header';

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
      * {
        box-sizing: inherit;
      }
    `}
    </style>
    <Head>
      <title>Crowdfunding admin Ш++ </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
    </Head>
    <Header />
    {children}
  </div>
);

export default Layout;
