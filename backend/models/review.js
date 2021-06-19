var mongoose = require("mongoose");
const Joi = require("joi");

var reviewSchema = mongoose.Schema({
  userId: String,
  userName: String,
  productId: String,
  sellerId: String,

  review: String,
  rating: Number,
});
var Review = mongoose.model("Review", reviewSchema);

function validateReview(data) {
  const schema = Joi.object({
    userId: Joi.string(),
    sellerId: Joi.string(),
    productId: Joi.string(),
    userName: Joi.string(),
    review: Joi.string().max(2000).required(),
    rating: Joi.number().min(1).max(5).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Review = Review;
module.exports.validate = validateReview;
