import '../styles/global.scss';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const titleMap = {
    '/Home': 'Home - Compilex',
    '/Editor': 'Playground  - Compilex',
    '/Battleground/Battles': 'Battleground  - Compilex',
    '/Arena/[id]': 'Arena - Compilex',
  };

  const title = titleMap[router.pathname] || 'Compilex';

  // Temporary fix to redirect from HTTPS to HTTP
  useEffect(() => {
    if (window.location.protocol === 'https:') {
      window.location.replace(`http:${window.location.href.substring(window.location.protocol.length)}`);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app-container"></div>
      <Sidebar index={1} />
      <div className="main-content">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
