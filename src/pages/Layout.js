// src/components/Layout.js
import { useRouter } from 'next/router';
import Head from 'next/head';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const router = useRouter();

  const titleMap = {
    '/': 'Home - Compilex',
    '/about': 'About - Compilex',
    '/contact': 'Contact - Compilex',
  };

  const title = titleMap[router.pathname] || 'Compilex';
  console.log(router.pathname);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app-container">
        <Sidebar index={1} />
        <div className="main-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
