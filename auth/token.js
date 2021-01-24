const jwt = require("jsonwebtoken");

module.exports = function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username,
    is_agent: user.is_agent,
    is_Landlord: user.is_Landlord,
  };
  const jwtSecret = require("./secret.js").jwtSecret;
  const jwtOptions = {
    expiresIn: "1d",
  };
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};
