import { useState } from "react";
import { Modal } from "react-bootstrap";
import Login from "./login";
import Register from "./register";
export default function Unsigned(props) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState("");
  return (
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
      {state == "register" && show && (
        <Modal
          size="lg"
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Register></Register>
        </Modal>
      )}
      {state == "login" && show && (
        <Modal
          size="lg"
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Login></Login>
        </Modal>
      )}
    </div>
  );
}
