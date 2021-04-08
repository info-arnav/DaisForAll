import Footer from "../components/footer";
import Head from "../components/head";
import { Toast, ToastBody } from "react-bootstrap";
import { Offline } from "react-detect-offline";

export default function Blogs() {
  const description =
    "Find bloogs posted by various people here and enjoy expanding your thougts into their world.";
  const title = "Infinity | Blogs";
  const url = "https://www.arnavgupta.net/blogs";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world,all,global";
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
          <Toast
            style={{
              marginLeft: "10px",
              position: "fixed",
              zIndex: "1111111",
              opacity: "1",
            }}
          >
            <Toast.Header closeButton={false}>
              <img
                src="/logo.webp"
                className="rounded mr-2"
                height={20}
                alt="logo of infinity"
              />
              <strong className="mr-auto">Infinity</strong>
              <small>Since you are offline I guess.</small>
            </Toast.Header>
            <Toast.Body>
              You are offline. Connect to Internet for new Feed
            </Toast.Body>
          </Toast>
        </Offline>
        <div style={{ display: "none" }}>
          <Toast
            style={{
              marginLeft: "10px",
              position: "fixed",
              zIndex: "1111111",
              opacity: "1",
            }}
          >
            <Toast.Header closeButton={false}>
              <img
                src="/logo.webp"
                className="rounded mr-2"
                height={20}
                alt="logo of infinity"
              />
              <strong className="mr-auto">Infinity</strong>
              <small>Since you are offline I guess.</small>
            </Toast.Header>
            <Toast.Body>
              You are offline. Connect to Internet for new Feed
            </Toast.Body>
          </Toast>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
