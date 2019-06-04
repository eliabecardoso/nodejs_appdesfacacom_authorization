const request = require("supertest");
const faker = require("faker");

const app = require("../../src/app");
const truncate = require("../util/truncate");
const factory = require("../factories");

const routePrefix = "/authorization/";

describe("Registration", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should not valid with incorrect data parameters", async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response = await request(app)
      .post(routePrefix + "registers")
      .send({ user });

    expect(response.body.message).toContain("Error: campo");
  });

  it("should verify username or email are valid to find", async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    };

    const response = await request(app)
      .post(routePrefix + "registers")
      .send({ user });

    expect(response.body.message).toBe(
      "Error: campo Email ou Username inválido"
    );
  });

  it("should valid if exists user registered", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .post(routePrefix + "registers")
      .send({ user });

    expect(response.body.message).toBe(
      "Já existe usuário cadastrado com esses dados"
    );
  });

  it("should create user and generate password hash on register", async () => {
    const user = {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response = await request(app)
      .post(routePrefix + "registers")
      .send({ user });

    expect(response.status).toBe(200);
  });
});
