import axios from "axios";
import { useEffect } from "react";
import Head from "../../components/head";
export default function Article({ data }) {
  data = data[0];
  const description =
    "Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.";
  const title = `Infinity | ${data.title}`;
  const url = "https://www.arnavgupta.net";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = data.image;
  const altc = data.imageDescription;
  const tag= `blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world, ${
    data.title
  }, ${data.tags && data.tags.toString()}`;
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
