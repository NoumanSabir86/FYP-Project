var mongoose = require("mongoose");
const joi = require("joi");
const Joi = require("joi");

var storeSchema = mongoose.Schema({
  storeId: String,
  storeName: String,
  phone: String,
});

var Store = mongoose.model("Store", storeSchema);

function validateStore(data) {
  const schema = Joi.object({
    sellerId: Joi.string().required(),
    storeName: Joi.string().min(3).max(50).required(),
    sellerPhone: Joi.string().min(11).max(15).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Store = Store;
module.exports.validate = validateStore;
