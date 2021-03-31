import axios from "axios";
import { useEffect, useState } from "react";
import Heads from "next/head";
import Head from "../../components/head";
import Jwt from "njwt";
import { useRouter } from "next/router";
import Footer from "../../components/footer";
export default function Article({ data }) {
  data = data[0];
  const description =
    data.blog &&
    `${data.blog
      .toString()
      .replace(/<[^>]*>/g, "")
      .slice(
        0,
        data.blog
          .toString()
          .replace(/<[^>]*>/g, "")
          .indexOf(".")
      )}.....`;
  const title = data._id && `Infinity | ${data.title} | ${data.username}`;
  const url = data._id && `https://www.arnavgupta.net/article/${data._id}`;
  const images = data._id && "https://www.arnavgupta.net/logo.png";
  const alts = data._id && "logo of the infinity website";
  const imagec = data._id && `https://www.arnavgupta.net/api/image/${data._id}`;
  const altc = data._id && data.imageDescription;
  const router = useRouter();
  const tag =
    data._id &&
    `blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world, ${data.title}`;
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
              user: data.username,
            });
          }
        }
      );
    }
  }, []);
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
                name: data.name,
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
        <div style={{ width: "90%", marginLeft: "5%" }}>
          <img
            style={{
              width: "100%",
              borderRadius: "20px",
              marginBottom: "20px",
            }}
            description={data.description}
            src={`/api/image/${data._id}`}
            alt={data.imageDescription}
          ></img>
          <b>
            <h1 style={{ marginBottom: "8px" }}>{data.title}</h1>
          </b>
          <b>
            <p style={{ color: "black", size: "30px", marginBottom: "10px" }}>
              By{" "}
              <a
                style={{ color: "black", size: "30px", marginBottom: "10px" }}
                href={`profile/${data.username}`}
              >
                {data.username}
              </a>{" "}
              on {data.dateCreated.slice(0, 10)}
            </p>
          </b>
          <div style={{ marginBottom: "20px" }}>
            <p dangerouslySetInnerHTML={{ __html: data.blog }}></p>
          </div>
          {data.computerProgramme && (
            <div>
              <h6 style={{ marginBottom: "20px" }}>Programmes</h6>
              <pre>
                <p
                  className="p"
                  style={{ color: "white" }}
                  dangerouslySetInnerHTML={{ __html: data.computerProgramme }}
                ></p>
              </pre>
            </div>
          )}
          {data.conditions && (
            <div>
              <h6 style={{ marginBottom: "20px" }}>Conitions</h6>
              <pre className="conditions">
                <p dangerouslySetInnerHTML={{ __html: data.conditions }}></p>
              </pre>
            </div>
          )}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  if (id.length == 24) {
    let res = await fetch(`https://www.arnavgupta.net/api/data/posts/${id}`);
    let data = await res.json();
    return {
      props: { data },
    };
  } else {
    return { props: { data: [{ error: true }] } };
  }
}
