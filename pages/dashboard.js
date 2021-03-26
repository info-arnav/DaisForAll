import Head from "next/head";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "njwt";
import { Button, Form } from "react-bootstrap";
export default function Dashboard() {
  const [dataUri, setDataUri] = useState("");
  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  const onChange = (file) => {
    if (!file) {
      setDataUri("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri);
    });
  };
  const router = useRouter();
  const [value, setValue] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      jwt.verify(
        localStorage.getItem("userData"),
        "ArnavGod30080422020731017817087571441",
        "HS512",
        function (err, verifiedJwt) {
          if (err) {
            router.push("/");
          }
        }
      );
    } else {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    window.addEventListener("storage", () => {
      if (localStorage.getItem("userData")) {
        jwt.verify(
          localStorage.getItem("userData"),
          "ArnavGod30080422020731017817087571441",
          "HS512",
          function (err, verifiedJwt) {
            if (err) {
              router.push("/");
            }
          }
        );
      } else {
        router.push("/");
      }
    });
  }, []);
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };
  {
    ("");
  }
  const description =
    "Have thoughts and mind ? Just share them with everyone by posting it here.";
  const title = "Infinity | Dashboard";
  const url = "https://www.arnavgupta.net/dashboard";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: url,
              logo: imagec,
            }),
          }}
        ></script>
        <script
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
                "https://www.instagram.com/infinity.newtech/",
                "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
                "https://www.facebook.com/infinity.newTechnology",
                "https://twitter.com/infinityNewTech",
              ],
            }),
          }}
        />
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
        <meta key="14" property="og:title" content={title} />
        <meta key="15" property="og:type" content="website" />
        <meta key="16" property="og:url" content={url} />
        <meta key="17" property="og:locale" content="en_IN" />
        <meta key="19" property="og:site_name" content="Infinity" />
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
      </Head>
      <div style={{ width: "97%", marginLeft: "calc(calc(100% - 97%) / 2)" }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Blog</Form.Label>
            <Editor
              initialValue="<p>This is the initial content of the editor</p>"
              apiKey="pj9jgbi5jyqo7yzpy2wllqiw91bjvhm43wc8ug5ttzxg6wug"
              init={{
                height: 600,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                branding: false,
              }}
              onEditorChange={handleEditorChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" placeholder="Tags" required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Image Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image Description"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Image</Form.Label>
            <Form.Control
              onChange={(event) => onChange(event.target.files[0] || null)}
              type="file"
              accept=".png, .jpg, jpeg, .svg, .webp"
              placeholder="Image"
              required
            />
          </Form.Group>
          <Form.Group>
            {dataUri ? (
              <img
                src={dataUri}
                onError={() => setDataUri("")}
                style={{ width: "100%" }}
              ></img>
            ) : (
              <img
                src={"/default.jpg"}
                onError={() => setDataUri("")}
                style={{ width: "100%" }}
              ></img>
            )}
          </Form.Group>
          <Form.Group>
            <Button type="submit" style={{ width: "100%" }}>
              POST
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
