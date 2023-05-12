const jwt = require("jsonwebtoken");

const secretKey = "jwt12345";

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 3600 });
  return token;
};

const validateToken = (token, req) => {
  try {
    const decoded = jwt.verify(req.auth.token, secretKey);
    return { isValid: true };
  } catch (err) {
    return h.response({ message: "Expired token" });
  }
};
module.exports = { generateToken, validateToken };
