import Head from "../components/head";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt, { verify } from "njwt";
import Resizer from "react-image-file-resizer";
import {
  Accordion,
  Button,
  Card,
  CardColumns,
  Form,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { Toast, ToastBody } from "react-bootstrap";
import { Offline } from "react-detect-offline";
import Footer from "../components/footer";
export default function Dashboard() {
  const init1 = {
    height: 200,
    branding: false,
    selector: "textarea#full-featured-non-premium",
    plugins:
      "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
    imagetools_cors_hosts: ["picsum.photos"],
    menubar: "file edit view insert format tools table help",
    toolbar:
      "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    link_list: [
      { title: "My page 1", value: "https://www.tiny.cloud" },
      { title: "My page 2", value: "http://www.moxiecode.com" },
    ],
    image_list: [
      { title: "My page 1", value: "https://www.tiny.cloud" },
      { title: "My page 2", value: "http://www.moxiecode.com" },
    ],
    image_class_list: [
      { title: "None", value: "" },
      { title: "Some class", value: "class-name" },
    ],
    importcss_append: true,
    file_picker_callback: function (callback, value, meta) {
      /* Provide file and text for the link dialog */
      if (meta.filetype === "file") {
        callback("https://www.google.com/logos/google.jpg", {
          text: "My text",
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === "image") {
        callback("https://www.google.com/logos/google.jpg", {
          alt: "My alt text",
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === "media") {
        callback("movie.mp4", {
          source2: "alt.ogg",
          poster: "https://www.google.com/logos/google.jpg",
        });
      }
    },
    templates: [
      {
        title: "New Table",
        description: "creates a new table",
        content:
          '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
      },
      {
        title: "Starting my story",
        description: "A cure for writers block",
        content: "Once upon a time...",
      },
      {
        title: "New list with dates",
        description: "New List with dates",
        content:
          '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
      },
    ],
    template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
    template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
    image_caption: true,
    quickbars_selection_toolbar:
      "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_mode: "sliding",
    contextmenu: "link image imagetools table",
    skin: "oxide",
    content_css: "default",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  };
  let copy = init1;
  copy.height = 600;
  let init2 = copy;
  const [disabled, setDisabled] = useState(false);
  const [blog, setBlog] = useState("");
  const [validated, setValidated] = useState(false);
  const [tags, setTags] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [conditions, setConditions] = useState("");
  const [computerProgramme, setCompProgramme] = useState("");
  const [titles, setTitles] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [dataUri, setDataUri] = useState("");
  const [loaded, setLoaded] = useState(false);
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
      setDisabled(true);
      axios
        .post("/api/new/posts", {
          blog: blog,
          image: dataUri,
          title: titles,
          conditions: conditions,
          computerProgramme: computerProgramme,
          tags: tags,
          imageDescription: imageDescription,
          username: username,
        })
        .then((e) => {
          router.prefetch(e.data);
          return e;
        })
        .then((e) => router.push(e.data))
        .then((E) => setButtonLoading(false))
        .then((e) => setDisabled(false))
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
            setLoaded(false);
            router.push("/");
          } else {
            setLoaded(true);
            setUsername(verifiedJwt.body[0].username);
          }
        }
      );
    } else {
      router.push("/");
    }
  }, []);

  {
    ("");
  }
  const description =
    "Have thoughts and mind ? Just share them with everyone by posting it here.";
  const title = "Infinity | Dashboard";
  const url = "https://www.infinity.cyou/dashboard";
  const images = "https://www.infinity.cyou/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.infinity.cyou/logo.png";
  const altc = "logo of the infinity website";
  const tag =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post,dashboard, live thousand lives in one world,new, blog, new blog";
  const card = "summary_large_image";
  return (
    <div>
      {" "}
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
      <main>
        {loaded && (
          <div
            style={{ width: "97%", marginLeft: "calc(calc(100% - 97%) / 2)" }}
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label id="required">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  required
                  value={titles}
                  onChange={(e) => setTitles(e.target.value)}
                />
              </Form.Group>

              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Blog
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label id="required">Blog</Form.Label>
                        <Form.Text>
                          To add codepen,etc just add an iframe tag in custom
                          html. (format-{">"}code)
                        </Form.Text>
                        <Form.Text>
                          Want multiple pages ? just type the word newPage,
                          wherever you want the second page to start.
                        </Form.Text>
                        <br></br>
                        <Editor
                          value={blog}
                          initialValue="<p>This is the initial content of the editor</p>"
                          apiKey="pj9jgbi5jyqo7yzpy2wllqiw91bjvhm43wc8ug5ttzxg6wug"
                          init={init2}
                          onEditorChange={(e) => setBlog(e)}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      Additional
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      {" "}
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Computer Programmes</Form.Label>
                        <Editor
                          value={computerProgramme}
                          initialValue=""
                          apiKey="pj9jgbi5jyqo7yzpy2wllqiw91bjvhm43wc8ug5ttzxg6wug"
                          init={init1}
                          onEditorChange={(e) => setCompProgramme(e)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Ownership Conditions</Form.Label>
                        <Editor
                          value={conditions}
                          initialValue=""
                          apiKey="pj9jgbi5jyqo7yzpy2wllqiw91bjvhm43wc8ug5ttzxg6wug"
                          init={init1}
                          onEditorChange={(e) => {
                            setConditions(e);
                          }}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <Form.Group controlId="formBasicEmail">
                <Form.Label id="required">Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tags"
                  required
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label id="required">Image Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image Description"
                  required
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label id="required">Image</Form.Label>
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
                <Button
                  type="submit"
                  style={{ width: "100%", border: "none" }}
                  disabled={disabled}
                >
                  {buttonLoading ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    ""
                  )}{" "}
                  POST
                </Button>
              </Form.Group>
            </Form>
          </div>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}
