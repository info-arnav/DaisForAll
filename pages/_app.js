import Navigation from "../components/navigation";
import Head from "../components/head";
import Router from "next/router";
import "../styles/cards.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import "../styles/404.css";
import "../styles/globals.css";
import { useEffect } from "react";
//loadProgressBar()
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });
function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
