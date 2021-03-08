const jwt_decode = require("jwt-decode");

function admin(req, res, next) {
  let token = req.header("x-auth-token");
  try {
    if (!token) return res.status(401).send("Token not provided!");

    let decode = jwt_decode(token);
    decode.role === "admin"
      ? next()
      : res.status(400).send("You are not authorized for this action");
  } catch (error) {
    return res.status(400).send("Invalid token!");
  }
}
module.exports = admin;
