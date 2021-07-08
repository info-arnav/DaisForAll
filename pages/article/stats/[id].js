import Footer from "../../../components/footer";
import Head from "../../../components/head";
import { Toast, ToastBody } from "react-bootstrap";
import { Offline } from "react-detect-offline";
export default function S() {
  const description =
    "DaisForAll is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.";
  const title = "DaisForAll | Live thousand lives in one world";
  const url = "https://www.daisforall.com";
  const images = "https://www.daisforall.com/logo.png";
  const alts = "logo of the DaisForAll website";
  const imagec = "https://www.daisforall.com/logo.png";
  const altc = "logo of the DaisForAll website";
  const tags =
    "Statistics";
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
