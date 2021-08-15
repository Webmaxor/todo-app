const supertest = require("supertest");
const app = require("../app");
const { sequelize } = require("../app/models");

const request = supertest(app);

it("should handle create error when title and todo_id is missing", async () => {
  const response = await request
    .post("/api/v1/sub-task/create")
    .set("Accept", "application/json");

  expect(response.status).toBe(400);
  expect(response.error.text).toEqual(
    'Error validating request body. "title" is required. "todo_id" is required.'
  );
});

it("should handle create error when parent task could not be found", async () => {
  const createSubtaskRes = await request
    .post("/api/v1/sub-task/create")
    .set("Accept", "application/json")
    .send({ title: "Some subtask 1", todo_id: 9999 });

  expect(createSubtaskRes.status).toBe(400);
  expect(createSubtaskRes.error.text).toEqual("Task not found.");
});

it("should create a subtask", async () => {
  const createTaskRes = await request
    .post("/api/v1/todo/create")
    .set("Accept", "application/json")
    .send({ title: "Some task 8" });

  const task = createTaskRes.body;

  const createSubtaskRes = await request
    .post("/api/v1/sub-task/create")
    .set("Accept", "application/json")
    .send({ title: "Some subtask 1", todo_id: task.id });

  expect(createSubtaskRes.status).toBe(200);
  expect(createSubtaskRes.body.title).toEqual("Some subtask 1");
});

afterAll(async () => {
  sequelize.close();
});
