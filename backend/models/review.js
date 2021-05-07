var mongoose = require("mongoose");
const Joi = require("joi");
var reviewSchema = mongoose.Schema({
    orderId: String,
  userId: String,
  storeId: String,
  productId: String,
  description: String,
  rating: Number,
});
var Review = mongoose.model("Review", reviewSchema);

function validateReview(data) {
  const schema = Joi.object({
    orderId: Joi.string().required(),
    userId: Joi.string().required(),
    storeId: Joi.string().required(),
    productId: Joi.string().required(),
    description: Joi.string().max(200),
    rating: Joi.number().min(1).max(5).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Review = Review;
module.exports.validate = validateReview;
