"use strict";

const Hapi = require("@hapi/hapi");
const jwtUtils = require("./utils/jwtUtils");
const userModel = require("./model/userModel");
const authController = require("./controller/authController");
const transactionController = require("./controller/transactionController");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(require("hapi-auth-jwt2"));

  server.auth.strategy("jwt", "jwt", {
    key: "my-key",
    validate: jwtUtils.validateToken,
  });

  server.route({
    method: "GET",
    path: "/",
    options: {
      auth: false,
    },
    handler: (req, h) => {
      return "Welcome to E-bank";
    },
  });

  server.route({
    method: "POST",
    path: "/register",
    handler: authController.registerUser,
  });

  server.route({
    method: "POST",
    path: "/login",
    handler: authController.loginUser,
  });

  server.route({
    method: "GET",
    path: "/transactions",
    handler: transactionController.getUserTransactions,
    options: {
      auth: "jwt",
    },
  });

  server.route({
    method: "PUT",
    path: "/add-money",
    handler: transactionController.addMoneyToAccount,
    options: {
      auth: "jwt",
    },
  });

  server.route({
    method: "DELETE",
    path: "/withdraw-money",
    handler: transactionController.withdrawMoney,
    options: {
      auth: "jwt",
    },
  });

  server.auth.default("jwt");

  await server.start();
  console.log("Server started", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
