import axios from "axios";
import { useEffect, useState } from "react";
import Heads from "next/head";
import Head from "../../components/head";
import { Col, Row, Toast, ToastBody } from "react-bootstrap";
import { Offline } from "react-detect-offline";
import Jwt from "njwt";
import parse from "html-react-parser";
import { connectToDatabase } from "../../util/mongodb";
import { useRouter } from "next/router";
import Footer from "../../components/footer";
import DOMPurify from "dompurify";
import Link from "next/link";
import { ObjectID } from "bson";
export default function Article({ data, data2 }) {
  let onLike = () => {
    data.likes.indexOf(activeUser) == -1
      ? data.likes.push(activeUser)
      : data.likes.pop(activeUser);
    sa(!a);
    axios.post("/api/likes", { username: activeUser, post: data._id });
  };
  let onBookmark = () => {
    data.bookmarks.indexOf(activeUser) == -1
      ? data.bookmarks.push(activeUser)
      : data.bookmarks.pop(activeUser);
    sb(!b);
    axios.post("/api/bookmarks-append", {
      username: activeUser,
      post: data._id,
    });
  };
  let onFollow = () => {
    data2.followers.indexOf(activeUser) == -1
      ? data2.followers.push(activeUser)
      : data2.followers.pop(activeUser);
    sf(!f);
    axios.post("/api/following", {
      user1: data.username,
      username: activeUser,
    });
  };
  const [activeUser, setActiveUser] = useState(false);
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
  data = data[0];
  const [a, sa] = useState(
    activeUser && data && data.likes && data.likes.indexOf(activeUser) != -1
  );
  const [b, sb] = useState(
    activeUser &&
      data &&
      data.bookmarks &&
      data.bookmarks.indexOf(activeUser) != -1
  );
  data2 = data2[0];
  const [f, sf] = useState(
    activeUser &&
      data2 &&
      data2.followers &&
      data2.followers.indexOf(activeUser) != -1
  );
  const [display, setDisplay] = useState(true);
  const description =
    data.blog &&
    `${data.blog
      .split("newPage")[0]
      .toString()
      .replace(/<[^>]*>/g, "")
      .slice(
        0,
        data.blog
          .split("newPage")[0]
          .toString()
          .replace(/<[^>]*>/g, "")
          .indexOf(".")
      )}.....`;
  const title = data._id && `DaisForAll | ${data.title} | ${data.username}`;
  const url = data._id && `https://www.daisforall.com/article/${data._id}`;
  const [condition, setCondition] = useState(data.conditions);
  let [current, setCurrent] = useState(0);
  const [computerProgramme, setComputerProgramme] = useState(
    data.computerProgramme
  );
  const [blog, setBlog] = useState(data.blog && data.blog.split("newPage"));
  const images = data._id && "https://www.daisforall.com/logo.png";
  const alts = data._id && "logo of the DaisForAll website";
  const imagec = data._id && `https://www.daisforall.com/api/image/${data._id}`;

  const altc = data._id && data.imageDescription;
  const router = useRouter();
  const tag =
    data._id &&
    `blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world, ${
      data.title
    },
    ${
      data.tags &&
      data.tags
        .toString()
        .split("#")
        .join(" ")
        .split(" ")
        .map((e) => e && e)
    }`;
  const card = "summary_large_image";
  useEffect(() => {
    if (data.error) {
      router.push("/page_does_not_exist");
    }
    if (localStorage.getItem("userData")) {
      Jwt.verify(
        localStorage.getItem("userData"),
        "ArnavGod30080422020731017817087571441",
        "HS512",
        async function (err, verifiedJwt) {
          if (!err) {
            setActiveUser(verifiedJwt.body[0].username);
            sa(data.likes.indexOf(verifiedJwt.body[0].username) != -1);
            sb(data.bookmarks.indexOf(verifiedJwt.body[0].username) != -1);
            sf(data2.followers.indexOf(verifiedJwt.body[0].username) != -1);
            console.log(a, f, verifiedJwt.body[0].username);
            await axios.post("/api/views", {
              post: data._id,
              user: verifiedJwt.body[0].username,
            });
          }
        }
      );
    }
  }, [condition, computerProgramme, blog, current, display]);
  return (
    <div>
      <Heads>
        <script
          key={-2}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": url,
              },
              a: "",
              headline: data.title,
              image: [imagec],
              datePublished: data.dateCreated,
              dateModified: data.dateUpdated,
              author: {
                "@type": "Person",
                name: data.username,
              },
              publisher: {
                "@type": "Organization",
                name: "DaisForAll",
                logo: {
                  "@type": "ImageObject",
                  url: images,
                },
              },
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
        <article>
          <div
            className="avoidOverflow"
            style={{ width: "90%", marginLeft: "5%" }}
          >
            <img
              style={{
                width: "100%",
                borderRadius: "20px 20px 0px 0px",
                marginBottom: "20px",
              }}
              description={data.imageDescription}
              alt={data.description}
              onError={() => consolr.log(false)}
              data-src={`/api/image/${data._id}`}
              alt={data.imageDescription}
              data-sizes="auto"
              className="lazyload blur-up"
              src={data.compressed}
            />

            <div>
              {data.tags &&
                data.tags
                  .toString()
                  .split("#")
                  .join(" ")
                  .split(" ")
                  .map(
                    (e) =>
                      e && (
                        <Link style={{}} href={`/tags/${e}`}>
                          <div
                            style={{
                              margin: "2px",
                              display: "inline-flex",
                              borderRadius: "5px",
                              padding: "5px",
                              cursor: "pointer",
                              backgroundColor:
                                colors[e.toLowerCase().charCodeAt(1) - 96],
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
                                  fontWeight: "bold",

                                  color: "white",
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
            <b>
              <h1 style={{ marginBottom: "8px" }}>{data.title}</h1>
            </b>
            <p style={{ display: "flex", alignItems: "center" }}>
              <img
                src={`/api/image/users/${data.username}`}
                height={"40"}
                style={{ borderRadius: "50%", margin: "5px" }}
              ></img>
              <p
                style={{
                  margin: "0px !important",
                  color: "black",
                  size: "12px",
                  alignItems: "center",
                  margin: "5px",
                }}
              >
                <Link
                  style={{
                    color: "black",
                    size: "12px",
                    margin: "5px",
                  }}
                  href={`/user/${data.username}`}
                >
                  <b>
                    {" "}
                    <span style={{ cursor: "pointer" }}>
                      {data.username.charAt(0).toUpperCase() +
                        data.username.slice(1)}
                    </span>
                  </b>
                </Link>{" "}
                {activeUser && activeUser != data.username && (
                  <button onClick={onFollow}>
                    <div
                      style={{
                        margin: "2px",
                        display: "inline-flex",
                        borderRadius: "5px",
                        padding: "5px",
                        cursor: "pointer",
                        backgroundColor: colors[0],
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
                            fontWeight: "bold",

                            color: "white",
                          }}
                        >
                          {activeUser && f && "Following"}
                          {activeUser && !f && "Follow"}
                        </span>
                      </div>{" "}
                    </div>
                  </button>
                )}
              </p>
              <p style={{ margin: "2px" }}>
                {activeUser && activeUser != data.username && a && (
                  <button onClick={onLike}>unlike</button>
                )}
                {activeUser && !a && <button onClick={onLike}>like</button>}
              </p>
              <p style={{ margin: "2px" }}>
                {activeUser && activeUser != data.username && b && (
                  <button onClick={onBookmark}>unBookmark</button>
                )}
                {activeUser && activeUser != data.username && !b && (
                  <button onClick={onBookmark}>Bookmark</button>
                )}
              </p>
            </p>
            <div
              className="test"
              style={{ marginBottom: "20px" }}
              dangerouslySetInnerHTML={{ __html: blog[current] }}
            ></div>
            {computerProgramme && (
              <div>
                <h6 style={{ marginBottom: "20px" }}>Programmes</h6>
                <pre
                  className="invert test"
                  dangerouslySetInnerHTML={{ __html: computerProgramme }}
                ></pre>
              </div>
            )}
            {condition && (
              <div>
                <h6 style={{ marginBottom: "20px" }}>Conitions</h6>
                <pre
                  className="test"
                  className="conditions"
                  dangerouslySetInnerHTML={{ __html: condition }}
                ></pre>
              </div>
            )}
            {blog && blog.length != 1 && (
              <div style={{ width: "100%" }}>
                <button
                  className="btn btn-4 btn-4c icon-arrow-right"
                  style={{ display: "inline" }}
                  disabled={current == 0}
                  onClick={() => setCurrent(current - 1)}
                >
                  Previous Page
                </button>{" "}
                <button
                  className="btn btn-4 btn-4c icon-arrow-right"
                  style={{ display: "inline", alignSelf: "right" }}
                  onClick={() => setCurrent(current + 1)}
                  disabled={blog.length == current + 1}
                >
                  Next page
                </button>
              </div>
            )}
            <br></br>
          </div>
        </article>
      </main>
      <Footer></Footer>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const { db } = await connectToDatabase();
  if (id.length == 24) {
    let posts, users;
    await db
      .collection("posts")
      .aggregate([
        { $match: { _id: ObjectID(id) } },
        {
          $project: {
            blog: 1,
            title: 1,
            imageDescription: 1,
            tags: 1,
            likes: 1,
            username: 1,
            dateCreated: 1,
            dateUpdated: 1,
            conditions: 1,
            bookmarks: 1,
            compressed: 1,
            computerProgramme: 1,
          },
        },
      ])
      .limit(1)
      .toArray()
      .then((e) => {
        posts = e;
        return e;
      })
      .then(async (e) => {
        await db
          .collection("userData")
          .aggregate([
            { $match: { username: e[0].username } },
            {
              $project: {
                followers: 1,
              },
            },
          ])
          .limit(1)
          .toArray()
          .then((e) => (users = e));
      });

    if (users) {
      posts = JSON.parse(JSON.stringify(posts));
      users = JSON.parse(JSON.stringify(users));
      return { props: { data: posts, data2: users } };
    } else {
      return { props: { data: [{ error: true }] } };
    }
  } else {
    return { props: { data: [{ error: true }] } };
  }
}
