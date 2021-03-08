import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactStars from "react-rating-stars-component";
const SingleProductCard = () => {
  return (
    <div>
      <img
        src="https://p4.design/assets/Products/Bla-Station/Wilmer-O55S/Wilmer-055S-1.png"
        style={{ width: "255px", height: "auto" }}
        className="block h-64 rounded-lg shadow-lg bg-white"
      ></img>
      <div className="flex items-center justify-between mt-3">
        <div>
          <div
            className="flex relative  items-center "
            style={{ width: "255px" }}
          >
            <div className="bdi">CATEGORY</div>

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

          <a href="#" className="heading4 " style={{ fontSize: "1rem" }}>
            Product Name
          </a>
          <a className="flex items-center" href="#">
            <span className="text-xs font-medium text-gray-600">by</span>
            <span className="text-xs font-medium ml-1 text-indigo-500">
              Store Name
            </span>
          </a>
          <span
            style={{
              marginTop: "5%",
              background: "rgb(255, 94, 22)",
              color: "white",
            }}
            className="bdi  flex items-center h-8  text-sm px-2 cursor-pointer rounded relative hover:shadow-lg"
          >
            Rs.2300
            <div
              style={{
                width: "1px",
                height: "32px",
                backgroundColor: "white",
                position: "absolute",
                right: "25%",
              }}
            ></div>
            <i
              class="fab fa-opencart transform hover:scale-110 motion-reduce:transform-none "
              style={{
                right: "8%",
                position: "absolute",
                fontSize: "1.4rem",
                cursor: "pointer",
              }}
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
