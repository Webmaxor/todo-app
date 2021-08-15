const supertest = require("supertest");
const app = require("../app");
const db = require("../app/models");

const request = supertest(app);

it("gets the todo list: GET /api/v1/todo/index", async () => {
  const response = await request.get("/api/v1/todo/index");
  expect(response.status).toBe(200);
});

afterAll(async () => {
  db.sequelize.close();
});
