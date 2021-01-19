const jwt = require("jsonwebtoken");

module.exports = function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username,
    is_admin: user.is_admin,
  };
  const jwtSecret = require("./secret.js").jwtSecret;
  const jwtOptions = {
    expiresIn: "1h",
  };
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};
