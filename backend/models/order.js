var mongoose = require("mongoose");
const Joi = require("joi");

var orderSchema = mongoose.Schema({
  userId: String,
  storeId: String,
  orderNumber: { type: String, unique: true },
  orderDate: Date,
  products: Array,
  total: Number,
  status: String,
});
var Order = mongoose.model("Order", orderSchema);

function validateOrder(data) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    storeId: Joi.string().required(),
    products: Joi.array().required(),
    total: Joi.number().min(0).required(),
    status: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Order = Order;
module.exports.validate = validateOrder;
