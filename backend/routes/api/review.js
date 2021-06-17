const express = require("express");
let router = express.Router();
const validateReview = require("../../middlewares/validateReview");
var { Review } = require("../../models/review");
const auth = require("../../middlewares/auth");

//get by user , one rating

//get avg rating of a product
router.get("/:productId", async (req, res) => {
  console.log("I am inn");

  let review = await Review.find({ productId: req.params.productId });

  if (!review) return res.send(false); //when id is not present id db
  Review.countDocuments(
    { productId: req.params.productId },
    function (err, count) {
      if (err) {
        console.log(err);
      } else {
        console.log("Count :", count);
        return res.send({ review, count });
      }
    }
  );
});

//post
router.post("/", validateReview, async (req, res) => {
  let review = new Review();
  review.userId = req.body.userId;
  review.productId = req.body.productId;
  review.sellerId = req.body.sellerId;
  review.review = req.body.review;
  review.rating = req.body.rating;

  review.save();
  res.send("review added");
});

module.exports = router;
