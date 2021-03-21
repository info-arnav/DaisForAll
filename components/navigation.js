import React, { useEffect, useState } from "react";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import { Dropdown } from "react-bootstrap";
import { useAmp } from "next/amp";
export const config = { amp: "hybrid" };
export default function Navigation() {
  const isAmp = useAmp();
  const [status, setStatus] = useState("loggedOut");
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
                    onClick={() => {}}
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
                    onClick={() => {}}
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
                    <a>Logout</a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </nav>
      </InstantSearch>
    </div>
  );
}
