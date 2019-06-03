const express = require("express");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.route("/api", require("./route"));
  }
}

module.exports = new AppController().express;
