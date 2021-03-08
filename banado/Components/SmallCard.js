import React from "react";
import ReactStars from "react-rating-stars-component";
const SmallCard = (props) => {
  return (
    <>
      <div
        className="flex flex-row mt-4 "
        style={{ height: "50px", position: "relative" }}
      >
        <div>
          {" "}
          <img
            src="./Rectangle 59.png"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div
          className=" "
          style={{
            border: "2px  solid #F0F0F0",
            borderLeft: "0px",
            width: "250px",
          }}
        >
          <div className="flex flex-row pl-4 pr-4">
            <div className="flex flex-col">
              <span className="heading4" style={{ fontSize: "18px" }}>
                {props.name}
              </span>
              <span className="heading4" style={{ fontSize: "12px" }}>
                {props.price}
              </span>
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
        </div>
      </div>
    </>
  );
};

export default SmallCard;
