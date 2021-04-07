import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Footer from "../components/footer";
import Heads from "next/head";
import Head from "../components/head";
import { connectToDatabase } from "../util/mongodb";
import Link from "next/link";
export default function Home(data) {
  const colors = ["red", "purple", "blue", "grey", "black"];
  data = data.data;
  const description =
    "Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.";
  const title = "Infinity | Live thousand lives in one world";
  const url = "https://www.arnavgupta.net";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags = `blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world, ${data.map(
    (data) => {
      data.title;
    }
  )}, ${data.map((data) =>
    data.tags
      .toString()
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
                    <div
                      class="thumb"
                      style={{
                        backgroundImage: `url(/api/image/${e._id})`,
                        cursor: "pointer",
                      }}
                    ></div>
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
                              "@id": `https://www.arnavgupta.net/article/${e._id}`,
                            },
                            a: "",
                            headline: e.title,
                            image: `https://www.arnavgupta.net/api/image/${e._id}`,
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
                          .split(" ")
                          .map(
                            (e) =>
                              e && (
                                <div
                                  style={{
                                    display: "inline",
                                    marginTop: "2px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <Link style={{}} href={`/tags/${e}`}>
                                      <span
                                        style={{
                                          fontSize: "11px",
                                          fontWeight: "bold",
                                          borderRadius: "5px",
                                          padding: "2px",
                                          cursor: "pointer",
                                          backgroundColor:
                                            colors[
                                              Math.floor(
                                                Math.random() * colors.length
                                              )
                                            ],
                                          color: "white",
                                        }}
                                      >
                                        {"#" + e}
                                      </span>
                                    </Link>
                                  </div>{" "}
                                </div>
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
        {data.length > 20 && (
          <div style={{ width: "95%", marginLeft: "calc(2.5%)" }}>
            <Button style={{ border: "none" }}>Previous</Button>{" "}
            <Button style={{ border: "none" }}>Next</Button>
          </div>
        )}
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
          condition: 1,
          computerProgramme: 1,
        },
      },
    ])
    .limit(20)
    .toArray();
  posts = JSON.parse(JSON.stringify(posts));
  if (posts) {
    posts.images = [];
    return { props: { data: posts } };
  } else {
    return { props: { data: [{ error: true }] } };
  }
}
