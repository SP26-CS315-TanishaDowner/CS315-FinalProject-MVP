const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

process.env.DB_HOST = process.env.DB_HOST || "127.0.0.1";
process.env.DB_USER = process.env.DB_USER || "root";
process.env.DB_PASSWORD = process.env.DB_PASSWORD || "root";
process.env.DB_NAME = process.env.DB_NAME || "tickets_db";

const { app, resetTickets, closeDb } = require("./server");

test.beforeEach(async () => {
  await resetTickets();
});

test.after(async () => {
  await closeDb();
});

// Test for health check endpoint
test("GET /health returns an OK status", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

// Test for GET /api/tickets endpoint
test("GET /api/tickets returns an empty list initially", async () => {
  const response = await request(app).get("/api/tickets");

  assert.equal(response.status, 200);
  assert.equal(Array.isArray(response.body), true);
  assert.equal(response.body.length, 0);
  assert.deepEqual(response.body, []);
});

// Additional tests for POST, DELETE, and PUT endpoints
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

// Test for deleting a ticket
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

// Test for updating a ticket
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

// Test for non-existent ticket; returning 404
test("PUT /api/tickets returns 404 for invalid id", async () => {
  const response = await request(app)
    .put("/api/tickets/999")
    .send({ title: "Does not exist" });

  assert.equal(response.status, 404);
});




