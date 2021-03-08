import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";
import SingleProductCard from "../Components/SingleProductCard";
import SmallCard from "../Components/SmallCard";

const Store = () => {
  return (
    <>
      <div>
        <Navbar />
        <Hero name={"Shop"} />
      </div>
      <div className="container px-4 md:px-4 lg:px-16">
        <div className="flex flex-wrap -mx-2 my-12 ">
          <div className=" w-full md:w-1/4 lg:w-1/4">
            <div className="flex flex-col sm:flex-row sm:justify-around">
              <div className="w-full ">
                <nav className="mt-10 px-6 ">
                  <form>
                    <div class="flex flex-col overflow-hidden border  dark:border-gray-600 lg:flex-row">
                      <input
                        class="px-6 py-3 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                        type="text"
                        name="email"
                        placeholder="Search Products"
                        aria-label="Search"
                      />

                      <button class="px-4 py-3 text-sm font-medium lg:ml-8 tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none colortheme">
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </div>
                  </form>

                  <div className="heading4 mt-4">
                    <span>Filter</span>
                  </div>
                  <div className="heading4 mt-4">
                    <span>Product Categories</span>
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
            <div className="grid grid-cols-1 md:gap-8 lg:gap-20 md:grid-cols-2 lg:grid-cols-3 mt-36">
              <SingleProductCard />
              <SingleProductCard />
              <SingleProductCard />
              <SingleProductCard />
              <SingleProductCard />
              <SingleProductCard />
              <SingleProductCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
