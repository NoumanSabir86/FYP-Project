import Head from "next/head";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        <Hero name={"Home"} />
      </div>
    </>
  );
}
