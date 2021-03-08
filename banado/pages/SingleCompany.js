import React from "react";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";

const SingleCompany = () => {
  return (
    <div>
      <Navbar />
      <Hero name={"Comapny name"} />
    </div>
  );
};

export default SingleCompany;
