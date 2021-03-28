import React, { useEffect, useState } from "react";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import dynamic from "next/dynamic";
import jwt from "njwt";
import Dropdowns from "./dropdownClosed";
import Ddo from "./dropdownopen";
import Signed from "./signed";
import Unsigned from "./unsigned";
export default function Navigation(props) {
  const router = useRouter();
  const [status, setStatus] = useState(false);
  const searchClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
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
            (status !== "loggedIn" ? <Unsigned></Unsigned> : <Signed></Signed>)}
        </nav>
      </InstantSearch>
    </div>
  );
}
