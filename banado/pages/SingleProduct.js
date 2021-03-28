import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";

const SingleProduct = () => {
  return (
    <div>
      <Navbar />
      <Hero name={"Prodcut name"} />
      <div className="ml-20 mr-20 pt-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 ">
          <div>
            <img
              src="https://p4.design/assets/Products/Bla-Station/Wilmer-O55S/Wilmer-055S-1.png"
              className="pImage"
            ></img>
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
              <h1 className="heading2">Product Name</h1>
            </div>
            <div>
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#FF5E14",
                  fontWeight: "600",
                }}
              >
                Rs.700
              </p>
            </div>
            <div className="mt-12">
              <p className="mytext">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet.
                <br></br>
                <br></br>
                It uses a dictionary of over 200 Latin words, combined with a
                handful of model sentence structures, to generate Lorem Ipsum
                which looks reasonable. The generated Lorem Ipsum is therefore
                always free from repetition, injected humour, or
                non-characteristic words etc.
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-row gap-4">
                <div>
                  <Link href="#">
                    <button className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 ">
                      Add to Cart
                    </button>
                  </Link>
                </div>
                <div></div>
              </div>
              <h1 className="heading3">Quick Info</h1>
              <p className="mytext">SKU:</p>
              <p className="mytext">CATEGORY:</p>
              <p className="mytext">In Stock:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
