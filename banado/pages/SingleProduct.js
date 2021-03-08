import React from "react";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";

const SingleProduct = () => {
  return (
    <div>
      <Navbar />
      <Hero name={"Prodcut name"} />
    </div>
  );
};

export default SingleProduct;
