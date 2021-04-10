import axios from "axios";
import { useRouter } from "next/router";
import jwt from "njwt";
import ReCAPTCHA from "react-google-recaptcha";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
export default function Register() {
  function onChange(value) {
    axios
      .post("/api/verify", {
        secret: "6LcM8JQaAAAAANE5B1sZchi2IrljEHNtQPo8Ioml",
        response: value,
      })
      .then((e) => {
        e.data.success == true ? setDisabled(false) : setDerror(true);
      });
  }
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(!true);
  const [derror, setDerror] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [codeiv, setCodeiv] = useState("");
  const [code, setCode] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonLoading2, setButtonLoading2] = useState(false);
  const [validatedOTP, setValidatedOTP] = useState(false);
  const [validatedRegister, setValidatedRegister] = useState(false);
  const handleSubmitOTP = (event) => {
    const form = event.currentTarget;
    setUsername(username.toLowerCase());
    setError("");
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidatedOTP(true);
    } else {
      setDisabled(true);
      {
        ("");
      }
      setButtonLoading(true);
      axios
        .post("/api/auth/register/check", {
          username: username,
          password: password,
          email: email,
          name: name,
        })
        .then((e) => {
          e.data != "username exists" &&
          e.data != "email exists" &&
          e.data != "error"
            ? (() => {
                jwt.verify(
                  e.data,
                  "ArnavGod30080422020731017817087571441",
                  "HS512",
                  function (error, s) {
                    if (s) {
                      setCode(s.body.code);
                    } else {
                      location.replace("/");
                    }
                  }
                );
                setButtonLoading(false);
                setDisabled(false);
              })()
            : (() => {
                setError(e.data);
                setButtonLoading(false);
                setDisabled(false);
              })();
        });
    }
  };
  const handleSubmitRegister = (event) => {
    const form = event.currentTarget;
    setError("");
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidatedRegister(true);
    } else {
      setDisabled2(true);
      setButtonLoading2(true);
      axios
        .post("/api/auth/register", {
          username: username,
          password: password,
          email: email,
          name: name,
        })
        .then((e) => {
          setButtonLoading2(false);
          setDisabled2(false);
          localStorage.setItem(
            "userData",
            jwt.create(e.data, "ArnavGod30080422020731017817087571441", "HS512")
          );
          router.prefetch("/dashboard");
          location.replace("/dashboard");
        });
    }
  };
  return (
    <div>
      <Modal.Body style={{ padding: "60px" }}>
        <Form.Group>
          <center>
            <h4>Register</h4>
          </center>
          <br></br>
        </Form.Group>
        <Form noValidate validated={validatedOTP} onSubmit={handleSubmitOTP}>
          <Form.Row>
            <Form.Group
              controlId="validationCustom03"
              style={{ width: "100%" }}
            >
              <div
                class="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => {
                    setCode(false);
                    setName(e.target.value);
                  }}
                />
              </div>
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
              <div
                class="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <Form.Control
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setCode(false);
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  required
                />
              </div>
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
              <InputGroup hasValidation>
                <div style={{ width: "100%", display: "flex" }}>
                  <div
                    class="wrap-input100 validate-input"
                    data-validate="Password is required"
                  >
                    <Form.Control
                      type="text"
                      style={{ height: "100%", textTransform: "lowercase" }}
                      pattern="[a-z0-9]+"
                      value={username}
                      onChange={(e) => {
                        setCode(false);
                        setUsername(e.target.value);
                      }}
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </div>
                </div>
                <Form.Text style={{ width: "100%" }}>
                  Only small alphabets and numbers allowed
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
              <div
                class="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <Form.Control
                  pattern="(?=.*\d)(?=\S+$)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setCode(false);
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  required
                />
              </div>
              <Form.Text>
                Must contain at least one number and one uppercase and lowercase
                letter, no spaces and at least 8 or more characters
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <ReCAPTCHA
                size="compact"
                sitekey="6LcM8JQaAAAAAJ-uBIX5Oho6BYWrw-pBQn0L4ZCo"
                onChange={onChange}
                onExpired={() => {
                  setCode("");
                  setError("");
                  setDisabled(true);
                  setDerror("");
                }}
                onTimeout={() => setDisabled(true)}
              />
              <Form.Text style={{ color: "red" }}>
                {derror == true
                  ? "We couldnt verify that you are an human"
                  : ""}
              </Form.Text>
            </Form.Group>
          </Form.Row>
          {error == "error" && (
            <Form.Text style={{ color: "red" }}>
              Some error occured. Maybe invalid Email.
            </Form.Text>
          )}
          <Form.Row>
            <Form.Group style={{ width: "100%" }}>
              <div class="container-login100-form-btn m-t-17">
                <button
                  style={{ border: "none", width: "100%" }}
                  variant="primary"
                  type="submit"
                  disabled={disabled}
                  class="login100-form-btn"
                >
                  {buttonLoading ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    ""
                  )}{" "}
                  {code ? "Resend OTP" : "Request OTP"}
                </button>
              </div>
            </Form.Group>
          </Form.Row>
        </Form>
        {code && (
          <div>
            <Form
              noValidate
              validated={validatedRegister}
              onSubmit={handleSubmitRegister}
            >
              <Form.Row>
                <Form.Group
                  controlId="validationCustom03"
                  style={{ width: "100%" }}
                >
                  <div
                    class="wrap-input100 validate-input"
                    data-validate="Password is required"
                  >
                    <Form.Control
                      pattern="{4}"
                      type="number"
                      value={codeiv}
                      onChange={(e) => {
                        setCodeiv(e.target.value);
                      }}
                      placeholder="Code"
                      required
                    />
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group style={{ width: "100%" }}>
                  <div class="container-login100-form-btn m-t-17">
                    <button
                      style={{ border: "none", width: "100%" }}
                      variant="primary"
                      type="submit"
                      disabled={codeiv != code || disabled2}
                      class="login100-form-btn"
                    >
                      {buttonLoading2 ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        ""
                      )}{" "}
                      Register
                    </button>
                  </div>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        )}
      </Modal.Body>
    </div>
  );
}
