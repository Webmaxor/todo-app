const supertest = require("supertest");
const app = require("../app");
const { sequelize } = require("../app/models");

const request = supertest(app);

it("should handle create error", async () => {
  const response = await request
    .post("/api/v1/todo/create")
    .set("Accept", "application/json");

  expect(response.status).toBe(400);
  expect(response.error.text).toEqual(
    'Error validating request body. "title" is required.'
  );
});

it("should create a todo", async () => {
  const response = await request
    .post("/api/v1/todo/create")
    .set("Accept", "application/json")
    .send({ title: "Some task 6" });

  expect(response.status).toBe(200);
  expect(response.body.title).toEqual("Some task 6");
});

afterAll(async () => {
  sequelize.close();
});
