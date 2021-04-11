const express = require("express");
let router = express.Router();
var { Store } = require("../../models/store");
const auth = require("../../middlewares/auth");
const seller = require("../../middlewares/seller");
const validateStore = require("../../middlewares/validateStore");

//get method

router.get("/:id", auth, seller, async (req, res) => {
  try {
    let store = await Store.findById(req.params.id);
    if (!store) return res.status(400).send("Store with given Id is not found"); //when id is not present id db
    return res.send(store); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

//put method

router.put("/:id", auth, seller, validateStore, async (req, res) => {
  let store = await Store.findById(req.params.id);
  store.storeName = req.storeName;
  store.phone = req.phone;

  await store.save();
  return res.send(store);
});

//post method

router.post("/", validateStore, async (req, res) => {
  let store = new Store();
  store.storeId = req.body.sellerId;
  store.storeName = req.body.storeName;
  store.phone = req.body.sellerPhone;
  console.log(req.body.sellerId);
  console.log("in store post method");
  await store.save();
  return res.send(store);
});

router.post("/storePresent", async (req, res) => {
  try {
    let store = await Store.findOne({ storeId: req.body.sellerId });

    if (!store) return res.send({ val: false }); //when id is not present id db
    return res.send({ val: true }); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

//delete

router.delete("/:id", auth, seller, async (req, res) => {
  let store = Store.findByIdAndDelete(req.params.id);
  res.send(store);
});

module.exports = router;
