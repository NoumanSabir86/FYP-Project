const express = require("express");
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
var { Product } = require("../../models/product");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
const seller = require("../../middlewares/seller");

//get all
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 20);
  let skipRecords = perPage * (page - 1);
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});

//get by product id
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With given ID is not present"); //when id is not present id db
    return res.send(product); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

//get by store

router.get("/byStore/:id", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 20);
  let skipRecords = perPage * (page - 1);
  try {
    let products = await Product.find({ storeId: req.params.id })
      .skip(skipRecords)
      .limit(perPage);
    //console.log("in by seller");
    if (!products)
      return res.status(400).send("Product With given ID is not present"); //when id is not present id db
    return res.send(products); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

router.put("/:id", validateProduct, async (req, res) => {
  let product = await Product.findById(req.params.id);
  //product.storeId = req.body.storeId;
  product.productName = req.body.productName;
  product.category = req.body.category;
  product.brandName = req.body.brandName;
  product.stockQuantity = req.body.stockQuantity;
  product.price = req.body.price;
  product.salePrice = req.body.salePrice;
  product.sku = req.body.sku;
  product.shortDescription = req.body.shortDescription;
  product.description = req.body.description;
  product.productImage = req.body.productImage;
  await product.save();
  return res.send(product);
});

router.delete("/:id", seller, async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});

//add new product // post
router.post("/", seller, validateProduct, async (req, res) => {
  let product = await Product.findOne({
    storeId: req.body.storeId,
    productName: req.body.productName,
  });
  if (product)
    return res.status(400).send("Product with this Name already exist");

  product = new Product();

  product.storeId = req.body.storeId;
  product.productName = req.body.productName;
  product.category = req.body.category;
  product.brandName = req.body.brandName;
  product.stockQuantity = req.body.stockQuantity;
  product.price = req.body.price;
  product.salePrice = req.body.salePrice;
  product.sku = req.body.sku;
  product.shortDescription = req.body.shortDescription;
  product.description = req.body.description;
  product.productImage = req.body.productImage;

  await product.save();
  return res.send(product);
});

module.exports = router;
