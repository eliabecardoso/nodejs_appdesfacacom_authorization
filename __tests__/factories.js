const { factory } = require("factory-girl");
const { User } = require("../src/app/models");
const faker = require("faker");

factory.define("User", User, {
  name: faker.name.findName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

module.exports = factory;
