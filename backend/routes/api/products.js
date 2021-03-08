const express = require("express");
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
var { Product } = require("../../models/product");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");

router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 20);
  let skipRecords = perPage * (page - 1);
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});

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

router.put("/:id", auth, admin, validateProduct, async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.title = req.body.title;
  product.price = req.body.price;
  product.category = req.body.category;

  product.description = req.body.description;

  product.inStock = req.body.inStock;
  product.productImage = req.body.productImage;
  await product.save();
  return res.send(product);
});

router.delete("/:id", auth, admin, async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});

router.post("/", auth, admin, validateProduct, async (req, res) => {
  let product = new Product();
  product.title = req.body.title;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;
  product.inStock = req.body.inStock;
  product.productImage = req.body.productImage;
  await product.save();
  return res.send(product);
});

module.exports = router;
