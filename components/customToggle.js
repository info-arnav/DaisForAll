import React from "react";
const CustomToggle = React.forwardRef(({ children, onClick, status }, ref) => (
  <div>
    <img
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="inline"
      src="/login.webp"
      height="40px"
      width="40px"
      style={{
        borderRadius: "50%",
        marginLeft: "5px",
        marginRight: "5px",
      }}
      alt="login profile dropdown icon"
    />
  </div>
));
export default CustomToggle;
