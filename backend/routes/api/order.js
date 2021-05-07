const express = require("express");
let router = express.Router();
const validateOrder = require("../../middlewares/validateOrder");
var { Order } = require("../../models/order");
var { Product } = require("../../models/product");
const auth = require("../../middlewares/auth");

//for admin get all orders
router.get("/", async (req, res) => {
  try {
    let order = await await Order.find().populate("product");
    if (!order) return res.status(400).send("No order found"); //when id is not present id db
    return res.send(order); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
  return res.send(order);
});

//get by storeID

router.get("/byStore/:storeId", async (req, res) => {
  try {
    let order = await Order.find({ storeId: req.params.storeId }).populate(
      "product"
    );
    if (!order) return res.status(400).send("Order With given ID is not found"); //when id is not present id db
    return res.send(order); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
  return res.send(order);
});

//get by user
router.get("/byUser/:userId", async (req, res) => {
  try {
    let order = await Order.find({ userId: req.params.userId }).populate(
      "product"
    );
    if (!order) return res.status(400).send("Order With given ID is not found"); //when id is not present id db
    return res.send(order); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
  return res.send(order);
});

//put
router.put("/:id", auth, async (req, res) => {
  let order = await Order.findById(req.params.id);

  if (!order) return res.status(400).send("Order not found.");
  order.userId = req.body.userId;
  //order.storeId = req.body.storeId;
  order.product = req.body.productId;
  order.quantity = req.body.quantity;
  order.tatal = req.body.total;
  order.status = req.body.status;
  order.save();
  res.send("order changed");
});

//post
router.post("/", validateOrder, async (req, res) => {
  let product = await Product.findOne({
    _id: req.body.productId,
  });

  if (!product) return res.status(400).send("Product in this order not found.");
  let order = new Order();
  order.userId = req.body.userId;
  order.storeId = product.storeId;
  order.product = req.body.productId;
  order.quantity = req.body.quantity;
  order.total = req.body.total;
  order.status = req.body.status;
  order.save();
  res.send("order placed");
});

module.exports = router;
