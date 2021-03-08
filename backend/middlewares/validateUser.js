const { validateRegister } = require("../models/user");
function validateNewUser(req, res, next) {
  let { error } = validateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  next();
}
module.exports = validateNewUser;
