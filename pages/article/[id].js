import axios from "axios";
import { useEffect } from "react";
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
    `blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world, ${
      data.title
    }, ${data.tags.toString()}`;
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
  });
  return (
    <div>
      <Heads>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://google.com/article",
              },
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
        <img src={`/api/image/${data._id}`} alt={data.imageDescription}></img>
        <h1>{data.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: data.blog }}></p>
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
