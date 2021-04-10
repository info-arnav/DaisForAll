import React, { useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import Heads from "next/head";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-dom";
import dynamic from "next/dynamic";
import jwt from "njwt";
import Dropdowns from "./forNavigation/dropdownClosed";
import Ddo from "./forNavigation/dropdownopen";
import Signed from "./forNavigation/signed";
import Unsigned from "./forNavigation/unsigned";
import { Button, Modal } from "react-bootstrap";
export default function Navigation(props) {
  const images = "https://www.infinity.cyou/logo.png";
  const colors = [
    "#ec6767",
    "#b76cc4",
    "#008ecd",
    "#00bfa5",
    "#eec636",
    "#97c230",
  ];
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [status, setStatus] = useState(false);
  const searchClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
  );
  const Hit = ({ hit }) => (
    <div class="card" style={{ borderRadius: "20px" }}>
      <a style={{ cursor: "pointer" }} href={`/article/${hit._id.$oid}`}>
        <div
          class="thumb"
          alt={hit.imageDescription}
          style={{
            backgroundImage: `url(/api/image/${hit._id.$oid})`,
            cursor: "pointer",
          }}
        ></div>
      </a>
      <article>
        <Heads>
          <div></div>
          <script
            key={hit._id.$oid}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://www.infinity.cyou/article/${hit._id.$oid}`,
                },
                a: "",
                headline: hit.title,
                image: `https://www.infinity.cyou/api/image/${hit._id.$oid}`,
                datePublished: hit.dateCreated,
                dateModified: hit.dateUpdated,
                author: {
                  "@type": "Person",
                  name: hit.username,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Infinity",
                  logo: {
                    "@type": "ImageObject",
                    url: images,
                  },
                },
              }),
            }}
          ></script>
        </Heads>
        <div style={{ marginBottom: "10px" }}>
          {hit.tags &&
            hit.tags
              .toString()
              .split(" ")
              .map(
                (e) =>
                  e && (
                    <div
                      className="important"
                      style={{
                        display: "inline-flex",
                        margin: "2px",

                        borderRadius: "5px",
                        padding: "5px",
                        cursor: "pointer",
                        backgroundColor:
                          colors[Math.floor(Math.random() * colors.length)],
                      }}
                    >
                      <div
                        style={{
                          display: "inline",
                        }}
                      >
                        <a style={{}} href={`/tags/${e}`}>
                          <span
                            style={{
                              fontSize: "11px",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            {"#" + e}
                          </span>
                        </a>
                      </div>{" "}
                    </div>
                  )
              )}
        </div>
        <a style={{ cursor: "pointer" }} href={`/article/${hit._id.$oid}`}>
          <h1 style={{ cursor: "pointer", marginBottom: "2px" }}>
            {hit.title}
          </h1>
          {}
        </a>
        <div style={{ marginBottom: "7px" }}>
          <b>
            <a href={`/user/${hit.username}`}>
              {hit.username.charAt(0).toUpperCase() + hit.username.slice(1)}
            </a>
          </b>
        </div>
        <a style={{ cursor: "pointer" }} href={`/article/${hit._id.$oid}`}>
          <span style={{ marginBottom: "10px", cursor: "pointer" }}>
            {" "}
            <span
              dangerouslySetInnerHTML={{
                __html: hit.blog
                  .split("newPage")[0]
                  .toString()
                  .trimLeft()
                  .replace(/<[^>]*>/g, "")
                  .slice(0, 160),
              }}
            ></span>
            .....
          </span>
        </a>
        <div style={{ fontSize: "12px" }}>
          {parseInt(
            hit.blog
              .split("newPage")
              .toString()
              .replace(/<[^>]*>/g, "").length / 1000
          )}{" "}
          min read
        </div>
      </article>
    </div>
  );
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
            router.prefetch("/dashboard");
            setStatus("loggedIn");
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
          <a href="/" id="image">
            <img
              id="image"
              alt="The logo of the website which showcases a symbol of infinity combined to wires"
              src="/logo.webp"
              width="60px"
              height="60px"
              style={{
                borderRadius: "50%",
                marginLeft: "5px",
                marginRight: "5px",
              }}
              className="d-inline-block align-top"
            />
          </a>
          <Dropdowns status={status}></Dropdowns>
          <Ddo status={status}></Ddo>
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%" }}
            translations={{ placeholder: "Search" }}
          />
          {status &&
            (status !== "loggedIn" ? <Unsigned></Unsigned> : <Signed></Signed>)}
        </nav>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={search}
          onHide={(e) => setSearch("")}
        >
          <Modal.Header style={{ alignItems: "center" }}>
            <SearchBox
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%" }}
              translations={{ placeholder: "Search" }}
            />
          </Modal.Header>
          <Modal.Body>
            <div style={{ marginTop: "10px" }}></div>
            <Hits style={{ width: "100%" }} hitComponent={Hit}></Hits>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => setSearch("")}>Close</Button>
          </Modal.Footer>
        </Modal>
      </InstantSearch>
    </div>
  );
}
