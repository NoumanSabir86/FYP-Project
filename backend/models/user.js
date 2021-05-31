var mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "User",
  },
});
userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

var userDetailsSchema = mongoose.Schema({
  cnic: String,
  userId: String,
});

var sellerDetailsSchema = mongoose.Schema({
  storeName: String,
  sellerPhone: String,
  sellerId: String,
  shopAddress: String,
});

var builderDetailsSchema = mongoose.Schema({
  companyPhone: String,
  companyName: String,
  builderId: String,
  companyAddress: String,
});

var adminDetailsSchema = mongoose.Schema({
  hobby: String,
  adminId: String,
});

var builderAdditionalDetailsSchema = new mongoose.Schema({
  builderId: String(),
  companyName: String(),
  portfolio: String(),
  establishedIn: String(),
  businessEntity: String(),
  noOfEmployees: Number,
  location: String(),
  phoneNumber: String(),
  logo: String(),
  coverImage: String(),
  aboutCompany: String(),
});

var BuilderAdditionalDetails = mongoose.model(
  "BuilderAdditionalDetails",
  builderAdditionalDetailsSchema
);
var User = mongoose.model("User", userSchema);
var UserDetails = mongoose.model("UserDetails", userDetailsSchema);
var SellerDetails = mongoose.model("SellerDetails", sellerDetailsSchema);
var BuilderDetails = mongoose.model("BuilderDetails", builderDetailsSchema);
var AdminDetails = mongoose.model("adminDetails", adminDetailsSchema);

function validateBuilderAdditionalDetails(data) {
  const schema = Joi.object({
    builderId: Joi.string().required(),
    companyName: Joi.string().required(),
    portfolio: Joi.string(),
    establishedIn: Joi.string().required(),
    businessEntity: Joi.string().required(),
    noOfEmployees: Joi.number().required(),
    location: Joi.string().required(),
    phoneNumber: Joi.string().max(11).required(),
    logo: Joi.string(),
    coverImage: Joi.string(),
    aboutCompany: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}

//validate register
function validateRegister(data) {
  if (data.role == "User") {
    const schema = Joi.object({
      username: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().min(3).required(),
      password: Joi.string().min(8).required(),

      repeatPassword: Joi.ref("password"),

      role: Joi.string().min(4).required(),
    });
    return schema.validate(data, { abortEarly: false });
  } else if (data.role == "Seller") {
    const schema = Joi.object({
      username: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().min(3).required(),
      password: Joi.string().min(8).required(),

      repeatPassword: Joi.ref("password"),
      sellerPhone: Joi.string(),
      storeName: Joi.string(),
      role: Joi.string().min(4).required(),
      shopAddress: Joi.string().min(4).required(),
    });
    return schema.validate(data, { abortEarly: false });
  } else {
    const schema = Joi.object({
      username: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().min(3).required(),
      password: Joi.string().min(8).required(),

      repeatPassword: Joi.ref("password"),

      role: Joi.string().min(4).required(),
      companyName: Joi.string(),
      companyPhone: Joi.string(),
      companyAddress: Joi.string().min(4).required(),
    });
    return schema.validate(data, { abortEarly: false });
  }
}

//validate login
function validateLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().min(4).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.User = User;
module.exports.UserDetails = UserDetails;
module.exports.SellerDetails = SellerDetails;
module.exports.BuilderDetails = BuilderDetails;
module.exports.AdminDetails = AdminDetails;
module.exports.BuilderAdditionalDetails = BuilderAdditionalDetails;
module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
module.exports.validateBuilderAdditionalDetails =
  validateBuilderAdditionalDetails;
