import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";
import addtoCart from "../redux/actions/addToCart";
import getProductDetails from "../redux/actions/getProductDetails";
import { useRouter } from "next/router";
import { Product } from "../../backend/models/product";
import styles from "./SingleProduct.module.css";
import Loader from "../Components/Loader";
const SingleProduct = (props) => {
  const pDetails = useSelector((state) => state.getProductDetails);
  const [quantity, setQuantity] = React.useState(1);
  const { product, loading, error } = pDetails;
  const dispatch = useDispatch();

  const router = useRouter();

  React.useEffect(() => {
    dispatch(getProductDetails(localStorage.getItem("productID")));
  }, []);

  return (
    <div>
      <Navbar />

      {loading ? (
        <Loader />
      ) : error ? (
        "error"
      ) : (
        <>
          <Hero name={product.productName} />
          <div className="ml-20 mr-20 pt-10 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 ">
              <div>
                <img src={product.productImage} className="pImage"></img>
              </div>

              <div className="flex flex-col">
                <div>
                  <ReactStars
                    count={5}
                    size={18}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    value="5"
                    activeColor="#FF5E14"
                  />
                </div>
                <div>
                  <h1 className="heading2">{product.productName}</h1>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      color: "#FF5E14",
                      fontWeight: "600",
                    }}
                  >
                    Rs.{product.salePrice}
                  </p>
                </div>
                <div className="mt-12">
                  <p className="mytext">
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
                              product.stockQuantity ? product.stockQuantity : 1
                            )
                          ).keys(),
                        ].map((x) => (
                          <option value={x + 1}>{x + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          window.location.href = "/Cart";
                        }}
                        className={
                          styles.btnShadow +
                          " hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
                        }
                      >
                        Add to Cart
                      </button>
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
        </>
      )}
    </div>
  );
};

export default SingleProduct;
