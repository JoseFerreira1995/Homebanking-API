const jwt = require("jsonwebtoken");

const secretKey = "jwt12345";

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 3600 });
  return token;
};

const validateToken = (token, req) => {
  try {
    console.log("validate:", token, req.auth.token);
    const decoded = jwt.verify(req.auth.token, secretKey);
    console.log(
      "🚀 ~ file: jwtUtils.js:14 ~ validateToken ~ decoded:",
      decoded
    );

    return { isValid: true };
  } catch (err) {
    console.log("err", err);
    return h.response({ message: "Expired token" });
  }
};
module.exports = { generateToken, validateToken };
