const express = require("express");
let router = express.Router();
const validateOrder = require("../../middlewares/validateOrder");
var { Order } = require("../../models/order");
var { Product } = require("../../models/product");
const auth = require("../../middlewares/auth");
var request = require("request");
var { nanoid } = require("nanoid");

const { date } = require("joi");
//for admin get all orders
router.get("/", async (req, res) => {
  try {
    let order = await Order.find();
    if (!order) return res.status(400).send("No order found"); //when id is not present id db
    return res.send(order); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

//get by storeID

router.get("/byStore/:storeId", async (req, res) => {
  try {
    let order = await Order.find({ storeId: req.params.storeId });
    if (!order) return res.status(400).send("Order With given ID is not found"); //when id is not present id db

    return res.send(order); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

//get by user
router.get("/byUser/:userId", async (req, res) => {
  try {
    let order = await Order.find({ userId: req.params.userId });
    if (!order) return res.status(400).send("Order With given ID is not found"); //when id is not present id db
    return res.send(order); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
  return res.send(order);
});

//put
router.put("/:id", async (req, res) => {
  let order = await Order.findById(req.params.id);
  if (!order) return res.status(400).send("Order not found.");

  order.status = req.body.status;
  await order.save();
  res.send("Status Updated!");
});

router.get("/:id", async (req, res) => {
  let order = await Order.findById(req.params.id);
  if (!order) return res.status(400).send("Order not found.");

  res.send(order);
});

//post
router.post("/", async (req, res) => {
  let order = new Order();
  order.userId = req.body.userId;
  order.storeId = req.body.storeId;
  order.orderNumber = nanoid(8);
  order.orderDate = new Date();
  order.products = req.body.cartProducts;
  order.total = req.body.total;
  order.status = req.body.status;
  await order.save();
  res.send("order placed");
});

module.exports = router;
