import Head from "../components/head";

export default function About() {
  const description =
    "Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.";
  const title = "Infinity | About";
  const url = "https://www.arnavgupta.net/about";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world,about";
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
    </div>
  );
}
