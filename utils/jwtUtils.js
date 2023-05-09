const jwt = require("jsonwebtoken");

const secretKey = "jwt12345";

const generateToken = (user) => {
  const token = jwt.sign({ sub: user.id }, secretKey, { expires: "2h" });
  return token;
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.sub;
  } catch (err) {
    return null;
  }
}
module.exports = {generateToken, validateToken};