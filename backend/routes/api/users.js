const express = require("express");
let router = express.Router();
var {
  User,
  UserDetails,
  SellerDetails,
  BuilderDetails,
  AdminDetails,
} = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const validateNewUser = require("../../middlewares/validateUser");
const validateUser = require("../../middlewares/validatelogin");
const auth = require("../../middlewares/auth");
const validatelogin = require("../../middlewares/validatelogin");

function generateAccessToken(data) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(data, config.get("jwtprivatekey"), {
    expiresIn: "1800s",
  });
}

//register

router.post("/register", validateNewUser, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already exists");

  user = new User();
  user.name = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;

  await user.generateHashedPassword();
  await user.save();

  //Save additional details

  // if(user.role=="user"){
  //   console.log(user.contact);
  // userDeatils=new UserDetails();

  // userDeatils.cnic=req.body.cnic;

  // userDetails.userID=user._id;

  // await userDetails.save();
  // }
  // else
  if (user.role == "Seller") {
    sellerDetails = new SellerDetails();
    sellerDetails.sellerPhone = req.body.sellerPhone;
    sellerDetails.storeName = req.body.storeName;
    sellerDetails.sellerId = user._id;
    sellerDetails.shopAddress = req.body.shopAddress;

    await sellerDetails.save();
  } else if (user.role == "Builder") {
    builderDetails = new BuilderDetails();
    builderDetails.companyPhone = req.body.companyPhone;
    builderDetails.companyName = req.body.companyName;
    builderDetails.builderId = user._id;
    builderDetails.companyAddress = req.body.companyAddress;

    await builderDetails.save();
  } else if (user.role == "admin") {
    adminDetails = new AdminDetails();
    adminDetails.hobby = req.body.hobby;

    adminDetails.adminId = user._id;

    await adminDetails.save();
  }

  if (user.role == "Seller") {
    let token = generateAccessToken({
      username: user.name,
      role: req.body.role,
      userId: user._id,
      email: req.body.email,
      shopAddress: req.body.shopAddress,
    });

    return res.send(token);
  } else if (user.role == "Builder") {
    let token = generateAccessToken({
      username: user.name,
      role: req.body.role,
      userId: user._id,
      email: req.body.email,
      companyAddress: req.body.companyAddress,
    });

    return res.send(token);
  } else {
    let token = generateAccessToken({
      username: user.name,
      role: req.body.role,
      userId: user._id,
      email: req.body.email,
    });

    return res.send(token);
  }
});

//login

router.post("/login", validatelogin, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Username doesn't exist");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Password incorrect!");
  let checkRole = (await req.body.role) !== user.role ? false : true;
  if (!checkRole) return res.status(400).send("No user found under this role");

  if (user.role == "User") {
    let details = await UserDetails.findOne({ userId: user._id });
    let token = generateAccessToken({
      username: user.name,
      role: req.body.role,
      _id: user._id,
      email: req.body.email,
    });
    console.log(user.name);
    return res.send(token);
  }

  if (user.role == "Seller") {
    let details = await SellerDetails.findOne({ sellerId: user._id });
    let token = generateAccessToken({
      username: user.name,
      role: req.body.role,
      _id: user._id,
      email: req.body.email,
      shopAddress: details.shopAddress,
      shopName: details.storeName,
      sellerPhone: details.sellerPhone,
    });
    console.log(token);
    return res.send(token);
  }

  if (user.role == "Builder") {
    let details = await BuilderDetails.findOne({ builderId: user._id });
    let token = generateAccessToken({
      username: user.name,
      role: req.body.role,
      _id: user._id,
      email: req.body.email,
      companyAddress: details.companyAddress,
      companyName: details.companyName,
    });
    return res.send(token);
  }

  if (user.role == "admin") {
    let details = await AdminDetails.findOne({ adminId: user._id });
    let token = generateAccessToken({
      username: user.name,
      role: req.body.role,
    });
    return res.send(token);
  }
});

//update users
router.put("/update/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(400).send("User not exists");

  user.name = req.body.username;
  if (req.body.password != "") {
    user.password = req.body.password;
    await user.generateHashedPassword();
  }

  await user.save();

  //Save additional details

  // if(user.role=="user"){
  //   console.log(user.contact);
  // userDeatils=new UserDetails();

  // userDeatils.cnic=req.body.cnic;

  // userDetails.userID=user._id;

  // await userDetails.save();
  // }
  // else
  if (user.role == "Seller") {
    console.log("seller schema .........");
    let sellerDetails = await SellerDetails.findOne({
      sellerId: req.params.id,
    });
    console.log(sellerDetails);
    if (!sellerDetails) res.send("seller details not found");
    sellerDetails.sellerPhone = req.body.sellerPhone;
    sellerDetails.storeName = req.body.shopName;
    sellerDetails.shopAddress = req.body.shopAddress;
    await sellerDetails.save();
  } else if (user.role == "Builder") {
    let builderDetails = await BuilderDetails.findOne({
      builderId: req.params.id,
    });
    builderDetails.companyPhone = req.body.companyPhone;
    builderDetails.companyName = req.body.companyName;
    builderDetails.companyAddress = req.body.companyAddress;
    await builderDetails.save();
  } else if (user.role == "admin") {
    let adminDetails = await AdminDetails.findOne({ adminId: req.params.id });
    adminDetails.hobby = req.body.hobby;
    await adminDetails.save();
  }
  return res.send("Updated Successfully!");
});

module.exports = router;
