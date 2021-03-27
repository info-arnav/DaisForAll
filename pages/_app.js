import Navigation from "../components/navigation";
import Footer from "../components/footer";
import Head from "../components/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "next/router";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import "../styles/globals.css";
import { loadProgressBar } from "axios-progress-bar"
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
      <main>
        <Component {...pageProps} />
      </main>
      <Footer></Footer>
    </div>
  );
}
export default MyApp;
