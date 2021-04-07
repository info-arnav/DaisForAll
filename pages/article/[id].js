import axios from "axios";
import { useEffect, useState } from "react";
import Heads from "next/head";
import Head from "../../components/head";
import Jwt from "njwt";
import parse from "html-react-parser";
import { connectToDatabase } from "../../util/mongodb";
import { useRouter } from "next/router";
import Footer from "../../components/footer";
import DOMPurify from "dompurify";
import Link from "next/link";
import { ObjectID } from "bson";
export default function Article({ data }) {
  const colors = ["red", "purple", "blue", "grey", "black"];
  data = data[0];
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
  const title = data._id && `Infinity | ${data.title} | ${data.username}`;
  const url = data._id && `https://www.arnavgupta.net/article/${data._id}`;
  const [condition, setCondition] = useState(data.conditions);
  let [current, setCurrent] = useState(0);
  const [computerProgramme, setComputerProgramme] = useState(
    data.computerProgramme
  );
  const [blog, setBlog] = useState(data.blog && data.blog.split("newPage"));
  const images = data._id && "https://www.arnavgupta.net/logo.png";
  const alts = data._id && "logo of the infinity website";
  const imagec = data._id && `https://www.arnavgupta.net/api/image/${data._id}`;
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
            await axios.post("/api/views", {
              post: data._id,
              user: verifiedJwt.body[0].username,
            });
          }
        }
      );
    }
  }, [condition, computerProgramme, blog, current]);
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
          <div style={{ width: "90%", marginLeft: "5%" }}>
            <img
              style={{
                width: "100%",
                borderRadius: "20px 20px 0px 0px",
                marginBottom: "20px",
              }}
              description={data.imageDescription}
              src={imagec}
              loading="lazy"
              alt={data.imageDescription}
            ></img>
            <div>
              {data.tags &&
                data.tags
                  .toString()
                  .split(" ")
                  .map(
                    (e) =>
                      e && (
                        <div style={{ display: "inline" }}>
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
                                  padding: "5px",
                                  cursor: "pointer",
                                  backgroundColor:
                                    colors[
                                      Math.floor(Math.random() * colors.length)
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
            <b>
              <h1 style={{ marginBottom: "8px" }}>{data.title}</h1>
            </b>
            <b>
              <p style={{ color: "black", size: "30px", marginBottom: "10px" }}>
                {data.username && "By"}{" "}
                <Link
                  style={{ color: "black", size: "30px", marginBottom: "10px" }}
                  href={`/user/${data.username}`}
                >
                  <span style={{ cursor: "pointer" }}>
                    {data.username.charAt(0).toUpperCase() +
                      data.username.slice(1)}
                  </span>
                </Link>{" "}
                {data.dateCreated && "on"}{" "}
                {data.dateCreated && data.dateCreated.slice(0, 10)}
              </p>
            </b>
            <div style={{ marginBottom: "20px" }}>
              {blog && parse(blog[current])}
            </div>
            {computerProgramme && (
              <div>
                <h6 style={{ marginBottom: "20px" }}>Programmes</h6>
                <pre className="invert">{parse(computerProgramme)}</pre>
              </div>
            )}
            {condition && (
              <div>
                <h6 style={{ marginBottom: "20px" }}>Conitions</h6>
                <pre className="conditions">{parse(condition)}</pre>
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

export async function getServerSideProps({ params }) {
  const id = params.id;
  const { db } = await connectToDatabase();
  if (id.length == 24) {
    let posts = await db
      .collection("posts")
      .aggregate([
        { $match: { _id: ObjectID(id) } },
        {
          $project: {
            blog: 1,
            title: 1,
            imageDescription: 1,
            tags: 1,
            username: 1,
            dateCreated: 1,
            dateUpdated: 1,
            conditions: 1,
            computerProgramme: 1,
          },
        },
      ])
      .limit(1)
      .toArray();
    posts = JSON.parse(JSON.stringify(posts));
    if (posts) {
      posts.images = [];
      return { props: { data: posts } };
    } else {
      return { props: { data: [{ error: true }] } };
    }
  } else {
    return { props: { data: [{ error: true }] } };
  }
}
