const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

async function auth(req, res, next) {
  let token = req.header("x-auth-token");
  try {
    if (!token) return res.status(401).send("Token not provided!");

    let user = jwt.verify(token, config.get("jwtprivatekey"));
    req.user = await User.findOne(user._id);
    next();
  } catch (error) {
    return res.status(400).send("Invalid token!");
  }
}
module.exports = auth;
