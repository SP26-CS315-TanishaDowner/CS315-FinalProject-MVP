const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const { app, resetTickets } = require("./server");

test.beforeEach(() => {
  resetTickets();
});

test("GET /api/tickets returns an empty list initially", async () => {
  const response = await request(app).get("/api/tickets");

  assert.equal(response.status, 200);
  assert.equal(Array.isArray(response.body), true);
  assert.equal(response.body.length, 0);
  assert.deepEqual(response.body, []);
});

test("POST /api/tickets creates and returns a new ticket", async () => {
  const createResponse = await request(app)
    .post("/api/tickets")
    .send({ title: "Laptop battery issue" });

  assert.equal(createResponse.status, 200);
  assert.deepEqual(createResponse.body, {
    id: 1,
    title: "Laptop battery issue"
  });

  const listResponse = await request(app).get("/api/tickets");
  assert.equal(listResponse.status, 200);
  assert.equal(listResponse.body.length, 1);
  assert.deepEqual(listResponse.body[0], {
    id: 1,
    title: "Laptop battery issue"
  });
});

test("DELETE /api/tickets removes a ticket", async () => {
  const createResponse = await request(app)
    .post("/api/tickets")
    .send({ title: "Delete me" });

  const id = createResponse.body.id;

  const deleteResponse = await request(app)
    .delete(`/api/tickets/${id}`);

  assert.equal(deleteResponse.status, 200);

  const listResponse = await request(app).get("/api/tickets");
  assert.equal(listResponse.body.length, 0);
});

test("PUT /api/tickets updates a ticket", async () => {
  const createResponse = await request(app)
    .post("/api/tickets")
    .send({ title: "Old title" });

  const id = createResponse.body.id;

  const updateResponse = await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "New title" });

  assert.equal(updateResponse.status, 200);
  assert.equal(updateResponse.body.title, "New title");
});

test("PUT /api/tickets returns 404 for invalid id", async () => {
  const response = await request(app)
    .put("/api/tickets/999")
    .send({ title: "Does not exist" });

  assert.equal(response.status, 404);
});
