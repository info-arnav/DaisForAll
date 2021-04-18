import axios from "axios";
import { useEffect, useState } from "react";
import Heads from "next/head";
import Head from "../components/head";
import Jwt from "njwt";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import jwt from "njwt";
import Footer from "../components/footer";
import DOMPurify from "dompurify";
import {
  Button,
  Form,
  Modal,
  Spinner,
  Toast,
  ToastBody,
} from "react-bootstrap";
import { Offline } from "react-detect-offline";
import Link from "next/link";
import Image from "next/image";
export default function User() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(false);
  const [status, setStatus] = useState("loggedOut");
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState({});
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      Jwt.verify(
        localStorage.getItem("userData"),
        "ArnavGod30080422020731017817087571441",
        "HS512",
        function (err, verifiedJwt) {
          if (err) {
            localStorage.removeItem("userData");
            setStatus("loggedOut");
            router.push("/");
          } else {
            setStatus("loggedIn");
            Promise.all([
              axios
                .post(`api/bookmarks`, {
                  username: verifiedJwt.body[0].username,
                })
                .then((e) => {
                  setData(e.data);
                  setUsername(verifiedJwt.body[0].username);
                }),
            ]);
          }
        }
      );
    } else {
      setStatus("loggedOut");
      router.push("/");
    }
  }, []);
  const colors = [
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
  ];
  const description =
    "Check out the posts thaat you ad saved for reading later";
  const title = `DaisForAll | Bookmarks`;
  const url = `https://www.daisforall.com/bookmarks`;

  const images = "https://www.daisforall.com/logo.png";
  const alts = "logo of the DaisForAll website";
  const imagec = `https://www.daisforall.com/logo.png`;
  const altc = `logo of infinity`;
  const router = useRouter();
  const tag = `blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world, posts, followers, following,${username},`;
  const card = "summary_large_image";
  useEffect(() => {
    if (data && data.error) {
      router.push("/page_does_not_exist");
    }
    if (localStorage.getItem("userData")) {
      Jwt.verify(
        localStorage.getItem("userData"),
        "ArnavGod30080422020731017817087571441",
        "HS512",
        async function (err, verifiedJwt) {}
      );
    }
  }, [data]);
  return (
    <div>
      <Heads>
        <script
          key={-2}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: username,
            }),
          }}
        ></script>
      </Heads>
      <Head
        description={description}
        title={title}
        url={url}
        images={images}
        alts={alts}
        imagec={imagec}
        altc={altc}
        tags={tag}
        card={card}
      ></Head>
      <main>
        {!data ? (
          <div style={{ position: "relative", width: "100" }}>
            <center>
              <img
                src="/loading.webp"
                width="100%"
                style={{
                  maxWidth: "763px",
                }}
              ></img>
            </center>
          </div>
        ) : (
          <div>
            <div id="columns" style={{ breakInside: "avoid" }}>
              {data &&
                data.map((e) => (
                  <div class="item-2" style={{ borderRadius: "20px" }}>
                    <div class="card" style={{ borderRadius: "20px" }}>
                      <Link
                        style={{ cursor: "pointer" }}
                        href={`/article/${e._id}`}
                      >
                        <img
                          class="thumb"
                          alt={e.imageDescription}
                          data-src={`/api/image/${e._id}`}
                          src={e.compressed}
                          class="lazyload blur-up"
                          width={"100%"}
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                      <article>
                        <Heads>
                          <div></div>
                          <script
                            key={e._id}
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                              __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Article",
                                mainEntityOfPage: {
                                  "@type": "WebPage",
                                  "@id": `https://www.daisforall.com/article/${e._id}`,
                                },
                                a: "",
                                headline: e.title,
                                image: `https://www.daisforall.com/api/image/${e._id}`,
                                datePublished: e.dateCreated,
                                dateModified: e.dateUpdated,
                                author: {
                                  "@type": "Person",
                                  name: e.username,
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
                          {e.tags &&
                            e.tags
                              .toString()
                              .split("#")
                              .join(" ")
                              .split(" ")
                              .map(
                                (e) =>
                                  e && (
                                    <Link style={{}} href={`/tags/${e}`}>
                                      <div
                                        className="important"
                                        style={{
                                          display: "inline-flex",
                                          margin: "2px",

                                          borderRadius: "5px",
                                          padding: "5px",
                                          cursor: "pointer",
                                          backgroundColor:
                                            colors[
                                              e.toLowerCase().charCodeAt(1) - 96
                                            ],
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
                                    </Link>
                                  )
                              )}
                        </div>
                        <Link
                          style={{ cursor: "pointer" }}
                          href={`/article/${e._id}`}
                        >
                          <h1
                            style={{ cursor: "pointer", marginBottom: "2px" }}
                          >
                            {e.title}
                          </h1>
                          {}
                          {}
                        </Link>
                        <div style={{ marginBottom: "7px" }}>
                          <b>
                            <Link href={`/user/${e.username}`}>
                              {e.username.charAt(0).toUpperCase() +
                                e.username.slice(1)}
                            </Link>
                          </b>
                        </div>
                        <Link
                          style={{ cursor: "pointer" }}
                          href={`/article/${e._id}`}
                        >
                          <span
                            style={{ marginBottom: "10px", cursor: "pointer" }}
                          >
                            {" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: e.blog
                                  .split("newPage")[0]
                                  .toString()
                                  .trimLeft()
                                  .replace(/<[^>]*>/g, "")
                                  .slice(0, 160),
                              }}
                            ></span>
                            .....
                          </span>
                        </Link>
                        <div style={{ fontSize: "12px" }}>
                          {parseInt(
                            e.blog
                              .split("newPage")
                              .toString()
                              .replace(/<[^>]*>/g, "").length / 1000
                          )}{" "}
                          min read
                        </div>
                      </article>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <br></br>
      </main>
      <Footer></Footer>
    </div>
  );
}
