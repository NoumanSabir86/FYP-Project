import Link from "next/link";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../Components/Navbar";
import getProductDetails from "../redux/actions/getProductDetails";
import { useRouter } from "next/router";
import styles from "./SingleProduct.module.css";
import Loader from "../Components/Loader";
import Carousel from "react-multi-carousel";
import SingleProductCard from "../Components/SingleProductCard";
import getProductList from "../redux/actions/getProductList";
import { Footer } from "../Components/Footer";

const SingleProduct = () => {
  const pDetails = useSelector((state) => state.getProductDetails);
  const [quantity, setQuantity] = React.useState(1);
  const [productID, setpID] = React.useState("");

  const { product, loading, error } = pDetails;

  const pList = useSelector((state) => state.getProductList);
  const { products, loading: ploading, error: perror } = pList;

  const dispatch = useDispatch();

  const router = useRouter();

  React.useEffect(() => {
    localStorage.setItem("quantity", quantity);
    dispatch(getProductList());
    dispatch(getProductDetails(localStorage.getItem("productID")));
  }, [router.query]);

  return (
    <>
      <div>
        <Navbar />

        {loading ? (
          <Loader />
        ) : error ? (
          "error"
        ) : (
          <>
            <div
              className="sm:w-full "
              style={{
                backgroundColor: "#F0F1F1",
                height: "40vh",
                padding: "8%",
                verticalAlign: "middle",
                textAlign: "center",
                borderBottom: "5px solid #FF5E16",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
              }}
            >
              <h2
                className="heading1 colorheading "
                style={{
                  textTransform: "Capitalize",
                  fontSize: "50px",
                  fontFamily: "open sans",
                }}
              >
                {product.productName}
              </h2>
            </div>
            <div className="ml-20 mr-20 pt-10 pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-24 ">
                <div>
                  <img src={product.productImage} className="pImage"></img>
                </div>

                <div className="flex flex-col">
                  <div>
                    <ReactStars
                      count={5}
                      size={30}
                      isHalf={false}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      value="5"
                      activeColor="#FFA41C"
                    />
                  </div>
                  <div>
                    <h1
                      className="heading2"
                      style={{
                        textTransform: "Capitalize",
                        fontSize: "30px",
                        fontFamily: "open sans",
                      }}
                    >
                      {product.productName}
                    </h1>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        color: "#FF5E14",
                        fontWeight: "600",
                        marginTop: "5px",
                      }}
                    >
                      Rs.{product.salePrice}
                    </p>
                  </div>
                  <div className="mt-12">
                    <p
                      className="mytext"
                      style={{
                        fontSize: "16px",
                        fontFamily: "open sans",
                        fontWeight: "400",
                      }}
                    >
                      {product.shortDescription}
                      <br></br>
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-row gap-4">
                      <div>
                        <select
                          class="mt-4 mb-4 justify-center  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                          value={quantity}
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            localStorage.setItem("quantity", e.target.value);
                          }}
                        >
                          {[
                            ...Array(
                              parseInt(
                                product.stockQuantity
                                  ? product.stockQuantity
                                  : 1
                              )
                            ).keys(),
                          ].map((x) => (
                            <option value={x + 1}>{x + 1}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Link href="/Cart">
                          <button
                            className={
                              styles.btnShadow +
                              " hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
                            }
                          >
                            Add to Cart
                          </button>
                        </Link>
                      </div>
                      <div></div>
                    </div>
                    <h1 className="heading3">Quick Info</h1>
                    <p className="mytext">
                      SKU:
                      <span style={{ fontSize: "16px", color: "#565656" }}>
                        {" "}
                        {product.sku}
                      </span>
                    </p>
                    <p className="mytext">
                      CATEGORY:{" "}
                      <span style={{ fontSize: "16px", color: "#565656" }}>
                        {" "}
                        {product.category}
                      </span>
                    </p>
                    <p className="mytext">
                      IN STOCK:{" "}
                      <span style={{ fontSize: "16px", color: "#565656" }}>
                        {" "}
                        {product.stockQuantity}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "10%", marginTop: "-5%" }}>
              <div>
                <h1
                  className="heading2"
                  style={{
                    textTransform: "Capitalize",
                    fontSize: "30px",
                    fontFamily: "open sans",
                    borderBottom: "5px solid orange",
                    width: "270px",
                  }}
                >
                  Related Products
                </h1>
              </div>
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
                      max: 768,
                      min: 0,
                    },
                    items: 1,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 768,
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
                    if (
                      product.category == item.category &&
                      product._id != item._id
                    )
                      return <SingleProductCard key={index} product={item} />;
                  })
                )}
              </Carousel>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
