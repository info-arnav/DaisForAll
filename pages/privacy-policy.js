import Footer from "../components/footer";
import { Toast, ToastBody } from "react-bootstrap";
import { Offline } from "react-detect-offline";
import Head from "../components/head";
export default function Pp() {
  const description =
    "Infinity wants to be sure that you know what we are collecting from you and have therefore mentioned it all here.";
  const title = "Infinity | Privacy Policy";
  const url = "https://www.arnavgupta.net/privacy-policy";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post, Privacy Policy, privacy, policy, Privacy, Policy";
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
