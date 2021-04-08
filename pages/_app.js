import Navigation from "../components/navigation";
import Head from "../components/head";
import Router from "next/router";
import "../styles/cards.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import "../styles/404.css";
import "../styles/globals.css";
import { useEffect, useState } from "react";
//loadProgressBar()
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });
function MyApp({ Component, pageProps }) {
  const [offline, setOffline] = useState(false);
  const description = "The page is loading please wait.";
  const title = "Infinity | Loading";
  const url = "https://www.arnavgupta.net";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world";
  const card = "summary_large_image";
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.navigator.onLine == false && setOffline(true);
      window.addEventListener("offline", () => {
        setOffline(true);
      });
      window.addEventListener("online", () => {
        setOffline(false);
      });
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            //nothing as if now i guess
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);
  return (
    <div>
      <Head
        description={description}
        title={title}
        url={url}
        images={images}
        alts={alts}
        imagec={imagec}
        altc={altc}
        tags={tags}
        card={card}
      ></Head>
      <Navigation></Navigation>
      {offline && (
        <div
          className="fade toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            marginLeft: "10px",
            position: "fixed",
            marginTop: "80px",
            zIndex: "1111111",
            opacity: 1,
          }}
        >
          <div className="toast-header">
            <img
              src="/logo.webp"
              className="rounded mr-2"
              height="20"
              alt="logo of infinity"
            />
            <strong className="mr-auto">Infinity</strong>
            <small>Since you are offline I guess.</small>
          </div>
          <div className="toast-body">
            You are offline. Connect to Internet for new Feed
          </div>
        </div>
      )}
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
