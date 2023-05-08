"use strict";

const Hapi = require("@hapi/hapi");
const jwt = require("jsonwebtoken");
const HapiJWT = require("hapi-auth-jwt");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(HapiJWT);

  server.auth.strategy("jwt", "jwt", {
    key: "my-key",
    validate: async (decoded, request, h) => {
      return { isValid: true };
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
