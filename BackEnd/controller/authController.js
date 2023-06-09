const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const jwtUtils = require("../utils/jwtUtils");

const registerUser = async (request, h) => {
  try {
    const { email, password } = request.payload;
    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return h.response({ message: "Already registered" }).code(400);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.createUser({
      email,
      password: hashedPassword,
    });

    const token = jwtUtils.generateToken(newUser);
    return h
      .response({ message: "User registered successfully", token })
      .code(201);
  } catch (err) {
    return h.response({ message: "Failed to register user" }).code(500);
  }
};

const loginUser = async (request, h) => {
  try {
    const { email, password } = request.payload;
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return h.response({ message: "Invalid email or password" }).code(400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return h.response({ message: "Invalid email or password" }).code(400);
    }

    const token = jwtUtils.generateToken(user);

    return h.response({ message: "login success", token }).code(200);
  } catch (err) {
    return h.response({ message: "Login failed" }).code(500);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
