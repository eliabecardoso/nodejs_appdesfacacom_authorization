const routes = require("express").Router();

const SessionController = require("./app/controllers/SessionController");
const RegisterController = require("./app/controllers/RegisterController");

routes.post("/registers", RegisterController.store);
routes.post("/sessions", SessionController.authenticate);

module.exports = routes;
