import React, { useEffect, useState } from "react";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import {
  Button,
  Dropdown,
  Col,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { useAmp } from "next/amp";
import axios from "axios";
import jwt from "njwt";
import Router from "next/dist/next-server/lib/router/router";
export const config = { amp: "hybrid" };
export default function Navigation({ userStatus }) {
  const credirect = () => {
    setState("");
    setState("loggedIn");
    setValidatedRegister(false);
    setPassword("");
    setEmail("");
    setName("");
    setUsername("");
    setError("");
    router.push("/dashboard");
  };
  const router = useRouter();
  const [validatedLogin, setValidatedLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [validatedRegister, setValidatedRegister] = useState(false);
  const handleSubmitRegister = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidatedRegister(true);
    } else {
      axios
        .post("/api/auth/register", {
          username: username,
          password: password,
          email: email,
          name: name,
        })
        .then((e) =>
          e.data != "username exists" && e.data != "email exists"
            ? (() => {
                localStorage.setItem(
                  "userData",
                  jwt.create(
                    e.data,
                    "ArnavGod30080422020731017817087571441",
                    "HS512"
                  )
                );
                credirect();
                setStatus("loggedIn");
              })()
            : setError(e.data)
        );
    }
  };
  const handleSubmitLogin = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidatedLogin(true);
    } else {
      axios
        .post("/api/auth/login", {
          username: username,
          password: password,
        })
        .then((e) =>
          e.data != "username" && e.data != "password"
            ? (() => {
                localStorage.setItem(
                  "userData",
                  jwt.create(
                    e.data,
                    "ArnavGod30080422020731017817087571441",
                    "HS512"
                  )
                );
                credirect();
                setStatus("loggedIn");
              })()
            : setError(e.data)
        );
    }
  };
  const isAmp = useAmp();
  const [show, setShow] = useState(false);
  const [state, setState] = useState("register");
  const [status, setStatus] = useState(userStatus);
  const searchClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
  );
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div>
      {isAmp ? (
        <amp-img
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
          className="inline"
          src="/login.svg"
          height="40px"
          width="40px"
          style={{
            borderRadius: "50%",
            marginLeft: "5px",
            marginRight: "5px",
          }}
          alt="login profile dropdown icon"
        />
      ) : (
        <img
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
          className="inline"
          src="/login.svg"
          height="40px"
          width="40px"
          style={{
            borderRadius: "50%",
            marginLeft: "5px",
            marginRight: "5px",
          }}
          alt="login profile dropdown icon"
        />
      )}
    </div>
  ));
  const CustomToggleSecond = React.forwardRef(({ children, onClick }, ref) => (
    <button
      ref={ref}
      style={{
        marginRight: "10px",
        marginLeft: "10px",
        width: "85px",
        padding: "0.25px",
        paddingLeft: "0",
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn btn-4 btn-4c icon-arrow-right"
      id="data"
      wfd-id="62"
    >
      {typeof window !== "undefined"
        ? window.location.pathname === "/blogs"
          ? "Blogs"
          : window.location.pathname === "/about"
          ? "About"
          : "Home"
        : ""}
      &darr;
    </button>
  ));
  useEffect(() => {}, []);
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="dev_BLOGS">
        <nav>
          <Link href="/" id="image">
            {isAmp ? (
              <amp-img
                id="image"
                alt="The logo of the website which showcases a symbol of infinity combined to wires"
                src="/logo.png"
                width="60px"
                height="60px"
                style={{
                  borderRadius: "50%",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
                className="d-inline-block align-top"
              />
            ) : (
              <img
                id="image"
                alt="The logo of the website which showcases a symbol of infinity combined to wires"
                src="/logo.png"
                width="60px"
                height="60px"
                style={{
                  borderRadius: "50%",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
                className="d-inline-block align-top"
              />
            )}
          </Link>
          <div>
            <Dropdown id="navToggle">
              <Dropdown.Toggle as={CustomToggleSecond}></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item key="home">
                  <Link href="/">Home</Link>
                </Dropdown.Item>
                {status == "loggedIn" ? (
                  <Dropdown.Item key="blogs">
                    <Link href="/blogs">Blogs</Link>
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item key="about">
                    <Link href="/about">About</Link>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>{" "}
            </Dropdown>
          </div>
          <div id="inDropdown">
            {" "}
            <Link
              href="/"
              style={{
                display: "inherit",
                marginRight: "10px",
              }}
            >
              <button
                className="btn btn-4 btn-4c icon-arrow-right"
                style={{ marginRight: "5px" }}
                id={
                  typeof window !== "undefined"
                    ? window.location.pathname === "/"
                      ? "active"
                      : "data"
                    : "data"
                }
                wfd-id="62"
              >
                Home
              </button>
            </Link>
            {status != "loggedIn" ? (
              <Link
                href="/about"
                style={{
                  display: "inherit",
                  marginRight: "10px",
                }}
              >
                <button
                  className="btn btn-4 btn-4c icon-arrow-right"
                  style={{ marginRight: "5px" }}
                  id={
                    typeof window !== "undefined"
                      ? window.location.pathname === "/about"
                        ? "active"
                        : "data"
                      : "data"
                  }
                  wfd-id="62"
                >
                  About
                </button>
              </Link>
            ) : (
              <Link
                href="/blogs"
                style={{
                  display: "inherit",
                  marginRight: "10px",
                }}
              >
                <button
                  className="btn btn-4 btn-4c icon-arrow-right"
                  style={{ marginRight: "5px" }}
                  id={
                    typeof window !== "undefined"
                      ? window.location.pathname === "/blogs"
                        ? "active"
                        : "data"
                      : "data"
                  }
                  wfd-id="62"
                >
                  Blogs
                </button>
              </Link>
            )}
          </div>
          <SearchBox
            style={{ width: "100%" }}
            translations={{ placeholder: "Search" }}
          />
          {status !== "loggedIn" ? (
            <div style={{ display: "inherit" }}>
              {" "}
              <button
                onClick={() => {
                  setShow(true);
                  setState("register");
                }}
                style={{
                  padding: "0",
                  marginLeft: "2px",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                {isAmp ? (
                  <amp-img
                    className="inline"
                    src="/signip.svg"
                    height="40px"
                    width="40px"
                    style={{
                      borderRadius: "50%",
                      marginLeft: "2px",
                    }}
                    alt="signup button represented with an icon"
                  />
                ) : (
                  <img
                    className="inline"
                    src="/signip.svg"
                    height="40px"
                    width="40px"
                    style={{
                      borderRadius: "50%",
                      marginLeft: "2px",
                    }}
                    alt="signup button represented with an icon"
                  />
                )}
              </button>
              <button
                onClick={() => {
                  setShow(true);
                  setState("login");
                }}
                style={{
                  padding: "0",
                  border: "none",
                  marginLeft: "2px",
                  marginRight: "10px",
                  backgroundColor: "transparent",
                }}
              >
                {isAmp ? (
                  <amp-img
                    className="inline"
                    src="/login.png"
                    height="40px"
                    width="40px"
                    style={{
                      borderRadius: "50%",
                      marginLeft: "2px",
                    }}
                    alt="login button represented with an icon"
                  />
                ) : (
                  <img
                    className="inline"
                    src="/login.png"
                    height="40px"
                    width="40px"
                    style={{
                      borderRadius: "50%",
                      marginLeft: "2px",
                    }}
                    alt="login button represented with an icon"
                  ></img>
                )}
              </button>
            </div>
          ) : (
            <div>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item key="profile">
                    <Link href="/active">Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="bookmarks">
                    <Link href="/bookmarked">Bookmarks</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="new post">
                    <Link href="/dashboard">New Post</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="logout">
                    <a
                      onClick={() => {
                        localStorage.removeItem("userData");
                        setStatus("loggedOut");
                      }}
                    >
                      Logout
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </nav>
      </InstantSearch>
      {state == "register" && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={() => {
            setShow(false);
            setValidatedRegister(false);
            setPassword("");
            setEmail("");
            setName("");
            setUsername("");
            setError("");
          }}
        >
          <Form
            noValidate
            validated={validatedRegister}
            onSubmit={handleSubmitRegister}
          >
            <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Row>
                <Form.Group
                  controlId="validationCustom03"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  controlId="validationCustom03"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                  <Form.Text style={{ color: "red" }}>
                    {error == "email exists" ? "Email in use" : ""}
                  </Form.Text>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  controlId="validationCustomUsername"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Username</Form.Label>
                  <InputGroup hasValidation>
                    <div style={{ width: "100%", display: "flex" }}>
                      <InputGroup.Prepend>
                        <InputGroup.Text
                          id="inputGroupPrepend"
                          style={{ height: "100%" }}
                        >
                          @
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        style={{ height: "100%" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                    <Form.Text style={{ color: "red" }}>
                      {error == "username exists" ? "Username in use" : ""}
                    </Form.Text>
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  controlId="validationCustom03"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                  <Form.Text>
                    <center>
                      Must contain at least one number and one uppercase and
                      lowercase letter, and at least 8 or more characters
                    </center>
                  </Form.Text>
                </Form.Group>
              </Form.Row>
              <center>
                Already registered ?{" "}
                <a
                  onClick={() => {
                    setState("login");
                    setValidatedRegister(false);
                    setPassword("");
                    setEmail("");
                    setName("");
                    setUsername("");
                    setError("");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Click Here
                </a>
              </center>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ border: "none" }}
                variant="secondary"
                onClick={() => {
                  setShow(false);
                  setValidatedRegister(false);
                  setPassword("");
                  setEmail("");
                  setName("");
                  setUsername("");
                  setError("");
                }}
              >
                Close
              </Button>
              <Button
                style={{ border: "none" }}
                variant="primary"
                type="submit"
              >
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
      {state == "login" && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={() => {
            setShow(false);
            setValidatedLogin(false);
            setPassword("");
            setEmail("");
            setName("");
            setUsername("");
            setError("");
          }}
        >
          <Form
            noValidate
            validated={validatedLogin}
            onSubmit={handleSubmitLogin}
          >
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Row>
                <Form.Group
                  controlId="validationCustomUsername"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Username</Form.Label>
                  <InputGroup hasValidation>
                    <div style={{ width: "100%", display: "flex" }}>
                      <InputGroup.Prepend>
                        <InputGroup.Text
                          id="inputGroupPrepend"
                          style={{ height: "100%" }}
                        >
                          @
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        style={{ height: "100%" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                    </div>

                    <Form.Control.Feedback type="invalid" true>
                      Please choose a username.
                    </Form.Control.Feedback>
                    <Form.Text style={{ color: "red" }}>
                      {error == "username" ? "Invalid username" : ""}
                    </Form.Text>
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  controlId="validationCustom03"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                  <Form.Text style={{ color: "red" }}>
                    {error == "password" ? "invalid password" : ""}
                  </Form.Text>
                </Form.Group>
              </Form.Row>
              <center>
                Not yet registered ?{" "}
                <a
                  onClick={() => {
                    setState("register");
                    setValidatedLogin(false);
                    setPassword("");
                    setEmail("");
                    setName("");
                    setUsername("");
                    setError("");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Click Here
                </a>
              </center>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ border: "none" }}
                variant="secondary"
                onClick={() => {
                  setShow(false);
                  setValidatedLogin(false);
                  setPassword("");
                  setEmail("");
                  setName("");
                  setUsername("");
                  setError("");
                }}
              >
                Close
              </Button>
              <Button
                style={{ border: "none" }}
                variant="primary"
                type="submit"
              >
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  let string = localStorage.getItem("userData");
  let userStatus = "loggedOut";
  string
    ? jwt.verify(
        string,
        "ArnavGod30080422020731017817087571441",
        "HS512",
        function (err, verifiedJwt) {
          if (err) {
            localStorage.removeItem("userData");
            userStatus = "loggedOut";
          } else {
            userStatus = "loggedIn";
          }
        }
      )
    : "";
  return { props: { userStatus } };
}
