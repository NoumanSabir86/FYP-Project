import styles from "./productCard.module.css";
import React from "react";
import ReactStars from "react-rating-stars-component";
const SingleProductCard = (props) => {
  return (
    <div>
      <img
        src="https://p4.design/assets/Products/Bla-Station/Wilmer-O55S/Wilmer-055S-1.png"
        style={{ width: "255px", height: "auto" }}
        className="block h-64  shadow-lg cursor-pointer bg-white"
      ></img>

      <div className="flex items-center justify-between mt-3">
        <div>
          <span className="block ">
            <button className={styles.btnCart}>Add to Cart</button>
          </span>

          <div
            className="flex relative  items-center mt-4"
            style={{ width: "255px" }}
          >
            <div
              style={{ fontSize: ".8rem", fontWeight: "600", color: "#788AA8" }}
            >
              CATEGORY
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
            {props.title}
          </a>
          {/* <a className="flex items-center" href="#">
            <span className="text-xs font-medium text-gray-600">by</span>
            <span className="text-xs font-medium ml-1 text-indigo-500">
              Store Name
            </span>
          </a> */}
          <a className="flex items-center" href="#">
            <span className="bdi text-xs font-medium text-gray-600">
              Rs.500
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
