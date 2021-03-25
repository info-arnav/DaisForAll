import Head from "next/head";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/globals.css";
import { loadProgressBar } from "axios-progress-bar";
loadProgressBar();
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
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: url,
              logo: imagec,
            }),
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              colleague: [],
              image: imagec,
              name: "Arnav Gupta",
              url: url,
              sameAs: [
                "https://www.youtube.com/channel/UCzzfqCy-j9XZA5KNosqzh6w",
                "https://www.instagram.com/infinity.newtech/",
                "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
                "https://www.facebook.com/infinity.newTechnology",
                "https://twitter.com/infinityNewTech",
              ],
            }),
          }}
        />
        <title>{title}</title>
        <meta key="1" name="description" content={description} />
        <meta key="2" name="robots" content="index, follow" />
        <meta key="3" name="twitter:card" content="summary" />
        <meta key="4" name="twitter:site" content="@infinityNewTech" />
        <meta key="5" name="twitter:creator" content="@infinityNewTech" />
        <meta key="6" name="twitter:description" content={description} />
        <meta key="7" name="twitter:image" content={imagec} />
        <meta key="8" name="twitter:image:alt" content={altc} />
        <meta key="9" property="og:url" content={url} />
        <meta key="10" property="og:title" content={title} />
        <meta key="11" property="og:description" content={description} />
        <meta key="12" property="og:image" content={imagec} />
        <meta key="13" property="og:image:alt" content={altc} />
        <meta key="14" property="og:title" content={title} />
        <meta key="15" property="og:type" content="website" />
        <meta key="16" property="og:url" content={url} />
        <meta key="17" property="og:locale" content="en_IN" />
        <meta key="19" property="og:site_name" content="Infinity" />
        <meta key="20" property="og:description" content={description} />
        <meta key="21" property="fb:app_id" content="478626783320499" />
        <meta key="22" property="og:region" content="IN" />
        <meta key="23" name="copyright" content="Infinity" />
        <meta key="24" name="keywords" content={tags} />
        <meta key="25" name="url" content={url} />
        <meta key="26" property="og:locale" content="en_IN" />
        <meta
          key="27"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta key="28" name="theme-color" content="#000000" />
        <link key="29" rel="apple-touch-icon" type="image/png" href={images} />
        <link key="30" rel="manifest" href="/manifest.json" />
        <link key="31" rel="icon" href="/favicon.ico" alt={alts} />
        <meta key="32" name="twitter:title" content={title} />
      </Head>
      <Navigation></Navigation>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer></Footer>
    </div>
  );
}
export default MyApp;
