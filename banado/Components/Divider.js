import React from "react";

const Divider = (width) => {
  return (
    <div
      className="myDivider"
      style={{
        width: { width },
        height: "5px",
        backgroundColor: "#FF5E16",
      }}
    ></div>
  );
};

export default Divider;
