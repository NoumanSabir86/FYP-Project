import Link from "next/link";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../Components/Navbar";
import getProductDetails from "../../redux/actions/getProductDetails";
import { useRouter } from "next/router";
import styles from "./SingleProduct.module.css";
import Loader from "../../Components/Loader";
import Carousel from "react-multi-carousel";
import SingleProductCard from "../../Components/SingleProductCard";
import getProductList from "../../redux/actions/getProductList";
import { Footer } from "../../Components/Footer";
import DisqusComments from "../../Components/DisqusComments";
import axios from "axios";
import cookie from "cookie";
import Review from "../../Components/Review";
import UserServices from "../../Services/UserServices";
import { ToastContainer, toast } from "react-nextjs-toast";
import { Divider } from "@material-ui/core";

const SingleProduct = (props) => {
  const pDetails = useSelector((state) => state.getProductDetails);
  const [quantity, setQuantity] = React.useState(1);
  const [productID, setpID] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const { product, loading, error } = pDetails;
  const [review, setReview] = React.useState("");
  const [role, setRole] = React.useState("sadsad");
  const [isPresent, setIsPresent] = React.useState(false);
  const pList = useSelector((state) => state.getProductList);
  const { products, loading: ploading, error: perror } = pList;

  const dispatch = useDispatch();

  const router = useRouter();

  React.useEffect(async () => {
    localStorage.getItem("token")
      ? setRole(UserServices.getLoggedinfo().role)
      : setRole("NADS");

    localStorage.setItem("quantity", quantity);
    dispatch(getProductList());
    dispatch(getProductDetails(localStorage.getItem("productID")));
    localStorage.getItem("token") ? present() : "";
  }, [router.query]);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const present = async () => {
    const id = UserServices.getLoggedinfo()._id;
    await axios
      .get(
        "http://localhost:3001/api/review/present/" +
          id +
          "/" +
          localStorage.getItem("productID")
      )
      .then((res) => {
        res.data == true ? setIsPresent(true) : setIsPresent(false);
      });
  };

  const notify = (error, type) => {
    toast.notify(error, {
      duration: 5,
      type: type,
      title: type,
    });
  };

  const addRating = async () => {
    await axios
      .post("http://localhost:3001/api/review/", {
        userId: UserServices.getLoggedinfo()._id,
        userName: UserServices.getLoggedinfo().username,
        productId: localStorage.getItem("productID"),
        sellerId: product.storeId,
        review,
        rating,
      })
      .then((res) => {
        notify("Review added Successfully!", "success");

        setTimeout(() => {
          window.location.href =
            "/SingleProduct/" + localStorage.getItem("productID");
        }, 2000);
      })
      .catch((err) => {
        notify(err.response.data, "error");
      });
  };
  return (
    <>
      <div>
        <Navbar />
        <ToastContainer />

        {loading ? (
          <Loader />
        ) : error ? (
          "error"
        ) : (
          <>
            <div
              className="sm:w-full  hero"
              style={{
                backgroundColor: "#F0F1F1",

                padding: "8%",
                verticalAlign: "middle",
                textAlign: "center",
                borderBottom: "5px solid #FF5E16",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
              }}
            >
              <h2
                className="mytitle colorheading "
                style={{
                  textTransform: "Capitalize",

                  fontFamily: "open sans",
                }}
              >
                {product.productName}
              </h2>
            </div>
            <div className="lg:ml-20 lg:mr-20 lg:pt-10 lg:pb-10 mx-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-24 md:gap-24 gap-8 ">
                <div>
                  <img src={product.productImage} className="pImage "></img>
                </div>

                <div className="flex flex-col">
                  <div>
                    <ReactStars
                      count={5}
                      size={30}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      value={props.avg}
                      activeColor="#FFA41C"
                      edit={false}
                    />
                  </div>
                  <div>
                    <h1
                      className="heading2 pTitle"
                      style={{
                        textTransform: "Capitalize",

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
                  <div className="lg:mt-4 md:mt-4 mt-2">
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
                              "transform hover:scale-105 transition-all  hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
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
            <div className="rev" style={{ marginTop: "-5%" }}>
              <div>
                <h1
                  className="heading2 dont"
                  style={{
                    textTransform: "Capitalize",
                    fontSize: "30px",
                    fontFamily: "open sans",
                  }}
                >
                  Related Products
                </h1>
                <div
                  className="dont"
                  style={{
                    width: "50px",
                    height: "5px",
                    backgroundColor: "#FF5E16",
                  }}
                ></div>
              </div>
              <div className="dont">
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

              <div className="lg:mt-20 md:mt-20 mt-8 ">
                <div className="  ">
                  <h1
                    className="heading2  generalHeading "
                    style={{
                      textTransform: "Capitalize",

                      fontFamily: "open sans",
                    }}
                  >
                    Question and Answers
                  </h1>
                  <div
                    className="pb-2 mt-2 mb-4"
                    style={{
                      width: "50px",
                      height: "4px",
                      backgroundColor: "#FF5E16",
                    }}
                  ></div>
                </div>
                {loading ? "wait..." : <DisqusComments post={product} />}
              </div>
              {/* ---------------------------------------------------------Reviews */}
              <div className="reviews mt-10">
                {isPresent == false && (
                  <div>
                    {role == "User" && (
                      <>
                        {" "}
                        <h1
                          className="heading2   generalHeading "
                          style={{
                            textTransform: "Capitalize",

                            fontFamily: "open sans",
                          }}
                        >
                          Rate your experience!
                        </h1>
                        <div
                          className="pb-2 mt-1 mb-4"
                          style={{
                            width: "50px",
                            height: "5px",
                            backgroundColor: "#FF5E16",
                          }}
                        ></div>
                        <div className="flex flex-col">
                          <div>
                            <p className="mytext">
                              How would you rate this product?
                            </p>
                          </div>
                          <div>
                            <ReactStars
                              count={5}
                              size={30}
                              isHalf={true}
                              emptyIcon={<i className="far fa-star"></i>}
                              halfIcon={<i className="fa fa-star-half-alt"></i>}
                              fullIcon={<i className="fa fa-star"></i>}
                              onChange={ratingChanged}
                              value={rating}
                              activeColor="#FFA41C"
                              edit={true}
                            />
                          </div>
                          <div>
                            <p className="mytext">
                              Kindly provide us your feedback
                            </p>
                          </div>
                          <div>
                            <textarea
                              className="col-span-full lg:w-2/4  w-full appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              placeholder="Review...."
                              name="review"
                              rows="5"
                              cols="40"
                              onChange={(e) => setReview(e.target.value)}
                            ></textarea>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                addRating();
                              }}
                              className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
                <div className="mt-8">
                  <h1
                    className="heading2 generalHeading "
                    style={{
                      textTransform: "Capitalize",

                      fontFamily: "open sans",
                    }}
                  >
                    Reviews
                  </h1>
                  <div
                    className="mb-4 "
                    style={{
                      width: "50px",
                      height: "5px",
                      backgroundColor: "#FF5E16",
                    }}
                  ></div>
                </div>
              </div>

              {/* feedbacks */}

              {props.review.length == 0 ? (
                <p>Not rated yet</p>
              ) : (
                props.review.map((review, index) => {
                  return <Review key={index} review={review} />;
                })
              )}

              {/* end feedbacks */}
              {/* ---------------------------------------------------------End Reviews */}
            </div>
          </>
        )}
      </div>
      {product && <Footer />}
    </>
  );
};

export const getServerSideProps = async (context) => {
  let avg = 0,
    total = 0;
  const parsedCookies = cookie.parse(context.req.headers.cookie);

  await axios
    .get("http://localhost:3001/api/review/" + parsedCookies.p_id)
    .then((res) => {
      let count = res.data.count;
      res.data.review.map((item, index) => {
        total = total + item.rating;
      });

      avg = total / count;
    })
    .catch((err) => {
      console.log(err);
    });

  const reviews = await axios.get(
    "http://localhost:3001/api/review/" + parsedCookies.p_id
  );

  return { props: { avg, review: reviews.data.review } };
};

export default SingleProduct;
