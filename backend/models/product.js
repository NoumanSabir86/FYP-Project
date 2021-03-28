var mongoose = require("mongoose");
const Joi = require("joi");
var productSchema = mongoose.Schema({
  storeId: String,
  productName: String,
  category: String,
  brandName: String,
  stockQuantity: String,
  price: Number,
  salePrice: Number,
  sku: String,
  shortDescription: String,
  Description: String,
  productImage: String,
});
var Product = mongoose.model("Product", productSchema);

function validateProduct(data) {
  const schema = Joi.object({
    storeId: Joi.string().required(),
    productName: Joi.string().min(3).max(100).required(),
    category: Joi.string().min(3).max(100).required(),
    brandName: Joi.string().min(3).max(100).required(),
    stockQuantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    salePrice: Joi.number().min(0).required(),
    sku: Joi.string().required(),
    shortDescription: Joi.string().min(3).max(300).required(),
    description: Joi.string().min(3).max(1000).required(),
    productImage: Joi.string().min(3).max(1000).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Product = Product;
module.exports.validate = validateProduct;
