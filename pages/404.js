import Head from "../components/head";
export const config = { amp: true };
export default function Error404() {
  const description = "You may have landed on a wrong page.";
  const title = "Infinity | Error 404";
  const url = "https://www.arnavgupta.net/404";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world,404,error";
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
