import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "../Components/Hero";
import Loader from "../Components/Loader";
import { Navbar } from "../Components/Navbar";
import Searchbar from "../Components/Searchbar";
import SingleProductCard from "../Components/SingleProductCard";
import SmallCard from "../Components/SmallCard";
import getProductList from "../redux/actions/getProductList";
import Fuse from "fuse.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Store = () => {
  const pList = useSelector((state) => state.getProductList);
  const { products, loading, error } = pList;
  const [data, setData] = React.useState(products);
  const [query, setQuery] = React.useState("");

  const dispatch = useDispatch();

  const options = {
    // isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    // includeMatches: true,
    // findAllMatches: true,
    minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,

    keys: ["productName", "category"],
  };

  const fuse = new Fuse(data, options);

  // Change the pattern

  const searchList = fuse.search(query);

  const Results = searchList.map((result) => result.item);
  console.log(Results);

  React.useEffect(() => {
    dispatch(getProductList());
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Hero name={"Happiness is not in money, but in shopping : )"} />
      </div>
      <div className="container px-4 md:px-4 lg:px-16">
        <div className="flex flex-wrap -mx-2 my-12 ">
          <div className=" w-full md:w-1/4 lg:w-1/4">
            <div className="flex flex-col sm:flex-row sm:justify-around">
              <div className="w-full ">
                <nav className="mt-10 px-6 ">
                  <div className=" mt-4">
                    <span className="heading4">Product Categories</span>
                    <p
                      className="listText"
                      onClick={() => {
                        setQuery("");
                      }}
                    >
                      + All{" "}
                    </p>
                    <p
                      className="listText"
                      onClick={() => {
                        setQuery("Architecture");
                      }}
                    >
                      + Architecture{" "}
                    </p>
                    <p
                      className="listText"
                      onClick={() => {
                        setQuery("construction");
                      }}
                    >
                      + Construction{" "}
                    </p>
                    <p
                      className="listText"
                      onClick={() => {
                        setQuery("interior design");
                      }}
                    >
                      + Interior Design{" "}
                    </p>
                    <p
                      className="listText"
                      onClick={() => {
                        setQuery("construction");
                      }}
                    >
                      + Construction material{" "}
                    </p>
                    <p
                      className="listText"
                      onClick={() => {
                        setQuery("electronics");
                      }}
                    >
                      + Electronics{" "}
                    </p>
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
              <div class="flex flex-col overflow-hidden border  dark:border-gray-600 lg:flex-row">
                <input
                  class="px-4 py-3 text-gray-700 w-full placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                  type="text"
                  name="email"
                  placeholder="Search Products"
                  aria-label="Search"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />

                <button class="px-5 py-3 text-sm font-medium lg:ml-8 tracking-wider text-gray-100 uppercase transition-colors duration-200 transform  focus:outline-none colortheme">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <span class="text-sm font-semibold  colorheading ">
                1-9 of 148 Products
              </span>
            </div>
            <div className="grid grid-cols-1 md:gap-8 lg:gap-20 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {loading ? (
                <Loader />
              ) : error ? (
                <div>{error}</div>
              ) : searchList.length == 0 ? (
                products.map((product, index) => {
                  return <SingleProductCard key={index} product={product} />;
                })
              ) : (
                Results.map((item, index) => {
                  return <SingleProductCard key={index} product={item} />;
                })
              )}
            </div>

            {loading ? (
              ""
            ) : products.length >= 9 ? (
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
