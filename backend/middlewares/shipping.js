const { validateShipping } = require("../models/user");
function validateShippingAddress(req, res, next) {
  let { error } = validateShipping(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  next();
}
module.exports = validateShippingAddress;
