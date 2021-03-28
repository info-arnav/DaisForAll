import Footer from "../components/footer";
import Head from "../components/head";
import Navigation from "../components/navigation";
import styles from "../styles/index.module.scss";

export default function Error({ statusCode }) {
  const description = "You may have landed on a wrong page.";
  const title = statusCode
    ? `Infinity | Error ${statusCode}`
    : "Infinity | Error 404";
  const url = "https://www.arnavgupta.net/_error";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags = `blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world, error,${statusCode}`;
  const card = "summary_large_image";
  return (
    <div>
      <Navigation></Navigation>
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
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
