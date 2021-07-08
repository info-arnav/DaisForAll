import Footer from "../components/footer";
import Head from "../components/head";
import { Toast, ToastBody } from "react-bootstrap";
import { Offline } from "react-detect-offline";

export default function Blogs() {
  const description =
    "Find bloogs posted by various people here and enjoy expanding your thougts into their world.";
  const title = "DaisForAll | Blogs";
  const url = "https://www.daisforall.com/blogs";
  const images = "https://www.daisforall.com/logo.png";
  const alts = "logo of the DaisForAll website";
  const imagec = "https://www.daisforall.com/logo.png";
  const altc = "logo of the DaisForAll website";
  const tags =
    "blogs, posts";
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
      <main></main>
      <Footer></Footer>
    </div>
  );
}
