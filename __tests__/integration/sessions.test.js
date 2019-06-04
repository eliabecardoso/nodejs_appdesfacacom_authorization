const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../util/truncate");
const factory = require("../factories");
const routePrefix = "/authorization/";

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should valid if exists input parameters for authentication", async () => {
    const response = await request(app)
      .post(routePrefix + "sessions")
      .send();

    expect(response.body.message).toBe("Informe o usuário e senha");
  });

  it("should verify if user are not registered", async () => {
    const [email, password] = ["e@e.com", "123456"];

    const response = await request(app)
      .post(routePrefix + "sessions")
      .send({
        email,
        password
      });

    expect(response.body.message).toBe("Usuário não encontrado");
  });

  it("should valid user password", async () => {
    let { email, password } = await factory.create("User");
    password += "error";

    const response = await request(app)
      .post(routePrefix + "sessions")
      .send({ email, password });

    expect(response.body.message).toBe("Senha inválida");
  });

  it("should receive JWT Token when user credentials was valid", async () => {
    const { email, password } = await factory.create("User");

    const response = await request(app)
      .post(routePrefix + "sessions")
      .send({ email, password });

    expect(response.body).toHaveProperty("token");
  });
});
