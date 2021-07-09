import React from "react";
import ReactStars from "react-rating-stars-component";

const Review = ({ review }) => {
  return (
    <div className="flex flex-col  mb-4">
      <div>
        <span className="mytext">{review.userName}</span>
      </div>
      <div>
        <ReactStars
          count={5}
          size={20}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          value={review.rating}
          activeColor="#FFA41C"
          edit={false}
        />
      </div>
      <div>
        <p className="text lg:w-2/3 w-full" style={{ fontSize: "16px" }}>
          {review.review}
        </p>
      </div>
      <div
        className="mt-2 lg:w-2/3 w-full "
        style={{
          height: "1px",
          backgroundColor: "#BCBCC5",
        }}
      ></div>
    </div>
  );
};

export default Review;
