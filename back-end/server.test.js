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
