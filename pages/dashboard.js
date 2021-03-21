import Head from "next/head";

export default function Dashboard() {
  const description =
    "Have thoughts and mind ? Just share them with everyone by posting it here.";
  const title = "Infinity | Dashboard";
  const url = "https://www.arnavgupta.net";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post,dashboard, live thousand lives in one world,new, blog, new blog";
  const card = "summary_large_image";
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta key="1" name="description" content={description} />
        <meta key="2" name="robots" content="index, follow" />
        <meta key="3" name="twitter:card" content="summary" />
        <meta key="4" name="twitter:site" content="@infinityNewTech" />
        <meta key="5" name="twitter:creator" content="@infinityNewTech" />
        <meta key="6" name="twitter:description" content={description} />
        <meta key="7" name="twitter:image" content={imagec} />
        <meta key="8" name="twitter:image:alt" content={altc} />
        <meta key="9" property="og:url" content={url} />
        <meta key="10" property="og:title" content={title} />
        <meta key="11" property="og:description" content={description} />
        <meta key="12" property="og:image" content={imagec} />
        <meta key="13" property="og:image:alt" content={altc} />
        <meta key="14" name="og:title" content={title} />
        <meta key="15" name="og:type" content="Website" />
        <meta key="16" name="og:url" content={url} />
        <meta key="17" name="og:locale" content="en_IN" />
        <meta key="19" name="og:site_name" content="Infinity" />
        <meta key="20" name="og:description" content={description} />
        <meta key="21" name="fb:page_id" content="174651797681602" />
        <meta key="22" name="og:region" content="IN" />
        <meta key="23" name="copyright" content="Infinity" />
        <meta key="24" name="keywords" content={tags} />
        <meta key="25" name="url" content={url} />
        <meta key="26" property="og:locale" content="en_IN" />
        <meta
          key="27"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta key="28" name="theme-color" content="#000000" />
        <link key="29" rel="apple-touch-icon" type="image/png" href={images} />
        <link key="30" rel="manifest" href="/manifest.json" />
        <link key="31" rel="icon" href="/favicon.ico" alt={alts} />
      </Head>
    </div>
  );
}
