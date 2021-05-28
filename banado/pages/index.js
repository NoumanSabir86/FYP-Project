import Head from "next/head";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";
import getStoreProducts from "../redux/actions/getStoreProducts";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserServices from "../Services/UserServices";
import getProductList from "../redux/actions/getProductList";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import Loader from "../Components/Loader";
import SingleProductCard from "../Components/SingleProductCard";
import { Footer } from "../Components/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const pList = useSelector((state) => state.getProductList);
  const { products, loading: ploading, error: perror } = pList;

  React.useEffect(() => {
    dispatch(getProductList());
    try {
      dispatch(getStoreProducts(UserServices.getLoggedinfo()._id));
    } catch (error) {}
  }, []);

  return (
    <>
      <Navbar />
      {/* Header Starts */}

      <div className="relative">
        <div
          className="relative bg-gray-900 bg-opacity-75 "
          style={{
            height: "100vh",
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/banado-50bce.appspot.com/o/productImages%2Fhero.png?alt=media&token=796b9fdb-6659-40e8-a558-7fb1b9d6a09c")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 md:py-40 lg:px-8 lg:py-48">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full ">
                <p
                  className="max-w-xl  text-base text-white md:text-lg"
                  style={{ fontSize: "20px" }}
                >
                  Welcome to BANADO
                </p>
                <h2
                  className=" heading1"
                  style={{
                    color: "white",
                    fontFamily: "Yantramanav",
                    lineHeight: "4.7rem",
                  }}
                >
                  ALWAYS AHEAD<br></br> OF SCHEDULE
                </h2>
                <p
                  className="max-w-xl mb-4 text-base text-white md:text-lg"
                  style={{ fontSize: "20px" }}
                >
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
                <div className="flex flex-row">
                  <div>
                    <Link href="/Store">
                      <button
                        className="hoverBtn rounded colortheme text-white px-8 py-3 mt-4 mb-4 mr-4 "
                        style={{ fontSize: "20px" }}
                      >
                        Go to Store
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link href="/Services">
                      <button
                        className="hoverBtn rounded colortheme text-white px-8 py-3 mt-4 mb-4  mr-4"
                        style={{ backgroundColor: "#00235A", fontSize: "20px" }}
                      >
                        Find Builders
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Ends */}

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div
          className="flex flex-col overflow-hidden bg-white    lg:flex-row sm:mx-auto "
          style={{
            height: "70vh",
            boxShadow: ` rgba(106, 27, 154, 0.1) 0px 50px 100px`,
          }}
        >
          <div className="relative lg:w-1/2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/banado-50bce.appspot.com/o/productImages%2Fax.png?alt=media&token=96589c2d-4edd-460a-8367-56c7c616f0af"
              alt=""
              className="object-cover w-full lg:absolute h-80 lg:h-full"
            />
            <svg
              className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
              viewBox="0 0 20 104"
              fill="currentColor"
            >
              <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
            </svg>
          </div>
          <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
            <div>
              <p className=" uppercase mytext mb-2">Explore the features</p>
            </div>
            <h2
              className=" heading1"
              style={{
                fontFamily: "Yantramanav",
                lineHeight: "3.5rem",
                fontSize: "60px",
              }}
            >
              ONE STOP<br></br> COMMERCIAL
            </h2>
            <p className="mb-5 mt-2 mytext">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.Exercitation
              veniam consequat sunt nostrud amet.Exercitation veniam consequat
              sunt nostrud amet.
            </p>
            <div className="flex items-center ">
              <Link href="/Store">
                <button className="hoverBtn rounded colortheme text-white px-8 py-3 mt-4 mb-4 mr-4 ">
                  Learn more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* image with text box ends */}

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <h2
          className="uppercase heading1"
          style={{
            fontFamily: "Yantramanav",
            lineHeight: "3.5rem",
            fontSize: "60px",
          }}
        >
          Top Selling<br></br>Products
        </h2>

        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          autoPlay
          focusOnSelect={false}
          infinite
          itemClass="mt-12"
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          showDots={false}
          centerMode={true}
          sliderClass=""
          slidesToSlide={3}
          swipeable
        >
          {ploading ? (
            <Loader />
          ) : perror ? (
            <div>{perror}</div>
          ) : (
            products.map((item, index) => {
              return <SingleProductCard key={index} product={item} />;
            })
          )}
        </Carousel>

        <section class="text-gray-600 body-font">
          <div class="container px-5 py-12 text-center mt-8 mx-auto">
            <h2
              className="uppercase heading1"
              style={{
                fontFamily: "Yantramanav",
                lineHeight: "3.5rem",
                fontSize: "60px",
              }}
            >
              Testimonials
            </h2>

            <Carousel
              additionalTransfrom={0}
              arrows={false}
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              autoPlay
              focusOnSelect={false}
              infinite
              itemClass="mt-12"
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 2,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
              }}
              showDots={false}
              centerMode={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              <div class="flex flex-wrap -m-4">
                <div class="p-4 mx-4 w-full">
                  <div
                    class="h-full  p-8 rounded"
                    style={{ backgroundColor: "#00235A" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#F79329"
                      class="block w-5 h-5 text-white mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p class="leading-relaxed mb-6 text-white">
                      Synth chartreuse iPhone lomo cray raw denim brunch
                      everyday carry neutra before they sold out fixie 90's
                      microdosing. Tacos pinterest fanny pack venmo, post-ironic
                      heirloom try-hard pabst authentic iceland.
                    </p>
                    <a class="inline-flex items-center text-white">
                      <img
                        alt="testimonial"
                        src="https://dummyimage.com/106x106"
                        class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      ></img>
                      <span class="flex-grow flex flex-col pl-4">
                        <span class="title-font font-medium text-white">
                          Holden Caulfield
                        </span>
                        <span class="text-white">UI DEVELOPER</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap -m-4">
                <div class="p-4 mx-4 w-full">
                  <div
                    class="h-full  p-8 rounded"
                    style={{ backgroundColor: "#00235A" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#F79329"
                      class="block w-5 h-5 text-white mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p class="leading-relaxed mb-6 text-white">
                      Synth chartreuse iPhone lomo cray raw denim brunch
                      everyday carry neutra before they sold out fixie 90's
                      microdosing. Tacos pinterest fanny pack venmo, post-ironic
                      heirloom try-hard pabst authentic iceland.
                    </p>
                    <a class="inline-flex items-center text-white">
                      <img
                        alt="testimonial"
                        src="https://dummyimage.com/106x106"
                        class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      ></img>
                      <span class="flex-grow flex flex-col pl-4">
                        <span class="title-font font-medium text-white">
                          Holden Caulfield
                        </span>
                        <span class="text-white">UI DEVELOPER</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap -m-4">
                <div class="p-4 mx-4 w-full">
                  <div
                    class="h-full  p-8 rounded"
                    style={{ backgroundColor: "#00235A" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#F79329"
                      class="block w-5 h-5 text-white mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p class="leading-relaxed mb-6 text-white">
                      Synth chartreuse iPhone lomo cray raw denim brunch
                      everyday carry neutra before they sold out fixie 90's
                      microdosing. Tacos pinterest fanny pack venmo, post-ironic
                      heirloom try-hard pabst authentic iceland.
                    </p>
                    <a class="inline-flex items-center text-white">
                      <img
                        alt="testimonial"
                        src="https://dummyimage.com/106x106"
                        class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      ></img>
                      <span class="flex-grow flex flex-col pl-4">
                        <span class="title-font font-medium text-white">
                          Holden Caulfield
                        </span>
                        <span class="text-white">UI DEVELOPER</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </section>
      </div>

      <Footer style={{ marginTop: "5%" }} />
    </>
  );
}
