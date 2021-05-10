import Link from "next/link";
import React from "react";

const Thank = () => {
  return (
    <div
      className="h-screen w-screen text-center justify-center align-middle"
      style={{ backgroundColor: "#00235A" }}
    >
      <h1
        className="heading1"
        style={{
          color: "white",
          fontFamily: "open sans",
          paddingTop: "15%",
          fontSize: "40px",
        }}
      >
        Thanks for placeing the <b style={{ color: "#FF5E16" }}>order!</b>
      </h1>
      <p
        className=" mb-4 mt-4 text-white text-center md:text-lg"
        style={{ fontSize: "20px" }}
      >
        <i> Your Order is processing!</i>
      </p>
      <Link href="/Store">
        <button
          className="hoverBtn rounded colortheme text-white px-8 py-3 mt-4 mb-4 mr-4 "
          style={{ fontSize: "20px" }}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default Thank;
