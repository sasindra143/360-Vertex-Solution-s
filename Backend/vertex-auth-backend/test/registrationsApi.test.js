const test = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const { parseRegistrationInput, createRegistrationRouters } = require("../registrationsApi");

test("registration input validates and normalizes safe account details", () => {
  assert.deepEqual(
    parseRegistrationInput({
      full_name: "  Sam Taylor ",
      email: " SAM@example.com ",
      phone: "+1 (555) 123-4567",
      password: "must-not-be-stored",
    }),
    { full_name: "Sam Taylor", email: "sam@example.com", phone: "+1 (555) 123-4567" }
  );
  assert.throws(() => parseRegistrationInput({ full_name: "S", email: "bad" }), /Full name/);
  assert.throws(() => parseRegistrationInput({ full_name: "Sam", email: "bad" }), /valid email/);
  assert.throws(() => parseRegistrationInput({ full_name: "Sam", email: "sam@example.com", phone: "abc" }), /phone/);
});

test("registration route persists public details and protects admin listing", async (context) => {
  const records = [];
  const Registration = {
    findOne: () => ({ lean: async () => null }),
    create: async (record) => {
      const created = { ...record, _id: "registration-1", createdAt: new Date("2026-10-11T00:00:00.000Z") };
      records.push(created);
      return created;
    },
    find: () => ({
      select() { return this; },
      sort() { return this; },
      limit() { return this; },
      lean: async () => records,
    }),
  };
  const app = express();
  app.use(express.json());
  const { publicRouter, adminRouter } = createRegistrationRouters({
    getSessionFromRequest: (req) => req.get("x-test-admin") === "yes" ? { role: "ADMIN" } : null,
    rejectUnexpectedOrigin: (req, res) => {
      if (req.get("origin") === "http://localhost:5173") return false;
      res.status(403).json({ message: "Request origin is not allowed." });
      return true;
    },
    ensureDatabase: async () => {},
    getModel: () => Registration,
  });
  app.use("/api/registrations", publicRouter);
  app.use("/api/admin/registrations", adminRouter);
  app.use((error, _req, res, _next) => res.status(500).json({ message: error.message }));

  const server = await new Promise((resolve) => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  }));

  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const submitResponse = await fetch(`${baseUrl}/api/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "http://localhost:5173" },
    body: JSON.stringify({
      full_name: "Sam Taylor",
      email: "sam@example.com",
      phone: "555-0100",
      password: "must-not-be-stored",
    }),
  });
  assert.equal(submitResponse.status, 201);
  assert.equal(records[0].password, undefined);

  const deniedResponse = await fetch(`${baseUrl}/api/admin/registrations`);
  assert.equal(deniedResponse.status, 401);

  const adminResponse = await fetch(`${baseUrl}/api/admin/registrations`, {
    headers: { "x-test-admin": "yes" },
  });
  assert.equal(adminResponse.status, 200);
  const result = await adminResponse.json();
  assert.equal(result.registrations[0].email, "sam@example.com");

  const invalidResponse = await fetch(`${baseUrl}/api/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "http://localhost:5173" },
    body: JSON.stringify({ full_name: "S", email: "bad" }),
  });
  assert.equal(invalidResponse.status, 400);
});
