const express = require("express");
let router = express.Router();
const validateReview = require("../../middlewares/validateReview");
var { Review } = require("../../models/review");
var { Order } = require("../../models/order");
var { Product } = require("../../models/product");
const auth = require("../../middlewares/auth");



//get by user , one rating



//get avg rating of a product
router.get("/:productId", async (req, res) => {
    console.log("I am inn");
  try {
    let review = await Review.find({ productId: req.params.productId });
    if (!review) return res.send("NO REVIEW FOUND"); //when id is not present id db
    totalReviews=review.count();
    avgRating=avg(review.rating);
    return res.send({totalReviews:totalReviews, avgRating:avgRating}); 
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
  
});



//post
router.post("/",validateReview,async (req, res) => {
  let order = await Order.findOne({
    _id: req.body.orderId,
  });
  if (!order) return res.status(400).send("Order not found.");

  let review = new Review();
  review.orderId = req.body.orderId;
  review.userId = req.body.userId;
  review.storeId = req.body.storeId;
  review.productId = req.body.productId;
  review.description = req.body.description;
  review.rating = req.body.rating;
  review.save();
  res.send("review added");
});

module.exports = router;
