import axios from "axios";
import { useRouter } from "next/router";
import jwt from "njwt";
import React, { useState } from "react";
import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
export default function Login() {
  const recaptchaRef = React.createRef();
  const router = useRouter();
  const [validatedLogin, setValidatedLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

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
                router.prefetch("/dashboard");
                location.replace("/dashboard");
              })()
            : setError(e.data);
        });
    }
  };
  return (
    <Form noValidate validated={validatedLogin} onSubmit={handleSubmitLogin}>
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
                  style={{ height: "100%", textTransform: "lowercase" }}
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
          <Form.Group controlId="validationCustom03" style={{ width: "100%" }}>
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
        <Form.Row>
          <Form.Group style={{ width: "100%" }}>
            <Button
              style={{ border: "none", width: "100%" }}
              variant="primary"
              type="submit"
            >
              {buttonLoading ? <Spinner size="sm" animation="border" /> : ""}
              Login
            </Button>
          </Form.Group>
        </Form.Row>
      </Modal.Body>
    </Form>
  );
}
