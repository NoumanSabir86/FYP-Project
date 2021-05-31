const { validateBuilderAdditionalDetails } = require("../models/user");
function validateBuilderInfo(req, res, next) {
  let { error } = validateBuilderAdditionalDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  next();
}
module.exports = validateBuilderInfo;
