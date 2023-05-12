"use strict";

const Hapi = require("@hapi/hapi");
const jwtUtils = require("./utils/jwtUtils");
const userModel = require("./model/userModel");
const authController = require("./controller/authController");
const transactionController = require("./controller/transactionController");
const path = require("path");
const HapiCors = require("hapi-cors");
const corsHeaders = require("hapi-cors-headers");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",

    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register(require("hapi-auth-jwt2"));
  await server.register(require("@hapi/inert"));

  await server.register({
    plugin: HapiCors,
    options: {
      origins: ["*"],
      headers: ["Authorization", "Content-Type"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  server.auth.strategy("jwt", "jwt", {
    key: "jwt12345",
    validate: jwtUtils.validateToken,
    verifyOptions: { algorithms: ["HS256"] },
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
    options: {
      auth: false,
    },
    handler: authController.registerUser,
  });

  server.route({
    method: "POST",
    path: "/login",
    options: {
      auth: false,
    },
    handler: authController.loginUser,
  });

  server.route({
    method: "GET",
    path: "/transactions",
    options: {
      auth: "jwt",
    },
    handler: transactionController.getUserTransactions,
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
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-with"],
        credentials: true,
        exposedHeaders: ["content-type", "content-length"],
      },
    },
  });

  server.auth.default("jwt");

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;
    if (response.isBoom) {
      console.error(response);
    }
    return h.continue;
  });

  await server.start();
  console.log("Server started", server.info.uri)
};

process.on("unhandledRejection", (err) => {
  process.exit(1);
});

init();
