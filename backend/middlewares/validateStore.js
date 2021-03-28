const { validate } = require("../models/store");

function validateStore(req, res, next){

let {error}= validate(req.body);
if (error) return res.status(400).send(error.details[0].message);
  next();
};

module.exports=validateStore;
