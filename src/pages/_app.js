import { useEffect } from 'react';
import Sidebar from './Sidebar';
import '../styles/global.scss';


function MyApp({ Component, pageProps }) {
  return (
      <div className="app-container">
          <Sidebar index={1}/>
          <div className="main-content">
              <Component {...pageProps} />
          </div>
      </div>
  );
}

export default MyApp;
