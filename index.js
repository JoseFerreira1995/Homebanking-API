"use strict";

const Hapi = require("@hapi/hapi");
const jwtUtils = require("./utils/jwtUtils");
const userModel = require("./model/userModel");
const authController = require ("./controller/authController");
const HapiJWT = require("hapi-auth-jwt");
const Joi = require("joi");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(HapiJWT);

  server.auth.strategy("jwt", "jwt", {
    key: "my-key",
    validate: jwtUtils.validateJWT,
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
