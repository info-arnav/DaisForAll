import Heads from "../components/head";
import Link from "next/link";
import Router from "next/router";
import "../styles/cards.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "../styles/profile.css";
import NProgress from "nprogress";
import "../styles/404.css";
import "lazysizes";
import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-dom";
import dynamic from "next/dynamic";
import jwt from "njwt";
import Dropdowns from "../components/forNavigation/dropdownClosed";
import Ddo from "../components/forNavigation/dropdownopen";
import Signed from "../components/forNavigation/signed";
import Unsigned from "../components/forNavigation/unsigned";
import { Button, Modal } from "react-bootstrap";
import Footer from "../components/footer";

//loadProgressBar()
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });
function MyApp({ Component, pageProps }) {
  useEffect(() => {}, [search]);
  const colors = [
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
  ];
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [status, setStatus] = useState(false);
  const searchClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
  );
  const Hit = ({ hit }) => (
    <div class="card" style={{ borderRadius: "20px" }}>
      <a style={{ cursor: "pointer" }} href={`/article/${hit._id}`}>
        <img
          class="thumb"
          alt={hit.imageDescription}
          data-src={hit.image}
          src={`/api/image/lower/${hit._id}`}
          class="lazyload blur-up"
          width={"100%"}
          style={{
            cursor: "pointer",
          }}
        />
      </a>
      <article>
        <Heads>
          <div></div>

          <script
            key={hit._id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://www.daisforall.com/article/${hit._id}`,
                },
                a: "",
                headline: hit.title,
                image: `https://www.daisforall.com/api/image/${hit._id}`,
                datePublished: hit.dateCreated,
                dateModified: hit.dateUpdated,
                author: {
                  "@type": "Person",
                  name: hit.username,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Infinity",
                  logo: {
                    "@type": "ImageObject",
                    url: images,
                  },
                },
              }),
            }}
          ></script>
        </Heads>
        <div style={{ marginBottom: "10px" }}>
          {hit.tags &&
            hit.tags
              .toString()
              .split("#")
              .join(" ")
              .split(" ")
              .map(
                (e) =>
                  e && (
                    <a style={{}} href={`/tags/${e}`}>
                      <div
                        className="important"
                        style={{
                          display: "inline-flex",
                          margin: "2px",

                          borderRadius: "5px",
                          padding: "5px",
                          cursor: "pointer",
                          backgroundColor:
                            colors[Math.floor(Math.random() * colors.length)],
                        }}
                      >
                        <div
                          style={{
                            display: "inline",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11px",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            {"#" + e}
                          </span>
                        </div>{" "}
                      </div>
                    </a>
                  )
              )}
        </div>
        <a style={{ cursor: "pointer" }} href={`/article/${hit._id}`}>
          <h1 style={{ cursor: "pointer", marginBottom: "2px" }}>
            {hit.title}
          </h1>
          {}
        </a>
        <div style={{ marginBottom: "7px" }}>
          <b>
            <a href={`/user/${hit.username}`}>
              {hit.username.charAt(0).toUpperCase() + hit.username.slice(1)}
            </a>
          </b>
        </div>
        <a style={{ cursor: "pointer" }} href={`/article/${hit._id}`}>
          <span style={{ marginBottom: "10px", cursor: "pointer" }}>
            {" "}
            <span
              dangerouslySetInnerHTML={{
                __html: hit.blog
                  .split("newPage")[0]
                  .toString()
                  .trimLeft()
                  .replace(/<[^>]*>/g, "")
                  .slice(0, 160),
              }}
            ></span>
            .....
          </span>
        </a>
        <div style={{ fontSize: "12px" }}>
          {parseInt(
            hit.blog
              .split("newPage")
              .toString()
              .replace(/<[^>]*>/g, "").length / 1000
          )}{" "}
          min read
        </div>
      </article>
    </div>
  );
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      jwt.verify(
        localStorage.getItem("userData"),
        "ArnavGod30080422020731017817087571441",
        "HS512",
        function (err, verifiedJwt) {
          if (err) {
            localStorage.removeItem("userData");
            setStatus("loggedOut");
          } else {
            router.prefetch("/dashboard");
            setStatus("loggedIn");
          }
        }
      );
    } else {
      setStatus("loggedOut");
    }
  }, []);
  const [offline, setOffline] = useState(false);
  const description = "The page is loading please wait.";
  const title = "DaisForAll | Loading";
  const url = "https://www.daisforall.com";
  const images = "https://www.daisforall.com/logo.png";
  const alts = "logo of the DaisForAll website";
  const imagec = "https://www.daisforall.com/logo.png";
  const altc = "logo of the DaisForAll website";
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
      <InstantSearch searchClient={searchClient} indexName="dev_BLOGS">
        <Heads
          description={description}
          title={title}
          url={url}
          images={images}
          alts={alts}
          imagec={imagec}
          altc={altc}
          tags={tags}
          card={card}
        ></Heads>
        <div>
          <nav>
            <a href="/" id="image">
              <img
                id="image"
                alt="The logo of the website which showcases a symbol of infinity combined to wires"
                src="/logo.webp"
                width="60px"
                height="60px"
                style={{
                  borderRadius: "50%",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
                className="d-inline-block align-top"
              />
            </a>
            <Dropdowns status={status}></Dropdowns>
            <Ddo status={status}></Ddo>
            <SearchBox
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%" }}
              translations={{ placeholder: "Search" }}
            />
            {status &&
              (status !== "loggedIn" ? (
                <Unsigned></Unsigned>
              ) : (
                <Signed></Signed>
              ))}
          </nav>
        </div>
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
              <small>Since you are offline.</small>
            </div>
            <div className="toast-body">
              You are offline. Connect to Internet for new Feed
            </div>
          </div>
        )}

        {search ? (
          <div>
            <main>
              <Hits style={{ width: "100%" }} hitComponent={Hit}></Hits>
            </main>
            <Footer />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </InstantSearch>
    </div>
  );
}
export default MyApp;
