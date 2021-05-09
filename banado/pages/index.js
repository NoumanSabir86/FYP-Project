import Head from "next/head";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";
import getStoreProducts from "../redux/actions/getStoreProducts";
import React from "react";
import { useDispatch } from "react-redux";
import UserServices from "../Services/UserServices";
import getProductList from "../redux/actions/getProductList";

export default function Home() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProductList());
    try {
      dispatch(getStoreProducts(UserServices.getLoggedinfo().sellerId));
    } catch (error) {}
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Hero name={"Home"} />
      </div>
    </>
  );
}
