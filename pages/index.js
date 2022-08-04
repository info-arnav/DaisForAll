import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Toast, ToastBody } from "react-bootstrap";
import Footer from "../components/footer";
import Heads from "next/head";
import Head from "../components/head";
import { connectToDatabase } from "../util/mongodb";
import { Offline } from "react-detect-offline";
import Link from "next/link";
export default function Home(data) {
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
  data = data.data;
  const description =
    "DaisForAll is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.";
  const title = "DaisForAll | Live thousand lives in one world";
  const url = "https://www.daisforall.com";
  const images = "https://www.daisforall.com/logo.png";
  const alts = "logo of the DaisForAll website";
  const imagec = "https://www.daisforall.com/logo.png";
  const altc = "logo of the DaisForAll website";
  const tags = `${data.map(
    (data) => {
      data.title;
    }
  )}, ${data.map((data) =>
    data.tags
      .toString()
      .split("#")
      .join(" ")
      .split(" ")
      .map((e) => e && e)
  )}`;
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
      <main style={{ marginBottom: "20px" }}>
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
                      <h1 style={{ cursor: "pointer", marginBottom: "2px" }}>
                        {e.title}
                      </h1>
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
                      <span style={{ marginBottom: "10px", cursor: "pointer" }}>
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
        <br></br>
        {data.length > 19 ? (
          <div style={{ width: "95%", marginLeft: "calc(2.5%)" }}>
            <Button style={{ border: "none" }}>Previous</Button>{" "}
            <Button style={{ border: "none" }}>Next</Button>
          </div>) : (<div />
        )}{" "}
      </main>
      <Footer></Footer>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
  let posts = await db
    .collection("posts")
    .aggregate([
      {
        $project: {
          blog: 1,
          title: 1,
          imageDescription: 1,
          tags: 1,
          dateUpdated: 1,
          dateCreated: 1,
          username: 1,
          compressed: 1,
          condition: 1,
          computerProgramme: 1,
        },
      },
    ])
    .limit(20)
    .toArray();
  posts = JSON.parse(JSON.stringify(posts)).reverse();
  if (posts) {
    posts.images = [];
    return { props: { data: posts } };
  } else {
    return { props: { data: [{ error: true }] } };
  }
}
