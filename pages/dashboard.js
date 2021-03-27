import Head from "../components/head";
import { Editor } from "@tinymce/tinymce-react";
import Compress from "react-image-file-resizer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "njwt";
import Resizer from "react-image-file-resizer";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
export default function Dashboard() {
  const [blog, setBlog] = useState("");
  const [validated, setValidated] = useState(false);
  const [tags, setTags] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [titles, setTitles] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [dataUri, setDataUri] = useState("");

  const onChange = (file) => {
    if (!file) {
      setDataUri("");
      return;
    }
    Resizer.imageFileResizer(
      file,
      1080,
      400,
      "WEBP",
      100,
      0,
      (uri) => {
        setDataUri(uri);
        console.log(uri);
      },
      "base64"
    );
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      setButtonLoading(true);
      axios
        .post("/api/new/posts", {
          blog: blog,
          image: dataUri,
          title: titles,
          tags: tags,
          imageDescription: imageDescription,
          username: username,
        })
        .then((e) => router.push(e.data))
        .then((E) => setButtonLoading(false))
        .catch((e) => e.response && router.push("/"));
    }
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
    setBlog(content);
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
  const tag =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post,dashboard, live thousand lives in one world,new, blog, new blog";
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
        tags={tag}
        card={card}
      ></Head>
      <div style={{ width: "97%", marginLeft: "calc(calc(100% - 97%) / 2)" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              value={titles}
              onChange={(e) => setTitles(e.target.value)}
            />
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
            <Form.Control
              type="text"
              placeholder="Tags"
              required
              value={tags}
              onChange={(e) => setTas(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Image Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image Description"
              required
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
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
            <img
              src={dataUri || "/default.webp"}
              onError={() => setDataUri("")}
              style={{ width: "100%" }}
            ></img>
          </Form.Group>
          <Form.Group>
            <Button type="submit" style={{ width: "100%", border: "none" }}>
              {buttonLoading ? <Spinner size="sm" animation="border" /> : ""}{" "}
              POST
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
