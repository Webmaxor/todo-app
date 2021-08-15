const supertest = require("supertest");
const app = require("../app");
const { sequelize } = require("../app/models");

const request = supertest(app);

it("should update sub-task status", async () => {
  const createTaskRes = await request
    .post("/api/v1/todo/create")
    .set("Accept", "application/json")
    .send({ title: "Some task 8" });

  const task = createTaskRes.body;

  const createSubtaskRes = await request
    .post("/api/v1/sub-task/create")
    .set("Accept", "application/json")
    .send({ title: "Some subtask 1", todo_id: task.id });

  const subtask = createSubtaskRes.body;

  const updateResponse = await request
    .put(`/api/v1/sub-task/update/${subtask.id}`)
    .set("Accept", "application/json")
    .send({ status: "completed" });

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.body.success).toEqual(true);
});

afterAll(async () => {
  sequelize.close();
});
