const jwt = require("jsonwebtoken");

const secretKey = "jwt12345";

const generateToken = (user) => {
  const token = jwt.sign({ sub: user.id }, secretKey, { expires: "2h" });
  return token;
};
module.exports = generateToken