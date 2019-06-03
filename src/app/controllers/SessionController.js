const { User } = require("../models");

class SessionController {
  async authenticate(req, res) {
    return res.status(200).send();
  }
}

module.exports = new SessionController();
