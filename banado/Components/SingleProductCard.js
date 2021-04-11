import styles from "./productCard.module.css";
import React from "react";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import { useDispatch } from "react-redux";
import addtoCart from "../redux/actions/addToCart";
import { useRouter } from "next/router";
import Image from "next/image";

const SingleProductCard = ({ product }) => {
  const [text, setText] = React.useState("Add to Cart");

  const router = useRouter();
  const qty = 1;
  const productID = product._id;
  const dispatch = useDispatch();

  const cartHandler = () => {
    dispatch(addtoCart(productID, qty));
    setText("Added to Cart!");
  };

  return (
    <div style={{ width: "255px", maxWidth: "255px" }} className="eimage">
      <Link href={`/SingleProduct`}>
        <img
          src={product.productImage}
          className=" block  shadow-lg cursor-pointer bg-white"
          style={{
            maxHeight: "245px",
            height: "100%",
            maxWidth: "100%",
            width: "100%",
            marginBottom: "-5px",
          }}
          onClick={() => {
            localStorage.setItem("productID", product._id);
          }}
        ></img>
      </Link>

      <div className="flex items-center justify-between mt-3">
        <div>
          <span className="block ">
            <button
              className={styles.btnCart}
              onClick={() => {
                cartHandler();

                setTimeout(() => {
                  setText("Add to Cart!");
                }, 2000);
              }}
            >
              {text}
            </button>
          </span>

          <div
            className="flex relative  items-center mt-4"
            style={{ width: "255px" }}
          >
            <div
              style={{ fontSize: ".8rem", fontWeight: "600", color: "#788AA8" }}
            >
              {product.category}
            </div>

            <div style={{ position: "absolute", right: "5%" }}>
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
          </div>

          <a
            href="#"
            className="heading4 "
            style={{ fontSize: "1.2rem", fontWeight: "700" }}
          >
            {product.productName.length > 30
              ? product.productName.substring(0, 30 - 3) + "..."
              : product.productName}
          </a>
          <a className="flex items-center" href="#">
            <span className="text-xs font-medium text-gray-600">by</span>
            <span
              className=" text-xs font-medium ml-1 text-indigo-500"
              style={{ color: "#FF5E14" }}
            >
              Store Name
            </span>
          </a>
          <a className="flex items-center mt-2" href="#">
            <span className="bdi text-xs font-medium text-gray-600">
              Rs.{product.salePrice}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
