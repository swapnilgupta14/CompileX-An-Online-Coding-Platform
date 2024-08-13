import '../styles/global.scss';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const titleMap = {
    '/Home': 'Home - Compilex',
    '/Editor': 'Playground  - Compilex',
    '/Battleground/Battles': 'Battleground  - Compilex',
    '/Arena/[id]': 'Arena - Compilex',
  };

  const title = titleMap[router.pathname] || 'Compilex';

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