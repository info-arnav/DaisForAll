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
  const [derror, setDerror] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [validatedRegister, setValidatedRegister] = useState(false);
  const handleSubmitRegister = (event) => {
    const form = event.currentTarget;
    setUsername(username.toLowerCase());
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
                router.prefetch("/dashboard");
                location.replace("/dashboard");
              })()
            : setError(e.data);
        });
    }
  };
  return (
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
          <Form.Group controlId="validationCustom03" style={{ width: "100%" }}>
            <Form.Label id="required">Name</Form.Label>
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
          <Form.Group controlId="validationCustom03" style={{ width: "100%" }}>
            <Form.Label id="required">Email</Form.Label>
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
            <Form.Label id="required">Username</Form.Label>
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
                  style={{ height: "100%", textTransform: "lowercase" }}
                  pattern="[a-z0-9]+"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                />
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
          <Form.Group controlId="validationCustom03" style={{ width: "100%" }}>
            <Form.Label id="required">Password</Form.Label>
            <Form.Control
              pattern="(?=.*\d)(?=\S+$)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
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
              sitekey="6LcM8JQaAAAAAJ-uBIX5Oho6BYWrw-pBQn0L4ZCo"
              onChange={onChange}
              onTimeout={() => setDisabled(true)}
            />
            <Form.Text style={{ color: "red" }}>
              {derror == true
                ? "We couldnt verify that u=you are an human"
                : ""}
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group style={{ width: "100%" }}>
            <Button
              style={{ border: "none", width: "100%" }}
              variant="primary"
              type="submit"
              disabled={disabled}
            >
              {buttonLoading ? <Spinner size="sm" animation="border" /> : ""}{" "}
              Register
            </Button>
          </Form.Group>
        </Form.Row>
      </Modal.Body>
    </Form>
  );
}
