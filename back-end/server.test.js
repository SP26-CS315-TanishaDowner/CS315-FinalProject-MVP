const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const { app, resetTickets } = require("./server");

test.beforeEach(() => {
  resetTickets();
});

test("GET /api/tickets returns default tickets", async () => {
  const response = await request(app).get("/api/tickets");

  assert.equal(response.status, 200);
  assert.equal(Array.isArray(response.body), true);
  assert.equal(response.body.length, 2);
  assert.deepEqual(response.body[0], { id: 1, title: "Printer not working" });
});

test("POST /api/tickets creates and returns a new ticket", async () => {
  const createResponse = await request(app)
    .post("/api/tickets")
    .send({ title: "Laptop battery issue" });

  assert.equal(createResponse.status, 200);
  assert.deepEqual(createResponse.body, {
    id: 3,
    title: "Laptop battery issue"
  });

  const listResponse = await request(app).get("/api/tickets");
  assert.equal(listResponse.status, 200);
  assert.equal(listResponse.body.length, 3);
  assert.deepEqual(listResponse.body[2], {
    id: 3,
    title: "Laptop battery issue"
  });
});
