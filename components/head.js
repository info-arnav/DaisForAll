import Heads from "next/head";

export default function Head({
  description,
  title,
  url,
  images,
  alts,
  imagec,
  altc,
  tags,
  card,
}) {
  tags = tags;
  return (
    <Heads>
      <link
        rel="alternate"
        href="https://www.daisforall.com"
        hreflang="x-default"
      />
      <link
        rel="alternate"
        href="https://www.daisforall.com"
        hreflang="en-us"
      />
      <link
        rel="alternate"
        href="https://www.infinity.cyou/en-nl/"
        hreflang="en-nl"
      />
      <link
        rel="alternate"
        href="https://www.arnavgupta.net/en-nl/"
        hreflang="en-nl"
      />
      <link
        rel="alternate"
        href="https://www.passionatebloggers.me/en-nl/"
        hreflang="en-nl"
      />
      <link
        rel="alternate"
        href="https://www.daisonline.com/en-nl/"
        hreflang="en-nl"
      />
      <link
        rel="alternate"
        href="https://www.daisforall.in/en-in/"
        hreflang="en-in"
      />
      <script
        key={-3}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            url: url,
            logo: "https://www.daisforall.cyou/logo.png",
          }),
        }}
      ></script>
      <script
        key={-1}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebSite",
            colleague: [],
            image: imagec,
            name: "Arnav Gupta",
            url: url,
            sameAs: [
              "https://www.youtube.com/channel/UCzzfqCy-j9XZA5KNosqzh6w",
              "https://www.arnavgupta.net//en-nl/",
              "https://www.infinity.cyou//en-nl/",
              "https://www.daisforall.com/",
              "https://www.daisonline.com/en-nl/",
              "ananyagupta.net",
              "ananya gupta",
              "anuja gupta",
              "amit gupta",
              "god",
              "veena",
              "ashok",
              "rekha",
              "kailash",
              "gaurav",
              "reyansh",
              "priyajan",
              "https://www.daisforall.in//en-in/",
              "https://www.passionatebloggers.me/en-nl/",
              "https://www.instagram.com/infinity.newtech/",
              "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
              "https://www.facebook.com/infinity.newTechnology",
              "https://twitter.com/infinityNewTech",
            ],
          }),
        }}
      />
      <title key="0">{title}</title>
      <meta key="1" name="description" content={description} />
      <meta key="2" name="robots" content="index, follow" />
      <meta key="3" name="twitter:card" content={card || "summary"} />
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
      <meta key="14" property="og:title" content={title} />
      <meta key="15" property="og:type" content="website" />
      <meta key="16" property="og:url" content={url} />
      <meta key="17" property="og:locale" content="en_IN" />
      <meta key="19" property="og:site_name" content="DaisForAll" />
      <meta key="20" property="og:description" content={description} />
      <meta key="21" property="fb:app_id" content="478626783320499" />
      <meta key="22" property="og:region" content="IN" />
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
      <meta key="32" name="twitter:title" content={title} />
    </Heads>
  );
}
