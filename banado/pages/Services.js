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
import { Footer } from "../Components/Footer";
import ReactPaginate from "react-paginate";

import SingleCompanyCard from "./SingleCompanyCard";
import axios from "axios";

const Services = (props) => {
  const pList = useSelector((state) => state.getProductList);
  const { products, loading, error, pageCount, currentPage } = pList;
  const [data, setData] = React.useState(products);
  const [query, setQuery] = React.useState("");
  console.log(currentPage);
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
  console.log(props);
  React.useEffect(async () => {
    dispatch(getProductList(1));
  }, []);

  const paginationHandler = (page) => {
    dispatch(getProductList(page));
  };

  return (
    <>
      <Navbar />
      <div>
        <Hero name={"Find Reliable Construction companies with ease"} />
      </div>
      <div
        className="container px-4 md:px-4 lg:px-16 "
        style={{ marginBottom: "10%" }}
      >
        <div className="flex flex-wrap -mx-2 my-12 ">
          <div className=" w-full md:w-1/4 lg:w-1/4">
            <div className="flex flex-col sm:flex-row sm:justify-around">
              <div className="w-full ">
                <nav className="mt-10 px-6 ">
                  <div className=" mt-4">
                    {/* <span className="heading4">Product Categories</span>
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
                    </p> */}
                  </div>

                  <div className="heading4 mt-4">
                    <span>Top Rated Companies</span>
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
            <div className="grid grid-cols-1 md:gap-8 lg:gap-20 md:grid-cols-1 lg:grid-cols-1 mt-12">
              {props.record.map((item, index) => {
                return <SingleCompanyCard key={index} record={item} />;
              })}
            </div>
            {loading ? (
              ""
            ) : products.length >= 1 ? (
              <div class="flex flex-row justify-center mt-10 ">
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  disableInitialCallback={true}
                  initialPage={currentPage - 1}
                  activeClassName={"active"}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  pageCount={pageCount}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  onPageChange={(e) => {
                    paginationHandler(e.selected + 1);
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const data1 = await axios.get(
      "http://localhost:3001/api/users/builderAdditionalDetails"
    );

    return { props: { record: data1.data } };
  } catch (error) {
    return { props: {} };
  }
};

export default Services;
