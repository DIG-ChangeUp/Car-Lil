const express = require("express");
require("dotenv").config({ path: "./.env" });
const environment = process.env.NODE_ENV
const cors = require("cors")

// const cors = require("cors");

const usersController= require("./users/users.controller");

function setupServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/", express.static( "./backend/dist"));

  app.get("/api", usersController.index)

  return app;
}

module.exports = {
  setupServer,
};

const app = setupServer();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  if(environment === "development"){
    console.log(`Local server is running on: http://localhost:${PORT}/`);
  }else{
    console.log(`Web server is running  PORT:${PORT}/`);
  }
});

