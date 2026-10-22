const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../src/app");
const valid = {
  name: "Test Inquiry",
  phone: "9882816832",
  email: "",
  material: "iron-scrap",
  quantity: "20 kg",
  location: "Bilaspur",
  message: "Dry sorted iron scrap available.",
  website: "",
};
async function fixture(t, options = {}) {
  const app = createApp({ dbPath: ":memory:", ...options });
  const server = app.listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  t.after(async () => {
    await new Promise((r) => server.close(r));
    await app.locals.close();
  });
  return { app, url: `http://127.0.0.1:${server.address().port}` };
}
test("health, saved inquiry, private records and validation", async (t) => {
  const { app, url } = await fixture(t);
  assert.equal((await fetch(url + "/api/health")).status, 200);
  const post = (body) =>
    fetch(url + "/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  const result = await post(valid);
  assert.equal(result.status, 201);
  assert.match((await result.json()).message, /saved/);
  assert.equal(
    app.locals.db.prepare("SELECT COUNT(*) AS count FROM inquiries").get()
      .count,
    1,
  );
  assert.equal(
    app.locals.db.prepare("SELECT notification_status FROM inquiries").get()
      .notification_status,
    "not_configured",
  );
  assert.equal((await post({ ...valid, phone: "123" })).status, 422);
  assert.equal((await post({ ...valid, website: "spam.example" })).status, 400);
  assert.equal((await fetch(url + "/api/inquiries")).status, 404);
  assert.equal(
    (
      await fetch(url + "/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{",
      })
    ).status,
    400,
  );
});
test("CORS, body limit, rate limiting and content type", async (t) => {
  const { url } = await fixture(t, { rateLimit: 2 });
  assert.equal(
    (
      await fetch(url + "/api/health", {
        headers: { Origin: "https://evil.example" },
      })
    ).status,
    403,
  );
  const allowed = await fetch(url + "/api/health", {
    headers: { Origin: "http://localhost:5173" },
  });
  assert.equal(
    allowed.headers.get("access-control-allow-origin"),
    "http://localhost:5173",
  );
  assert.ok(allowed.headers.get("x-content-type-options"));
  assert.equal(
    (
      await fetch(url + "/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "a".repeat(20000) }),
      })
    ).status,
    413,
  );
  assert.equal(
    (await fetch(url + "/api/inquiries", { method: "POST", body: "test" }))
      .status,
    415,
  );
  assert.equal(
    (
      await fetch(url + "/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valid),
      })
    ).status,
    201,
  );
  assert.equal(
    (
      await fetch(url + "/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valid),
      })
    ).status,
    429,
  );
});
test("SMTP failure preserves a saved inquiry", async (t) => {
  const { app, url } = await fixture(t, {
    mailer: {
      sendMail: async () => {
        throw new Error("test failure");
      },
    },
  });
  const response = await fetch(url + "/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(valid),
  });
  assert.equal(response.status, 201);
  await new Promise((r) => setTimeout(r, 30));
  assert.equal(
    app.locals.db.prepare("SELECT notification_status FROM inquiries").get()
      .notification_status,
    "failed",
  );
});
