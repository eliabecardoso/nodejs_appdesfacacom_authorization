const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../util/truncate");
const factory = require("../factories");
const routePrefix = "/api/";

describe("Authetication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should verify if user are not registered", async () => {
    const user = factory.create("User");

    const response = await request(app)
      .post(routePrefix + "sessions")
      .send({
        email: user.email + "error",
        password: user.password
      });

    expect(response.body.message).toBe("Usuário não encontrado");
  });
});
