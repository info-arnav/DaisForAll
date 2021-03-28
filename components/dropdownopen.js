import Link from "next/link";

export default function ddo({ status }) {
  return (
    <div id="inDropdown">
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
              ? window.location.pathname === "/" ||
                window.location.pathname === ""
                ? "active"
                : "data"
              : "data"
          }
          wfd-id="62"
        >
          Home
        </button>
      </Link>
      {status &&
        (status != "loggedIn" ? (
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
        ))}
    </div>
  );
}
