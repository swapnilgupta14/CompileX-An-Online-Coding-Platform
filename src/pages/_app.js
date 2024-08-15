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

  // tempoarry fix for https issue
  useEffect(() => {
    if (location.protocol === 'https:') {
      // console.log(window.location.href);
      // console.log(location.protocol);
      // console.log(location.href);
      // console.log(location.protocol.length);
      // console.log(location.href.substring(location.protocol.length));
      location.replace(`http:${location.href.substring(location.protocol.length)}`);
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