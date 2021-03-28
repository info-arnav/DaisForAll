import axios from "axios";
import { useEffect } from "react";
import Head from "../../components/head";
import Jwt from "njwt";
export default function Article({ data }) {
  data = data[0];
  const description = `${data.blog
    .toString()
    .replace(/<[^>]*>/g, "")
    .slice(
      0,
      data.blog
        .toString()
        .replace(/<[^>]*>/g, "")
        .indexOf(".")
    )}.....`;
  const title = `Infinity | ${data.title} | ${data.username}`;
  const url = `https://www.arnavgupta.net/article/${data._id}`;
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = `https://www.arnavgupta.net/api/image/${data._id}`;
  const altc = data.imageDescription;
  const tag = `blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world, ${
    data.title
  }, ${data.tags && data.tags.toString()}`;
  const card = "summary_large_image";
  useEffect(() => {
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
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  let res = await fetch(`https://www.arnavgupta.net/api/data/posts/${id}`);
  let data = await res.json();
  return {
    props: { data },
  };
}
