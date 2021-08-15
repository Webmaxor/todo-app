const supertest = require("supertest");
const app = require("../app");
const { sequelize } = require("../app/models");

const request = supertest(app);

it("should update todo status", async () => {
  const createResponse = await request
    .post("/api/v1/todo/create")
    .set("Accept", "application/json")
    .send({ title: "Some task 7" });

  const task = createResponse.body;

  const updateResponse = await request
    .put(`/api/v1/todo/update/${task.id}`)
    .set("Accept", "application/json")
    .send({ status: "completed" });

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.body.success).toEqual(true);
});

afterAll(async () => {
  sequelize.close();
});
