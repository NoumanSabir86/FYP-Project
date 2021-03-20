import React from "react";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";
import axios from "axios";
const Services = () => {
  return (
    <div>
      <Navbar />

      <Hero name={"Services"} />
    </div>
  );
};

export default Services;
