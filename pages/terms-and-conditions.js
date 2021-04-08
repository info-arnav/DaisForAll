import Footer from "../components/footer";
import Head from "../components/head";
import { Toast, ToastBody } from "react-bootstrap";
import { Offline } from "react-detect-offline";
export default function Tnc() {
  const description =
    "Infinity wants to be sure that you know what we are collecting from you and have therefore mentioned it all here.";
  const title = "Infinity | Terms and Conditions";
  const url = "https://www.arnavgupta.net/terms-and-conditions";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post, Terms and Conditions,Terms And Conditions, terms, consitoons, Terms, Conditions, and, And";
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
      <main>
        <Offline>
          <div
            className="fade toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style="margin-left: 10px; position: fixed; z-index: 1111111; opacity: 1;"
          >
            <div className="toast-header">
              <img
                src="/logo.webp"
                className="rounded mr-2"
                height="20"
                alt="logo of infinity"
              />
              <strong className="mr-auto">Infinity</strong>
              <small>Since you are offline I guess.</small>
            </div>
            <div className="toast-body">
              You are offline. Connect to Internet for new Feed
            </div>
          </div>
        </Offline>
      </main>
      <Footer></Footer>
    </div>
  );
}
