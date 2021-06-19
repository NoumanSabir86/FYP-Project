import styles from "./productCard.module.css";
import React from "react";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import { useDispatch } from "react-redux";
import addtoCart from "../redux/actions/addToCart";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";

const SingleProductCard = ({ product }) => {
  const [text, setText] = React.useState("Add to Cart");
  const [rating, setRating] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const router = useRouter();
  const qty = 1;
  const productID = product._id;
  const dispatch = useDispatch();

  React.useEffect(async () => {
    await axios
      .get("http://localhost:3001/api/review/" + product._id)
      .then((res) => {
        let avg = 0,
          total = 0;
        let count = res.data.count;
        res.data.review.map((item, index) => {
          total = total + item.rating;
        });
        setCount(count);

        avg = total / count;
        res.data.review.length == 0 ? setRating(0) : setRating(avg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cartHandler = () => {
    dispatch(addtoCart(productID, qty));
    setText("Added to Cart!");
  };

  return (
    <div>
      <div
        style={{ width: "255px", maxWidth: "255px" }}
        className=" block  shadow-lg  cursor-pointer bg-white "
      >
        <Link href={`/SingleProduct/${product._id}`}>
          <img
            src={product.productImage}
            class="productImage hover:scale-50"
            alt={product.productImage}
            style={{
              verticalAlign: "top",
              maxWidth: "100%",
              border: "0",
              aspectRatio: "auto 240 / 240",
              height: "240px",
              width: "240px",
              padding: "2rem",
              marginBottom: "-5px",
            }}
            onClick={() => {
              router.push(
                `/SingleProduct/${product._id}`,
                `/SingleProduct/${product._id}`,
                {
                  shallow: true,
                }
              );
              localStorage.setItem("productID", product._id);
              Cookies.set("p_id", product._id);
            }}
          ></img>
        </Link>
      </div>

      <div
        className="flex items-center justify-between mt-3"
        style={{ width: "255px", maxWidth: "255px" }}
      >
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
            style={{ width: "255px", maxWidth: "255px" }}
          >
            <div
              style={{ fontSize: ".8rem", fontWeight: "600", color: "#788AA8" }}
            >
              {product.category}
            </div>

            <div style={{ position: "absolute", right: "5%" }}>
              {rating > 0 && (
                <div className="flex flex-row">
                  <ReactStars
                    count={5}
                    size={18}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    value={rating}
                    activeColor="#FF5E14"
                    edit={false}
                  />{" "}
                </div>
              )}
            </div>
          </div>

          <a
            href="#"
            className="heading4"
            style={{
              fontSize: "1.2rem",
              fontWeight: "700",
              lineHeight: "1.5rem",
            }}
          >
            {product.productName.length > 30
              ? product.productName.substring(0, 30 - 3) + "..."
              : product.productName}
          </a>

          <a className="flex items-center " href="#">
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
