"use strict";

const Hapi = require("@hapi/hapi");
const console = require("console");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.start();
  console.log("Server started", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
