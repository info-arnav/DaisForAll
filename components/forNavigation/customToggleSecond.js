import React from "react";
const CustomToggleSecond = React.forwardRef(
  ({ children, onClick, status }, ref) => (
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
  )
);

export default CustomToggleSecond;
