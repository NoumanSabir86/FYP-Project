import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "../Components/Hero";
import Loader from "../Components/Loader";
import { Navbar } from "../Components/Navbar";
import Searchbar from "../Components/Searchbar";
import SingleProductCard from "../Components/SingleProductCard";
import SmallCard from "../Components/SmallCard";
import getProductList from "../redux/actions/getProductList";

const Store = () => {
  const pList = useSelector((state) => state.getProductList);
  const { products, loading, error } = pList;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProductList());
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Hero name={"Shop"} />
      </div>
      <div className="container px-4 md:px-4 lg:px-16">
        <div className="flex flex-wrap -mx-2 my-12 ">
          <div className=" w-full md:w-1/4 lg:w-1/4">
            <div className="flex flex-col sm:flex-row sm:justify-around">
              <div className="w-full ">
                <nav className="mt-10 px-6 ">
                  <Searchbar />

                  <div className="heading4 mt-4">
                    <span>Filter</span>
                  </div>
                  <div className=" mt-4">
                    <span className="heading4">Product Categories</span>
                    <p className="listText">+ Architecture </p>
                    <p className="listText">+ Construction </p>
                    <p className="listText">+ Interior Design </p>
                    <p className="listText">+ Technology </p>
                  </div>

                  <div className="heading4 mt-4">
                    <span>Featured Products</span>
                  </div>

                  <SmallCard name="Laptop" price="Rs.500" />
                  <SmallCard name="Screwdriver" price="Rs.500" />
                  <SmallCard name="Hammer" price="Rs.500" />
                  <SmallCard name="Nails" price="Rs.500" />
                </nav>
              </div>
            </div>
          </div>
          <div className=" w-full p-4 md:pl-6 lg:pl-6 md:w-3/4 lg:w-3/4">
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-6">
              <button class="relative text-sm focus:outline-none group mt-4 sm:mt-0">
                <div class="flex items-center justify-between w-40  px-6 py-3 border-2 border-gray-300  hover:bg-gray-300">
                  <span class="font-medium">Popular</span>
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg rounded group-focus:flex">
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Popular
                  </a>
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Featured
                  </a>
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Newest
                  </a>
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Lowest Price
                  </a>
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Highest Price
                  </a>
                </div>
              </button>
              <button
                class="relative text-sm focus:outline-none group mt-4 sm:mt-0 "
                style={{ marginLeft: "-50%" }}
              >
                <div class="flex items-center justify-between w-40  px-6 py-3 border-2 border-gray-300  hover:bg-gray-300">
                  <span class="font-medium">Category</span>
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg rounded group-focus:flex">
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Popular
                  </a>
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Featured
                  </a>
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Newest
                  </a>
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Lowest Price
                  </a>
                  <a
                    class="w-full px-4 py-2 text-left hover:bg-gray-200"
                    href="#"
                  >
                    Highest Price
                  </a>
                </div>
              </button>
              <span class="text-sm font-semibold  colorheading ">
                1-9 of 148 Products
              </span>
            </div>
            <div className="grid grid-cols-1 md:gap-8 lg:gap-20 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {loading ? (
                <Loader />
              ) : error ? (
                <div>{error}</div>
              ) : (
                products.map((product, index) => {
                  return <SingleProductCard key={index} product={product} />;
                })
              )}
            </div>

            {loading ? (
              ""
            ) : products.length >= 12 ? (
              <div class="flex justify-center mt-10 space-x-1">
                <button
                  class="background flex items-center justify-center h-8 w-8  "
                  style={{ color: "white" }}
                >
                  1
                </button>
                <button class="flex items-center justify-center h-8 w-8 ">
                  2
                </button>

                <button class="flex items-center justify-center h-8 w-8 ">
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
