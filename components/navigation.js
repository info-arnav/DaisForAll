import React, { useDebugValue, useEffect, useState } from "react";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import CustomToggle from "./customToggle";
import { useRouter } from "next/router";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import dynamic from "next/dynamic";
import {
  Button,
  Dropdown,
  Col,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import jwt from "njwt";
import Router from "next/dist/next-server/lib/router/router";
import { Spinner } from "react-bootstrap";
import Dropdowns from "./dropdownClosed";
import Ddo from "./dropdownopen";
import Signed from "./signed";
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"));
export default function Navigation(props) {
  const router = useRouter();
  const [validatedLogin, setValidatedLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [validatedRegister, setValidatedRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [state, setState] = useState("register");
  const [status, setStatus] = useState(false);
  const searchClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
  );
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
  const handleSubmitRegister = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidatedRegister(true);
    } else {
      setButtonLoading(true);
      axios
        .post("/api/auth/register", {
          username: username,
          password: password,
          email: email,
          name: name,
        })
        .then((e) => {
          router.prefetch("/dashboard");
          setButtonLoading(false);
          e.data != "username exists" &&
          e.data != "email exists" &&
          e.data != "error"
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
            : setError(e.data);
        });
    }
  };
  const handleSubmitLogin = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidatedLogin(true);
    } else {
      setButtonLoading(true);
      axios
        .post("/api/auth/login", {
          username: username,
          password: password,
        })
        .then((e) => {
          router.prefetch("/dashboard");
          setButtonLoading(false);
          e.data != "username" && e.data != "password" && e.data != "error"
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
            : setError(e.data);
        });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      jwt.verify(
        localStorage.getItem("userData"),
        "ArnavGod30080422020731017817087571441",
        "HS512",
        function (err, verifiedJwt) {
          if (err) {
            localStorage.removeItem("userData");
            setStatus("loggedOut");
          } else {
            setStatus("loggedIn");
            router.prefetch("/dashboard");
          }
        }
      );
    } else {
      setStatus("loggedOut");
    }
  }, []);
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="dev_BLOGS">
        <nav>
          <Link href="/" id="image">
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
          </Link>
          <Dropdowns status={status}></Dropdowns>
          <Ddo status={status}></Ddo>
          <SearchBox
            style={{ width: "100%" }}
            translations={{ placeholder: "Search" }}
          />
          {status &&
            (status !== "loggedIn" ? (
              <div style={{ display: "inherit" }}>
                <button
                  onClick={() => {
                    setShow(true);
                    setState("register");
                  }}
                  style={{
                    paDding: "0",
                    marginLeft: "2px",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    className="inline"
                    src="/signip.webp"
                    height="40px"
                    width="40px"
                    style={{
                      borderRadius: "50%",
                      marginLeft: "2px",
                    }}
                    alt="signup button represented with an icon"
                  />
                </button>
                <button
                  onClick={() => {
                    setShow(true);
                    setState("login");
                  }}
                  style={{
                    paDding: "0",
                    border: "none",
                    marginLeft: "2px",
                    marginRight: "10px",
                    backgroundColor: "transparent",
                  }}
                >
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
                </button>
              </div>
            ) : (
              <Signed></Signed>
            ))}
        </nav>
      </InstantSearch>
      {state == "register" && (
        <Modal
          size="lg"
          {...props}
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
                        pattern="[a-z0-9]+"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                    </div>
                    <Form.Text style={{ width: "100%" }}>
                      Only alphabets and numbers allowed
                    </Form.Text>
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
                    pattern="(?=.*\d)(?=\S+$)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <Form.Text>
                    Must contain at least one number and one uppercase and
                    lowercase letter, no spaces and at least 8 or more
                    characters
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
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
                {buttonLoading ? <Spinner size="sm" animation="border" /> : ""}{" "}
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
      {state == "login" && (
        <Modal
          size="lg"
          {...props}
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
                {buttonLoading ? <Spinner size="sm" animation="border" /> : ""}{" "}
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
}
