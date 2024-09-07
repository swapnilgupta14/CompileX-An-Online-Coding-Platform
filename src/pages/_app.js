import "../styles/global.scss";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Head from "next/head";
import { use, useEffect, useState } from "react";
import store from "../redux/store";
import { Provider } from "react-redux";
import LandingPage from "./index";
import { type } from "os";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");

      if (token) {
        setIsAuthenticated(true);
        router.push("/Home");
      } else {
        if (router.pathname !== "/") {
          router.push("/");
        }
      }
    }
  }, [router]);

  const titleMap = {
    "/Home": "Home - Compilex",
    "/Editor": "Playground - Compilex",
    "/Battleground/Battles": "Battleground - Compilex",
    "/Arena/[id]": "Arena - Compilex",
  };

  const title = titleMap[router.pathname] || "Compilex";

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="app-container">
          <div className="main-content">
            {isAuthenticated ? (
              <>
                <Sidebar index={1} />
                <Component {...pageProps} />
              </>
            ) : (
              <LandingPage setIsAuthenticated={setIsAuthenticated} />
            )}
          </div>
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
