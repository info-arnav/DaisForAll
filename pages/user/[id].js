import axios from "axios";
import { useEffect, useState } from "react";
import Heads from "next/head";
import Head from "../../components/head";
import { connectToDatabase } from "../../util/mongodb";
import Jwt from "njwt";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import jwt from "njwt";
import Footer from "../../components/footer";
import DOMPurify from "dompurify";
import { Button, Toast, ToastBody } from "react-bootstrap";
import { Offline } from "react-detect-offline";
import Link from "next/link";
export default function User({ data, posts }) {
  let onFollow = () => {
    data.followers.indexOf(activeUser) == -1
      ? data.followers.push(activeUser)
      : data.followers.pop(activeUser);
    sf(!f);
    axios.post("/api/following", {
      user1: data.username,
      username: activeUser,
    });
  };
  const [activeUser, setActiveUser] = useState();
  let [f, sf] = useState();
  const [status, setStatus] = useState("loggedOut");
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
          } else {
            setStatus("loggedIn");
          }
        }
      );
    } else {
      setStatus("loggedOut");
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
  data = data[0];
  const description = data.profile
    ? "DaisForAll | " + data.description
    : `DaisForAll profile of ${data.username}. You can see a list of their posts, etc here.`;
  const title = data._id && `DaisForAll | ${data.username}`;
  const url = data._id && `https://www.daisforall.com/user/${data.username}`;
  const [condition, setCondition] = useState(data.conditions);
  const [disabled, setDisabled] = useState(true);
  const [computerProgramme, setComputerProgramme] = useState(
    data.computerProgramme
  );
  const images = data._id && "https://www.daisforall.com/logo.png";
  const alts = data._id && "logo of the DaisForAll website";
  const imagec = `https://www.daisforall.com/api/image/users/${data._id}`;
  const altc = `user avatar - ${data.username}`;
  const router = useRouter();
  const tag =
    data._id &&
    `${data.username},`;
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
            if (verifiedJwt.body[0].username != data.username) {
              sf(data.followers.indexOf(verifiedJwt.body[0].username) != -1);
              setActiveUser(verifiedJwt.body[0].username);
              await axios.post("/api/profile/views", {
                id: data.username,
                user: verifiedJwt.body[0].username,
              });
              setDisabled(false);
            } else {
              router.push("/your-profile");
            }
          }
        }
      );
    }
  }, [condition, computerProgramme]);
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
              name: data.name,
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
        <div class="container2">
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-4 mb-3">
                <div class="sticky">
                  <div class="card1">
                    <div class="card-body">
                      <div class="d-flex flex-column align-items-center text-center">
                        <img
                          src={`/api/image/users/${data.username}`}
                          alt="Admin"
                          class="rounded-circle"
                          width="150"
                        />
                        <div class="mt-3">
                          <h4>{data.username}</h4>
                          <br></br>
                          <h6 style={{ display: "inline-flex" }}>
                            <div
                              style={{
                                display: "inline-flex",
                                margin: "5px",
                                backgroundColor: "#80808061",
                                padding: "10px",
                                borderRadius: "20px",
                              }}
                            >
                              Posts : {posts.length}
                            </div>
                            <div
                              style={{
                                display: "inline-flex",
                                margin: "5px",
                                backgroundColor: "#80808061",
                                padding: "10px",
                                borderRadius: "20px",
                              }}
                            >
                              <a href="">
                                {" "}
                                Followers : {data.followers.length}
                              </a>
                            </div>
                            <div
                              style={{
                                display: "inline-flex",
                                margin: "5px",
                                backgroundColor: "#80808061",
                                padding: "10px",
                                borderRadius: "20px",
                              }}
                            >
                              <a href="">
                                {" "}
                                Following : {data.following.length}
                              </a>
                            </div>
                          </h6>
                          <br></br>
                          <br></br>
                          {status == "loggedIn" && (
                            <>
                              {" "}
                              <Button
                                style={{ margin: "2px" }}
                                disabled={disabled}
                                onClick={onFollow}
                              >
                                {f ? "Unfollow" : "Follow"}
                              </Button>
                              <Button
                                style={{ margin: "2px", display: "none" }}
                                disabled={disabled}
                              >
                                Message
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card1 mt-3">
                    <ul class="list-group list-group-flush">
                      {data.website && (
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <h6 class="mb-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              class="feather feather-globe mr-2 icon-inline"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="2" y1="12" x2="22" y2="12"></line>
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            Website
                          </h6>
                          <span class="text-secondary">
                            <a href={data.website}>{data.website}</a>
                          </span>
                        </li>
                      )}
                      {data.github && (
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <h6 class="mb-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              class="feather feather-github mr-2 icon-inline"
                            >
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            Github
                          </h6>
                          <span class="text-secondary">
                            <a href={data.github}>{data.github}</a>
                          </span>
                        </li>
                      )}
                      {data.twitter && (
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <h6 class="mb-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              class="feather feather-twitter mr-2 icon-inline text-info"
                            >
                              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                            </svg>
                            Twitter
                          </h6>
                          <span class="text-secondary">
                            <a href={data.twitter}>{data.twitter}</a>
                          </span>
                        </li>
                      )}
                      {data.instagram && (
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <h6 class="mb-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              class="feather feather-instagram mr-2 icon-inline text-danger"
                            >
                              <rect
                                x="2"
                                y="2"
                                width="20"
                                height="20"
                                rx="5"
                                ry="5"
                              ></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line
                                x1="17.5"
                                y1="6.5"
                                x2="17.51"
                                y2="6.5"
                              ></line>
                            </svg>
                            Instagram
                          </h6>
                          <span class="text-secondary">
                            <a href={data.instagram}>{data.instagram}</a>
                          </span>
                        </li>
                      )}
                      {data.facebook && (
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <h6 class="mb-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              class="feather feather-facebook mr-2 icon-inline text-primary"
                            >
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                            Facebook
                          </h6>
                          <span class="text-secondary">
                            <a href={data.facebook}>{data.facebook}</a>
                          </span>
                        </li>
                      )}
                      {data.linkedin && (
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <h6 class="mb-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              class="feather feather-facebook mr-2 icon-inline text-primary"
                            >
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                            Facebook
                          </h6>
                          <span class="text-secondary">
                            <a href={data.facebook}>{data.facebook}</a>
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card1 mb-3">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Full Name</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">{data.name}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Bio</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {data.profile
                          ? data.profile
                          : `${data.name} hasnt written anything here yet`}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row gutters-sm">
                  <div id="columns" style={{ breakInside: "avoid" }}>
                    {posts &&
                      posts.map((e) => (
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
                              </Heads>{" "}
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
                                                    e
                                                      .toLowerCase()
                                                      .charCodeAt(1) - 96
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
                                  style={{
                                    cursor: "pointer",
                                    marginBottom: "2px",
                                  }}
                                >
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
                                <span
                                  style={{
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                  }}
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
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  const { db } = await connectToDatabase();
  let posts = await db
    .collection("posts")
    .aggregate([
      { $match: { username: id } },
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
    .toArray();
  posts = JSON.parse(JSON.stringify(posts)).reverse();
  let users = await db
    .collection("userData")
    .aggregate([
      { $match: { username: id } },
      {
        $project: {
          username: 1,
          profile: 1,
          name: 1,
          name: 1,
          twitter: 1,
          website: 1,
          github: 1,
          compressed: 1,
          facebook: 1,
          followers: 1,
          following: 1,
          instagram: 1,
          bio: 1,
        },
      },
    ])
    .limit(1)
    .toArray();
  users = JSON.parse(JSON.stringify(users));
  if (users) {
    return {
      props: { data: users, posts: posts },
    };
  } else {
    return {
      props: { data: [{ error: true }] },
    };
  }
}
